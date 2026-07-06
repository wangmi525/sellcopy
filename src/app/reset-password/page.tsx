'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getSupabase } from '@/lib/supabase-client'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const supabase = getSupabase()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth?type=recovery`,
    })
    if (error) setError(error.message)
    else setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center"><span className="text-white text-[11px] font-bold">S</span></div>
            <span className="text-[18px] font-bold text-gray-900">SellCopy</span>
          </Link>
          <h1 className="text-[24px] font-bold text-gray-900">{sent ? 'Check your email' : 'Reset password'}</h1>
          <p className="text-[14px] text-gray-500 mt-2">{sent ? 'We sent a reset link to your email' : 'Enter your email and we\'ll send you a reset link'}</p>
        </div>
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-4"><span className="text-3xl">✉️</span></div>
              <p className="text-[14px] text-gray-600 mb-4">Check your email inbox and click the reset link</p>
              <Link href="/auth" className="text-[13px] text-blue-600 hover:text-blue-700 font-medium">Back to login</Link>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleReset}>
              <div>
                <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[14px] focus:border-blue-500 outline-none" required />
              </div>
              {error && <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-[13px] text-red-600">{error}</div>}
              <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white text-[14px] font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <div className="text-center">
                <Link href="/auth" className="text-[13px] text-blue-600 hover:text-blue-700 font-medium">Back to login</Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
