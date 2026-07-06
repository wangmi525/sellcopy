'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getSupabase } from '@/lib/supabase-client'

export default function SettingsPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const supabase = getSupabase()

  useEffect(() => {
    supabase.auth.getUser().then((result: any) => {
      const user = result.data?.user;
      if (user) {
        setName(user.user_metadata?.full_name || '')
        setEmail(user.email || '')
      }
    })
  }, [])

  const updateName = async () => {
    setLoading(true); setMessage(''); setError('')
    const { error } = await supabase.auth.updateUser({ data: { full_name: name } })
    if (error) setError(error.message)
    else setMessage('Name updated successfully')
    setLoading(false)
  }

  const updatePassword = async () => {
    if (newPassword.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true); setMessage(''); setError('')
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) setError(error.message)
    else { setMessage('Password updated successfully'); setNewPassword('') }
    setLoading(false)
  }

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
              <Link href="/dashboard/history" className="px-4 py-1.5 text-[12px] text-gray-500 hover:text-gray-700 rounded-md transition-colors">History</Link>
              <Link href="/dashboard/settings" className="px-4 py-1.5 bg-white text-[12px] font-semibold text-gray-900 rounded-md shadow-sm">Settings</Link>
            </div>
          </div>
          <Link href="/" className="px-4 py-2 text-[12px] text-gray-500 hover:text-gray-700">Sign Out</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-[28px] font-bold text-gray-900 mb-8">Account Settings</h1>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
          <h2 className="text-[16px] font-bold text-gray-900 mb-6">Profile</h2>
          {message && <div className="p-3 bg-green-50 border border-green-100 rounded-lg text-[13px] text-green-600 mb-4">{message}</div>}
          {error && <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-[13px] text-red-600 mb-4">{error}</div>}
          <div className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Name</label>
              <div className="flex gap-3">
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 outline-none" />
                <button onClick={updateName} disabled={loading} className="px-6 py-3 bg-blue-600 text-white text-[13px] font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50">Save</button>
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
              <input type="email" value={email} disabled className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-[13px] text-gray-400 cursor-not-allowed" />
              <p className="text-[11px] text-gray-400 mt-1">Email cannot be changed</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8">
          <h2 className="text-[16px] font-bold text-gray-900 mb-6">Change Password</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">New Password</label>
              <div className="flex gap-3">
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="At least 6 characters" className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-[13px] focus:border-blue-500 outline-none" />
                <button onClick={updatePassword} disabled={loading || !newPassword} className="px-6 py-3 bg-gray-900 text-white text-[13px] font-semibold rounded-xl hover:bg-gray-800 disabled:opacity-50">Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
