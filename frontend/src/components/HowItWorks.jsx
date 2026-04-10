export default function HowItWorks({ setView }) {
  const steps = [
    {
      number: "01",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      ),
      title: "Choose a Campaign",
      description:
        "Browse verified Sadaqah and Zakat campaigns supporting communities across Kenya. Every campaign is reviewed and approved by our team before going live.",
    },
    {
      number: "02",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Donate via M-Pesa",
      description:
        'Click "Donate Now", enter your amount and M-Pesa number. You\'ll receive an STK push on your phone — simply enter your PIN to complete your Sadaqah/Zakat in seconds.',
    },
    {
      number: "03",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      title: "Track Your Impact",
      description:
        "Receive an M-Pesa receipt instantly. Watch the campaign progress bar grow as your contribution joins others to change lives.",
    },
  ];

  const trustPoints = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Verified Campaigns Only",
      description:
        "Every campaign is manually reviewed before appearing on the platform.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "100% Reaches Those in Need",
      description:
        "We don't take a platform fee. Every shilling goes directly to the cause.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Real-time M-Pesa Integration",
      description:
        "Powered by Safaricom's Daraja API for secure, instant payments.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "Full Transparency",
      description:
        "Donor walls on every campaign show the community coming together.",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
          Giving made <span className="text-emerald-600">simple.</span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          GoFundKhayr makes it easy to fulfil your Sadaqah and Zakat obligations
          and support verified causes across Kenya — all from your phone.
        </p>
      </div>

      {/* Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 flex flex-col gap-4 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
                {step.icon}
              </div>
              <span className="text-5xl font-extrabold text-gray-100 dark:text-gray-800">
                {step.number}
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">
              {step.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              {step.description}
            </p>
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-emerald-300 text-2xl">
                ›
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Trust Section */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl p-10 mb-12">
        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2 text-center">
          Why trust GoFundKhayr?
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-10">
          Built with transparency and accountability at its core.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trustPoints.map((point, index) => (
            <div
              key={index}
              className="flex gap-4 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 flex items-center justify-center shrink-0">
                {point.icon}
              </div>
              <div>
                <h4 className="font-extrabold text-gray-900 dark:text-white mb-1">
                  {point.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
          Ready to make a difference?
        </p>
        <button
          onClick={() => setView("home")}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 py-4 rounded-xl transition-colors shadow-lg"
        >
          Browse Campaigns
        </button>
      </div>
    </main>
  );
}
