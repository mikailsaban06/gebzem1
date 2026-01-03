
import React from 'react';
import { Navigation, Bell } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white sticky top-0 z-50">
      {/* Üst Header */}
      <div className="w-full">
        <div className="px-[10px] py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button className="flex items-center justify-center text-black" aria-label="Navigation">
              <Navigation size={18} strokeWidth={2.0} />
            </button>
            <div className="flex items-center">
              <span className="text-[15px] font-bold tracking-tight text-black truncate">
                Gaziler Mah. 1711 Sok
              </span>
            </div>
          </div>
          
          <div className="w-[42px] h-[42px] bg-gray-50 rounded-full flex items-center justify-center text-black">
            <Bell size={20} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
