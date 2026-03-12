import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CampaignCard from './components/CampaignCard';
import DonationModal from './components/DonationModal';

function App() {
  // This state tracks which campaign is currently selected for donation. 
  // If it's null, the modal is closed.
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const campaigns = [
    {
      id: 1,
      title: "Provide Clean Water to Families in Garissa",
      charity: "Ummah Relief Kenya",
      raised: 450000,
      goal: 1000000,
      daysLeft: 12,
      imageColor: "bg-blue-900"
    },
    {
      id: 2,
      title: "Sponsor Orphan Education in Kibera",
      charity: "Elimu Foundation",
      raised: 120000,
      goal: 500000,
      daysLeft: 28,
      imageColor: "bg-amber-700"
    },
    {
      id: 3,
      title: "Emergency Food Parcels for Ramadan",
      charity: "Kenyan Zakat Fund",
      raised: 890000,
      goal: 900000,
      daysLeft: 5,
      imageColor: "bg-emerald-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 relative">
      <Navbar />
      <Hero />

      <main className="max-w-6xl mx-auto p-6 mt-32">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Featured fundraisers
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map(campaign => (
            <CampaignCard
              key={campaign.id}
              {...campaign}
              // When clicked, we tell the app to set this specific campaign as the active one
              onDonate={() => setSelectedCampaign(campaign)}
            />
          ))}
        </div>
      </main>

      {/* The Modal. It will only render if selectedCampaign is NOT null */}
      <DonationModal 
        campaign={selectedCampaign} 
        onClose={() => setSelectedCampaign(null)} 
      />
    </div>
  )
}

export default App;