import { useState, useEffect } from "react";

export default function DonorWallModal({ campaign, onClose }) {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/api/campaigns/${campaign.id}/donors`)
      .then((res) => res.json())
      .then((data) => {
        setDonors(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [campaign.id]);

  const totalDonors = donors.length;
  const totalRaised = donors.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl w-full max-w-md p-8 border border-transparent dark:border-gray-800">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Donor Wall
            </h2>
            <p className="text-sm text-emerald-600 font-bold uppercase tracking-wide mt-1">
              {campaign.charity}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 text-center">
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
              {totalDonors}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
              Total Donors
            </p>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl p-4 text-center">
            <p className="text-2xl font-extrabold text-emerald-600">
              KES {totalRaised.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
              Total Raised
            </p>
          </div>
        </div>

        {/* Donor List */}
        <div className="overflow-y-auto max-h-72 flex flex-col gap-3 pr-1">
          {loading ? (
            <div className="text-center text-gray-400 py-10 animate-pulse">
              Loading donors...
            </div>
          ) : donors.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-4xl mb-3">🌱</p>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Be the first to donate!
              </p>
            </div>
          ) : (
            donors.map((donor, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-2xl px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 font-bold text-sm">
                    {donor.name === "Anonymous"
                      ? "?"
                      : donor.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white text-sm">
                      {donor.name}
                    </p>
                    <p className="text-xs text-gray-400">{donor.date}</p>
                  </div>
                </div>
                <span className="font-bold text-emerald-600 text-sm">
                  KES {donor.amount.toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
