
import React, { useState } from 'react';
import Header from './components/Header';
import Layout from './components/Layout';

const App: React.FC = () => {
  const categories = ['Yemek', 'Restoran', 'Alışveriş'];
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24">
      <Header 
        categories={categories} 
        activeCategory={activeCategory} 
        onCategoryChange={setActiveCategory} 
      />
      
      <Layout>
        {/* İçerik Alanı: Header ve Alt Menü arasındaki ana bölge */}
        <div className="py-8">
          <div className="w-full aspect-[16/9] bg-[#F9F9F9] rounded-2xl border border-gray-100 flex flex-col items-center justify-center gap-3">
             <div className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-black rounded-sm"></div>
             </div>
             <p className="text-sm font-semibold text-gray-400">{activeCategory} kategorisi hazırlanıyor</p>
          </div>
        </div>
      </Layout>
      
      {/* Alt Menü: %100 genişlikte div, içerik 10px paddingli */}
      <footer className="w-full border-t border-gray-100 bg-white fixed bottom-0 left-0 py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] z-50">
        <div className="px-[10px] flex justify-between items-center">
          <div className="flex flex-col items-center gap-1 flex-1">
            <div className="w-6 h-6 flex items-center justify-center">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            </div>
            <span className="text-[10px] font-bold text-black uppercase tracking-wider">Ana Sayfa</span>
          </div>
          <div className="flex flex-col items-center gap-1 flex-1 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 01-8 0"/></svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Siparişlerim</span>
          </div>
          <div className="flex flex-col items-center gap-1 flex-1 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Profil</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
