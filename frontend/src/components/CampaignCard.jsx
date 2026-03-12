// 1. Add onDonate to the props up here
export default function CampaignCard({ title, charity, raised, goal, daysLeft, imageColor, onDonate }) {
  const progress = Math.min((raised / goal) * 100, 100);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition flex flex-col">
      <div className={`h-48 w-full ${imageColor} flex items-center justify-center text-white/50 font-medium`}>
        [ Campaign Image ]
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px]">🏢</span>
          <p className="text-xs text-gray-500 font-medium">{charity}</p>
        </div>
        <h3 className="font-bold text-gray-900 mb-4 line-clamp-2 h-12 leading-snug">{title}</h3>

        <div className="flex justify-between text-xs text-gray-500 mb-2 mt-auto">
          <span className="font-medium text-teal-700">KES {raised.toLocaleString()} raised</span>
          <span>{daysLeft} days left</span>
        </div>

        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-5">
          <div className="bg-green-500 h-1.5 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
        </div>

        {/* 2. Update this button to trigger the onDonate function */}
        <button 
          onClick={onDonate} 
          className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-lg transition"
        >
          Donate
        </button>
      </div>
    </div>
  );
}