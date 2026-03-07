'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async () => {
    setStatus('loading');
    setMessage('');

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) { setStatus('error'); setMessage(error.message); }
      else { setStatus('success'); setMessage('Check your email to confirm your account!'); }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setStatus('error'); setMessage(error.message); }
      else router.push('/dashboard');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full max-w-md">
        <a href="/" className="text-xl font-bold tracking-tight text-gray-900">Proveify</a>
        <h1 className="text-2xl font-bold mt-6 mb-1">{isSignUp ? 'Create your account' : 'Welcome back'}</h1>
        <p className="text-gray-500 text-sm mb-8">{isSignUp ? 'Start collecting testimonials today.' : 'Sign in to your Proveify dashboard.'}</p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {message && (
            <div className={`text-sm px-4 py-3 rounded-lg ${status === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {message}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            {status === 'loading' ? 'Please wait...' : isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button onClick={() => { setIsSignUp(!isSignUp); setMessage(''); }} className="text-indigo-600 font-semibold hover:underline">
            {isSignUp ? 'Sign in' : 'Sign up free'}
          </button>
        </p>
      </div>
    </main>
  );
}
