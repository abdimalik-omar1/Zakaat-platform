import { useState } from "react";

export default function CreateCampaignModal({ onClose, onCampaignCreated }) {
  const [form, setForm] = useState({
    title: "",
    charity: "",
    goal: "",
    daysLeft: "",
    imageColor: "#10b981",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.title || !form.charity || !form.goal || !form.daysLeft) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5555/api/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          goal: parseFloat(form.goal),
          daysLeft: parseInt(form.daysLeft),
        }),
      });
      if (res.ok) {
        onCampaignCreated();
        onClose();
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Could not reach the server.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900">
            Create a Campaign
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Campaign Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Clean water for Turkana"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Charity / Organisation
            </label>
            <input
              name="charity"
              value={form.charity}
              onChange={handleChange}
              placeholder="e.g. Water Relief Kenya"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Goal (KES)
              </label>
              <input
                name="goal"
                type="number"
                value={form.goal}
                onChange={handleChange}
                placeholder="500000"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Days Left
              </label>
              <input
                name="daysLeft"
                type="number"
                value={form.daysLeft}
                onChange={handleChange}
                placeholder="30"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Card Colour
            </label>
            <input
              name="imageColor"
              type="color"
              value={form.imageColor}
              onChange={handleChange}
              className="h-10 w-16 rounded-lg border border-gray-200 cursor-pointer"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-2 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50"
          >
            {loading ? "Launching..." : "Launch Campaign"}
          </button>
        </div>
      </div>
    </div>
  );
}
