
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Offers, initialOffers, Offer } from './components/Offers';
import { Gallery } from './components/Gallery';
import { Blog, initialArticles, Article } from './components/Blog';
import { Testimonials } from './components/Testimonials';
import { AIChatWidget } from './components/AIChatWidget';
import { Footer } from './components/Footer';
import { AdminDashboard } from './components/AdminDashboard';

export type Language = 'ar' | 'en';

export interface SiteSettings {
  favicon: string;
  heroBg: string;
  brandName: { ar: string, en: string };
  tagline: { ar: string, en: string };
  logoText: string;
  whatsapp: string;
  phone: string;
  email: string;
  address: { ar: string, en: string };
  facebook: string;
  instagram: string;
  seoTitle: string;
  seoDescription: string;
  dbConfig: {
    host: string;
    port: string;
    user: string;
    pass: string;
    dbName: string;
    isConnected: boolean;
  };
}

export interface Product { id: string; title: { ar: string, en: string }; desc: { ar: string, en: string }; specs: { ar: string[], en: string[] }; icon: string; img: string; msg: { ar: string, en: string }; }
export interface GalleryItem { id: number; title: { ar: string, en: string }; category: { ar: string, en: string }; img: string; }
export interface Testimonial { id: number; name: { ar: string, en: string }; role: { ar: string, en: string }; content: { ar: string, en: string }; avatar: string; }

const initialSettings: SiteSettings = {
  favicon: "https://cdn-icons-png.flaticon.com/512/7580/7580628.png",
  heroBg: "https://images.unsplash.com/photo-1542366810-449e7769527d?auto=format&fit=crop&q=90",
  brandName: { ar: "العاصمة", en: "Al-Asimh" },
  tagline: { ar: "نخب التصدير الأول للفحم المصري", en: "Egypt's Premier Export Grade Charcoal" },
  logoText: "Premium Charcoal",
  whatsapp: "201211111111",
  phone: "00201211111111",
  email: "sales@alasimh.net",
  address: { ar: "الجيزة، مصر", en: "Giza, Egypt" },
  facebook: "https://facebook.com/alasimh",
  instagram: "https://instagram.com/alasimh",
  seoTitle: "شركة العاصمة للفحم | إنتاج وتصدير فحم نباتي نخب أول",
  seoDescription: "شركة العاصمة للفحم: المصدر الأول للفحم المصري عالي الجودة بمواصفات عالمية.",
  dbConfig: {
    host: "localhost",
    port: "3306",
    user: "root",
    pass: "",
    dbName: "alasimh_production_db",
    isConnected: false
  }
};

const initialProducts: Product[] = [
  { id: "01", title: { ar: "فحم البرتقال", en: "Orange Charcoal" }, desc: { ar: "نخب أول للشيشة والمطاعم الراقية. يتميز بصلابة القطع وعدم الطرقعة واشتعال يدوم طويلاً.", en: "Premium grade for Shisha and fine dining. Features hard pieces, no sparking, and long-lasting burning." }, specs: { ar: ["كربون: 85%", "رماد: 2.5%", "رطوبة: 4%"], en: ["Carbon: 85%", "Ash: 2.5%", "Moisture: 4%"] }, icon: "🔥", img: "https://images.unsplash.com/photo-1542366810-449e7769527d?auto=format&fit=crop&q=80", msg: { ar: "أريد الاستفسار عن فحم البرتقال", en: "I want to inquire about Orange Charcoal" } },
  { id: "02", title: { ar: "فحم الليمون", en: "Lemon Charcoal" }, desc: { ar: "أنقى أنواع الفحم النباتي، عديم الرائحة والدخان تماماً وبنكهة طبيعية مثالية.", en: "Purest vegetable charcoal, completely odorless and smokeless." }, specs: { ar: ["كربون: 88%", "رماد: 2%", "رطوبة: 3%"], en: ["Carbon: 88%", "Ash: 2%", "Moisture: 3%"] }, icon: "🍋", img: "https://images.unsplash.com/photo-1599708153386-62e228308412?auto=format&fit=crop&q=80", msg: { ar: "أريد الاستفسار عن فحم الليمون", en: "I want to inquire about Lemon Charcoal" } }
];

