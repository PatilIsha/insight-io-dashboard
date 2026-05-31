import { LayoutGrid, Map, MapPin, Square, Circle, Activity, User } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const [active, setActive] = useState('dashboard');

  const topItems = [
    { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard' },
    { id: 'map', icon: Map, label: 'Map' },
    { id: 'location', icon: MapPin, label: 'Location' },
    { id: 'zone', icon: Square, label: 'Zone' },
    { id: 'circle', icon: Circle, label: 'Region' },
    { id: 'activity', icon: Activity, label: 'Activity' },
  ];

  return (
    <aside className="w-12 sm:w-16 md:w-20 bg-eric-sidebar flex flex-col items-center py-2 sm:py-4 shadow-2xl z-30 flex-shrink-0">
      {/* ERIC Logo */}
      <div className="mb-4 sm:mb-8">
        <div className="text-white font-bold text-[10px] sm:text-xs md:text-sm tracking-wider">
          ERIC
        </div>
        <div className="text-gray-500 text-[6px] sm:text-[8px] md:text-[10px] tracking-widest">
          ROBOTICS
        </div>
      </div>

      {/* Top Icons */}
      <nav className="flex flex-col gap-1 sm:gap-2 flex-1">
        {topItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`p-1.5 sm:p-2 md:p-3 rounded-lg transition-all duration-200 group relative
                ${isActive
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                }`}
              title={item.label}
            >
              <Icon size={16} className="sm:w-5 sm:h-5" />
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-white rounded-r"></span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom User Icon */}
      <button className="p-1.5 sm:p-2 md:p-3 text-gray-500 hover:text-white transition-colors">
        <User size={16} className="sm:w-5 sm:h-5" />
      </button>
    </aside>
  );
};

export default Sidebar;
