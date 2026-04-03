from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Campaign(db.Model):
    __tablename__ = 'campaigns'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    charity = db.Column(db.String(100), nullable=False)
    goal = db.Column(db.Float, nullable=False)
    raised = db.Column(db.Float, default=0.0)
    days_left = db.Column(db.Integer, nullable=False)
    image_color = db.Column(db.String(50), nullable=False)
    
    # This links the campaigns to their donations
    donations = db.relationship('Donation', backref='campaign', lazy=True)

class Donation(db.Model):
    __tablename__ = 'donations'
    id = db.Column(db.Integer, primary_key=True)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    
    # The Coat Check Ticket (From the STK Push)
    checkout_request_id = db.Column(db.String(100), unique=True, nullable=False) 
    # The Final Receipt (From the Webhook)
    mpesa_receipt_number = db.Column(db.String(50), unique=True, nullable=True) 
    
    status = db.Column(db.String(20), default='Pending') # Pending, Completed, Failed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)