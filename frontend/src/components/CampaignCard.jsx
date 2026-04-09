export default function CampaignCard({ campaign, onDonateClick }) {
  // Calculate the percentage for the progress bar (cap it at 100%)
  const progressPercent = Math.min(
    (campaign.raised / campaign.goal) * 100,
    100,
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full w-full transform hover:-translate-y-1">
      {/* Image Section (Using a solid color fallback if no image exists) */}
      <div
        className="h-48 w-full relative overflow-hidden"
        style={{ backgroundColor: campaign.imageColor + "33" }}
      >
        {/* We use a placeholder pattern here, but this is where charity photos will go */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-gray-900 via-transparent to-transparent">
          <img src="placeholder-img.jpeg" alt="" />
        </div>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm">
          {campaign.daysLeft} Days Left
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow min-h-[220px]">
        <div className="text-xs font-bold text-emerald-600 mb-2 uppercase tracking-wide truncate">
          {campaign.charity}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-4 line-clamp-2">
          {campaign.title}
        </h3>

        {/* Progress Bar */}
        <div className="mt-auto">
          <div className="flex justify-between text-sm font-semibold mb-2">
            <span className="text-gray-900 dark:text-gray-400">
              KES {campaign.raised.toLocaleString()}
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              of KES {campaign.goal.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3 mb-6 overflow-hidden">
            <div
              className="bg-emerald-500 h-3 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          {/* Action Button */}
          <button
            onClick={() => onDonateClick(campaign)}
            className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md flex justify-center items-center gap-2 cursor-pointer"
          >
            <span>Donate Now</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
