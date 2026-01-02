import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowUp, Sparkles, Search, Star, MapPin } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Business {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  distance: string;
}

interface Message {
  role: 'user' | 'model';
  text: string;
  businesses?: Business[];
}

interface ChatViewProps {
  onClose: () => void;
}

const BusinessCard: React.FC<{ business: Business }> = ({ business }) => (
  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm min-w-[240px] w-[240px]">
    <div className="relative h-32 w-full">
      <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
        <Star size={12} className="text-orange-500 fill-orange-500" />
        <span className="text-[11px] font-bold text-black">{business.rating}</span>
      </div>
    </div>
    <div className="p-3">
      <h4 className="text-[14px] font-bold text-black truncate">{business.name}</h4>
      <p className="text-[11px] text-gray-500 font-medium mb-2">{business.category}</p>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1 text-gray-400">
          <MapPin size={12} />
          <span className="text-[11px] font-medium">{business.distance}</span>
        </div>
        <span className="text-[11px] text-gray-400">({business.reviews} yorum)</span>
      </div>
    </div>
  </div>
);

const ChatView: React.FC<ChatViewProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMode, setSearchMode] = useState<'ai' | 'standard'>('ai');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (textOverride?: string) => {
    const userMessage = textOverride || input.trim();
    if (!userMessage || isLoading) return;

    const newMessage: Message = { role: 'user', text: userMessage };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Vite ve Vercel için güvenli API Key erişimi
      // process.env tarayıcıda hata verebileceği için window ve meta.env kontrolleri eklendi
      let apiKey = '';
      try {
        apiKey = process.env.API_KEY || (import.meta as any).env?.VITE_API_KEY || '';
      } catch (e) {
        apiKey = (import.meta as any).env?.VITE_API_KEY || '';
      }

      if (!apiKey) {
        // Eğer anahtar yoksa AI Studio penceresini açmayı dene
        const aistudio = (window as any).aistudio;
        if (aistudio) {
          await aistudio.openSelectKey();
          // Seçimden sonra tekrar dene (process.env otomatik güncellenir)
          apiKey = process.env.API_KEY || '';
        }
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const contents = [...messages, newMessage].map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contents,
        config: {
          systemInstruction: "Sen Gebze bölgesinde hizmet veren bir süper uygulamanın akıllı asistanısın. Kullanıcılara yemek, alışveriş, restorant ve genel Gebze rehberliği konularında yardımcı oluyorsun. Cevapların kısa, öz ve yardımsever olmalı. Eğer kullanıcı bir hizmet veya yer arıyorsa, ilgili yerleri öner.",
        },
      });

      const aiText = response.text || "Üzgünüm, şu an yanıt veremiyorum.";
      
      const mockBusinesses: Business[] = [
        {
          id: '1',
          name: 'Gebze Fotoğraf Atölyesi',
          rating: 4.8,
          reviews: 124,
          category: 'Fotoğrafçılık',
          distance: '1.2 km',
          image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400&h=250&fit=crop'
        },
        {
          id: '2',
          name: 'Işık Sanat Stüdyosu',
          rating: 4.6,
          reviews: 89,
          category: 'Profesyonel Çekim',
          distance: '2.5 km',
          image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&h=250&fit=crop'
        }
      ];

      const keywords = ['fotoğraf', 'yemek', 'restoran', 'kebap', 'pizza', 'döner', 'tatlı', 'kahve', 'nerede'];
      const shouldShowBusinesses = keywords.some(term => userMessage.toLowerCase().includes(term));

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: aiText,
        businesses: shouldShowBusinesses ? mockBusinesses : undefined
      }]);

    } catch (error: any) {
      console.error("Gemini Connection Error:", error);
      
      // Detaylı hata mesajı
      let errorMsg = "Bağlantı hatası oluştu.";
      if (!process.env.API_KEY && !(import.meta as any).env?.VITE_API_KEY) {
        errorMsg = "API Anahtarı bulunamadı. Lütfen Vercel'den 'VITE_API_KEY' değişkenini ekleyip Redeploy yapın.";
      }

      setMessages(prev => [...prev, { 
        role: 'model', 
        text: errorMsg 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#F9F9F9] flex flex-col font-['Plus_Jakarta_Sans']">
      <div className="pt-[env(safe-area-inset-top,20px)] px-4 py-4">
        <button onClick={onClose} className="text-black p-2 -ml-2">
          <ArrowLeft size={24} />
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 flex flex-col items-center no-scrollbar pb-32"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center mt-20 w-full text-center">
            <div className="relative w-40 h-40 mb-12">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-400 to-yellow-300 rounded-full blur-[2px] shadow-[0_0_60px_rgba(234,88,12,0.4)] animate-pulse"></div>
              <div className="absolute inset-[2px] bg-gradient-to-tr from-orange-500 to-yellow-200 rounded-full opacity-90"></div>
              <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white/30 rounded-full blur-md"></div>
            </div>

            <h1 className="text-[28px] font-bold leading-tight tracking-tight text-black max-w-[280px] mb-8">
              Merhaba, bugün ne arıyorsun?
            </h1>

            <div className="flex flex-wrap justify-center gap-3 w-full max-w-md">
              <button 
                onClick={() => handleSend("Düğünüm için kadın fotoğrafçı")} 
                className="px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-medium text-gray-800 shadow-sm active:bg-gray-50 transition-colors"
              >
                Düğünüm için kadın fotoğrafçı
              </button>
              <button 
                onClick={() => handleSend("Uygun fiyatlı yemek yerleri")} 
                className="px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-medium text-gray-800 shadow-sm active:bg-gray-50 transition-colors"
              >
                Uygun fiyatlı yemek yerleri
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full py-4 space-y-8">
            {messages.map((msg, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-5 py-3 rounded-[24px] text-[15px] leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-black text-white rounded-tr-none' 
                      : 'bg-white text-black border border-gray-100 shadow-sm rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
                
                {msg.businesses && (
                  <div className="w-full -mx-6 px-6 overflow-x-auto no-scrollbar py-2">
                    <div className="flex gap-4">
                      {msg.businesses.map((business) => (
                        <BusinessCard key={business.id} business={business} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 shadow-sm px-5 py-3 rounded-[24px] rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="px-4 pb-[env(safe-area-inset-bottom,20px)] mb-4">
        <div className="bg-white border border-gray-100 rounded-[32px] p-2 shadow-lg shadow-black/5">
          <div className="px-4 pt-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Aramaya başla"
              className="w-full bg-transparent outline-none text-[16px] text-black placeholder-gray-400 font-medium py-1"
            />
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-1">
              <button 
                onClick={() => setSearchMode('ai')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all ${
                  searchMode === 'ai' 
                    ? 'bg-white border border-orange-100 text-black shadow-sm' 
                    : 'text-gray-400'
                }`}
              >
                <div className="w-4 h-4 flex items-center justify-center bg-orange-500 rounded-full">
                  <Sparkles size={10} className="text-white fill-white" />
                </div>
                <span className="text-[13px] font-bold">AI modu</span>
              </button>
              
              <button 
                onClick={() => setSearchMode('standard')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all ${
                  searchMode === 'standard' 
                    ? 'bg-white border border-gray-100 text-black shadow-sm' 
                    : 'text-gray-400'
                }`}
              >
                <Search size={14} />
                <span className="text-[13px] font-bold">Standart</span>
              </button>
            </div>

            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center disabled:opacity-30 active:scale-95 transition-all"
            >
              <ArrowUp size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatView;