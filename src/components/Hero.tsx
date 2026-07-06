'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="pt-28 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[11px] text-blue-600 font-medium">AI-Powered Content Studio</span>
        </div>
        <h1 className="text-[40px] md:text-[56px] font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-6">
          AI Product Descriptions<br />That <span className="text-blue-600">Sell</span>
        </h1>
        <p className="text-[17px] text-gray-500 max-w-[520px] mx-auto leading-relaxed mb-10">
          Generate SEO-optimized product listings for Amazon, Shopify, and Etsy in seconds. No writing skills needed.
        </p>
        <div className="flex justify-center gap-4 mb-10">
          <Link href="/auth" className="px-8 py-3.5 bg-blue-600 text-white text-[14px] font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
            Start Free
          </Link>
          <a href="#pricing" className="px-8 py-3.5 border border-gray-200 text-gray-700 text-[14px] font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all">
            See Pricing
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-[12px] text-gray-400">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            No credit card required
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            3 free generations/day
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            Amazon & Shopify
          </span>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-16">
        <div className="aspect-[16/9] bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-gray-100 flex items-center justify-center shadow-2xl shadow-blue-600/5">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <p className="text-[14px] text-gray-400">Product copy generator preview</p>
          </div>
        </div>
      </div>
    </section>
  );
}
