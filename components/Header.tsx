
import React, { useState } from 'react';
import { SiteSettings, Language } from '../App';

interface HeaderProps {
  isScrolled: boolean;
  settings: SiteSettings;
  lang: Language;
  toggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isScrolled, settings, lang, toggleLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = lang === 'ar' 
    ? ['الرئيسية', 'منتجاتنا', 'المقالات', 'المصنع', 'اتصل بنا']
    : ['Home', 'Products', 'Articles', 'Factory', 'Contact'];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/95 backdrop-blur-md border-b border-orange-600/20 py-4 shadow-2xl' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 flex justify-between items-center">
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="w-12 h-12 ember-gradient rounded-full flex items-center justify-center shadow-xl">
             <span className="text-black font-black text-xl">{settings.brandName[lang].charAt(0)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black text-white leading-none">{settings.brandName[lang]}</span>
            <span className="text-[10px] ember-text font-bold tracking-widest uppercase">{settings.logoText}</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-10 space-x-reverse font-bold">
          {navItems.map((item) => (
            <a key={item} href={`#${item}`} className="text-sm text-white/70 hover:text-orange-500 transition-all uppercase tracking-widest">{item}</a>
          ))}
          <button 
            onClick={toggleLang}
            className="px-4 py-2 border border-white/10 rounded-xl text-xs font-black hover:bg-white/5 transition-all text-orange-500"
          >
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>
          <a href={`https://wa.me/${settings.whatsapp}`} className="ember-gradient text-black px-8 py-2 text-sm font-black rounded-full shadow-lg">
            {lang === 'ar' ? 'طلب تسعيرة' : 'Request Quote'}
          </a>
        </div>

        <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden text-white">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-300">
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-8 left-8 text-white text-3xl">×</button>
          {navItems.map(item => (
            <a key={item} href={`#${item}`} onClick={() => setMobileMenuOpen(false)} className="text-3xl font-black text-white uppercase">{item}</a>
          ))}
          <button onClick={() => { toggleLang(); setMobileMenuOpen(false); }} className="text-2xl font-black text-orange-500">
             {lang === 'ar' ? 'English Language' : 'اللغة العربية'}
          </button>
        </div>
      )}
    </nav>
  );
};
