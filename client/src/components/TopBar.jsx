import { Pause, Play, ArrowRight, Battery, Signal } from 'lucide-react';
import { useState } from 'react';

const TopBar = ({ viewMode, operationMode, setOperationMode }) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <>
      {/* Main Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 px-2 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-1 sm:gap-3 flex-wrap">
        {/* Left Section - Status & Quick Goal */}
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          {/* Status Pill */}
          <div className="bg-white rounded-full shadow-md flex items-center pl-2 sm:pl-3 pr-1 py-0.5 sm:py-1 gap-1 sm:gap-2">
            <div className="flex items-center gap-1">
              <span className="text-[8px] sm:text-[10px] md:text-xs text-gray-500 font-medium uppercase tracking-wide">
                Status
              </span>
              <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-800 whitespace-nowrap">
                On Mission 1234
              </span>
            </div>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-1 sm:p-1.5 md:p-2 transition-all"
            >
              {isPaused ? <Play size={10} fill="white" /> : <Pause size={10} fill="white" />}
            </button>
          </div>

          {/* Quick Goal Button */}
          <button className="bg-white rounded-full shadow-md flex items-center pl-2 sm:pl-3 pr-1 py-0.5 sm:py-1 gap-1 sm:gap-2 hover:shadow-lg transition-all">
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-800 uppercase tracking-wide whitespace-nowrap">
              Quick Goal
            </span>
            <span className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-1 sm:p-1.5 md:p-2 transition-all">
              <ArrowRight size={10} />
            </span>
          </button>
        </div>

        {/* Center Section - System Status (hidden on mobile, shown on tablet+) */}
        <div className="hidden md:flex bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg px-3 md:px-5 py-2 items-center gap-3 md:gap-5 text-white text-[10px] md:text-xs">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold">100%</span>
            <Battery size={14} className="text-green-400" />
          </div>
          <div className="flex items-center gap-1.5">
            <Signal size={14} className="text-green-400" />
            <span>Strong</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Failsafe</span>
            <span className="text-green-400 font-semibold">Okay</span>
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>System</span>
            <span className="text-green-400 font-semibold">Okay</span>
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
          </div>
        </div>

        {/* Right Section - Mode & Initiate */}
        <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
          {/* Mode Toggle */}
          <div className="bg-gray-800 rounded-full shadow-md flex items-center pl-2 sm:pl-3 pr-0.5 sm:pr-1 py-0.5 sm:py-1 gap-1 sm:gap-2 text-white">
            <span className="text-[8px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-wide">
              Mode
            </span>
            <div className="flex bg-gray-900 rounded-full p-0.5">
              <button
                onClick={() => setOperationMode('auto')}
                className={`px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] md:text-xs font-bold transition-all ${
                  operationMode === 'auto'
                    ? 'bg-white text-gray-900'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                AUTO
              </button>
              <button
                onClick={() => setOperationMode('manual')}
                className={`px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] md:text-xs font-bold transition-all ${
                  operationMode === 'manual'
                    ? 'bg-white text-gray-900'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                MANUAL
              </button>
            </div>
          </div>

          {/* Initiate Button */}
          <button className="bg-white rounded-full shadow-md flex items-center pl-2 sm:pl-3 pr-1 py-0.5 sm:py-1 gap-1 sm:gap-2 hover:shadow-lg transition-all">
            <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-800 uppercase tracking-wide">
              Initiate
            </span>
            <span className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-1 sm:p-1.5 md:p-2 transition-all">
              <ArrowRight size={10} />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile-only compact status bar (visible only on mobile) */}
      <div className="md:hidden absolute top-14 left-1/2 -translate-x-1/2 z-20 bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg px-3 py-1 flex items-center gap-3 text-white text-[10px]">
        <div className="flex items-center gap-1">
          <span className="font-semibold">100%</span>
          <Battery size={11} className="text-green-400" />
        </div>
        <div className="flex items-center gap-1">
          <Signal size={11} className="text-green-400" />
          <span>Strong</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-green-400 font-semibold">All OK</span>
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
        </div>
      </div>

      {/* View Mode Label (positioned below TopBar) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-24 md:top-20 z-20">
        <div className="bg-white rounded-full px-3 sm:px-4 py-1 sm:py-1.5 shadow-md">
          <span className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-800">
            {viewMode === 'map' ? 'Map View' : 'Camera View'}
          </span>
        </div>
      </div>
    </>
  );
};

export default TopBar;
