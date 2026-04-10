import { useState, useEffect } from "react";

export default function DonationModal({ campaign, onClose, user }) {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, polling, success, failed
  const [ticketId, setTicketId] = useState(null);
  const [receipt, setReceipt] = useState("");

  if (!campaign) return null;

  // This is the Radar: It pings Flask every 3 seconds while "polling"
  useEffect(() => {
    let intervalId;
    let attempts = 0;
    const MAX_ATTEMPTS = 20; // Poll for ~2 minutes

    if (status === "polling" && ticketId) {
      intervalId = setInterval(async () => {
        attempts++;
        try {
          const res = await fetch(
            `http://127.0.0.1:5555/api/donate/status/${ticketId}`,
          );
          const data = await res.json();

          if (data.status === "Completed") {
            setReceipt(data.receipt);
            setStatus("success");
            clearInterval(intervalId);
          } else if (data.status === "Failed" && attempts >= MAX_ATTEMPTS) {
            setStatus("failed");
            clearInterval(intervalId);
          }
          // If Failed but attempts < MAX_ATTEMPTS, keep polling
        } catch (error) {
          console.error("Polling error", error);
        }
      }, 10000); // Check every 5 seconds
    }

    return () => clearInterval(intervalId);
  }, [status, ticketId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("http://127.0.0.1:5555/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          phone,
          campaignId: campaign.id,
          donorName: user || null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTicketId(data.ticket); // Save the coat check ticket!
        setStatus("polling"); // Start the radar!
      } else {
        setStatus("failed");
      }
    } catch (error) {
      setStatus("failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900/70 rounded-3xl shadow-2xl max-w-md w-full p-6 relative overflow-hidden animate-fade-in-up">
        {/* Close Button */}
        {status !== "polling" && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 bg-gray-50 rounded-full p-2 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Dynamic UI based on status */}
        {status === "success" ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
              ✨
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
              Jazakallah Khair!
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              Your Zakat has been received successfully.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100 text-left">
              <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">
                M-Pesa Receipt
              </p>
              <p className="font-mono font-medium text-gray-900">{receipt}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow-lg shadow-emerald-200"
            >
              Return to Campaigns
            </button>
          </div>
        ) : status === "polling" ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 border-4 border-gray-100 border-t-emerald-600 rounded-full animate-spin mx-auto mb-6"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Check your phone
            </h3>
            <p className="text-gray-500 text-sm">
              Waiting for you to enter your M-Pesa PIN...
            </p>
          </div>
        ) : status === "failed" ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
              ❌
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Payment Failed
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              The M-Pesa request timed out or was cancelled.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl transition"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-gray-400 mb-1">
                Fund Khayr
              </h2>
              <p className="text-sm text-emerald-600 font-bold uppercase tracking-wide">
                {campaign.charity}
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  Amount (KES)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    KES
                  </span>
                  <input
                    type="number"
                    required
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-14 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white font-medium transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                  M-Pesa Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="07XX XXX XXX"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-1 dark:focus:ring-emarald-500 focus:bg-white font-medium transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-emerald-200 mt-2 cursor-pointer"
              >
                {status === "loading" ? "Connecting..." : "Pay via M-Pesa"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
