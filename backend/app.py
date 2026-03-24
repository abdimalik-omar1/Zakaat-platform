from flask import Flask, jsonify
from flask_cors import CORS
from models import db, Campaign, Donation # Import the brain we just built

app = Flask(__name__)
CORS(app)

# Tell Flask where to find our PostgreSQL database
# (We will create this 'zakat_db' on your Mac in the next step)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/zakat_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Plug the database into the app
db.init_app(app)

# This command automatically creates the tables if they don't exist yet
with app.app_context():
    db.create_all()

@app.route('/api/status', methods=['GET'])
def get_status():
    return jsonify({"message": "Zakat platform backend is running!", "status": "success"})


@app.route('/api/campaigns', methods=['GET'])
def get_campaigns():
    # Fetch all campaigns from the database
    campaigns = Campaign.query.all()
    
    # Format them into a list of dictionaries so React can read them easily
    campaign_list = []
    for c in campaigns:
        campaign_list.append({
            "id": c.id,
            "title": c.title,
            "charity": c.charity,
            "goal": c.goal,
            "raised": c.raised,
            "daysLeft": c.days_left,  # CamelCase to match our React props
            "imageColor": c.image_color
        })
        
    return jsonify(campaign_list)

if __name__ == '__main__':
    app.run(debug=True, port=5000)