import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CampaignCard from "./components/CampaignCard";
import CreateCampaignModal from "./components/CreateCampaignModal";
import DonationModal from "./components/DonationModal";
import AdminDashboard from "./components/AdminDashboard";

export default function App() {
  // --- State Management ---
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // This state controls which page is currently visible
  const [currentView, setCurrentView] = useState("home");

  // --- Data Fetching ---
  useEffect(() => {
    fetch("http://127.0.0.1:5555/api/campaigns")
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch campaigns:", err);
        setLoading(false);
      });
  }, []);

  // --- Handlers ---
  const handleDonateClick = (campaign) => {
    setSelectedCampaign(campaign);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* 1. The Top Navigation (We pass setCurrentView so the buttons work) */}
      <Navbar setView={setCurrentView} />

      {/* 2. Conditional Rendering: Show Admin OR Home based on state */}
      {currentView === "admin" ? (
        <AdminDashboard />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* The Hero Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Purify your wealth with{" "}
              <span className="text-emerald-600">purpose.</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Directly support verified campaigns across Kenya via M-Pesa. 100%
              of your Zakat reaches those in need.
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl transition-colors"
            >
              + Start a Campaign
            </button>
          </div>

          {/* The Campaigns Grid */}
          {loading ? (
            <div className="text-center text-gray-500 py-20 font-medium animate-pulse">
              Loading active campaigns...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  onDonateClick={handleDonateClick}
                />
              ))}
            </div>
          )}
        </main>
      )}

      {/* 3. The Pop-Up Donation Modal */}
      {isModalOpen && (
        <DonationModal
          campaign={selectedCampaign}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isCreateModalOpen && (
        <CreateCampaignModal
          onClose={() => setIsCreateModalOpen(false)}
          onCampaignCreated={() => {
            fetch("http://127.0.0.1:5555/api/campaigns")
              .then((res) => res.json())
              .then((data) => setCampaigns(data));
          }}
        />
      )}
    </div>
  );
}
