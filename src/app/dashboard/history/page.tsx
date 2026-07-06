'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function HistoryPage() {
  const [records, setRecords] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/generations').then(r => r.json()).then(d => setRecords(d.generations || [])).catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-[12px] font-bold">S</span>
              </div>
              <span className="text-[16px] font-bold text-gray-900 hidden sm:block">SellCopy</span>
            </Link>
            <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <Link href="/dashboard" className="px-4 py-1.5 text-[12px] text-gray-500 hover:text-gray-700 rounded-md transition-colors">Generator</Link>
              <Link href="/dashboard/history" className="px-4 py-1.5 bg-white text-[12px] font-semibold text-gray-900 rounded-md shadow-sm">History</Link>
            </div>
          </div>
          <Link href="/dashboard" className="px-5 py-2 bg-blue-600 text-white text-[12px] font-semibold rounded-xl hover:bg-blue-700 transition-colors">New Generation</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-[28px] font-bold text-gray-900 mb-8">Generation History</h1>

        {records.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mx-auto mb-5">
              <span className="text-3xl">📋</span>
            </div>
            <p className="text-[16px] font-medium text-gray-700 mb-2">No generations yet</p>
            <p className="text-[13px] text-gray-400 mb-6">Start by generating your first product copy</p>
            <Link href="/dashboard" className="inline-flex px-6 py-3 bg-blue-600 text-white text-[13px] font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-600/20">
              Go to Generator
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {records.map((r, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[14px] font-semibold text-gray-900">{r.product_name}</h3>
                    <p className="text-[11px] text-gray-400 mt-1">{r.platform} · {r.language} · {new Date(r.created_at).toLocaleDateString()}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-semibold rounded-full uppercase">{r.product_type}</span>
                </div>
                <p className="text-[12px] text-gray-500 mt-3 line-clamp-2">{r.result?.title || r.title}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
