'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgot, setIsForgot] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const supabase = createClient();
  const handleGoogleSignIn = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://proveify.app/dashboard',
    },
  });
  if (error) { setStatus('error'); setMessage(error.message); }
};
  const handleSubmit = async () => {
    setStatus('loading');
    setMessage('');

    if (isForgot) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://proveify.app/login',
      });
      if (error) { setStatus('error'); setMessage(error.message); }
      else { setStatus('success'); setMessage('Check your email for a password reset link.'); }
      return;
    }

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

        {!isForgot && (
          <>
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 mt-6"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.566 2.684-3.874 2.684-6.615z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-gray-100"></div>
              <span className="text-xs text-gray-400">or</span>
              <div className="flex-1 h-px bg-gray-100"></div>
            </div>
          </>
        )}
        <h1 className="text-2xl font-bold mt-6 mb-1">
          {isForgot ? 'Reset your password' : isSignUp ? 'Create your account' : 'Welcome back'}
        </h1>
        <p className="text-gray-500 text-sm mb-8">
          {isForgot ? "We'll send a reset link to your email." : isSignUp ? 'Start collecting testimonials today.' : 'Sign in to your Proveify dashboard.'}
        </p>

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

          {!isForgot && (
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
          )}

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
            {status === 'loading' ? 'Please wait...' : isForgot ? 'Send reset link' : isSignUp ? 'Create account' : 'Sign in'}
          </button>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6 space-y-2">
          {!isForgot && (
            <p>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button onClick={() => { setIsSignUp(!isSignUp); setMessage(''); }} className="text-indigo-600 font-semibold hover:underline">
                {isSignUp ? 'Sign in' : 'Sign up free'}
              </button>
            </p>
          )}
          <p>
            <button
              onClick={() => { setIsForgot(!isForgot); setMessage(''); }}
              className="text-gray-400 hover:text-indigo-600 hover:underline"
            >
              {isForgot ? '← Back to sign in' : 'Forgot password?'}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
