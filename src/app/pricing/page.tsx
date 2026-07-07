'use client';

import Link from 'next/link';
import { getSupabase } from '@/lib/supabase-client';
import { useState, useEffect } from 'react';

export default function PricingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState('');

  useEffect(() => {
    getSupabase().auth.getUser().then(({ data }) => setIsLoggedIn(!!data.user));
  }, []);

  const handleCheckout = async (priceId: string, planName: string) => {
    setLoading(planName);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Failed to create checkout. Please try again.');
      }
    } catch (err) {
      alert('Checkout failed. Please try again.');
    }
    setLoading('');
  };

  const plans = [
    { name: 'Free', price: '$0', period: '/forever', desc: 'Try before you buy', features: ['3 generations/day', 'Amazon & Shopify', 'Basic templates', 'English only'], cta: isLoggedIn ? 'Go to Dashboard' : 'Get Started', href: isLoggedIn ? '/dashboard' : '/auth', priceId: null, highlight: false },
    { name: 'Pro', price: '$9.9', period: '/month', desc: 'For serious sellers', features: ['Unlimited generations', 'All platforms', 'Multi-language', 'SEO optimization', 'Generation history', 'Priority support'], cta: isLoggedIn ? 'Upgrade to Pro' : 'Start Pro', priceId: 'price_1Tq7dA8AzvLpbRULWh8viK8N', highlight: true },
    { name: 'Business', price: '$19.9', period: '/month', desc: 'For teams & agencies', features: ['Everything in Pro', 'API access', 'Team collaboration', 'Custom templates', 'Bulk generation', 'Dedicated support'], cta: isLoggedIn ? 'Upgrade to Business' : 'Start Business', priceId: 'price_1Tq7fG8AzvLpbRULWmdAd5fN', highlight: false },
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-gray-100 py-5 px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><span className="text-white text-[9px] font-bold">SC</span></div>
            <span className="text-[14px] font-bold text-gray-900">SellCopy</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/#features" className="text-[12px] text-gray-500 hover:text-gray-900 transition-colors">Features</Link>
            <Link href="/pricing" className="text-[12px] text-gray-900 font-semibold">Pricing</Link>
            {isLoggedIn ? <Link href="/dashboard" className="px-5 py-2 bg-blue-600 text-white text-[12px] font-semibold rounded-lg hover:bg-blue-700 transition-colors">Dashboard</Link> : <Link href="/auth" className="px-5 py-2 bg-blue-600 text-white text-[12px] font-semibold rounded-lg hover:bg-blue-700 transition-colors">Login</Link>}
          </div>
        </div>
      </nav>
      <div className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[12px] text-blue-600 font-semibold tracking-wide uppercase mb-3">Pricing</p>
            <h2 className="text-[36px] md:text-[44px] font-bold text-gray-900 tracking-tight">Simple, Transparent Pricing</h2>
            <p className="text-[15px] text-gray-500 mt-4">Start free. Upgrade when you need more.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((p, i) => (
              <div key={i} className={`relative p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg ${p.highlight ? 'border-blue-600 bg-blue-50/50 shadow-md' : 'border-gray-200 bg-white'}`}>
                {p.highlight && <span className="absolute -top-3 left-8 px-3 py-1 bg-blue-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wide">Most Popular</span>}
                <h3 className="text-[16px] font-semibold text-gray-900 mb-1">{p.name}</h3>
                <p className="text-[12px] text-gray-500 mb-4">{p.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-[40px] font-bold text-gray-900">{p.price}</span>
                  <span className="text-[14px] text-gray-400">{p.period}</span>
                </div>
                {p.priceId ? (
                  <button
                    onClick={() => handleCheckout(p.priceId!, p.name)}
                    disabled={loading === p.name}
                    className={`w-full py-3 rounded-xl text-[13px] font-semibold transition-colors ${p.highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-900 text-white hover:bg-gray-800'} disabled:opacity-50`}
                  >
                    {loading === p.name ? 'Redirecting to Stripe...' : p.cta}
                  </button>
                ) : (
                  <Link href={p.href} className="block w-full py-3 rounded-xl text-[13px] font-semibold text-center transition-colors bg-gray-900 text-white hover:bg-gray-800">{p.cta}</Link>
                )}
                <ul className="mt-8 space-y-3">
                  {p.features.map((f, j) => <li key={j} className="flex items-center gap-2.5 text-[13px] text-gray-600"><svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{f}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
