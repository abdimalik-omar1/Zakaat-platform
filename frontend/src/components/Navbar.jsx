export default function Navbar({ setView }) {
  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section (Clicking this returns to 'home') */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setView("home")}
          >
            <div className="w-10 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">gfk</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">
              gofundkhayr<span className="text-emerald-600"></span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setView("home")}
              className="text-gray-600 hover:text-emerald-600 font-medium transition cursor-pointer"
            >
              Campaigns
            </button>
            <a
              href="#"
              className="text-gray-600 hover:text-emerald-600 font-medium transition cursor-pointer"
            >
              How it Works
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-emerald-600 font-medium transition cursor-pointer"
            >
              About Us
            </a>
          </div>

          {/* Right Side / Call to Action */}
          <div className="flex items-center gap-4">
            {/* Navigates to the Admin Dashboard */}
            <button
              onClick={() => setView("admin")}
              className="hidden md:block text-sm font-semibold text-gray-600 hover:text-gray-900 transition cursor-pointer"
            >
              Admin Login
            </button>

            {/* Navigates back to the Home Grid */}
            <button
              onClick={() => setView("home")}
              className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              Fund Khayr
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
