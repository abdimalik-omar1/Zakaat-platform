import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CampaignCard from './components/CampaignCard';
import DonationModal from './components/DonationModal';

function App() {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  
  // Create an empty state to hold the data from the database
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // This hook runs automatically when the page loads to fetch the data
  useEffect(() => {
    fetch('http://127.0.0.1:5555/api/campaigns')
      .then(response => response.json())
      .then(data => {
        setCampaigns(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching campaigns:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 relative">
      <Navbar />
      <Hero />

      <main className="max-w-6xl mx-auto p-6 mt-32">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Featured fundraisers
        </h2>

        {/* Show a loading message while waiting for the Flask backend */}
        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading campaigns from the database...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map(campaign => (
              <CampaignCard
                key={campaign.id}
                {...campaign}
                onDonate={() => setSelectedCampaign(campaign)}
              />
            ))}
          </div>
        )}
      </main>

      <DonationModal 
        campaign={selectedCampaign} 
        onClose={() => setSelectedCampaign(null)} 
      />
    </div>
  )
}

export default App;