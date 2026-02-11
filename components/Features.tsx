
import React from 'react';
import { SiteSettings, Language, Product } from '../App';

interface FeaturesProps {
  settings: SiteSettings;
  lang: Language;
  products: Product[];
}

export const Features: React.FC<FeaturesProps> = ({ settings, lang, products }) => {
  if (!products || products.length === 0) return null;

  return (
    <section id="منتجاتنا" className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <span className="ember-text font-black tracking-[0.5em] text-sm uppercase mb-6 block animate-flicker">
            {lang === 'ar' ? 'الكتالوج التجاري الفاخر' : 'Luxury Commercial Catalog'}
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-none">
            {lang === 'ar' ? 'فحم بمواصفات' : 'Charcoal with'} <span className="ember-text italic">{lang === 'ar' ? 'عالمية' : 'Global Standards'}</span>
          </h2>
          <p className="text-slate-400 text-lg font-light leading-relaxed">
            {lang === 'ar' 
              ? `نقدم لكم أفضل ما تجود به الأراضي المصرية، مُصنعة بمعايير ${settings.brandName[lang]} الصارمة لضمان أعلى مستويات الأداء.`
              : `We offer the best of Egyptian lands, manufactured to ${settings.brandName[lang]}'s strict standards for top performance.`}
          </p>
        </div>
        
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          {products.map((type) => (
            <div key={type.id} className="group relative flex flex-col h-full bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-orange-600/30 transition-all duration-500 shadow-2xl">
              <div className="h-48 overflow-hidden relative">
                <img src={type.img} alt={type.title[lang]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-60 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
                <div className={`absolute bottom-4 ${lang === 'ar' ? 'right-6' : 'left-6'} text-4xl group-hover:scale-125 transition-transform`}>{type.icon}</div>
              </div>

              <div className="p-8 pt-4 flex flex-col flex-grow">
                <h3 className="text-2xl font-black text-white mb-4 group-hover:ember-text transition-colors">{type.title[lang]}</h3>
                <p className="text-slate-500 font-light text-sm mb-8 leading-relaxed flex-grow italic">
                  "{type.desc[lang]}"
                </p>
                
                <div className="space-y-3 py-6 border-y border-white/5 mb-8">
                  {type.specs[lang].map((spec, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                      <span className="text-slate-600">{spec.split(':')[0]}</span>
                      <span className="text-slate-300 group-hover:text-orange-500 transition-colors">{spec.split(':')[1]}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <a 
                    href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(type.msg[lang])}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-orange-600 text-black rounded-2xl text-center font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-orange-600/10 flex items-center justify-center space-x-reverse space-x-2 group/btn"
                  >
                    <span>{lang === 'ar' ? 'طلب عرض سعر (واتساب)' : 'Request Quote (WhatsApp)'}</span>
                  </a>
                  <a href={`tel:${settings.phone}`} className="block w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl text-center font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                    {lang === 'ar' ? 'اتصال هاتفي' : 'Phone Call'}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
