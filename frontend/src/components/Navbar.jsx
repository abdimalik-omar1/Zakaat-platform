export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-teal-700 text-white shadow-md">
      {/* Left side: Logo */}
      <div className="flex items-center gap-2 cursor-pointer">
        <span className="text-xl">🤍</span> 
        <span className="font-bold text-lg tracking-wide">ZakatPlatform</span>
      </div>

      {/* Middle: Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <input 
          type="text" 
          placeholder="Discover inspiring causes" 
          className="w-full px-4 py-2 rounded-full text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>

      {/* Right side: Links and Menu */}
      <div className="flex items-center gap-4 text-sm font-medium">
        <button className="hidden sm:block hover:text-teal-200 transition">Pay Zakat</button>
        <button className="hidden sm:block hover:text-teal-200 transition">Calculate Zakat</button>
        
        <button className="p-2 hover:bg-teal-600 rounded-full transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}