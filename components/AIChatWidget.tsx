
import React, { useState, useRef, useEffect } from 'react';
import { getDesignAdvice } from '../services/geminiService';
import { SiteSettings, Language } from '../App';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export const AIChatWidget: React.FC<{ settings: SiteSettings, lang: Language }> = ({ settings, lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  
  const initialAiMsg = lang === 'ar' 
    ? `مرحباً بك في شركة ${settings.brandName.ar}. أنا مساعدك الذكي، يمكنني إخبارك بكل شيء عن أنواع الفحم المصري وكيفية التصدير. كيف أخدمك اليوم؟`
    : `Welcome to ${settings.brandName.en}. I am your AI assistant. I can tell you everything about Egyptian charcoal types and export procedures. How can I help you today?`;

  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: initialAiMsg }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const whatsappLink = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(lang === 'ar' ? 'مرحباً، لقد تواصلت مع المساعد الذكي وأريد التحدث مع مدير المبيعات' : 'Hello, I reached out through the AI assistant and would like to speak with sales')}`;
  const phoneLink = `tel:${settings.phone}`;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await getDesignAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse || (lang === 'ar' ? 'حدث خطأ في الاتصال، يرجى المحاولة ثانية.' : 'Connection error, please try again.') }]);
    setIsLoading(false);
  };

  return (
    <div className={`fixed bottom-10 ${lang === 'ar' ? 'right-10' : 'left-10'} z-[60]`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 ember-gradient shadow-[0_0_30px_rgba(255,77,0,0.6)] flex items-center justify-center text-black hover:scale-110 transition-all rounded-full group relative"
      >
        <div className="absolute inset-0 rounded-full border-2 border-orange-500 animate-ping opacity-20"></div>
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-8 h-8 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C12 2 19 7 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 7 12 2 12 2Z" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className={`absolute bottom-24 ${lang === 'ar' ? 'right-0' : 'left-0'} w-80 sm:w-[420px] h-[600px] bg-black rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-orange-600/30 animate-in fade-in slide-in-from-bottom-12 duration-500 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <div className="bg-[#111] p-8 border-b border-white/5 flex items-center justify-between">
            <div className={`flex items-center space-x-reverse space-x-4 ${lang === 'en' ? 'flex-row' : ''}`}>
              <div className="w-12 h-12 ember-gradient rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-black font-black text-xl">{settings.brandName[lang].charAt(0)}</span>
              </div>
              <div>
                <h3 className="text-white font-black text-lg leading-none mb-1">
                  {lang === 'ar' ? 'المستشار الذكي' : 'Smart Consultant'}
                </h3>
                <div className={`flex items-center space-x-reverse space-x-2 ${lang === 'en' ? 'flex-row' : ''}`}>
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                   <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                     {lang === 'ar' ? 'متصل الآن' : 'Online'} - {settings.brandName[lang]}
                   </span>
                </div>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 space-y-6 bg-[#050505] custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-6 py-4 rounded-[1.8rem] text-sm leading-relaxed shadow-lg ${m.role === 'user' ? 'bg-orange-600 text-black font-bold rounded-tr-none' : 'bg-[#1a1a1a] text-slate-200 border border-white/5 rounded-tl-none'}`}>
                  {m.text}
                  {m.role === 'ai' && i === messages.length - 1 && !isLoading && (
                    <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                       <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="bg-green-600/20 text-green-500 border border-green-600/30 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter hover:bg-green-600 hover:text-white transition-all">
                         {lang === 'ar' ? 'محادثة مبيعات' : 'Sales Chat'}
                       </a>
                       <a href={phoneLink} className="bg-white/5 text-white border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-tighter hover:bg-orange-600 hover:text-black transition-all">
                         {lang === 'ar' ? 'اتصال هاتفي' : 'Phone Call'}
                       </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={`p-8 bg-[#111] border-t border-white/5 flex space-x-reverse space-x-4 items-center ${lang === 'en' ? 'flex-row' : ''}`}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={lang === 'ar' ? 'اكتب استفسارك هنا...' : 'Type your inquiry...'}
              className="flex-grow bg-black/50 border border-white/5 rounded-2xl px-6 py-4 text-sm focus:ring-1 focus:ring-orange-600 outline-none text-white transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="w-14 h-14 ember-gradient rounded-2xl text-black flex items-center justify-center hover:scale-105 transition-all shadow-xl shadow-orange-600/20 disabled:opacity-50"
            >
              <svg className={`w-6 h-6 ${lang === 'en' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 77, 0, 0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
};
