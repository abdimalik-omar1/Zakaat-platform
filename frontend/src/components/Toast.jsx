import { useEffect } from "react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
      <div className="bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4 max-w-sm">
        <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></div>
        <p className="text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white ml-auto text-lg leading-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
