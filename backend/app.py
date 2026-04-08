from dotenv import load_dotenv
import os
load_dotenv()
# print("DB URL:", os.environ.get('DATABASE_URL'))
from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Campaign, Donation
from mpesa import trigger_stk_push

app = Flask(__name__)
# This tells Flask to allow React to talk to it
CORS(app)

db_url = os.environ.get('DATABASE_URL', 'postgresql://localhost/zakat_db')
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/api/status', methods=['GET'])
def get_status():
    return jsonify({"message": "Zakat platform backend is running!", "status": "success"})

@app.route('/api/campaigns', methods=['POST'])
def create_campaign():
    data = request.json
    new_campaign = Campaign(
        title=data['title'],
        charity=data['charity'],
        goal=data['goal'],
        raised=0,
        days_left=data['daysLeft'],
        image_color=data.get('imageColor', '#10b981')
    )
    db.session.add(new_campaign)
    db.session.commit()
    return jsonify({"message": "Campaign created!", "id": new_campaign.id}), 201

@app.route('/api/campaigns', methods=['GET'])
def get_campaigns():
    campaigns = Campaign.query.all()
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