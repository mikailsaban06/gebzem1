
import React from 'react';
import Header from './components/Header';
import Layout from './components/Layout';
import { 
  House, 
  Search, 
  LayoutGrid, 
  TicketPercent, 
  CircleUser,
  Pizza,
  UtensilsCrossed,
  Flame,
  Fish,
  Beef,
  Cookie,
  Coffee,
  IceCream,
  Sandwich,
  Grape
} from 'lucide-react';

const App: React.FC = () => {
  const featuredCategories = [
    { name: 'Pizza', icon: <Pizza size={24} strokeWidth={1.5} /> },
    { name: 'Burger', icon: <UtensilsCrossed size={24} strokeWidth={1.5} /> },
    { name: 'Lahmacun', icon: <Flame size={24} strokeWidth={1.5} /> },
    { name: 'Sushi', icon: <Fish size={24} strokeWidth={1.5} /> },
    { name: 'Döner', icon: <Beef size={24} strokeWidth={1.5} /> },
    { name: 'Kebap', icon: <Flame size={24} strokeWidth={1.5} /> },
    { name: 'Tatlı', icon: <IceCream size={24} strokeWidth={1.5} /> },
    { name: 'Kahve', icon: <Coffee size={24} strokeWidth={1.5} /> },
    { name: 'Sandviç', icon: <Sandwich size={24} strokeWidth={1.5} /> },
    { name: 'Meyve', icon: <Grape size={24} strokeWidth={1.5} /> }
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col pb-32">
      <Header />
      
      <Layout>
        <div className="flex flex-col gap-6 py-4">
          {/* Slider Bölümü - %100 Genişlik */}
          <div className="w-full overflow-x-auto no-scrollbar flex snap-x snap-mandatory">
            <div className="min-w-full h-44 bg-gray-50 border-y border-gray-100 snap-center flex items-center justify-center p-6 text-center">
              <span className="text-[16px] font-bold text-black">Özel Kampanya 1</span>
            </div>
            <div className="min-w-full h-44 bg-gray-50 border-y border-gray-100 snap-center flex items-center justify-center p-6 text-center">
              <span className="text-[16px] font-bold text-black">Özel Kampanya 2</span>
            </div>
            <div className="min-w-full h-44 bg-gray-50 border-y border-gray-100 snap-center flex items-center justify-center p-6 text-center">
              <span className="text-[16px] font-bold text-black">Özel Kampanya 3</span>
            </div>
          </div>

          {/* Öne Çıkan Kategoriler Bölümü - %100 Genişlik */}
          <div className="flex flex-col gap-3">
            {/* Başlık için 10px padding */}
            <h2 className="text-[16px] font-bold text-black px-[10px]">Öne çıkan kategoriler</h2>
            <div className="w-full overflow-x-auto no-scrollbar flex gap-4 pb-2 px-[10px]">
              {featuredCategories.map((cat, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 min-w-[60px]">
                  <div className="w-[60px] h-[60px] bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center text-black">
                    {cat.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-gray-700">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
      
      {/* Alt Menü */}
      <footer className="w-full border-t border-gray-100 bg-white fixed bottom-0 left-0 pt-4 pb-[26px] shadow-[0_-4px_12px_rgba(0,0,0,0.03)] z-50 rounded-t-[20px]">
        <div className="px-[10px] flex justify-between items-center">
          <div className="flex flex-col items-center gap-1 flex-1">
            <div className="w-6 h-6 flex items-center justify-center">
               <House size={20} strokeWidth={2.5} className="text-black" />
            </div>
            <span className="text-[10px] font-bold text-black tracking-wider">Anasayfa</span>
          </div>
          
          <div className="flex flex-col items-center gap-1 flex-1 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
               <Search size={20} strokeWidth={2} />
            </div>
            <span className="text-[10px] font-bold tracking-wider">Arama</span>
          </div>
          
          <div className="flex flex-col items-center gap-1 flex-1 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
               <LayoutGrid size={20} strokeWidth={2} />
            </div>
            <span className="text-[10px] font-bold tracking-wider">Kategoriler</span>
          </div>

          <div className="flex flex-col items-center gap-1 flex-1 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
               <TicketPercent size={20} strokeWidth={2} />
            </div>
            <span className="text-[10px] font-bold tracking-wider">Kampanya</span>
          </div>

          <div className="flex flex-col items-center gap-1 flex-1 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
               <CircleUser size={20} strokeWidth={2} />
            </div>
            <span className="text-[10px] font-bold tracking-wider">Profil</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
