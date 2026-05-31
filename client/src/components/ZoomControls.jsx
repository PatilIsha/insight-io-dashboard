import { Plus, Minus } from 'lucide-react';

const ZoomControls = ({ zoom, setZoom }) => {
  return (
    <div className="absolute left-3 sm:left-6 md:left-8 bottom-28 sm:bottom-36 md:bottom-44 flex flex-col items-center gap-2 z-10">
      <button
        onClick={() => setZoom(Math.min(100, zoom + 10))}
        className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
        title="Zoom In"
      >
        <Plus size={14} className="text-gray-800" />
      </button>

      <div className="relative w-1 h-16 sm:h-24 md:h-32 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all"
          style={{ height: `${zoom}%` }}
        ></div>
        <div
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-md transition-all"
          style={{ bottom: `calc(${zoom}% - 6px)` }}
        ></div>
      </div>

      <button
        onClick={() => setZoom(Math.max(0, zoom - 10))}
        className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-white rounded-lg shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
        title="Zoom Out"
      >
        <Minus size={14} className="text-gray-800" />
      </button>
    </div>
  );
};

export default ZoomControls;
