from dotenv import load_dotenv
import os
load_dotenv()

from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Campaign, Donation, User
from mpesa import trigger_stk_push
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import verify_jwt_in_request

app = Flask(__name__)
CORS(app)

db_url = os.environ.get('DATABASE_URL', 'postgresql://localhost/zakat_db')
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'super-secret-key-change-in-production')

db.init_app(app)
jwt = JWTManager(app)

with app.app_context():
    db.create_all()

def admin_required():
    verify_jwt_in_request()
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user or not user.is_admin:
        from flask import abort
        abort(403)

@app.route('/api/status', methods=['GET'])
def get_status():
    return jsonify({"message": "Zakat platform backend is running!", "status": "success"})

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "Email already registered."}), 409
    
    invite_code = data.get('inviteCode', '')
    is_admin = invite_code == os.environ.get('ADMIN_INVITE_CODE', '')

    new_user = User(
        name=data['name'],
        email=data['email'],
        password_hash=generate_password_hash(data['password']),
        is_admin=is_admin
    )
    db.session.add(new_user)
    db.session.commit()
    token = create_access_token(identity=str(new_user.id))
    return jsonify({"token": token, "name": new_user.name, "isAdmin": new_user.is_admin}), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.password_hash, data['password']):
        return jsonify({"message": "Invalid email or password."}), 401
    token = create_access_token(identity=str(user.id))
    return jsonify({"token": token, "name": user.name, "isAdmin": user.is_admin}), 200

@app.route('/api/me', methods=['GET'])
@jwt_required()
def get_me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({"name": user.name, "email": user.email})

@app.route('/api/campaigns', methods=['POST'])
@jwt_required()
def create_campaign():
    data = request.json
    new_campaign = Campaign(
        title=data['title'],
        charity=data['charity'],
        goal=data['goal'],
        raised=0,
        days_left=data['daysLeft'],
        image_color=data.get('imageColor', '#10b981'),
        status='pending'
    )
    db.session.add(new_campaign)
    db.session.commit()
    return jsonify({"message": "Campaign submitted for review!", "id": new_campaign.id}), 201

@app.route('/api/campaigns', methods=['GET'])
def get_campaigns():
    campaigns = Campaign.query.filter_by(status='approved').all()
    campaign_list = []
    for c in campaigns:
        campaign_list.append({
            "id": c.id,
            "title": c.title,
            "charity": c.charity,
            "goal": c.goal,
            "raised": c.raised,
            "daysLeft": c.days_left,
            "imageColor": c.image_color
        })
    return jsonify(campaign_list)

@app.route('/api/admin/campaigns/pending', methods=['GET'])
def get_pending_campaigns():
    admin_required()
    campaigns = Campaign.query.filter_by(status='pending').all()
    return jsonify([{
        "id": c.id,
        "title": c.title,
        "charity": c.charity,
        "goal": c.goal,
        "daysLeft": c.days_left,
        "imageColor": c.image_color
    } for c in campaigns])

@app.route('/api/admin/campaigns/<int:campaign_id>/review', methods=['POST'])
def review_campaign(campaign_id):
    admin_required()
    data = request.json
    action = data.get('action')
    if action not in ['approved', 'rejected']:
        return jsonify({"message": "Invalid action."}), 400
    campaign = Campaign.query.get_or_404(campaign_id)
    campaign.status = action
    db.session.commit()
    return jsonify({"message": f"Campaign {action}."})

@app.route('/api/donate', methods=['POST', 'OPTIONS'])
def process_donation():
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight successful"}), 200
        
    data = request.json
    amount = data.get('amount')
    phone = data.get('phone')
    campaign_id = data.get('campaignId')

    if phone.startswith('0'):
        phone = '254' + phone[1:]
    elif phone.startswith('+'):
        phone = phone[1:]

    print(f"Initiating KES {amount} donation from {phone} for campaign {campaign_id}")

    # Fire the engine!
    mpesa_response = trigger_stk_push(phone, amount)

    if mpesa_response and mpesa_response.get('ResponseCode') == '0':
        checkout_request_id = mpesa_response.get('CheckoutRequestID')
        
        new_donation = Donation(
            campaign_id=campaign_id,
            phone_number=phone,
            amount=amount,
            checkout_request_id=checkout_request_id,
            status='Pending'
        )
        db.session.add(new_donation)
        db.session.commit()
        
        return jsonify({
            "status": "success", 
            "message": "STK Push sent!",
            "ticket": checkout_request_id
        })
    else:
        return jsonify({
            "status": "error", 
            "message": "Failed to reach Safaricom. Please try again."
        }), 400
        

@app.route('/api/mpesa/callback', methods=['POST'])
def mpesa_callback():
    callback_data = request.json
    stk_callback = callback_data.get('Body', {}).get('stkCallback', {})
    
    result_code = stk_callback.get('ResultCode')
    checkout_request_id = stk_callback.get('CheckoutRequestID') # The Ticket returns!
    
    print("\n" + "="*50)
    
    # 1. Look up the pending donation using the ticket
    donation = Donation.query.filter_by(checkout_request_id=checkout_request_id).first()
    
    if not donation:
        print(f"❌ Error: Received receipt for unknown ticket {checkout_request_id}")
        return jsonify({"ResultCode": 0, "ResultDesc": "Accepted"})

    if result_code == 0:
        # 2. Payment succeeded! Grab the receipt number
        metadata_items = stk_callback.get('CallbackMetadata', {}).get('Item', [])
        receipt_number = ""
        
        for item in metadata_items:
            if item.get('Name') == 'MpesaReceiptNumber':
                receipt_number = item.get('Value')
                
        print(f"✅ PAYMENT SUCCESSFUL!")
        print(f"Ticket: {checkout_request_id} -> Receipt: {receipt_number}")
        
        # 3. Update the donation record in the database
        donation.status = 'Completed'
        donation.mpesa_receipt_number = receipt_number
        
        # 4. Find the charity and increase their total raised!
        campaign = Campaign.query.get(donation.campaign_id)
        if campaign:
            campaign.raised += donation.amount
            print(f"🎉 Updated {campaign.charity} - Total Raised is now KES {campaign.raised}")
            
        db.session.commit()
        
    else:
        # Payment Failed (timeout, insufficient funds, etc.)
        error_desc = stk_callback.get('ResultDesc')
        print(f"❌ PAYMENT FAILED: {error_desc}")
        donation.status = 'Failed'
        db.session.commit()
        
    print("="*50 + "\n")
    return jsonify({"ResultCode": 0, "ResultDesc": "Accepted"})


@app.route('/api/admin/donations', methods=['GET'])
def get_all_donations():
    admin_required()
    # We query both tables at the same time so we can match the donation to the charity name
    query_results = db.session.query(Donation, Campaign).join(Campaign).order_by(Donation.created_at.desc()).all()
    
    ledger = []
    for donation, campaign in query_results:
        ledger.append({
            "id": donation.id,
            "charity": campaign.charity,
            # Mask the phone number for privacy (e.g., 254708***149)
            "phone": f"{donation.phone_number[:6]}***{donation.phone_number[-3:]}",
            "amount": donation.amount,
            "receipt": donation.mpesa_receipt_number or "N/A",
            "status": donation.status,
            "date": donation.created_at.strftime("%Y-%m-%d %H:%M")
        })
        
    return jsonify(ledger)

if __name__ == '__main__':
    app.run(debug=True, port=5555)