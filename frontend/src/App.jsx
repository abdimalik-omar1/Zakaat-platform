import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CampaignCard from "./components/CampaignCard";
import CreateCampaignModal from "./components/CreateCampaignModal";
import DonationModal from "./components/DonationModal";
import AdminDashboard from "./components/AdminDashboard";
import AuthModal from "./components/AuthModal";
import Toast from "./components/Toast";

export default function App() {
  // --- State Management ---
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("userName") || null);
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("isAdmin") === "true",
  );
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const [startIndex, setStartIndex] = useState(0);
  const CAMPAIGNS_PER_PAGE = 3;

  // This state controls which page is currently visible
  const [currentView, setCurrentView] = useState("home");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true",
  );

  if (localStorage.getItem("darkMode") === "true") {
    document.documentElement.classList.add("dark");
  }

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans">
      {/* 1. The Top Navigation (We pass setCurrentView so the buttons work) */}
      <Navbar
        setView={setCurrentView}
        user={user}
        isAdmin={isAdmin}
        onLoginClick={() => setIsAuthModalOpen(true)}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onLogout={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userName");
          localStorage.removeItem("isAdmin");
          setUser(null);
          setIsAdmin(false);
        }}
      />

      {/* 2. Conditional Rendering: Show Admin OR Home based on state */}
      {currentView === "admin" ? (
        <AdminDashboard />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* The Hero Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
              Purify your wealth with{" "}
              <span className="text-emerald-600">purpose.</span>
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Directly support verified campaigns across Kenya via M-Pesa. 100%
              of your Zakat reaches those in need.
            </p>
            <button
              onClick={() =>
                user ? setIsCreateModalOpen(true) : setIsAuthModalOpen(true)
              }
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
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {campaigns
                  .slice(startIndex, startIndex + CAMPAIGNS_PER_PAGE)
                  .map((campaign) => (
                    <div key={campaign.id} className="flex">
                      <CampaignCard
                        campaign={campaign}
                        onDonateClick={handleDonateClick}
                      />
                    </div>
                  ))}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-center gap-6 mt-12">
                <button
                  onClick={() => setStartIndex((i) => i - 1)}
                  disabled={startIndex === 0}
                  className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-emerald-500 hover:text-emerald-600 hover:shadow-md disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-400 disabled:hover:shadow-none transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <p className="text-sm text-gray-400 font-medium">
                  {Math.min(startIndex + 1, campaigns.length)}–
                  {Math.min(startIndex + CAMPAIGNS_PER_PAGE, campaigns.length)}
                  <span className="mx-1 text-gray-300">/</span>
                  {campaigns.length}
                </p>

                <button
                  onClick={() => setStartIndex((i) => i + 1)}
                  disabled={startIndex + CAMPAIGNS_PER_PAGE >= campaigns.length}
                  className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-emerald-500 hover:text-emerald-600 hover:shadow-md disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:border-gray-200 disabled:hover:text-gray-400 disabled:hover:shadow-none transition-all duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </>
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
          showToast={setToast}
        />
      )}

      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={(name, adminStatus) => {
            setUser(name);
            setIsAdmin(adminStatus);
          }}
        />
      )}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
