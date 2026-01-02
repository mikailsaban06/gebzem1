
import React from 'react';
import { Navigation, Bell } from 'lucide-react';

interface Category {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface HeaderProps {
  categories: Category[];
  activeCategoryId: string;
  onCategoryChange: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ categories, activeCategoryId, onCategoryChange }) => {
  return (
    <header className="w-full bg-white sticky top-0 z-50">
      {/* Üst Header: %100 genişlikte border, içerik 10px paddingli */}
      <div className="w-full border-b border-gray-100">
        <div className="px-[10px] py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button className="flex items-center justify-center text-black" aria-label="Navigation">
              <Navigation size={22} strokeWidth={2.5} fill="black" />
            </button>
            <div className="flex items-center">
              <span className="text-[16px] font-bold tracking-tight text-black truncate">
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

      {/* Kategoriler: %100 genişlikte border-bottom */}
      <div className="w-full border-b border-gray-50 overflow-x-auto no-scrollbar">
        <div className="flex px-[10px]">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`py-3 px-4 flex items-center gap-2 text-[14px] font-bold whitespace-nowrap transition-all relative ${
                activeCategoryId === category.id ? 'text-black' : 'text-gray-400'
              }`}
            >
              <span className={activeCategoryId === category.id ? 'text-black' : 'text-gray-400'}>
                {category.icon}
              </span>
              {category.label}
              {activeCategoryId === category.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-black rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
