
import React from 'react';
import Header from './components/Header';
import Layout from './components/Layout';
import { 
  House, 
  Search, 
  LayoutGrid, 
  TicketPercent, 
  CircleUser 
} from 'lucide-react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col pb-32">
      <Header />
      
      <Layout>
        {/* İçerik Alanı: İstek üzerine boş bırakıldı */}
        <div className="py-8">
          {/* İçerik buraya gelecek */}
        </div>
      </Layout>
      
      {/* Alt Menü: rounded-t-[20px], metinler CamelCase */}
      <footer className="w-full border-t border-gray-100 bg-white fixed bottom-0 left-0 pt-4 pb-[26px] shadow-[0_-4px_12px_rgba(0,0,0,0.03)] z-50 rounded-t-[20px]">
        <div className="px-[10px] flex justify-between items-center">
          {/* Anasayfa - İçi boş ikon */}
          <div className="flex flex-col items-center gap-1 flex-1">
            <div className="w-6 h-6 flex items-center justify-center">
               <House size={20} strokeWidth={2.5} className="text-black" />
            </div>
            <span className="text-[10px] font-bold text-black tracking-wider">Anasayfa</span>
          </div>
          
          {/* Arama */}
          <div className="flex flex-col items-center gap-1 flex-1 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
               <Search size={20} strokeWidth={2} />
            </div>
            <span className="text-[10px] font-bold tracking-wider">Arama</span>
          </div>
          
          {/* Kategoriler */}
          <div className="flex flex-col items-center gap-1 flex-1 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
               <LayoutGrid size={20} strokeWidth={2} />
            </div>
            <span className="text-[10px] font-bold tracking-wider">Kategoriler</span>
          </div>

          {/* Kampanya */}
          <div className="flex flex-col items-center gap-1 flex-1 text-gray-400">
            <div className="w-6 h-6 flex items-center justify-center">
               <TicketPercent size={20} strokeWidth={2} />
            </div>
            <span className="text-[10px] font-bold tracking-wider">Kampanya</span>
          </div>

          {/* Profil */}
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
