import { useState } from 'react';

export default function DonationModal({ campaign, onClose }) {
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  if (!campaign) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('http://127.0.0.1:5555/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount,
          phone: phone,
          campaignId: campaign.id
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        console.error(data.message);
      }
    } catch (error) {
      setStatus('error');
      console.error("Failed to connect to backend");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in-up">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-1">Donate to {campaign.charity}</h2>
        <p className="text-sm text-gray-500 mb-6 truncate">{campaign.title}</p>

        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📱</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Check your phone!</h3>
            <p className="text-gray-500 text-sm">We've sent an M-Pesa prompt to your number. Enter your PIN to complete the Zakat payment.</p>
            <button onClick={onClose} className="mt-6 w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition">Close</button>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Amount (KES)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">KES</span>
                <input 
                  type="number" 
                  required
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00" 
                  className="w-full border border-gray-300 rounded-xl pl-14 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">M-Pesa Phone Number</label>
              <input 
                type="tel" 
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="07XX XXX XXX" 
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium" 
              />
            </div>

            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold text-lg py-3 rounded-xl transition mt-4 flex items-center justify-center gap-2 shadow-lg shadow-green-200"
            >
              {status === 'loading' ? 'Sending Prompt...' : '📱 Pay via M-Pesa Express'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}