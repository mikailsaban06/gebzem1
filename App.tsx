
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Layout from './components/Layout';
import ChatView from './components/ChatView';
import { 
  House, 
  Search, 
  LayoutGrid, 
  TicketPercent, 
  CircleUser,
  Pizza,
  Flame,
  Fish,
  Beef,
  IceCream,
  Coffee,
  Sandwich,
  Grape,
  SlidersHorizontal
} from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'categories' | 'offers' | 'profile'>('home');
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Arama Placeholder Mantığı
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

  const featuredCategories = [
    { 
      name: 'Pizza', 
      icon: <img src="https://raw.githubusercontent.com/mikailsaban06/asdadsadsadasd/refs/heads/main/44.jpg" alt="Pizza" className="w-full h-full object-cover rounded-2xl" /> 
    },
    { 
      name: 'Burger', 
      icon: <img src="https://raw.githubusercontent.com/mikailsaban06/gbzqr06/refs/heads/main/34.jpg" alt="Burger" className="w-full h-full object-cover rounded-2xl" /> 
    },
    { name: 'Lahmacun', icon: <Flame size={24} strokeWidth={1.5} /> },
    { name: 'Sushi', icon: <Fish size={24} strokeWidth={1.5} /> },
    { name: 'Döner', icon: <Beef size={24} strokeWidth={1.5} /> },
    { name: 'Kebap', icon: <Flame size={24} strokeWidth={1.5} /> },
    { name: 'Tatlı', icon: <IceCream size={24} strokeWidth={1.5} /> },
    { name: 'Kahve', icon: <Coffee size={24} strokeWidth={1.5} /> },
    { name: 'Sandviç', icon: <Sandwich size={24} strokeWidth={1.5} /> },
    { name: 'Meyve', icon: <Grape size={24} strokeWidth={1.5} /> }
  ];

  const campaigns = [
    { 
      image: "https://raw.githubusercontent.com/mikailsaban06/asdadsadsadasd/refs/heads/main/45.jpg",
      title: "", 
      subtitle: "" 
    },
    { title: "Sıcak Pizza Keyfi", subtitle: "2. orta boy pizza şimdi sadece 99 TL" },
    { title: "Burger Menü Günleri", subtitle: "Seçili menülerde bedava içecek fırsatı" },
    { title: "Sağlıklı Seçenekler", subtitle: "Taze salata ve bowl çeşitlerinde kampanya" },
    { title: "Gece Acıkanlara", subtitle: "Saat 22:00'den sonra bedava teslimat" },
    { title: "Tatlı Bir Son", subtitle: "Yemek yanına tüm tatlılar %50 indirimli" }
  ];

  if (isChatOpen) {
    return <ChatView onClose={() => setIsChatOpen(false)} />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col pb-32 overflow-x-hidden">
      <Header />
      
      <Layout>
        <div className="flex flex-col gap-6 py-4">
          {/* Slider Bölümü */}
          <div className="px-[10px]">
            <div className="w-full overflow-hidden rounded-2xl bg-gray-50">
              <div className="w-full overflow-x-auto no-scrollbar flex snap-x snap-mandatory touch-pan-x">
                {campaigns.map((camp, idx) => (
                  <div 
                    key={idx} 
                    className={`w-full flex-shrink-0 h-44 snap-center flex flex-col items-start justify-center text-left ${camp.image ? 'p-0' : 'p-6'}`}
                  >
                    {camp.image ? (
                      <img src={camp.image} alt="Kampanya" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <h3 className="text-[20px] font-bold text-black tracking-tight leading-tight mb-1">
                          {camp.title}
                        </h3>
                        <p className="text-[13px] font-medium text-gray-500">
                          {camp.subtitle}
                        </p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Arama Inputu - Slider Altına Taşındı */}
          <div className="px-[10px]">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none z-10">
                <Search size={18} className="text-gray-400" strokeWidth={2} />
              </div>
              <input 
                type="text"
                placeholder={placeholders[placeholderIndex]}
                className="w-full h-[48px] bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-12 outline-none text-[14px] font-medium text-black placeholder-gray-400 focus:bg-white focus:border-gray-200 transition-all duration-300"
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none z-10">
                <SlidersHorizontal size={18} className="text-gray-400" strokeWidth={2} />
              </div>
            </div>
          </div>

          {/* Öne Çıkan Kategoriler Bölümü */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[16px] font-bold text-black px-[10px]">Öne çıkan kategoriler</h2>
            <div className="w-full overflow-x-auto no-scrollbar flex gap-4 pb-2 px-[10px]">
              {featuredCategories.map((cat, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 min-w-[70px]">
                  <div className="w-[70px] h-[70px] bg-gray-50 rounded-2xl flex items-center justify-center text-black">
                    {cat.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-gray-700">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Keşfet Bölümü */}
          <div className="flex flex-col gap-3">
            <h2 className="text-[16px] font-bold text-black px-[10px]">Keşfet</h2>
            <div className="px-[10px]">
              <div className="w-[80px] h-[80px] bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden">
                {/* % işareti kaldırıldı, kart boş bırakıldı */}
              </div>
            </div>
          </div>
        </div>
      </Layout>

      {/* AI Chat Bar - Sağ Tarafta, 2px gri border ve dikey 5px boşluk */}
      <div className="fixed right-[10px] bottom-[110px] z-[60]">
        <button 
          onClick={() => setIsChatOpen(true)}
          className="py-[5px] px-[10px] bg-white text-black border-2 border-gray-200 rounded-2xl flex items-center justify-center shadow-sm active:scale-[0.98] transition-transform"
        >
          <span className="text-[15px] font-bold tracking-tight">AI Chat</span>
        </button>
      </div>
      
      {/* Alt Menü */}
      <footer className="w-full border-t border-gray-100 bg-white fixed bottom-0 left-0 pt-4 pb-[26px] z-50 rounded-t-[20px]">
        <div className="px-[10px] flex justify-between items-center">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 flex-1 transition-colors ${activeTab === 'home' ? 'text-black' : 'text-gray-400'}`}
          >
            <div className="w-6 h-6 flex items-center justify-center">
               <House size={20} strokeWidth={activeTab === 'home' ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-bold tracking-wider">Anasayfa</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center gap-1 flex-1 transition-colors ${activeTab === 'search' ? 'text-black' : 'text-gray-400'}`}
          >
            <div className="w-6 h-6 flex items-center justify-center">
               <Search size={20} strokeWidth={activeTab === 'search' ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-bold tracking-wider">Arama</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('categories')}
            className={`flex flex-col items-center gap-1 flex-1 transition-colors ${activeTab === 'categories' ? 'text-black' : 'text-gray-400'}`}
          >
            <div className="w-6 h-6 flex items-center justify-center">
               <LayoutGrid size={20} strokeWidth={activeTab === 'categories' ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-bold tracking-wider">Kategoriler</span>
          </button>

          <button 
            onClick={() => setActiveTab('offers')}
            className={`flex flex-col items-center gap-1 flex-1 transition-colors ${activeTab === 'offers' ? 'text-black' : 'text-gray-400'}`}
          >
            <div className="w-6 h-6 flex items-center justify-center">
               <TicketPercent size={20} strokeWidth={activeTab === 'offers' ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-bold tracking-wider">Kampanya</span>
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 flex-1 transition-colors ${activeTab === 'profile' ? 'text-black' : 'text-gray-400'}`}
          >
            <div className="w-6 h-6 flex items-center justify-center">
               <CircleUser size={20} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-bold tracking-wider">Profil</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
