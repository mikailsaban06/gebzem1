
import React, { useState } from 'react';
import Header from './components/Header';
import Layout from './components/Layout';
import { Utensils, ChefHat, ShoppingBag, House, ScrollText, CircleUser } from 'lucide-react';

const App: React.FC = () => {
  const categories = [
    { id: 'yemek', label: 'Yemek', icon: <Utensils size={18} /> },
    { id: 'restoran', label: 'Restoran', icon: <ChefHat size={18} /> },
    { id: 'alisveris', label: 'Alışveriş', icon: <ShoppingBag size={18} /> }
  ];
  
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);

  return (
    <div className="min-h-screen bg-white flex flex-col pb-24">
      <Header 
        categories={categories} 
        activeCategoryId={activeCategoryId} 
        onCategoryChange={setActiveCategoryId} 
      />
      
      <Layout>
        {/* İçerik Alanı: İstek üzerine boş bırakıldı */}
        <div className="py-8">
          {/* İçerik buraya gelecek */}
        </div>
      </Layout>
      
      {/* Alt Menü: %100 genişlikte div, içerik 10px paddingli */}
      <footer className="w-full border-t border-gray-100 bg-white fixed bottom-0 left-0 py-4 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] z-50">
        <div className="px-[10px] flex justify-between items-center">
          <div className="flex flex-col items-center gap-1 flex-1">
            <div className="w-6 h-6 flex items-center justify-center">
               <House size={20} className="text-black" fill="currentColor" />
            </div>
            <span className="text-[10px] font-bold text-black uppercase tracking-wider">Anasayfa</span>
          </div>
          <div className="flex flex-col items-center gap-1 flex-1 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
               <ScrollText size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Siparişlerim</span>
          </div>
          <div className="flex flex-col items-center gap-1 flex-1 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
               <CircleUser size={20} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider">Profil</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
