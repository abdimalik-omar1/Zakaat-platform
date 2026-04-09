export default function Navbar({
  setView,
  user,
  isAdmin,
  onLoginClick,
  onLogout,
  darkMode,
  toggleDarkMode,
}) {
  return (
    <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-40 border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setView("home")}
          >
            <div className="w-10 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="font-bold text-xl tracking-tight text-white">
                gfk
              </span>
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
              gofundkhayr<span className="text-emerald-600"></span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setView("home")}
              className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 font-medium transition cursor-pointer"
            >
              Campaigns
            </button>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 font-medium transition cursor-pointer"
            >
              How it Works
            </a>
            <a
              href="#"
              className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 font-medium transition cursor-pointer"
            >
              About Us
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isAdmin && (
              <button
                onClick={() => setView("admin")}
                className="hidden md:block text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition cursor-pointer"
              >
                Admin
              </button>
            )}

            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-emerald-500 hover:text-emerald-600 transition-all duration-200"
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                  />
                </svg>
              )}
            </button>

            {user ? (
              <>
                <span className="hidden md:block text-sm text-gray-500 font-medium">
                  Hi, {user}
                </span>
                <button
                  onClick={onLogout}
                  className="text-sm font-semibold text-red-500 hover:text-red-700 transition cursor-pointer"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onLoginClick}
                  className="hidden md:block text-sm font-semibold text-gray-600 hover:text-gray-900 transition cursor-pointer"
                >
                  Log in
                </button>
                <button
                  onClick={() => setView("home")}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Fund Khayr
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
