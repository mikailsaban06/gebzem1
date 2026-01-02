
import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowUp, Sparkles, Search } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface ChatViewProps {
  onClose: () => void;
}

const ChatView: React.FC<ChatViewProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchMode, setSearchMode] = useState<'ai' | 'standard'>('ai');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: "Sen Gebze bölgesinde hizmet veren bir süper uygulamanın akıllı asistanısın. Kullanıcılara yemek, alışveriş, restorant ve genel Gebze rehberliği konularında yardımcı oluyorsun. Cevapların kısa, öz ve yardımsever olmalı.",
        }
      });

      const aiText = response.text || "Üzgünüm, şu an cevap veremiyorum.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Bir hata oluştu. Lütfen tekrar dene." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#F9F9F9] flex flex-col font-['Plus_Jakarta_Sans']">
      {/* Header */}
      <div className="pt-[env(safe-area-inset-top,20px)] px-4 py-4">
        <button onClick={onClose} className="text-black p-2 -ml-2">
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Content Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 flex flex-col items-center no-scrollbar pb-32"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center mt-20 w-full text-center">
            {/* AI Orb - Animated Sphere */}
            <div className="relative w-40 h-40 mb-12">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-400 to-yellow-300 rounded-full blur-[2px] shadow-[0_0_60px_rgba(234,88,12,0.4)] animate-pulse"></div>
              <div className="absolute inset-[2px] bg-gradient-to-tr from-orange-500 to-yellow-200 rounded-full opacity-90"></div>
              {/* Highlight effect */}
              <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white/30 rounded-full blur-md"></div>
            </div>

            <h1 className="text-[28px] font-bold leading-tight tracking-tight text-black max-w-[280px] mb-8">
              Merhaba Jane, bugün ne arıyorsun?
            </h1>

            {/* Suggested Chips */}
            <div className="flex flex-wrap justify-center gap-3 w-full max-w-md">
              <button onClick={() => setInput("Düğünüm için kadın fotoğrafçı")} className="px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-medium text-gray-800 shadow-sm active:bg-gray-50 transition-colors">
                Düğünüm için kadın fotoğrafçı
              </button>
              <button onClick={() => setInput("30 TL altı uygun fotoğrafçı")} className="px-4 py-3 bg-white border border-gray-100 rounded-2xl text-[13px] font-medium text-gray-800 shadow-sm active:bg-gray-50 transition-colors">
                30 TL altı uygun fotoğrafçı
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full py-4 space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-3 rounded-[24px] text-[15px] leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-black text-white rounded-tr-none' 
                    : 'bg-white text-black border border-gray-100 shadow-sm rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
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

      {/* Bottom Search Bar Area */}
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
              onClick={handleSend}
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
