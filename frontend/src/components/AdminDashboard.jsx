import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [donations, setDonations] = useState([]);
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [loadingDonations, setLoadingDonations] = useState(true);
  const [loadingCampaigns, setLoadingCampaigns] = useState(true);
  const [activeTab, setActiveTab] = useState("donations");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://127.0.0.1:5555/api/admin/donations", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setDonations(data);
        setLoadingDonations(false);
      });

    fetchPending();
  }, []);

  const fetchPending = () => {
    fetch("http://127.0.0.1:5555/api/admin/campaigns/pending", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setPendingCampaigns(data);
        setLoadingCampaigns(false);
      });
  };

  const handleReview = async (id, action) => {
    await fetch(`http://127.0.0.1:5555/api/admin/campaigns/${id}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ action }),
    });
    fetchPending();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-400">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Manage campaigns and view transaction history.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-100">
        <button
          onClick={() => setActiveTab("donations")}
          className={`pb-3 px-4 text-sm font-bold transition border-b-2 ${
            activeTab === "donations"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Transaction Ledger
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`pb-3 px-4 text-sm font-bold transition border-b-2 flex items-center gap-2 ${
            activeTab === "pending"
              ? "border-emerald-600 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Pending Campaigns
          {pendingCampaigns.length > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {pendingCampaigns.length}
            </span>
          )}
        </button>
      </div>

      {/* Donations Tab */}
      {activeTab === "donations" && (
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          {loadingDonations ? (
            <div className="p-12 text-center text-gray-500 animate-pulse font-medium">
              Loading ledger data...
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold">
                    <th className="p-5">Date</th>
                    <th className="p-5">Charity</th>
                    <th className="p-5">Donor Phone</th>
                    <th className="p-5">Amount</th>
                    <th className="p-5">Receipt No.</th>
                    <th className="p-5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {donations.map((tx) => (
                    <tr
                      key={tx.id}
                      className="hover:bg-gray-50/10 transition-colors"
                    >
                      <td className="p-5 text-gray-500 font-medium">
                        {tx.date}
                      </td>
                      <td className="p-5 font-bold text-gray-900 dark:text-gray-400">
                        {tx.charity}
                      </td>
                      <td className="p-5 font-mono text-gray-600 dark:text-gray-400">
                        {tx.phone}
                      </td>
                      <td className="p-5 font-bold text-emerald-600">
                        KES {tx.amount.toLocaleString()}
                      </td>
                      <td className="p-5 font-mono text-gray-500 dark:text-gray-400">
                        {tx.receipt}
                      </td>
                      <td className="p-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5
                          ${
                            tx.status === "Completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : tx.status === "Failed"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {tx.status === "Completed" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          )}
                          {tx.status === "Failed" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                          )}
                          {tx.status === "Pending" && (
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                          )}
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {donations.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="p-10 text-center text-gray-500"
                      >
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Pending Campaigns Tab */}
      {activeTab === "pending" && (
        <div>
          {loadingCampaigns ? (
            <div className="text-center text-gray-500 py-20 animate-pulse font-medium">
              Loading pending campaigns...
            </div>
          ) : pendingCampaigns.length === 0 ? (
            <div className="text-center text-gray-500 py-20 font-medium">
              No pending campaigns. You're all caught up!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4"
                >
                  <div
                    className="w-full h-2 rounded-full"
                    style={{ backgroundColor: campaign.imageColor }}
                  ></div>
                  <div>
                    <h3 className="font-extrabold text-gray-900 text-lg">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      {campaign.charity}
                    </p>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>
                      Goal:{" "}
                      <span className="font-bold text-gray-900">
                        KES {campaign.goal.toLocaleString()}
                      </span>
                    </span>
                    <span>{campaign.daysLeft} days</span>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => handleReview(campaign.id, "approved")}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-sm transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReview(campaign.id, "rejected")}
                      className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 rounded-xl text-sm transition"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
