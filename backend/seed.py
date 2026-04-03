from app import app
from models import db, Campaign

# Our Kenyan dummy data from the React frontend
dummy_campaigns = [
    {
        "title": "Provide Clean Water to Families in Garissa",
        "charity": "Ummah Relief Kenya",
        "goal": 1000000.0,
        "raised": 999000.0,
        "days_left": 12,
        "image_color": "bg-blue-900"
    },
    {
        "title": "Sponsor Orphan Education in Kibera",
        "charity": "Elimu Foundation",
        "goal": 500000.0,
        "raised": 120000.0,
        "days_left": 28,
        "image_color": "bg-amber-700"
    },
    {
        "title": "Emergency Food Parcels for Ramadan",
        "charity": "Kenyan Zakat Fund",
        "goal": 900000.0,
        "raised": 890000.0,
        "days_left": 5,
        "image_color": "bg-emerald-800"
    }
]

with app.app_context():
    print("Resetting database tables...")
    db.drop_all()     # Wipes the old tables completely
    db.create_all()   # Rebuilds them fresh with the new columns
    
    print("Adding Kenyan campaigns to the database...")
    for data in dummy_campaigns:
        new_campaign = Campaign(
            title=data['title'],
            charity=data['charity'],
            goal=data['goal'],
            raised=data['raised'],
            days_left=data['days_left'],
            image_color=data['image_color']
        )
        db.session.add(new_campaign)
        
    db.session.commit()
    print("✅ Database successfully seeded!")