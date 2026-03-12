export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-teal-800 to-teal-600 pb-32 pt-16">
      {/* Decorative placeholder for the cherry blossoms */}
      <div className="absolute top-0 right-0 p-4 text-6xl opacity-40">🌸🌿</div>
      
      <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
        <h1 className="text-white text-6xl font-serif italic mb-2">Zakat</h1>
        <p className="text-teal-100 text-lg mb-8 tracking-wider">on Our Platform</p>
        
        {/* The 3 Main Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button className="px-6 py-2 rounded-full border border-white text-white hover:bg-white hover:text-teal-700 transition font-medium flex items-center gap-2">
            <span>✨</span> Pay your Zakat
          </button>
          <button className="px-6 py-2 rounded-full border border-white text-white hover:bg-white hover:text-teal-700 transition font-medium flex items-center gap-2">
            <span>🧮</span> Calculate Zakat
          </button>
          <button className="px-6 py-2 rounded-full border border-white text-white hover:bg-white hover:text-teal-700 transition font-medium flex items-center gap-2">
            <span>👤</span> Create an account
          </button>
        </div>
      </div>

      {/* The Overlapping "Getting Started" Card */}
      <div className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4 z-20">
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 border border-gray-100">
          <p className="text-sm text-gray-500 mb-2 font-medium">Getting started</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Let's finish setting up your Zakat profile</h2>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 mt-1 rounded-full border-2 border-green-500 flex items-center justify-center shrink-0">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Log in or sign up</h3>
                <p className="text-sm text-gray-500">Easily access your saved preferences and history</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition">Login</button>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition">Sign up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}