import { Map, Camera } from 'lucide-react';

const MiniPreview = ({ type, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 w-24 h-18 sm:w-32 sm:h-24 md:w-44 md:h-32 bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-white hover:scale-105 transition-transform z-10 group"
      style={{ aspectRatio: '4/3' }}
      title={`Switch to ${type === 'map' ? 'Map' : 'Camera'} View`}
    >
      {type === 'map' ? (
        <div className="relative w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 100 60" className="w-full h-full p-1">
            <rect x="10" y="8" width="80" height="44" fill="none" stroke="#1a1a1a" strokeWidth="0.6" />
            <rect x="14" y="12" width="14" height="12" fill="#fecaca" opacity="0.7" />
            <rect x="30" y="12" width="16" height="14" fill="#fecaca" opacity="0.7" />
            <rect x="50" y="12" width="20" height="14" fill="#fecaca" opacity="0.7" />
            <rect x="14" y="30" width="18" height="14" fill="#fecaca" opacity="0.7" />
            <rect x="36" y="30" width="14" height="14" fill="#fecaca" opacity="0.7" />
            <rect x="54" y="30" width="20" height="14" fill="#fecaca" opacity="0.7" />
            <circle cx="40" cy="35" r="2" fill="#1e40af" />
          </svg>
          <div className="absolute top-1 left-1 bg-black/60 rounded px-1 py-0.5">
            <Map size={8} className="text-white" />
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full bg-gradient-to-br from-yellow-100 via-gray-300 to-gray-500 overflow-hidden">
          <div className="absolute inset-0 flex items-end justify-center pb-2">
            <div className="w-16 h-1 bg-yellow-400 rounded"></div>
          </div>
          <div className="absolute top-1 left-1 bg-black/60 rounded px-1 py-0.5 flex items-center gap-1">
            <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></span>
            <Camera size={8} className="text-white" />
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[8px] sm:text-[10px] py-0.5 text-center font-semibold">
        {type === 'map' ? 'MAP' : 'CAMERA'}
      </div>
    </button>
  );
};

export default MiniPreview;
