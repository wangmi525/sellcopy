'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSupabase } from '@/lib/supabase-client';

const modes = [
  { id: 'product', label: 'Product Copy', icon: '📦', desc: 'Amazon/Shopify/Etsy listings' },
  { id: 'social', label: 'Social Media', icon: '📱', desc: 'Instagram/TikTok/Twitter posts' },
  { id: 'email', label: 'Email Marketing', icon: '✉️', desc: 'EDM campaigns & newsletters' },
  { id: 'seo', label: 'SEO Article', icon: '📝', desc: 'Blog posts & landing pages' },
  { id: 'ads', label: 'Ad Copy', icon: '📢', desc: 'Google/Facebook/Meta Ads' },
];

export default function DashboardPage() {
  const [usage, setUsage] = useState<any>(null);
  useEffect(() => { fetch('/api/usage').then(r => r.json()).then(setUsage).catch(() => {}); }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5"><div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center"><span className="text-white text-[12px] font-bold">S</span></div><span className="text-[16px] font-bold text-gray-900 hidden sm:block">SellCopy</span></Link>
            <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Link href="/dashboard" className="px-4 py-1.5 bg-white text-[12px] font-semibold text-gray-900 rounded-md shadow-sm">Generator</Link>
              <Link href="/dashboard/history" className="px-4 py-1.5 text-[12px] text-gray-500 hover:text-gray-700 rounded-md transition-colors">History</Link>
              <Link href="/dashboard/settings" className="px-4 py-1.5 text-[12px] text-gray-500 hover:text-gray-700 rounded-md transition-colors">Settings</Link>
            </div>
          </div>
          <div className="flex items-center gap-4 relative">
            <Link href="/pricing" className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /><span className="text-[11px] font-semibold text-blue-700">{usage?.plan === 'free' ? 'Free Plan' : usage?.plan || 'Free'}</span>{usage?.limit > 0 && <span className="text-[11px] text-blue-500">{usage?.remaining}/{usage?.limit}</span>}</Link>
            <MenuButton />
          </div>
        </div>
      </nav>
      <Tool />
    </div>
  );
}

