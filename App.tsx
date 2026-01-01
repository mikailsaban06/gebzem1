
import React, { useState } from 'react';
import Header from './components/Header';
import Layout from './components/Layout';

const App: React.FC = () => {
  const categories = ['Yemek', 'Restoran', 'Alışveriş'];
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header 
        categories={categories} 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      
      <Layout>
        {/* İçerik buraya gelecek */}
        <div className="py-6">
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-100 shadow-sm flex items-center justify-center text-gray-400">
            {activeCategory} İçeriği Çok Yakında
          </div>
        </div>
      </Layout>
      
      {/* Alt menü divi %100 genişlikte */}
      <footer className="w-full border-t border-gray-100 bg-white fixed bottom-0 left-0 py-4 px-[10px] shadow-[0_-1px_3px_rgba(0,0,0,0.02)]">
        <div className="max-w-md mx-auto flex justify-between items-center text-xs text-gray-400 font-medium">
          <div className="flex flex-col items-center gap-1 text-black">
            <div className="w-5 h-5 bg-black rounded-sm"></div>
            <span>Ana Sayfa</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-5 h-5 border border-gray-200 rounded-sm"></div>
            <span>Siparişlerim</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-5 h-5 border border-gray-200 rounded-sm"></div>
            <span>Profil</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
