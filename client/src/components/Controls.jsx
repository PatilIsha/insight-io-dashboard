import { useState, useEffect } from 'react';
import { AlertOctagon } from 'lucide-react';

const Controls = ({ emergency, setEmergency }) => {
  const [activeKey, setActiveKey] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (['w', 'a', 's', 'd'].includes(key)) {
        setActiveKey(key);
      }
    };
    const handleKeyUp = () => setActiveKey(null);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleDirection = (dir) => {
    setActiveKey(dir);
    setTimeout(() => setActiveKey(null), 200);
  };

  return (
    <div className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 flex flex-col items-center gap-3 sm:gap-4 z-10">
      {/* STOPPED Alert (when emergency) */}
      {emergency && (
        <div className="bg-red-600 text-white px-3 py-1 rounded-lg text-[10px] sm:text-xs font-bold shadow-xl animate-pulse">
          STOPPED!
        </div>
      )}

      {/* Emergency Stop Button */}
      <button
        onClick={() => setEmergency(!emergency)}
        className={`relative group transition-all ${
          emergency ? 'scale-110' : 'hover:scale-105'
        }`}
        title="Emergency Stop"
      >
        <div className="absolute inset-0 rounded-full bg-yellow-400 transform scale-110 shadow-xl"></div>
        <div className={`relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-2xl border-4 border-yellow-400 transition-colors ${
          emergency ? 'bg-red-700' : 'bg-red-600 group-hover:bg-red-500'
        }`}>
          <div className="text-center">
            <AlertOctagon className="text-white mx-auto mb-0.5" size={16} />
            <div className="text-white text-[6px] sm:text-[7px] md:text-[9px] font-black tracking-wider leading-none">
              EMERGENCY
            </div>
            <div className="text-white text-[6px] sm:text-[7px] md:text-[9px] font-black tracking-wider leading-none mt-0.5">
              STOP
            </div>
          </div>
        </div>
      </button>

      {/* Joystick / WASD Controls */}
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full shadow-2xl flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center flex-col text-white">
          <div className="text-[7px] sm:text-[8px] md:text-[10px] font-bold leading-none">W</div>
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 my-0.5 md:my-1">
            <div className="text-[7px] sm:text-[8px] md:text-[10px] font-bold">A</div>
            <div className="text-[6px] sm:text-[7px] md:text-[9px] text-gray-400 px-1 text-center">
              <span className="block text-[5px] sm:text-[6px]">⌨</span>
              <span className="text-[5px] sm:text-[6px]">key</span>
            </div>
            <div className="text-[7px] sm:text-[8px] md:text-[10px] font-bold">D</div>
          </div>
          <div className="text-[7px] sm:text-[8px] md:text-[10px] font-bold leading-none">S</div>
        </div>

        <button
          onClick={() => handleDirection('w')}
          className={`absolute top-0.5 left-1/2 -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all ${
            activeKey === 'w' ? 'bg-blue-500 text-white scale-110' : 'hover:bg-white/10 text-gray-400'
          }`}
        >
          <span className="text-[10px] sm:text-xs">▲</span>
        </button>
        <button
          onClick={() => handleDirection('s')}
          className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all ${
            activeKey === 's' ? 'bg-blue-500 text-white scale-110' : 'hover:bg-white/10 text-gray-400'
          }`}
        >
          <span className="text-[10px] sm:text-xs">▼</span>
        </button>
        <button
          onClick={() => handleDirection('a')}
          className={`absolute left-0.5 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all ${
            activeKey === 'a' ? 'bg-blue-500 text-white scale-110' : 'hover:bg-white/10 text-gray-400'
          }`}
        >
          <span className="text-[10px] sm:text-xs">◄</span>
        </button>
        <button
          onClick={() => handleDirection('d')}
          className={`absolute right-0.5 top-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all ${
            activeKey === 'd' ? 'bg-blue-500 text-white scale-110' : 'hover:bg-white/10 text-gray-400'
          }`}
        >
          <span className="text-[10px] sm:text-xs">►</span>
        </button>
      </div>
    </div>
  );
};

export default Controls;
