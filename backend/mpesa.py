import os
import requests
import base64
from datetime import datetime
from requests.auth import HTTPBasicAuth
from dotenv import load_dotenv

load_dotenv()

def get_access_token():
    consumer_key = os.environ.get('MPESA_CONSUMER_KEY')
    consumer_secret = os.environ.get('MPESA_CONSUMER_SECRET')
    api_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    
    try:
        response = requests.get(api_url, auth=HTTPBasicAuth(consumer_key, consumer_secret))
        response.raise_for_status() 
        return response.json()['access_token']
    except Exception as e:
        print(f"Token Error: {e}")
        return None

def trigger_stk_push(phone_number, amount):
    token = get_access_token()
    if not token:
        return {"error": "Failed to get access token"}

    # Get our variables from the .env file
    shortcode = os.environ.get('MPESA_SHORTCODE')
    passkey = os.environ.get('MPESA_PASSKEY')
    
    # Safaricom requires a very specific timestamp format
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    
    # Safaricom requires the password to be a Base64 encoded string of Shortcode + Passkey + Timestamp
    password_str = f"{shortcode}{passkey}{timestamp}"
    password = base64.b64encode(password_str.encode('utf-8')).decode('utf-8')

    api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "BusinessShortCode": shortcode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": int(amount),
        "PartyA": phone_number,
        "PartyB": shortcode,
        "PhoneNumber": phone_number,
        # This is where Safaricom will send the receipt after the user types their PIN. 
        "CallBackURL": "https://overkeenly-subcorneous-charmain.ngrok-free.dev/api/mpesa/callback", 
        "AccountReference": "Zakat Platform",
        "TransactionDesc": "Donation"
    }

    try:
        response = requests.post(api_url, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"STK Push Error: {e}")
        return None

# Test the STK Push directly
if __name__ == "__main__":
    print("Initiating test STK Push...")
    
    # Using the official Daraja sandbox test number: 254708374149
    # The format MUST be 254 followed by the 9 digit number.
    result = trigger_stk_push(phone_number="254708374149", amount=1)
    
    print("\nSafaricom Response:")
    print(result)