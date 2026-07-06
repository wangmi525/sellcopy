'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getSupabase } from '@/lib/supabase-client';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const supabase = getSupabase();

    try {
      if (isLogin) {
        const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
        if (authError) {
          setError(authError.message);
        } else if (data.session) {
          window.location.href = '/dashboard';
        }
      } else {
        const { data, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } },
        });
        if (authError) {
          setError(authError.message);
        } else if (data.session) {
          window.location.href = '/dashboard';
        } else {
          setSuccess('Account created! Try signing in now.');
          setIsLogin(true);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center"><span className="text-white text-[11px] font-bold">SC</span></div>
            <span className="text-[18px] font-bold text-gray-900">SellCopy</span>
          </Link>
          <h1 className="text-[24px] font-bold text-gray-900">{isLogin ? 'Welcome back' : 'Create your account'}</h1>
          <p className="text-[14px] text-gray-500 mt-2">{isLogin ? 'Sign in to continue' : 'Start generating product copy for free'}</p>
        </div>
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div>
                <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[14px] focus:border-blue-500 outline-none" />
              </div>
            )}
            <div>
              <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[14px] focus:border-blue-500 outline-none" required />
            </div>
            <div>
              <label className="block text-[12px] font-semibold text-gray-700 mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-[14px] focus:border-blue-500 outline-none" required minLength={6} />
            </div>
            {isLogin && (
              <div className="text-right -mt-2">
                <Link href="/reset-password" className="text-[12px] text-blue-600 hover:text-blue-700 font-medium">Forgot password?</Link>
              </div>
            )}
            {error && <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-[13px] text-red-600">{error}</div>}
            {success && <div className="p-3 bg-green-50 border border-green-100 rounded-lg text-[13px] text-green-600">{success}</div>}
            <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white text-[14px] font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50">
              {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <button onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }} className="text-[13px] text-blue-600 hover:text-blue-700 font-medium">
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
