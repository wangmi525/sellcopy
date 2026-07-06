'use client';

import { useState } from 'react';

export default function Generator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [form, setForm] = useState({ productName: '', productType: '', platform: 'amazon', language: 'English', features: '', tone: 'Professional' });

  const productTypes = ['Electronics', 'Clothing & Fashion', 'Beauty & Skincare', 'Home & Kitchen', 'Sports & Outdoors', 'Toys & Games', 'Food & Beverage', 'Health & Wellness', 'Automotive', 'Other'];

  const handleGenerate = async () => {
    if (!form.productName || !form.productType) return;
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section className="py-24 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-[32px] md:text-[40px] font-bold text-gray-900 tracking-tight">Try It Now</h2>
          <p className="text-[14px] text-gray-500 mt-3">Generate your first product listing for free</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            <div className="space-y-5">
              <div>
                <label className="block text-[12px] font-semibold text-gray-700 mb-2 uppercase tracking-wide">Product Name *</label>
                <input type="text" value={form.productName} onChange={e => setForm({ ...form, productName: e.target.value })} placeholder="e.g. Wireless Bluetooth Earbuds" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[14px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-700 mb-2 uppercase tracking-wide">Product Type *</label>
                <select value={form.productType} onChange={e => setForm({ ...form, productType: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[14px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all bg-white">
                  <option value="">Select type...</option>
                  {productTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-semibold text-gray-700 mb-2 uppercase tracking-wide">Platform</label>
                  <select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[14px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all bg-white">
                    <option value="amazon">Amazon</option>
                    <option value="shopify">Shopify</option>
                    <option value="etsy">Etsy</option>
                    <option value="general">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-semibold text-gray-700 mb-2 uppercase tracking-wide">Language</label>
                  <select value={form.language} onChange={e => setForm({ ...form, language: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[14px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all bg-white">
                    <option>English</option>
                    <option>Chinese</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                    <option>Japanese</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[12px] font-semibold text-gray-700 mb-2 uppercase tracking-wide">Key Features (optional)</label>
                <textarea value={form.features} onChange={e => setForm({ ...form, features: e.target.value })} rows={3} placeholder="e.g. Noise cancelling, 24hr battery, IPX5 waterproof" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[14px] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 outline-none transition-all resize-none" />
              </div>
              <button onClick={handleGenerate} disabled={loading || !form.productName || !form.productType} className="w-full py-3.5 bg-blue-600 text-white text-[14px] font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Generating...' : 'Generate Copy'}
              </button>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-200">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-[14px] text-gray-500">AI is writing your copy...</p>
              </div>
            ) : result ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[12px] font-semibold text-gray-700 uppercase tracking-wide">Title</h3>
                    <button onClick={() => copyToClipboard(result.title)} className="text-[11px] text-blue-600 hover:text-blue-700 font-medium">Copy</button>
                  </div>
                  <p className="text-[14px] text-gray-900 font-medium p-3 bg-gray-50 rounded-lg">{result.title}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[12px] font-semibold text-gray-700 uppercase tracking-wide">Bullet Points</h3>
                    <button onClick={() => copyToClipboard(result.bullets?.join('\n'))} className="text-[11px] text-blue-600 hover:text-blue-700 font-medium">Copy All</button>
                  </div>
                  <ul className="space-y-2">
                    {result.bullets?.map((b: string, i: number) => (
                      <li key={i} className="flex items-start gap-2 text-[13px] text-gray-600 p-3 bg-gray-50 rounded-lg">
                        <span className="text-blue-600 mt-0.5">•</span>{b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-[12px] font-semibold text-gray-700 uppercase tracking-wide">Description</h3>
                    <button onClick={() => copyToClipboard(result.description)} className="text-[11px] text-blue-600 hover:text-blue-700 font-medium">Copy</button>
                  </div>
                  <p className="text-[13px] text-gray-600 leading-relaxed p-3 bg-gray-50 rounded-lg">{result.description}</p>
                </div>
                <div>
                  <h3 className="text-[12px] font-semibold text-gray-700 uppercase tracking-wide mb-2">SEO Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.seoKeywords?.map((k: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 text-[11px] font-medium rounded-full">{k}</span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <p className="text-[14px] text-gray-400">Fill in the form and click Generate</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
