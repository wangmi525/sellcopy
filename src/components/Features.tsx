'use client';

const features = [
  { icon: '🛒', title: 'Amazon SEO', desc: 'Optimized titles, bullet points, and descriptions following Amazon ranking algorithms.' },
  { icon: '🛍️', title: 'Shopify Listings', desc: 'Compelling product pages that convert visitors into buyers.' },
  { icon: '🎨', title: 'Etsy Tags & Descriptions', desc: 'Stand out in Etsy search with relevant tags and unique copy.' },
  { icon: '🌍', title: 'Multi-Language', desc: 'Generate listings in English, Chinese, Spanish, and more.' },
  { icon: '📊', title: 'SEO Keywords', desc: 'Automatic keyword research and integration for better ranking.' },
  { icon: '⚡', title: 'Instant Results', desc: 'Get professional copy in under 5 seconds. No waiting.' },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[12px] text-blue-600 font-semibold tracking-wide uppercase mb-3">Features</p>
          <h2 className="text-[36px] md:text-[44px] font-bold text-gray-900 tracking-tight">Everything You Need</h2>
          <p className="text-[15px] text-gray-500 mt-4 max-w-lg mx-auto">Powerful AI tools designed specifically for e-commerce sellers</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="p-7 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300">
              <span className="text-3xl block mb-4">{f.icon}</span>
              <h3 className="text-[15px] font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-[13px] text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
