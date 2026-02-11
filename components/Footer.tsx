
import React from 'react';
import { SiteSettings, Language } from '../App';

export const Footer: React.FC<{ settings: SiteSettings, lang: Language }> = ({ settings, lang }) => {
  return (
    <footer id="contact" className="bg-black text-white pt-32 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-10 h-10 ember-gradient rounded-xl flex items-center justify-center font-black text-black">
                {settings.brandName[lang].charAt(0)}
              </div>
              <span className="text-3xl font-black tracking-tighter">{settings.brandName[lang]}</span>
            </div>
            <p className="text-slate-500 leading-relaxed font-light text-sm italic">
              {lang === 'ar' 
                ? `شركة ${settings.brandName.ar} هي المصدر الرائد للفحم النباتي عالي الجودة في مصر.` 
                : `${settings.brandName.en} is the leading exporter of high-quality vegetable charcoal in Egypt.`}
            </p>
          </div>

          <div className="space-y-10">
            <h4 className="ember-text font-black text-xs uppercase tracking-widest">{lang === 'ar' ? 'بيانات التواصل' : 'Contact Details'}</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-bold">
              <li>{settings.address[lang]}</li>
              <li><a href={`tel:${settings.phone}`} className="hover:text-orange-500">{settings.phone}</a></li>
              <li className="text-xs opacity-60">{settings.email}</li>
            </ul>
          </div>

          <div className="lg:col-span-2 flex flex-col items-center lg:items-end justify-center">
            <div className="bg-[#0a0a0a] p-10 rounded-[3rem] border border-white/5 w-full text-center">
               <h3 className="text-xl font-black mb-6">{lang === 'ar' ? 'جاهز للتصدير؟' : 'Ready to Export?'}</h3>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href={`https://wa.me/${settings.whatsapp}`} className="px-10 py-4 bg-green-600/10 border border-green-600/20 text-green-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all">WhatsApp</a>
                  <a href={`tel:${settings.phone}`} className="px-10 py-4 ember-gradient text-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Call Now</a>
               </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-black uppercase tracking-[0.3em] text-slate-700">
          <div>© 2025 {settings.brandName.en} Charcoal. All Rights Reserved.</div>
          <div className="flex items-center space-x-4 space-x-reverse">
             <span>Developed by</span>
             <a href="#" className="text-orange-600 hover:text-white transition-colors">Ashraf Maher - Social Brand Co.</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
