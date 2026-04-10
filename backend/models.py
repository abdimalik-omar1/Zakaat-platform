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
    status = db.Column(db.String(20), default='pending')
    
    # This links the campaigns to their donations
    donations = db.relationship('Donation', backref='campaign', lazy=True)

def to_dict(self):
    """Convert campaign to dictionary for JSON response"""
    return {
        'id': self.id,
        'title': self.title,
        'charity': self.charity,
        'goal': self.goal,
        'raised': self.raised,
        'daysLeft': self.days_left,
        'imageColor': self.image_color,
        'createdAt': self.created_at.isoformat() if self.created_at else None,
        'progress': round((self.raised / self.goal * 100) if self.goal > 0 else 0, 2)
    }

class Donation(db.Model):
    __tablename__ = 'donations'
    id = db.Column(db.Integer, primary_key=True)
    campaign_id = db.Column(db.Integer, db.ForeignKey('campaigns.id'), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    tip = db.Column(db.Numeric, default=0)
    
    # The Coat Check Ticket (From the STK Push)
    checkout_request_id = db.Column(db.String(100), unique=True, nullable=False) 
    # The Final Receipt (From the Webhook)
    mpesa_receipt_number = db.Column(db.String(50), unique=True, nullable=True) 
    
    status = db.Column(db.String(20), default='Pending') # Pending, Completed, Failed
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    donor_name = db.Column(db.String(100), nullable=True)
    

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)