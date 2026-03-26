from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Campaign, Donation
from mpesa import trigger_stk_push
import os

app = Flask(__name__)
# This tells Flask to allow React to talk to it
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'postgresql://localhost/zakat_db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/api/status', methods=['GET'])
def get_status():
    return jsonify({"message": "Zakat platform backend is running!", "status": "success"})

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

# Notice we added 'OPTIONS' here so the browser's security check passes
@app.route('/api/donate', methods=['POST', 'OPTIONS'])
def process_donation():
    # If the browser is just doing its security check, politely say yes and stop here.
    if request.method == 'OPTIONS':
        return jsonify({"message": "CORS preflight successful"}), 200
        
    # Otherwise, process the actual donation
    data = request.json
    amount = data.get('amount')
    phone = data.get('phone')
    campaign_id = data.get('campaignId')

    # Format the phone number to M-Pesa's standard
    if phone.startswith('0'):
        phone = '254' + phone[1:]
    elif phone.startswith('+'):
        phone = phone[1:]

    print(f"Initiating KES {amount} donation from {phone} for campaign {campaign_id}")

    # Fire the engine!
    mpesa_response = trigger_stk_push(phone, amount)

    if mpesa_response and mpesa_response.get('ResponseCode') == '0':
        return jsonify({
            "status": "success", 
            "message": "STK Push sent! Please enter your PIN on your phone."
        })
    else:
        return jsonify({
            "status": "error", 
            "message": "Failed to reach Safaricom. Please try again."
        }), 400

@app.route('/api/mpesa/callback', methods=['POST'])
def mpesa_callback():
    callback_data = request.json
    
    # Navigate through Safaricom's nested JSON structure
    stk_callback = callback_data.get('Body', {}).get('stkCallback', {})
    result_code = stk_callback.get('ResultCode')
    
    print("\n" + "="*50)
    
    if result_code == 0:
        # ResultCode 0 means the user typed their PIN and had enough money!
        metadata_items = stk_callback.get('CallbackMetadata', {}).get('Item', [])
        
        amount = 0
        receipt_number = ""
        phone = ""
        
        # Loop through the data array to find the values we want
        for item in metadata_items:
            if item.get('Name') == 'Amount':
                amount = item.get('Value')
            elif item.get('Name') == 'MpesaReceiptNumber':
                receipt_number = item.get('Value')
            elif item.get('Name') == 'PhoneNumber':
                phone = item.get('Value')
                
        print(f"✅ PAYMENT SUCCESSFUL!")
        print(f"Amount: KES {amount}")
        print(f"Receipt: {receipt_number}")
        print(f"Phone: {phone}")
        
        # TODO: Save this exact data to the PostgreSQL Database
        
    else:
        # ResultCode wasn't 0 (e.g., user cancelled, or timeout)
        error_desc = stk_callback.get('ResultDesc')
        print(f"❌ PAYMENT FAILED: {error_desc}")
        
    print("="*50 + "\n")
    
    # Always return this exact success message to Safaricom, or they will keep pinging you
    return jsonify({"ResultCode": 0, "ResultDesc": "Accepted"})

if __name__ == '__main__':
    app.run(debug=True, port=5555)