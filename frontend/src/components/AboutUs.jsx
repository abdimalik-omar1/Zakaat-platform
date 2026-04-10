export default function AboutUs({ setView }) {
  const values = [
    {
      arabic: "أمانة",
      title: "Amanah (Trust)",
      description:
        "Every campaign is manually verified before going live. Your Sadaqah and Zakat is in safe hands.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
    },
    {
      arabic: "شفافية",
      title: "Transparency",
      description:
        "Donor walls, progress bars and M-Pesa receipts mean you always know where your money went.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
    },
    {
      arabic: "مجتمع",
      title: "Community",
      description:
        "We are built by the community, for the community. Every feature exists to serve donors and charities alike.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      arabic: "سهولة",
      title: "Accessibility",
      description:
        "No bank account needed. No complicated process. Just M-Pesa and a cause worth supporting.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
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
    },
  ];

  const stats = [
    { value: "100%", label: "Goes to the cause" },
    { value: "0", label: "Platform fees" },
    { value: "KES", label: "M-Pesa powered" },
    { value: "✓", label: "Verified campaigns only" },
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16 animate-fade-in-up">
        <p className="text-emerald-600 font-bold uppercase tracking-widest text-sm mb-4">
          About GoFundKhayr
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
          We believe every Muslim deserves a{" "}
          <span className="text-emerald-600">simple, trusted</span> way to give.
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
          GoFundKhayr was born out of a simple observation — giving Sadaqah and
          Zakat in Kenya was unnecessarily complicated. We built GoFundKhayr to
          change that.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-6 text-center"
          >
            <p className="text-3xl font-extrabold text-emerald-600 mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Our Mission */}
      <div className="bg-emerald-600 rounded-3xl p-10 mb-12 text-center">
        <p className="text-emerald-100 uppercase tracking-widest text-xs font-bold mb-4">
          Our Mission
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-relaxed max-w-3xl mx-auto">
          To make Sadaqah and Zakat accessible, transparent and impactful for
          every Muslim in Kenya — one verified campaign at a time.
        </h2>
      </div>

      {/* Our Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 items-center">
        <div>
          <p className="text-emerald-600 font-bold uppercase tracking-widest text-sm mb-4">
            Our Story
          </p>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            Built by the community, for the community.
          </h2>
          <div className="flex flex-col gap-4 text-gray-500 dark:text-gray-400 leading-relaxed">
            <p>
              GoFundKhayr started as a passion project by a group of young
              Muslim developers who wanted to solve a real problem in their
              community.
            </p>
            <p>
              We saw charities struggling to collect donations and donors
              struggling to find causes they could trust. So we built the bridge
              — a platform that connects verified campaigns directly to donors,
              powered by M-Pesa, the payment method every Kenyan already knows
              and trusts.
            </p>
            <p>
              Today, every shilling donated through GoFundKhayr goes directly to
              the cause. No middlemen. No hidden fees. Just impact.
            </p>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-10 flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 flex items-center justify-center shrink-0 text-lg font-bold">
              1
            </div>
            <div>
              <h4 className="font-extrabold text-gray-900 dark:text-white mb-1">
                The Problem
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Giving Sadaqah and Zakat in Kenya was complicated, untraceable
                and full of uncertainty.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 flex items-center justify-center shrink-0 text-lg font-bold">
              2
            </div>
            <div>
              <h4 className="font-extrabold text-gray-900 dark:text-white mb-1">
                The Idea
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                A platform that verifies campaigns and connects them to donors
                via M-Pesa instantly.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 flex items-center justify-center shrink-0 text-lg font-bold">
              3
            </div>
            <div>
              <h4 className="font-extrabold text-gray-900 dark:text-white mb-1">
                The Result
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                GoFundKhayr — simple, trusted, transparent Sadaqah/Zakat giving
                for every Kenyan Muslim.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <p className="text-emerald-600 font-bold uppercase tracking-widest text-sm mb-2">
            Our Values
          </p>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            What we stand for
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 flex gap-5 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center shrink-0">
                {value.icon}
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-500 mb-1 tracking-wider">
                  {value.arabic}
                </p>
                <h4 className="font-extrabold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Zero Fees Note */}
      <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-10 mb-12 text-center">
        <p className="text-4xl mb-4">🤝</p>
        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3">
          A note on fees
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
          We currently charge{" "}
          <span className="font-bold text-emerald-600">zero platform fees</span>
          . 100% of every donation goes directly to the campaign. We believe
          this is the right way to build trust in our early days.
        </p>
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
