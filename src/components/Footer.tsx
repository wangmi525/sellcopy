'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><span className="text-white text-[10px] font-bold">SC</span></div>
              <span className="text-[15px] font-bold">SellCopy</span>
            </div>
            <p className="text-[13px] text-gray-400 leading-relaxed">AI-powered product descriptions for e-commerce sellers worldwide.</p>
          </div>
          <div>
            <h4 className="text-[12px] font-semibold text-gray-300 uppercase tracking-wide mb-4">Product</h4>
            <ul className="space-y-2.5">
              <li><a href="#features" className="text-[13px] text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-[13px] text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-[13px] text-gray-400 hover:text-white transition-colors">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-semibold text-gray-300 uppercase tracking-wide mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-[13px] text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-[13px] text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-[13px] text-gray-400 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[12px] font-semibold text-gray-300 uppercase tracking-wide mb-4">Legal</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-[13px] text-gray-400 hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="text-[13px] text-gray-400 hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-[12px] text-gray-500">© 2026 SellCopy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
