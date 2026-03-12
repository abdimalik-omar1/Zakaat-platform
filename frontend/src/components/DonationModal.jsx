export default function DonationModal({ campaign, onClose }) {
  // If no campaign is selected, don't show the modal at all
  if (!campaign) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in-up">
        
        {/* Close Button (the X in the corner) */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Header */}
        <h2 className="text-xl font-bold text-gray-900 mb-1">Donate to {campaign.charity}</h2>
        <p className="text-sm text-gray-500 mb-6 truncate">{campaign.title}</p>

        {/* The Payment Form */}
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Amount (KES)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">KES</span>
              <input 
                type="number" 
                placeholder="0.00" 
                className="w-full border border-gray-300 rounded-xl pl-14 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">M-Pesa Phone Number</label>
            <input 
              type="tel" 
              placeholder="07XX XXX XXX" 
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium" 
            />
            <p className="text-xs text-gray-400 mt-2">A prompt will be sent to your phone to enter your PIN.</p>
          </div>

          <button 
            type="button" 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-3 rounded-xl transition mt-4 flex items-center justify-center gap-2 shadow-lg shadow-green-200"
          >
            <span>📱</span> Pay via M-Pesa Express
          </button>
        </form>

      </div>
    </div>
  );
}