'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function UpgradePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUser(user);
    };
    getUser();
  }, []);

  const handleUpgrade = async (plan: 'pro' | 'agency') => {
    setLoading(plan);
    const priceId = plan === 'pro'
      ? process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID
      : process.env.NEXT_PUBLIC_STRIPE_AGENCY_PRICE_ID;

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, userId: user.id, email: user.email }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <span className="text-lg font-bold tracking-tight">Proveify</span>
        <button onClick={() => router.push('/dashboard')} className="text-sm text-gray-500 hover:text-gray-900">
          ← Back to dashboard
        </button>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Upgrade Proveify</h1>
          <p className="text-gray-500">Unlock AI Polish, unlimited testimonials, and more.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {[
            {
              plan: 'pro' as const,
              name: 'Pro',
              price: '$19',
              desc: 'For freelancers & founders',
              features: ['Unlimited testimonials', 'AI Polish feature', 'Auto follow-up emails', 'Custom branding', 'Priority support'],
              highlight: true,
            },
            {
              plan: 'agency' as const,
              name: 'Agency',
              price: '$49',
              desc: 'For teams & agencies',
              features: ['Everything in Pro', 'Multiple workspaces', 'White-label widget', 'Client management', 'Team access'],
              highlight: false,
            }
          ].map((tier) => (
            <div key={tier.plan} className={`rounded-2xl p-8 border ${tier.highlight ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-gray-200 bg-white'}`}>
              <h2 className={`font-bold text-xl mb-1 ${tier.highlight ? 'text-white' : ''}`}>{tier.name}</h2>
              <div className={`text-4xl font-black mb-1 ${tier.highlight ? 'text-white' : ''}`}>
                {tier.price}<span className="text-sm font-normal">/mo</span>
              </div>
              <p className={`text-sm mb-6 ${tier.highlight ? 'text-indigo-200' : 'text-gray-400'}`}>{tier.desc}</p>
              <ul className="space-y-2 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className={`text-sm flex items-center gap-2 ${tier.highlight ? 'text-indigo-100' : 'text-gray-600'}`}>
                    <span>✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleUpgrade(tier.plan)}
                disabled={loading === tier.plan}
                className={`w-full py-3 rounded-lg text-sm font-semibold disabled:opacity-50 ${tier.highlight ? 'bg-white text-indigo-600 hover:bg-indigo-50' : 'bg-gray-900 text-white hover:bg-gray-700'}`}
              >
                {loading === tier.plan ? 'Redirecting...' : `Upgrade to ${tier.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
