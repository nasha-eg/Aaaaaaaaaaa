
import React from 'react';
import { SiteSettings, Language } from '../App';

interface HeroProps {
  settings: SiteSettings;
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ settings, lang }) => {
  const whatsappLink = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(lang === 'ar' ? 'استفسار عن كميات الجملة' : 'Inquiry about wholesale quantities')}`;
  const phoneLink = `tel:${settings.phone}`;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 opacity-60">
        <img src={settings.heroBg} alt="Hero Background" className="w-full h-full object-cover animate-pulse scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black"></div>
      </div>
      <div className="relative z-10 text-center max-w-5xl px-6">
        <div className="mb-6 flex flex-col items-center">
           <div className="w-20 h-[2px] ember-gradient mb-4"></div>
           <span className="ember-text text-sm font-black tracking-[0.4em] uppercase">
             {lang === 'ar' ? 'المصدر الأول للفحم المصري' : 'Egypt\'s Premier Charcoal Exporter'}
           </span>
        </div>
        <h1 className="text-5xl md:text-[7rem] font-black text-white mb-8 leading-[0.9] animate-in slide-in-from-bottom-12 duration-1000">
          {lang === 'ar' ? 'شركة' : 'Company'} <span className="ember-text">{settings.brandName[lang]}</span><br />
          <span className="italic font-light text-slate-400 text-3xl md:text-6xl mt-4 block">{settings.tagline[lang]}</span>
        </h1>
        <p className="text-slate-300 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light">
          {lang === 'ar' 
            ? 'نحن لا نبيع فحماً فقط، بل نقدم شريكاً موثوقاً في سلسلة التوريد الخاصة بكم. فحم نباتي 100% بمواصفات قياسية عالمية.'
            : 'We don\'t just sell charcoal; we provide a reliable partner in your supply chain. 100% vegetable charcoal with international standards.'}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-12 py-5 ember-gradient text-black font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,77,0,0.3)] rounded-full text-center">
            {lang === 'ar' ? 'طلب بالجملة' : 'Wholesale Request'}
          </a>
          <a href={phoneLink} className="w-full sm:w-auto px-12 py-5 border border-white/20 text-white font-black uppercase text-xs tracking-widest hover:bg-orange-600/10 transition-all rounded-full text-center">
            {lang === 'ar' ? 'اتصل بنا مباشرة' : 'Call Us Directly'}
          </a>
        </div>
      </div>
    </section>
  );
};
