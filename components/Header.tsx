
import React, { useState, useEffect } from 'react';
import { Navigation, Bell, Search } from 'lucide-react';

const Header: React.FC = () => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const placeholders = [
    "Bu hafta %20 indirim",
    "Karadeniz mutfağı",
    "Şehrindeki en iyi lezzetler",
    "Market ihtiyaçlarını keşfet"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full bg-white sticky top-0 z-50">
      {/* Üst Header */}
      <div className="w-full">
        <div className="px-[10px] py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button className="flex items-center justify-center text-black" aria-label="Navigation">
              {/* İkon 18px ve stroke 1.5 */}
              <Navigation size={18} strokeWidth={1.5} />
            </button>
            <div className="flex items-center">
              {/* Adres 14px */}
              <span className="text-[14px] font-bold tracking-tight text-black truncate">
                Gaziler Mah. 1711 Sok
              </span>
            </div>
          </div>
          
          {/* Bildirim İkonu: 42x42, hafif gri daire */}
          <div className="w-[42px] h-[42px] bg-gray-50 rounded-full flex items-center justify-center text-black">
            <Bell size={20} strokeWidth={2.5} />
          </div>
        </div>
      </div>

      {/* Arama Inputu: Kategoriler kaldırıldı, yerine eklendi */}
      <div className="px-[10px] pb-4">
        <div className="relative w-full group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" strokeWidth={2} />
          </div>
          <div className="w-full h-[48px] bg-gray-50 border border-gray-100 rounded-xl px-12 flex items-center">
            <span className="text-[14px] text-gray-400 font-medium transition-all duration-500 opacity-100">
              {placeholders[placeholderIndex]}
            </span>
          </div>
        </div>
      </div>
      <div className="w-full border-b border-gray-100"></div>
    </header>
  );
};

export default Header;
