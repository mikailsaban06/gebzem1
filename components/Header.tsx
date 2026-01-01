
import React from 'react';

interface HeaderProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <header className="w-full bg-white sticky top-0 z-50">
      {/* Üst Header: %100 genişlikte border, içerik 10px paddingli */}
      <div className="w-full border-b border-gray-100">
        <div className="px-[10px] py-4 flex items-center gap-2.5">
          <button className="flex items-center justify-center" aria-label="Navigator">
            <svg 
              width="22" 
              height="22" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </button>
          <span className="text-[16px] font-bold tracking-tight text-black truncate">
            Gaziler Mah. 1711 Sok
          </span>
        </div>
      </div>

      {/* Kategoriler: %100 genişlikte border-bottom */}
      <div className="w-full border-b border-gray-50 overflow-x-auto no-scrollbar">
        <div className="flex px-[10px]">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`py-3 px-4 text-[14px] font-semibold whitespace-nowrap transition-all relative ${
                activeCategory === category ? 'text-black' : 'text-gray-400'
              }`}
            >
              {category}
              {activeCategory === category && (
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
