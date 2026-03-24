from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Initialize the database tool
db = SQLAlchemy()

class Campaign(db.Model):
    __tablename__ = 'campaigns'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    charity = db.Column(db.String(100), nullable=False)
    goal = db.Column(db.Float, nullable=False)
    raised = db.Column(db.Float, default=0.0)
    days_left = db.Column(db.Integer, default=30)
    image_color = db.Column(db.String(50), default='bg-teal-800')

    # This links a campaign to all its donations
    donations = db.relationship('Donation', backref='campaign', lazy=True)

class Donation(db.Model):
    __tablename__ = 'donations'
    
    id = db.Column(db.Integer, primary_key=True)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    
    # This is our MVP ledger tracking: tying the donation to a real Safaricom receipt
    mpesa_receipt = db.Column(db.String(50), unique=True, nullable=True) 
    created_at = db.Column(db.DateTime, default=datetime.utcnow)