const initialGallery: GalleryItem[] = [
  { id: 1, title: { ar: "شحنات جاهزة للتصدير", en: "Ready Shipments" }, category: { ar: "اللوجستيات", en: "Logistics" }, img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80" },
  { id: 2, title: { ar: "نخب فحم البرتقال", en: "Premium Orange" }, category: { ar: "المنتجات", en: "Products" }, img: "https://images.unsplash.com/photo-1542366810-449e7769527d?auto=format&fit=crop&q=80" }
];

const initialTestimonials: Testimonial[] = [
  { id: 1, name: { ar: "روبيرت هانز", en: "Robert Hanz" }, role: { ar: "مستورد - ألمانيا", en: "Importer - Germany" }, content: { ar: "فحم البرتقال الخاص بهم هو الأفضل في السوق الأوروبي.", en: "Their Orange charcoal is the best in the European market." }, avatar: "https://i.pravatar.cc/150?u=10" },
  { id: 2, name: { ar: "أبو فهد القحطاني", en: "Abu Fahd" }, role: { ar: "مطاعم مشويات - السعودية", en: "BBQ Owner - KSA" }, content: { ar: "حرارة ثابتة جداً ولا يصدر شرراً. نعتمد عليهم.", en: "Very stable heat and no sparks. We rely on them." }, avatar: "https://i.pravatar.cc/150?u=11" }
];

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('ar');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  
  // Dynamic Global States
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(initialGallery);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [orders, setOrders] = useState([
    { id: 'AS-9921', client: 'Hanz Import Co.', country: 'Germany', qty: '24 Tons', product: 'Orange Charcoal', status: 'On Sea' },
  ]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    
    // Dynamic SEO & Favicon
    document.title = `${settings.brandName[lang]} | ${settings.logoText}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", settings.seoDescription);
    
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = settings.favicon;

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lang, settings]);

  const toggleLang = () => setLang(prev => (prev === 'ar' ? 'en' : 'ar'));

  if (isAdminView) {
    return (
      <AdminDashboard 
        onLogout={() => setIsAdminView(false)} 
        settings={settings} setSettings={setSettings}
        products={products} setProducts={setProducts}
        galleryItems={galleryItems} setGalleryItems={setGalleryItems}
        testimonials={testimonials} setTestimonials={setTestimonials}
        offers={offers} setOffers={setOffers} 
        articles={articles} setArticles={setArticles}
        orders={orders} setOrders={setOrders}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col bg-black selection:bg-orange-600 selection:text-white overflow-x-hidden ${lang === 'en' ? 'font-sans' : 'font-cairo'}`}>
      <Header isScrolled={isScrolled} settings={settings} lang={lang} toggleLang={toggleLang} />
      
      <main className="flex-grow">
        <Hero settings={settings} lang={lang} />
        
        <section id="about" className="py-32 bg-[#0a0a0a] relative">
           <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-24 items-center">
              <div className="lg:col-span-2 space-y-10">
                 <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="w-16 h-[2px] bg-orange-600"></div>
                    <span className="ember-text font-black text-[11px] uppercase tracking-widest">
                      {lang === 'ar' ? 'نحو صدارة الصناعة العالمية' : 'Leading Global Industry Standards'}
                    </span>
                 </div>
                 <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
                   {lang === 'ar' ? 'أكثر من مجرد فحم، نقدم ثقة التوريد' : 'More Than Just Charcoal, We Provide Supply Trust'}
                 </h2>
                 <p className="text-slate-400 text-xl font-light italic max-w-2xl leading-relaxed">
                   {lang === 'ar' 
                     ? '"نحن نؤمن أن جودة الفحم تعكس جودة الشراكة. لذا نلتزم بأعلى معايير الرقابة من قلب مزارعنا في مصر."' 
                     : '"We believe quality charcoal reflects quality partnership. Committed to the highest standards from Egypt to the world."'}
                 </p>
              </div>
              <div className="relative p-12 bg-[#111] rounded-[4rem] border border-white/5 text-center shadow-2xl">
                 <h3 className="text-2xl font-black text-white mb-6 italic">{lang === 'ar' ? 'ميثاق الجودة' : 'Quality Charter'}</h3>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-10">
                   {lang === 'ar' ? 'نضمن الجودة أو نسترد الشحنة بالكامل' : 'We guarantee quality or we take it back'}
                 </p>
                 <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" rel="noopener noreferrer" className="block py-6 bg-white text-black font-black text-[10px] uppercase rounded-2xl hover:bg-orange-600 transition-all">
                   {lang === 'ar' ? 'تحميل الكتالوج' : 'Download Catalog'}
                 </a>
              </div>
           </div>
        </section>

        <Features settings={settings} lang={lang} products={products} />
        <Offers offers={offers} settings={settings} lang={lang} />
        <Gallery lang={lang} settings={settings} galleryItems={galleryItems} />
        <Blog articles={articles} settings={settings} lang={lang} />
        <Testimonials lang={lang} testimonials={testimonials} />

        <div className="py-12 bg-[#050505] text-center">
           <button onClick={() => setIsAdminView(true)} className="text-[8px] text-slate-800 font-black tracking-[0.8em] hover:text-orange-500 opacity-30 hover:opacity-100 transition-all">
             SYSTEM DASHBOARD LOGIN
           </button>
        </div>
      </main>

      <AIChatWidget settings={settings} lang={lang} />
      <Footer settings={settings} lang={lang} />
      
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-10 left-10 w-14 h-14 bg-orange-600 text-black rounded-2xl shadow-[0_0_30px_rgba(255,77,0,0.4)] flex items-center justify-center hover:scale-110 transition-all z-50 font-bold"
      >
        ↑
      </button>
    </div>
  );
};

export default App;