function MenuButton() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center hover:ring-2 hover:ring-blue-500/20 transition-all">
        <span className="text-white text-[12px] font-bold">U</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-12 w-52 bg-white rounded-xl border border-gray-200 shadow-xl z-50 py-2">
            <div className="px-4 py-2 border-b border-gray-100"><p className="text-[13px] font-semibold text-gray-900">Account</p></div>
            <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors" onClick={() => setOpen(false)}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543-.826-3.31 2.37-2.37.997.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Settings
            </Link>
            <Link href="/dashboard/history" className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors" onClick={() => setOpen(false)}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              History
            </Link>
            <Link href="/pricing" className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-gray-600 hover:bg-gray-50 transition-colors" onClick={() => setOpen(false)}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Upgrade Plan
            </Link>
            <div className="border-t border-gray-100 mt-1 pt-1">
              <button onClick={async () => { getSupabase().auth.signOut().then(() => { window.location.href = '/'; }); }} className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-red-600 hover:bg-red-50 transition-colors w-full text-left">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Tool() {
  const [mode, setMode] = useState('product');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  // Product Copy fields
  const [prodName, setProdName] = useState('');
  const [prodType, setProdType] = useState('');
  const [platform, setPlatform] = useState('Amazon');
  const [language, setLanguage] = useState('English');
  const [tone, setTone] = useState('Professional');
  const [features, setFeatures] = useState('');

  // Social Media fields
  const [socialBrand, setSocialBrand] = useState('');
  const [socialPlatform, setSocialPlatform] = useState('Instagram');
  const [socialType, setSocialType] = useState('Product Post');
  const [socialHashtags, setSocialHashtags] = useState('');

  // Email fields
  const [emailProduct, setEmailProduct] = useState('');
  const [emailType, setEmailType] = useState('Welcome');
  const [emailCTA, setEmailCTA] = useState('');
  const [emailAudience, setEmailAudience] = useState('All Subscribers');

  // SEO fields
  const [seoKeyword, setSeoKeyword] = useState('');
  const [seoLength, setSeoLength] = useState('Medium (800 words)');
  const [seoTone, setSeoTone] = useState('Informative');
  const [seoAudience, setSeoAudience] = useState('');

  // Ad fields
  const [adProduct, setAdProduct] = useState('');
  const [adPlatform, setAdPlatform] = useState('Google Ads');
  const [adBudget, setAdBudget] = useState('$500-1000/month');
  const [adAudience, setAdAudience] = useState('');
  const [adGoal, setAdGoal] = useState('Sales');

  const productTypes = ['Electronics', 'Clothing', 'Beauty', 'Home', 'Sports', 'Food', 'Health', 'Other'];
  const languages = ['English', 'Chinese', 'Spanish', 'French', 'German', 'Japanese', 'Korean', 'Portuguese'];
  const tones = ['Professional', 'Casual', 'Luxury', 'Technical', 'Urgent', 'Friendly'];
  const platforms = ['Amazon', 'Shopify', 'Etsy', 'General'];
  const socialPlatforms = ['Instagram', 'TikTok', 'Twitter/X', 'Facebook', 'LinkedIn', 'Pinterest'];
  const socialTypes = ['Product Post', 'Story', 'Reel Script', 'Carousel', 'Brand Awareness', 'User Engagement'];
  const emailTypes = ['Welcome', 'Promotion', 'Follow-up', 'Cart Abandonment', 'Newsletter', 'Re-engagement'];
  const emailAudiences = ['All Subscribers', 'New Users', 'Returning Customers', 'VIP Customers', 'Inactive Users'];
  const seoLengths = ['Short (400 words)', 'Medium (800 words)', 'Long (1500 words)', 'Deep (2500+ words)'];
  const seoTones = ['Informative', 'Conversational', 'Technical', 'Storytelling', 'Listicle'];
  const seoAudiences = ['Beginners', 'Intermediate', 'Expert', 'General'];
  const adPlatforms = ['Google Ads', 'Facebook/Meta', 'TikTok Ads', 'LinkedIn Ads'];
  const adBudgets = ['$100-500/month', '$500-1000/month', '$1000-5000/month', '$5000+/month'];
  const adGoals = ['Sales', 'Leads', 'Traffic', 'Brand Awareness', 'App Downloads'];
  const adAudiences = ['B2C Consumers', 'B2B Decision Makers', 'Tech Enthusiasts', 'Budget Shoppers', 'Premium Buyers'];

  const getFormData = () => {
    switch (mode) {
      case 'product': return { input: prodName, mode: 'product', platform, language, tone, features, productType: prodType };
      case 'social': return { input: socialBrand, mode: 'social', platform: socialPlatform, language, tone, features: `Type: ${socialType}. Hashtags context: ${socialHashtags}` };
      case 'email': return { input: emailProduct, mode: 'email', platform: 'General', language, tone, features: `Type: ${emailType}. CTA: ${emailCTA}. Audience: ${emailAudience}` };
      case 'seo': return { input: seoKeyword, mode: 'seo', platform: 'General', language, tone: seoTone, features: `Length: ${seoLength}. Audience: ${seoAudience}` };
      case 'ads': return { input: adProduct, mode: 'ads', platform: adPlatform, language, tone: 'Urgent', features: `Budget: ${adBudget}. Goal: ${adGoal}. Audience: ${adAudience}` };
      default: return { input: prodName, mode: 'product' };
    }
  };

  const handleGenerate = async () => {
    const data = getFormData();
    if (!data.input) return;
    setLoading(true); setError(''); setResult(null);
    try {
      const session = await getSupabase().auth.getSession();
      const token = session.data.session?.access_token;
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...(token ? { 'Authorization': `Bearer ${token}` } : {}) },
        body: JSON.stringify(data)
      });
      const r = await res.json();
      if (r.error) setError(r.error); else setResult(r);
    } catch { setError('Generation failed.'); }
    finally { setLoading(false); }
  };

  const copyText = (t: string, f: string) => { navigator.clipboard.writeText(t); setCopied(f); setTimeout(() => setCopied(''), 2000); };
  const CB = ({ t, f }: { t: string; f: string }) => <button onClick={() => copyText(t, f)} className="text-[10px] font-semibold flex items-center gap-1 text-gray-400 hover:text-blue-600">{copied === f ? '✓ Copied' : 'Copy'}</button>;

  const currentMode = modes.find(m => m.id === mode)!;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Mode Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {modes.map(m => (
          <button key={m.id} onClick={() => { setMode(m.id); setResult(null); setError(''); }}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border transition-all flex-shrink-0 ${mode === m.id ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
            <span className="text-xl">{m.icon}</span>
            <div className="text-left"><p className={`text-[12px] font-semibold ${mode === m.id ? 'text-blue-700' : 'text-gray-900'}`}>{m.label}</p><p className="text-[10px] text-gray-400">{m.desc}</p></div>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Form Panel - Mode-specific */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-[15px] font-bold text-gray-900 mb-5">{currentMode.icon} {currentMode.label}</h2>

          {/* ===== PRODUCT COPY ===== */}
          {mode === 'product' && <div className="space-y-4">
            <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Product Name *</label><input type="text" value={prodName} onChange={e => setProdName(e.target.value)} placeholder="e.g. Wireless Bluetooth Earbuds Pro" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none" /></div>
            <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Product Type</label><select value={prodType} onChange={e => setProdType(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none"><option value="">Select...</option>{productTypes.map(t => <option key={t}>{t}</option>)}</select></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Platform</label><select value={platform} onChange={e => setPlatform(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{platforms.map(p => <option key={p}>{p}</option>)}</select></div>
              <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Language</label><select value={language} onChange={e => setLanguage(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{languages.map(l => <option key={l}>{l}</option>)}</select></div>
            </div>
            <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Tone</label><select value={tone} onChange={e => setTone(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{tones.map(t => <option key={t}>{t}</option>)}</select></div>
            <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Key Features</label><textarea value={features} onChange={e => setFeatures(e.target.value)} rows={2} placeholder="Noise cancelling, 24hr battery..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none resize-none" /></div>
          </div>}

          {/* ===== SOCIAL MEDIA ===== */}
          {mode === 'social' && <div className="space-y-4">
            <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Brand / Product *</label><input type="text" value={socialBrand} onChange={e => setSocialBrand(e.target.value)} placeholder="e.g. Premium Yoga Brand" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Platform</label><select value={socialPlatform} onChange={e => setSocialPlatform(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{socialPlatforms.map(p => <option key={p}>{p}</option>)}</select></div>
              <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Post Type</label><select value={socialType} onChange={e => setSocialType(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{socialTypes.map(t => <option key={t}>{t}</option>)}</select></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Language</label><select value={language} onChange={e => setLanguage(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{languages.map(l => <option key={l}>{l}</option>)}</select></div>
              <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Tone</label><select value={tone} onChange={e => setTone(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{tones.map(t => <option key={t}>{t}</option>)}</select></div>
            </div>
            <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Hashtags Context (optional)</label><textarea value={socialHashtags} onChange={e => setSocialHashtags(e.target.value)} rows={2} placeholder="e.g. fitness, yoga, wellness" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none resize-none" /></div>
          </div>}

          {/* ===== EMAIL MARKETING ===== */}
          {mode === 'email' && <div className="space-y-4">
            <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Product / Service *</label><input type="text" value={emailProduct} onChange={e => setEmailProduct(e.target.value)} placeholder="e.g. AI Writing Assistant" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email Type</label><select value={emailType} onChange={e => setEmailType(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{emailTypes.map(t => <option key={t}>{t}</option>)}</select></div>
              <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Target Audience</label><select value={emailAudience} onChange={e => setEmailAudience(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{emailAudiences.map(a => <option key={a}>{a}</option>)}</select></div>
            </div>
            <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">CTA Button Text (optional)</label><input type="text" value={emailCTA} onChange={e => setEmailCTA(e.target.value)} placeholder="e.g. Shop Now" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Language</label><select value={language} onChange={e => setLanguage(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{languages.map(l => <option key={l}>{l}</option>)}</select></div>
              <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Tone</label><select value={tone} onChange={e => setTone(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{tones.map(t => <option key={t}>{t}</option>)}</select></div>
            </div>
          </div>}

          {/* ===== SEO ARTICLE ===== */}
          {mode === 'seo' && <div className="space-y-4">
            <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Target Keyword *</label><input type="text" value={seoKeyword} onChange={e => setSeoKeyword(e.target.value)} placeholder="e.g. best yoga mats 2026" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Article Length</label><select value={seoLength} onChange={e => setSeoLength(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{seoLengths.map(l => <option key={l}>{l}</option>)}</select></div>
              <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Tone</label><select value={seoTone} onChange={e => setSeoTone(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{seoTones.map(t => <option key={t}>{t}</option>)}</select></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Target Audience</label><select value={seoAudience} onChange={e => setSeoAudience(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{seoAudiences.map(a => <option key={a}>{a}</option>)}</select></div>
              <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Language</label><select value={language} onChange={e => setLanguage(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{languages.map(l => <option key={l}>{l}</option>)}</select></div>
            </div>
          </div>}

          {/* ===== AD COPY ===== */}
          {mode === 'ads' && <div className="space-y-4">
            <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Product / Service *</label><input type="text" value={adProduct} onChange={e => setAdProduct(e.target.value)} placeholder="e.g. AI Writing Tool" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Ad Platform</label><select value={adPlatform} onChange={e => setAdPlatform(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{adPlatforms.map(p => <option key={p}>{p}</option>)}</select></div>
              <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Campaign Goal</label><select value={adGoal} onChange={e => setAdGoal(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{adGoals.map(g => <option key={g}>{g}</option>)}</select></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Budget Range</label><select value={adBudget} onChange={e => setAdBudget(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{adBudgets.map(b => <option key={b}>{b}</option>)}</select></div>
              <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Target Audience</label><select value={adAudience} onChange={e => setAdAudience(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{adAudiences.map(a => <option key={a}>{a}</option>)}</select></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Language</label><select value={language} onChange={e => setLanguage(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{languages.map(l => <option key={l}>{l}</option>)}</select></div>
              <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Tone</label><select value={tone} onChange={e => setTone(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">{tones.map(t => <option key={t}>{t}</option>)}</select></div>
            </div>
          </div>}

          {error && <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-[12px] text-red-600 mt-3">{error}</div>}
          <button onClick={handleGenerate} disabled={loading || !getFormData().input} className="w-full py-3.5 bg-blue-600 text-white text-[13px] font-semibold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-40 shadow-sm shadow-blue-600/20 mt-4">
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm min-h-[500px]">
          <div className="flex items-center justify-between mb-5"><h2 className="text-[15px] font-bold text-gray-900">Results</h2>{result && <button onClick={() => { setResult(null); setError(''); }} className="text-[10px] text-gray-400 hover:text-gray-600 font-medium">Clear</button>}</div>
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="relative mb-6"><div className="w-14 h-14 rounded-full border-[3px] border-blue-100" /><div className="w-14 h-14 rounded-full border-[3px] border-blue-600 border-t-transparent animate-spin absolute top-0 left-0" /></div>
              <p className="text-[13px] font-medium text-gray-900">AI is generating...</p><p className="text-[11px] text-gray-400 mt-1">3-5 seconds</p>
            </div>
          ) : result ? (
            <div className="space-y-5">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100"><div className="flex items-center justify-between mb-2"><span className="text-[11px] font-semibold text-gray-600">Title / Headline</span><CB t={result.title || ''} f="title" /></div><p className="text-[13px] font-medium text-gray-900">{result.title}</p></div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100"><div className="flex items-center justify-between mb-2"><span className="text-[11px] font-semibold text-gray-600">{mode === 'product' ? 'Bullet Points' : mode === 'seo' ? 'Sections' : 'Key Points'}</span><CB t={result.bullets?.join('\n')} f="bullets" /></div><ul className="space-y-1.5">{result.bullets?.map((b: string, i: number) => <li key={i} className="flex gap-2 text-[12px] text-gray-600"><span className="text-blue-500">•</span>{b}</li>)}</ul></div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100"><div className="flex items-center justify-between mb-2"><span className="text-[11px] font-semibold text-gray-600">{mode === 'ads' ? 'Ad Copy' : mode === 'email' ? 'Email Body' : 'Description'}</span><CB t={result.description || ''} f="desc" /></div><p className="text-[12px] text-gray-600 leading-[1.8]">{result.description}</p></div>
              {result.seoKeywords && <div className="bg-gray-50 rounded-xl p-4 border border-gray-100"><div className="flex items-center justify-between mb-2"><span className="text-[11px] font-semibold text-gray-600">Keywords</span><CB t={result.seoKeywords?.join(', ')} f="kw" /></div><div className="flex flex-wrap gap-1.5">{result.seoKeywords?.map((k: string, i: number) => <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-medium rounded-full">{k}</span>)}</div></div>}
              {result.hashtags && <div className="bg-gray-50 rounded-xl p-4 border border-gray-100"><div className="flex items-center justify-between mb-2"><span className="text-[11px] font-semibold text-gray-600">Hashtags</span><CB t={result.hashtags?.map((h: string) => h.startsWith('#') ? h : '#' + h).join(' ')} f="tags" /></div><div className="flex flex-wrap gap-1.5">{result.hashtags?.map((h: string, i: number) => <span key={i} className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-medium rounded-full">{h.startsWith('#') ? h : '#' + h}</span>)}</div></div>}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-4"><span className="text-2xl">{currentMode.icon}</span></div>
              <p className="text-[14px] font-medium text-gray-700 mb-1">Ready to generate</p><p className="text-[11px] text-gray-400">{currentMode.desc}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
