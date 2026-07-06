'use client';

const plans = [
  { name: 'Free', price: '$0', period: '/forever', desc: 'Try before you buy', features: ['3 generations/day', 'Amazon & Shopify', 'Basic templates', 'English only'], cta: 'Get Started', href: '/auth', highlight: false },
  { name: 'Pro', price: '$9.9', period: '/month', desc: 'For serious sellers', features: ['Unlimited generations', 'All platforms', 'Multi-language', 'SEO optimization', 'Generation history', 'Priority support'], cta: 'Start Pro', href: '/auth?plan=pro', highlight: true },
  { name: 'Business', price: '$19.9', period: '/month', desc: 'For teams & agencies', features: ['Everything in Pro', 'API access', 'Team collaboration', 'Custom templates', 'Bulk generation', 'Dedicated support'], cta: 'Start Business', href: '/auth?plan=business', highlight: false },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6">
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
              <a href={p.href} className={`block w-full py-3 rounded-xl text-[13px] font-semibold text-center transition-colors ${p.highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-900 text-white hover:bg-gray-800'}`}>
                {p.cta}
              </a>
              <ul className="mt-8 space-y-3">
                {p.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-[13px] text-gray-600">
                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
