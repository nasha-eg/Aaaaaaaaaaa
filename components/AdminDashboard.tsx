
import React, { useState } from 'react';
import { Offer } from './Offers';
import { Article } from './Blog';
import { SiteSettings, Product, GalleryItem, Testimonial } from '../App';

interface AdminDashboardProps {
  onLogout: () => void;
  settings: SiteSettings; setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  products: Product[]; setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  galleryItems: GalleryItem[]; setGalleryItems: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
  testimonials: Testimonial[]; setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  offers: Offer[]; setOffers: React.Dispatch<React.SetStateAction<Offer[]>>;
  articles: Article[]; setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  orders: any[]; setOrders: React.Dispatch<React.SetStateAction<any[]>>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  onLogout, settings, setSettings, products, setProducts, galleryItems, setGalleryItems, testimonials, setTestimonials, offers, setOffers, articles, setArticles, orders, setOrders
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: '', pass: '' });
  const [activeTab, setActiveTab] = useState('overview');
  const [toast, setToast] = useState<{msg: string, type: 'success' | 'error'} | null>(null);

  // Temporary States for Editing
  const [tempSettings, setTempSettings] = useState<SiteSettings>(settings);
  const [tempProducts, setTempProducts] = useState<Product[]>(products);
  const [tempGallery, setTempGallery] = useState<GalleryItem[]>(galleryItems);
  const [tempTestimonials, setTempTestimonials] = useState<Testimonial[]>(testimonials);
  const [isTestingDB, setIsTestingDB] = useState(false);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.user === 'admin' && loginForm.pass === '1997') {
      setIsLoggedIn(true);
      showToast('تم تسجيل الدخول بنجاح للنظام الشامل');
    } else {
      showToast('بيانات الدخول غير صحيحة', 'error');
    }
  };

  const saveSettings = () => { setSettings(tempSettings); showToast('تم تحديث الإعدادات والهوية البصرية.'); };
  const saveProducts = () => { setProducts(tempProducts); showToast('تم تحديث المنتجات بنجاح.'); };
  const saveGallery = () => { setGalleryItems(tempGallery); showToast('تم تحديث معرض الصور.'); };
  const saveTestimonials = () => { setTestimonials(tempTestimonials); showToast('تم تحديث آراء العملاء.'); };

  const handleTestDBConnection = () => {
    setIsTestingDB(true);
    // محاكاة عملية الاتصال بقاعدة البيانات عبر API
    setTimeout(() => {
      setIsTestingDB(false);
      const newSettings = { ...tempSettings, dbConfig: { ...tempSettings.dbConfig, isConnected: true } };
      setTempSettings(newSettings);
      setSettings(newSettings);
      showToast('تم الاتصال بنجاح! تم ربط الواجهة بقاعدة البيانات (محاكاة).', 'success');
    }, 2500);
  };

  const saveDBConfig = () => {
    setSettings(tempSettings);
    showToast('تم حفظ تفاصيل قاعدة البيانات لإرسالها للخادم.');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 font-cairo" dir="rtl">
        {toast && (
          <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-xl bg-red-600 text-white font-bold text-sm shadow-2xl animate-in slide-in-from-top-10">
            {toast.msg}
          </div>
        )}
        <form onSubmit={handleLogin} className="w-full max-w-md bg-[#0a0a0a] border border-orange-600/20 rounded-[3rem] p-12 text-center shadow-2xl">
           <div className="w-20 h-20 ember-gradient rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-xl rotate-12">
             <span className="text-3xl font-black text-black -rotate-12">أ.م</span>
           </div>
           <h2 className="text-2xl font-black text-white mb-2">بوابة الإدارة المتقدمة</h2>
           <p className="text-slate-500 text-xs mb-8">نظام إدارة المحتوى الشامل CMS</p>
           
           <div className="space-y-4 mb-8">
              <input type="text" placeholder="اسم المستخدم" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-orange-600 text-right transition-all" onChange={e => setLoginForm({...loginForm, user: e.target.value})} />
              <input type="password" placeholder="كلمة المرور (1997)" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-orange-600 text-right transition-all" onChange={e => setLoginForm({...loginForm, pass: e.target.value})} />
           </div>
           <button className="w-full py-5 ember-gradient text-black font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,77,0,0.3)]">دخول النظام</button>
           
           <div className="mt-8 pt-6 border-t border-white/5 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
             <span className="block mb-1">Developed & Secured By</span>
             <span className="text-orange-600">Ashraf Maher - Social Brand Co.</span>
           </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col md:flex-row font-cairo" dir="rtl">
      {toast && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-xl font-bold text-sm shadow-2xl transition-all animate-in slide-in-from-top-10 ${toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
          {toast.msg}
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-[#0a0a0a] border-l border-white/5 flex flex-col p-8 shadow-2xl z-20 shrink-0">
        <div className="mb-12 flex flex-col items-center border-b border-white/5 pb-8">
           <div className="w-16 h-16 ember-gradient rounded-2xl flex items-center justify-center shadow-lg mb-4 p-1">
             <img src={settings.favicon} className="w-full h-full object-contain filter invert opacity-80" alt="icon" />
           </div>
           <span className="font-black text-white text-lg tracking-tight">تحكم {settings.brandName.ar}</span>
           <span className="text-[10px] text-orange-500 font-bold tracking-widest uppercase mt-1">Full CMS System</span>
        </div>

        <nav className="flex-grow space-y-2">
          {[
            { id: 'overview', label: '📊 نظرة عامة' },
            { id: 'database', label: '🗄️ ربط قاعدة البيانات' },
            { id: 'settings', label: '⚙️ الهوية البصرية والسيو' },
            { id: 'products', label: '🔥 المنتجات (الفحم)' },
            { id: 'gallery', label: '📸 معرض الصور' },
            { id: 'testimonials', label: '💬 آراء العملاء' },
            { id: 'blog', label: '✍️ المقالات والمدونة' }
          ].map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)} 
              className={`w-full text-right px-6 py-4 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-orange-600 text-black shadow-lg shadow-orange-600/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        
        <button onClick={onLogout} className="mt-8 py-4 bg-red-600/10 text-red-500 rounded-xl font-black text-xs uppercase border border-red-600/20 hover:bg-red-600 hover:text-white transition-all">
          تسجيل الخروج
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto bg-black">
        <header className="mb-10">
          <h2 className="text-3xl font-black text-white mb-2">
            {activeTab === 'overview' ? 'لوحة القيادة الموحدة' : 
             activeTab === 'database' ? 'إدارة اتصال قاعدة البيانات (MySQL)' :
             activeTab === 'settings' ? 'إعدادات الهوية والوسائط الشاملة' : 
             activeTab === 'products' ? 'إدارة كتالوج المنتجات الشامل' : 
             activeTab === 'gallery' ? 'إدارة معرض الصور الواقعية' :
             activeTab === 'testimonials' ? 'إدارة آراء وتقييمات العملاء' : 'إدارة المحتوى'}
          </h2>
          <p className="text-sm text-slate-500 font-light">تعديل حي وفوري ينعكس على الواجهة الأمامية مباشرة.</p>
        </header>

        {/* 1. Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
            {[
              { label: "المنتجات الفعالة", val: products.length, color: "text-orange-500" },
              { label: "صور المعرض", val: galleryItems.length, color: "text-blue-500" },
              { label: "الآراء المسجلة", val: testimonials.length, color: "text-green-500" },
              { label: "حالة السيرفر", val: tempSettings.dbConfig.isConnected ? "متصل" : "أوفلاين", color: tempSettings.dbConfig.isConnected ? "text-green-500" : "text-red-500" }
            ].map((stat, i) => (
              <div key={i} className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5 flex flex-col justify-between">
                <span className="text-xs font-bold text-slate-500">{stat.label}</span>
                <span className={`text-4xl lg:text-6xl font-black mt-6 ${stat.color}`}>{stat.val}</span>
              </div>
            ))}
          </div>
        )}

        {/* 2. Database Connection (MySQL) */}
        {activeTab === 'database' && (
          <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl">
             <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5 space-y-8 shadow-2xl">
                <div className="flex justify-between items-center border-b border-white/5 pb-6">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                     </div>
                     <h3 className="text-white font-black text-lg">إعدادات MySQL Server</h3>
                  </div>
                  {tempSettings.dbConfig.isConnected ? (
                    <span className="bg-green-600/20 border border-green-600/30 text-green-500 px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-2">
                       <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                       متصل نشط
                    </span>
                  ) : (
                    <span className="bg-red-600/20 border border-red-600/30 text-red-500 px-4 py-2 rounded-full text-[10px] font-black tracking-widest uppercase flex items-center gap-2">
                       <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                       غير متصل
                    </span>
                  )}
                </div>
                
                <div className="bg-orange-600/10 border border-orange-600/20 p-5 rounded-xl text-orange-400 text-xs leading-relaxed font-bold">
                  <strong>توضيح هندسي:</strong> للحفاظ على أمان البيانات في تطبيقات الـ React (Frontend)، يتم تجميع بيانات الاتصال هذه وإرسالها إلى الخادم الخلفي (Backend Node.js أو PHP) لإنشاء الاتصال الفعلي وإنشاء جداول الـ Schema.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-xs font-bold text-slate-400 mb-2">الخادم (Host)</label>
                     <input type="text" value={tempSettings.dbConfig.host} onChange={e => setTempSettings({...tempSettings, dbConfig: {...tempSettings.dbConfig, host: e.target.value}})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 transition-all font-mono" dir="ltr" placeholder="localhost أو عنوان IP" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-slate-400 mb-2">المنفذ (Port)</label>
                     <input type="text" value={tempSettings.dbConfig.port} onChange={e => setTempSettings({...tempSettings, dbConfig: {...tempSettings.dbConfig, port: e.target.value}})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 transition-all font-mono" dir="ltr" placeholder="3306" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-slate-400 mb-2">اسم المستخدم (Username)</label>
                     <input type="text" value={tempSettings.dbConfig.user} onChange={e => setTempSettings({...tempSettings, dbConfig: {...tempSettings.dbConfig, user: e.target.value}})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 transition-all font-mono" dir="ltr" placeholder="root" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-slate-400 mb-2">كلمة المرور (Password)</label>
                     <input type="password" value={tempSettings.dbConfig.pass} onChange={e => setTempSettings({...tempSettings, dbConfig: {...tempSettings.dbConfig, pass: e.target.value}})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 transition-all font-mono" dir="ltr" placeholder="••••••••" />
                   </div>
                   <div className="md:col-span-2">
                     <label className="block text-xs font-bold text-slate-400 mb-2">اسم قاعدة البيانات (Database Name)</label>
                     <input type="text" value={tempSettings.dbConfig.dbName} onChange={e => setTempSettings({...tempSettings, dbConfig: {...tempSettings.dbConfig, dbName: e.target.value}})} className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-blue-500 transition-all font-mono" dir="ltr" placeholder="alasimh_db" />
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/5">
                  <button onClick={handleTestDBConnection} disabled={isTestingDB} className="flex-1 py-4 bg-[#111] border border-white/10 text-white font-black uppercase text-xs rounded-xl hover:bg-blue-600/20 hover:border-blue-500/50 hover:text-blue-400 transition-all flex justify-center items-center">
                    {isTestingDB ? <span className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></span> : 'اختبار الاتصال بالخادم'}
                  </button>
                  <button onClick={saveDBConfig} className="flex-1 py-4 bg-white text-black font-black uppercase text-xs rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02] transition-all">حفظ وتوليد الـ Schema</button>
                </div>
             </div>
          </div>
        )}

        {/* 3. Settings & Media */}
        {activeTab === 'settings' && (
          <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Visual Assets (Favicon & Hero BG) */}
              <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5 space-y-6 lg:col-span-2">
                <h3 className="text-orange-500 font-black text-sm border-b border-white/5 pb-4">الوسائط الأساسية (الأيقونة والغلاف)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div>
                     <label className="block text-xs text-slate-500 mb-2">رابط أيقونة الموقع (Favicon URL)</label>
                     <div className="flex gap-4 items-center">
                        <img src={tempSettings.favicon} alt="Favicon Preview" className="w-12 h-12 rounded-lg bg-white/10 p-1 object-contain" />
                        <input type="text" value={tempSettings.favicon} onChange={e => setTempSettings({...tempSettings, favicon: e.target.value})} className="flex-grow bg-black border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-orange-500" dir="ltr" />
                     </div>
                   </div>
                   <div>
                     <label className="block text-xs text-slate-500 mb-2">رابط صورة الغلاف الرئيسية (Hero Background)</label>
                     <div className="flex gap-4 items-center">
                        <img src={tempSettings.heroBg} alt="Hero Preview" className="w-16 h-12 rounded-lg bg-white/10 object-cover" />
                        <input type="text" value={tempSettings.heroBg} onChange={e => setTempSettings({...tempSettings, heroBg: e.target.value})} className="flex-grow bg-black border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-orange-500" dir="ltr" />
                     </div>
                   </div>
                </div>
              </div>

              {/* Brand Identity */}
              <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5 space-y-6">
                <h3 className="text-orange-500 font-black text-sm border-b border-white/5 pb-4">النصوص والهوية</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-2">اسم الماركة (عربي / إنجليزي)</label>
                    <div className="flex gap-2">
                       <input type="text" value={tempSettings.brandName.ar} onChange={e => setTempSettings({...tempSettings, brandName: {...tempSettings.brandName, ar: e.target.value}})} className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-orange-500" />
                       <input type="text" value={tempSettings.brandName.en} onChange={e => setTempSettings({...tempSettings, brandName: {...tempSettings.brandName, en: e.target.value}})} className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-orange-500" dir="ltr" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-2">الشعار النصي أسفل اللوجو</label>
                    <input type="text" value={tempSettings.logoText} onChange={e => setTempSettings({...tempSettings, logoText: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-orange-500" />
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5 space-y-6">
                <h3 className="text-orange-500 font-black text-sm border-b border-white/5 pb-4">بيانات التواصل المباشر</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-slate-500 mb-2">رقم الواتساب / الهاتف</label>
                    <div className="flex gap-2">
                       <input type="text" value={tempSettings.whatsapp} onChange={e => setTempSettings({...tempSettings, whatsapp: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-green-500" dir="ltr" placeholder="Whatsapp" />
                       <input type="text" value={tempSettings.phone} onChange={e => setTempSettings({...tempSettings, phone: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-orange-500" dir="ltr" placeholder="Phone" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-500 mb-2">البريد الإلكتروني</label>
                    <input type="text" value={tempSettings.email} onChange={e => setTempSettings({...tempSettings, email: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-orange-500" dir="ltr" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 bg-[#0a0a0a] p-8 rounded-[2rem] border border-white/5 space-y-6">
                <h3 className="text-orange-500 font-black text-sm border-b border-white/5 pb-4">تحسين محركات البحث السيو (SEO)</h3>
                <textarea value={tempSettings.seoDescription} onChange={e => setTempSettings({...tempSettings, seoDescription: e.target.value})} className="w-full bg-black border border-white/10 rounded-xl p-4 text-sm outline-none focus:border-orange-500 h-24 resize-none leading-relaxed" />
              </div>
            </div>
            
            <button onClick={saveSettings} className="px-16 py-6 ember-gradient text-black font-black uppercase text-sm rounded-2xl shadow-xl hover:scale-105 transition-all">حفظ الإعدادات الشاملة</button>
          </div>
        )}

        {/* 4. Products / Features */}
        {activeTab === 'products' && (
          <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl">
            {tempProducts.map((prod, index) => (
              <div key={prod.id} className="bg-[#0a0a0a] p-6 rounded-[2rem] border border-white/5 flex flex-col md:flex-row gap-8 items-start">
                 <div className="w-full md:w-1/4 space-y-4">
                    <img src={prod.img} className="w-full h-32 object-cover rounded-xl border border-white/10" alt="Preview" />
                    <input type="text" value={prod.img} onChange={e => { const newP = [...tempProducts]; newP[index].img = e.target.value; setTempProducts(newP); }} className="w-full bg-black border border-white/10 rounded-lg p-2 text-xs outline-none" placeholder="Image URL" dir="ltr" />
                    <input type="text" value={prod.icon} onChange={e => { const newP = [...tempProducts]; newP[index].icon = e.target.value; setTempProducts(newP); }} className="w-full bg-black border border-white/10 rounded-lg p-2 text-xs outline-none text-center" placeholder="Icon (Emoji)" />
                 </div>
                 <div className="flex-grow space-y-4 w-full">
                    <div className="grid grid-cols-2 gap-4">
                       <input type="text" value={prod.title.ar} onChange={e => { const newP = [...tempProducts]; newP[index].title.ar = e.target.value; setTempProducts(newP); }} className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm font-bold text-white outline-none" placeholder="Title AR" />
                       <input type="text" value={prod.title.en} onChange={e => { const newP = [...tempProducts]; newP[index].title.en = e.target.value; setTempProducts(newP); }} className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm font-bold text-white outline-none" placeholder="Title EN" dir="ltr" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <textarea value={prod.desc.ar} onChange={e => { const newP = [...tempProducts]; newP[index].desc.ar = e.target.value; setTempProducts(newP); }} className="w-full bg-black border border-white/10 rounded-lg p-3 text-xs outline-none resize-none h-20" placeholder="Desc AR" />
                       <textarea value={prod.desc.en} onChange={e => { const newP = [...tempProducts]; newP[index].desc.en = e.target.value; setTempProducts(newP); }} className="w-full bg-black border border-white/10 rounded-lg p-3 text-xs outline-none resize-none h-20" placeholder="Desc EN" dir="ltr" />
                    </div>
                 </div>
              </div>
            ))}
            <button onClick={saveProducts} className="px-16 py-6 ember-gradient text-black font-black uppercase text-sm rounded-2xl shadow-xl hover:scale-105 transition-all">حفظ تعديلات المنتجات</button>
          </div>
        )}

        {/* 5. Gallery */}
        {activeTab === 'gallery' && (
          <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {tempGallery.map((item, index) => (
                 <div key={item.id} className="bg-[#0a0a0a] p-4 rounded-2xl border border-white/5 space-y-4">
                    <img src={item.img} className="w-full h-40 object-cover rounded-xl" alt="Gallery" />
                    <input type="text" value={item.img} onChange={e => { const newG = [...tempGallery]; newG[index].img = e.target.value; setTempGallery(newG); }} className="w-full bg-black border border-white/10 rounded-lg p-2 text-xs outline-none" placeholder="Image URL" dir="ltr" />
                    <input type="text" value={item.title.ar} onChange={e => { const newG = [...tempGallery]; newG[index].title.ar = e.target.value; setTempGallery(newG); }} className="w-full bg-black border border-white/10 rounded-lg p-2 text-xs font-bold outline-none" placeholder="Title AR" />
                 </div>
               ))}
            </div>
            <button onClick={saveGallery} className="px-16 py-6 ember-gradient text-black font-black uppercase text-sm rounded-2xl shadow-xl hover:scale-105 transition-all">حفظ المعرض</button>
          </div>
        )}

        {/* 6. Testimonials */}
        {activeTab === 'testimonials' && (
          <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {tempTestimonials.map((t, index) => (
                 <div key={t.id} className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 space-y-4 flex flex-col">
                    <div className="flex gap-4">
                       <img src={t.avatar} className="w-16 h-16 rounded-full border border-orange-500 object-cover" alt="Avatar" />
                       <div className="flex-grow space-y-2">
                         <input type="text" value={t.name.ar} onChange={e => { const newT = [...tempTestimonials]; newT[index].name.ar = e.target.value; setTempTestimonials(newT); }} className="w-full bg-black border border-white/10 rounded-lg p-2 text-sm font-bold outline-none" placeholder="Name AR" />
                         <input type="text" value={t.role.ar} onChange={e => { const newT = [...tempTestimonials]; newT[index].role.ar = e.target.value; setTempTestimonials(newT); }} className="w-full bg-black border border-white/10 rounded-lg p-2 text-xs text-orange-500 outline-none" placeholder="Role AR" />
                       </div>
                    </div>
                    <textarea value={t.content.ar} onChange={e => { const newT = [...tempTestimonials]; newT[index].content.ar = e.target.value; setTempTestimonials(newT); }} className="w-full bg-black border border-white/10 rounded-lg p-3 text-sm outline-none resize-none h-24" placeholder="Review Content" />
                    <input type="text" value={t.avatar} onChange={e => { const newT = [...tempTestimonials]; newT[index].avatar = e.target.value; setTempTestimonials(newT); }} className="w-full bg-black border border-white/10 rounded-lg p-2 text-xs outline-none" placeholder="Avatar URL" dir="ltr" />
                 </div>
               ))}
            </div>
            <button onClick={saveTestimonials} className="px-16 py-6 ember-gradient text-black font-black uppercase text-sm rounded-2xl shadow-xl hover:scale-105 transition-all">حفظ الآراء</button>
          </div>
        )}

        {/* 7. Blog */}
        {activeTab === 'blog' && (
          <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl">
             {articles.map(article => (
                <div key={article.id} className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                   <div className="flex items-center space-x-reverse space-x-6">
                      <img src={article.img} className="w-20 h-20 rounded-xl object-cover border border-white/10" alt="Blog Thumb" />
                      <div>
                         <h4 className="font-black text-lg text-white mb-2">{article.title.ar}</h4>
                         <span className="text-slate-500 text-xs">{article.date.ar}</span>
                      </div>
                   </div>
                   <button onClick={() => { setArticles(articles.filter(a => a.id !== article.id)); showToast('تم حذف المقال'); }} className="px-4 py-2 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white rounded-lg text-xs font-bold transition-all">حذف المقال</button>
                </div>
             ))}
          </div>
        )}

      </main>
    </div>
  );
};
