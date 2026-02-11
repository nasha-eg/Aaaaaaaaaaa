
import React from 'react';
import { SiteSettings, Language } from '../App';

export interface Article {
  id: number;
  title: { ar: string, en: string };
  excerpt: { ar: string, en: string };
  date: { ar: string, en: string };
  img: string;
  category: { ar: string, en: string };
}

export const initialArticles: Article[] = [
  {
    id: 1,
    title: { ar: "لماذا يعتبر فحم البرتقال المصري الأفضل عالمياً؟", en: "Why is Egyptian Orange Charcoal the Best Globally?" },
    excerpt: { ar: "تعرف على الخصائص الكيميائية والفيزيائية التي تجعل فحم أخشاب البرتقال الخيار الأول للمستهلكين في أوروبا والخليج.", en: "Learn about the chemical and physical properties that make Orange wood charcoal the first choice for consumers in Europe and the Gulf." },
    date: { ar: "12 مايو 2025", en: "May 12, 2025" },
    img: "https://images.unsplash.com/photo-1599708153386-62e228308412?auto=format&fit=crop&q=80",
    category: { ar: "جودة الإنتاج", en: "Production Quality" }
  },
  {
    id: 2,
    title: { ar: "دليل المصدرين: معايير تعبئة فحم المشاوي الدولية", en: "Exporters Guide: International BBQ Charcoal Packaging Standards" },
    excerpt: { ar: "كيف نضمن وصول الشحنات دون تكسير؟ تعرف على تقنيات التعبئة الاحترافية في أجولة ورقية وبلاستيكية مخصصة للتصدير.", en: "How do we ensure shipments arrive without breakage? Learn about professional packaging techniques in paper and plastic bags for export." },
    date: { ar: "08 مايو 2025", en: "May 08, 2025" },
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80",
    category: { ar: "خدمات التصدير", en: "Export Services" }
  }
];

export const Blog: React.FC<{ articles?: Article[], settings: SiteSettings, lang: Language }> = ({ articles = initialArticles, settings, lang }) => {
  const whatsappLink = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(lang === 'ar' ? 'قرأت مقالاتكم حول جودة الفحم وأريد الاستفسار عن عينات' : 'I read your articles about charcoal quality and would like to inquire about samples')}`;

  return (
    <section id="المقالات" className={`py-32 bg-[#050505] relative overflow-hidden ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <span className="ember-text font-black text-xs uppercase tracking-[0.4em] mb-4 block">
              {lang === 'ar' ? 'المكتبة المعرفية' : 'Knowledge Library'}
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter">
              {lang === 'ar' ? 'مقالات' : ''} <span className="text-slate-600 italic">{settings.brandName[lang]} {lang === 'en' ? 'Articles' : ''}</span>
            </h2>
          </div>
          <div className="flex items-center space-x-reverse space-x-6">
             <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                  {lang === 'ar' ? 'هل لديك سؤال؟' : 'Have a question?'}
                </p>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-orange-500 font-black text-sm border-b border-orange-500/30 pb-1">
                  {lang === 'ar' ? 'اسأل خبراءنا عبر واتساب' : 'Ask our experts on WhatsApp'}
                </a>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article) => (
            <article key={article.id} className="group cursor-pointer flex flex-col h-full bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 hover:border-orange-600/20 transition-all duration-500">
              <div className="relative overflow-hidden rounded-t-[2.5rem] aspect-[4/3]">
                <img src={article.img} alt={article.title[lang]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-70 group-hover:opacity-100" />
                <div className={`absolute top-6 ${lang === 'ar' ? 'right-6' : 'left-6'}`}>
                  <span className="bg-orange-600/90 backdrop-blur-md text-white text-[9px] font-black px-4 py-2 rounded-full uppercase">{article.category[lang]}</span>
                </div>
              </div>
              <div className="p-8 space-y-4 flex flex-col flex-grow">
                <span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">{article.date[lang]}</span>
                <h3 className="text-xl font-black text-white group-hover:ember-text transition-colors leading-tight">{article.title[lang]}</h3>
                <p className="text-slate-500 text-xs leading-relaxed font-light line-clamp-3 flex-grow italic">"{article.excerpt[lang]}"</p>
                <div className={`pt-4 flex items-center text-orange-600 font-black text-[10px] space-x-reverse space-x-2 uppercase tracking-widest ${lang === 'en' ? 'flex-row' : ''}`}>
                   <span>{lang === 'ar' ? 'اقرأ التفاصيل' : 'Read Details'}</span>
                   <svg className={`w-4 h-4 group-hover:translate-x-[-5px] transition-transform ${lang === 'en' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" strokeWidth={2}/></svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
