'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">SC</span>
          </div>
          <span className="text-[15px] font-bold text-gray-900">SellCopy</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors">Features</a>
          <a href="#pricing" className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors">Pricing</a>
          <Link href="/auth" className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors">Login</Link>
          <Link href="/auth" className="px-5 py-2 bg-blue-600 text-white text-[13px] font-semibold rounded-lg hover:bg-blue-700 transition-colors">Start Free</Link>
        </div>
      </div>
    </nav>
  );
}
