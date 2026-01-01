
import React from 'react';

interface HeaderProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <header className="w-full bg-white shadow-[0_2px_4px_rgba(0,0,0,0.02)] sticky top-0 z-50">
      {/* Üst Kısım: Navigator ve Adres */}
      <div className="w-full border-b border-gray-50">
        <div className="max-w-md mx-auto px-[10px] py-4 flex items-center gap-3">
          <button className="p-1 -ml-1 flex items-center justify-center" aria-label="Navigator">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <span className="text-[15px] font-semibold tracking-tight truncate">
            Gaziler Mah. 1711 Sok
          </span>
        </div>
      </div>

      {/* Alt Kısım: Kategoriler */}
      <div className="w-full">
        <div className="max-w-md mx-auto flex">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`flex-1 py-3.5 text-sm font-medium transition-colors relative ${
                activeCategory === category ? 'text-black' : 'text-gray-400'
              }`}
            >
              {category}
              {activeCategory === category && (
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black animate-in fade-in duration-300" />
              )}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
