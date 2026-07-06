'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const modes = [
  { id: 'product', label: 'Product Copy', icon: '📦', desc: 'Amazon/Shopify/Etsy listings' },
  { id: 'social', label: 'Social Media', icon: '📱', desc: 'Instagram/TikTok/Twitter posts' },
  { id: 'email', label: 'Email Marketing', icon: '✉️', desc: 'EDM campaigns & newsletters' },
  { id: 'seo', label: 'SEO Article', icon: '📝', desc: 'Blog posts & landing pages' },
  { id: 'ads', label: 'Ad Copy', icon: '📢', desc: 'Google/Facebook/Meta Ads' },
];

export default function DashboardPage() {
  const [usage, setUsage] = useState<any>(null);

  useEffect(() => {
    fetch('/api/usage').then(r => r.json()).then(setUsage).catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm shadow-blue-500/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              </div>
              <span className="text-[16px] font-bold text-gray-900 hidden sm:block">SellCopy</span>
            </Link>
            <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Link href="/dashboard" className="px-4 py-1.5 bg-white text-[12px] font-semibold text-gray-900 rounded-md shadow-sm">Generator</Link>
              <Link href="/dashboard/history" className="px-4 py-1.5 text-[12px] text-gray-500 hover:text-gray-700 rounded-md transition-colors">History</Link>
              <Link href="/dashboard/settings" className="px-4 py-1.5 text-[12px] text-gray-500 hover:text-gray-700 rounded-md transition-colors">Settings</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-[11px] font-semibold text-blue-700">{usage?.plan === 'free' ? 'Free Plan' : usage?.plan || 'Free'}</span>
              {usage?.limit > 0 && <span className="text-[11px] text-blue-500">{usage?.remaining}/{usage?.limit}</span>}
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white text-[12px] font-bold">U</span>
            </div>
          </div>
        </div>
      </nav>

      <GeneratorTool />
    </div>
  );
}

function GeneratorTool() {
  const [activeMode, setActiveMode] = useState('product');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [copiedField, setCopiedField] = useState('');
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkInput, setBulkInput] = useState('');

  const [form, setForm] = useState({
    input: '', productType: '', platform: 'amazon', language: 'English', tone: 'Professional', features: '',
  });

  const productTypes = ['Electronics', 'Clothing & Fashion', 'Beauty & Skincare', 'Home & Kitchen', 'Sports & Outdoors', 'Toys & Games', 'Food & Beverage', 'Health & Wellness', 'Automotive', 'Other'];
  const tones = ['Professional', 'Fun & Casual', 'Luxury', 'Technical', 'Urgent', 'Friendly'];
  const languages = ['English', 'Chinese', 'Spanish', 'French', 'German', 'Japanese', 'Korean', 'Portuguese', 'Italian', 'Arabic'];
  const platforms = ['Amazon', 'Shopify', 'Etsy', 'General'];

  const currentMode = modes.find(m => m.id === activeMode)!;

  const handleGenerate = async () => {
    if (!form.input) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: activeMode, ...form }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult(data);
    } catch (err: any) {
      setError('Generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkGenerate = async () => {
    if (!bulkInput.trim()) return;
    const items = bulkInput.split('\n').filter((l: string) => l.trim()).slice(0, 10);
    if (items.length === 0) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: activeMode, bulk: items.map((i: string) => ({ input: i.trim(), mode: activeMode, platform: form.platform, language: form.language, tone: form.tone })) }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else setResult({ bulk: true, items: data });
    } catch {
      setError('Bulk generation failed.');
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string, field: string) => { navigator.clipboard.writeText(text); setCopiedField(field); setTimeout(() => setCopiedField(''), 2000); };
  const CopyBtn = ({ text, field }: { text: string; field: string }) => (
    <button onClick={() => copyText(text, field)} className="text-[10px] font-semibold flex items-center gap-1 transition-colors text-gray-400 hover:text-blue-600">
      {copiedField === field ? <><svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Copied!</> : <><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>Copy</>}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Mode Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {modes.map((m) => (
          <button key={m.id} onClick={() => { setActiveMode(m.id); setResult(null); setForm({ ...form, input: '' }); }}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-xl border transition-all flex-shrink-0 ${activeMode === m.id ? 'border-blue-500 bg-blue-50 shadow-sm shadow-blue-500/10' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
            <span className="text-xl">{m.icon}</span>
            <div className="text-left">
              <p className={`text-[12px] font-semibold ${activeMode === m.id ? 'text-blue-700' : 'text-gray-900'}`}>{m.label}</p>
              <p className="text-[10px] text-gray-400">{m.desc}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Input Panel */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[15px] font-bold text-gray-900">{currentMode.icon} {currentMode.label}</h2>
            <button onClick={() => setBulkMode(!bulkMode)} className={`text-[10px] font-semibold px-3 py-1.5 rounded-lg transition-colors ${bulkMode ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500 hover:text-gray-700'}`}>
              {bulkMode ? 'Single' : 'Bulk'}
            </button>
          </div>

          {bulkMode ? (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">One item per line (max 10)</label>
                <textarea value={bulkInput} onChange={e => setBulkInput(e.target.value)} rows={8} placeholder={`Wireless Earbuds\nBluetooth Speaker\nYoga Mat\nGaming Mouse\nRunning Shoes`} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none resize-none" />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  {activeMode === 'product' ? 'Product Name' : activeMode === 'social' ? 'Brand / Product' : activeMode === 'email' ? 'Product / Service' : activeMode === 'seo' ? 'Target Keyword' : 'Product / Service'} *
                </label>
                <input type="text" value={form.input} onChange={e => setForm({ ...form, input: e.target.value })} placeholder={activeMode === 'product' ? 'e.g. Wireless Bluetooth Earbuds' : activeMode === 'seo' ? 'e.g. best yoga mats 2026' : 'e.g. Premium Yoga Brand'} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none transition-all" />
              </div>
              {activeMode === 'product' && (
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Product Type</label>
                  <select value={form.productType} onChange={e => setForm({ ...form, productType: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">
                    <option value="">Select type...</option>
                    {productTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Platform</label>
                  <select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">
                    {platforms.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Language</label>
                  <select value={form.language} onChange={e => setForm({ ...form, language: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">
                    {languages.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Tone</label>
                <select value={form.tone} onChange={e => setForm({ ...form, tone: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none">
                  {tones.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Key Features (optional)</label>
                <textarea value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} rows={2} placeholder="e.g. Noise cancelling, 24hr battery" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 focus:bg-white outline-none resize-none" />
              </div>
            </div>
          )}
          {error && <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-[12px] text-red-600 mt-3">{error}</div>}
          <button onClick={bulkMode ? handleBulkGenerate : handleGenerate} disabled={loading || (!bulkMode && !form.input)} className="w-full py-3.5 bg-blue-600 text-white text-[13px] font-semibold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-blue-600/20 mt-4">
            {loading ? 'Generating...' : bulkMode ? `Generate ${bulkInput.split('\n').filter((l: string) => l.trim()).length} Items` : 'Generate'}
          </button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm min-h-[500px]">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[15px] font-bold text-gray-900">Results</h2>
            {result && <button onClick={() => { setResult(null); setForm({ ...form, input: '' }); }} className="text-[10px] text-gray-400 hover:text-gray-600 font-medium transition-colors">Clear</button>}
          </div>
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="relative mb-6"><div className="w-14 h-14 rounded-full border-[3px] border-blue-100" /><div className="w-14 h-14 rounded-full border-[3px] border-blue-600 border-t-transparent animate-spin absolute top-0 left-0" /></div>
              <p className="text-[13px] font-medium text-gray-900">AI is working...</p>
              <p className="text-[11px] text-gray-400 mt-1">Usually 3-5 seconds</p>
            </div>
          ) : result?.bulk ? (
            <div className="space-y-4 max-h-[500px] overflow-y-auto">
              {result.items?.map((item: any, idx: number) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-blue-600">#{idx + 1}</span>
                    <CopyBtn text={`${item.title}\n\n${item.bullets?.join('\n')}\n\n${item.description}`} field={`bulk-${idx}`} />
                  </div>
                  <h3 className="text-[13px] font-semibold text-gray-900 mb-1">{item.title || item.input}</h3>
                  {item.bullets && <p className="text-[11px] text-gray-500">{item.bullets.length} bullet points generated</p>}
                </div>
              ))}
            </div>
          ) : result ? (
            <div className="space-y-5">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2"><span className="text-[11px] font-semibold text-gray-600">Title</span><CopyBtn text={result.title || ''} field="title" /></div>
                <p className="text-[13px] font-medium text-gray-900">{result.title}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2"><span className="text-[11px] font-semibold text-gray-600">{activeMode === 'product' ? 'Bullet Points' : 'Key Points'}</span><CopyBtn text={result.bullets?.join('\n')} field="bullets" /></div>
                <ul className="space-y-1.5">{result.bullets?.map((b: string, i: number) => <li key={i} className="flex gap-2 text-[12px] text-gray-600"><span className="text-blue-500 mt-0.5">•</span>{b}</li>)}</ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2"><span className="text-[11px] font-semibold text-gray-600">Description</span><CopyBtn text={result.description || ''} field="desc" /></div>
                <p className="text-[12px] text-gray-600 leading-[1.8]">{result.description}</p>
              </div>
              {result.seoKeywords && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-2"><span className="text-[11px] font-semibold text-gray-600">Keywords</span><CopyBtn text={result.seoKeywords?.join(', ')} field="keywords" /></div>
                  <div className="flex flex-wrap gap-1.5">{result.seoKeywords?.map((k: string, i: number) => <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-medium rounded-full">{k}</span>)}</div>
                </div>
              )}
              {result.hashtags && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center justify-between mb-2"><span className="text-[11px] font-semibold text-gray-600">Hashtags</span><CopyBtn text={result.hashtags?.map((h: string) => h.startsWith('#') ? h : '#' + h).join(' ')} field="tags" /></div>
                  <div className="flex flex-wrap gap-1.5">{result.hashtags?.map((h: string, i: number) => <span key={i} className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-medium rounded-full">{h.startsWith('#') ? h : '#' + h}</span>)}</div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-4"><span className="text-2xl">{currentMode.icon}</span></div>
              <p className="text-[14px] font-medium text-gray-700 mb-1">Ready to generate</p>
              <p className="text-[11px] text-gray-400">{currentMode.desc}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
