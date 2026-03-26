'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push('/dashboard');
      }
    });
  }, []);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100 max-w-6xl mx-auto">
        <span className="text-xl font-bold tracking-tight">Proveify</span>
        <div className="flex items-center gap-4">
          <a href="#how-it-works" className="hidden sm:block text-sm text-gray-500 hover:text-gray-900">How it works</a>
          <a href="#pricing" className="hidden sm:block text-sm text-gray-500 hover:text-gray-900">Pricing</a>
          <a href="/blog" className="hidden sm:block text-sm text-gray-500 hover:text-gray-900">Blog</a>
          <a href="/example" className="hidden sm:block text-sm text-gray-500 hover:text-gray-900">See example</a>
          <a href="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Login</a>
          <a href="/login" className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800">Start free</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          ✨ Client-approved testimonials in minutes
        </div>
        <h1 className="text-5xl sm:text-6xl font-black leading-tight tracking-tight mb-6">
          Turn "great working with you"<br />
          <span className="text-indigo-600">into testimonials that actually sell.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-4 leading-relaxed">
          Stop chasing vague feedback. Get client-approved testimonials you can actually use — in minutes.
        </p>
        <p className="text-base text-gray-400 mb-10">No chasing. No awkward asks. No rewriting feedback yourself.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/login" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-indigo-700">
            Create your first usable testimonial →
          </a>
          <a href="#how-it-works" className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold text-base hover:bg-gray-200">
            See how it works
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-4">Free plan available · No credit card required</p>
      </section>

      {/* The transformation — the killer section */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <div className="text-center mb-10">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">The problem</p>
          <h2 className="text-3xl font-black">Most testimonials are completely useless.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* Before */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">What you usually get</p>
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-3">
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
              </div>
              <p className="text-gray-500 text-sm italic">"Great working with you!"</p>
            </div>
            <p className="text-xs text-red-400 font-semibold">Looks nice. Completely unusable.</p>
          </div>

          {/* After */}
          <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
            <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">What you actually need</p>
            <div className="bg-white rounded-xl border border-indigo-200 p-4 mb-3">
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
              </div>
              <p className="text-gray-700 text-sm italic">"Working with Alex was seamless — clear communication, fast delivery, and our traffic increased 40% within a month."</p>
            </div>
            <p className="text-xs text-indigo-600 font-semibold">Same client. Same feedback. Actually usable.</p>
          </div>
        </div>

        <div className="text-center bg-gray-900 rounded-2xl p-6">
          <p className="text-white font-black text-lg mb-1">Proveify fixes this.</p>
          <p className="text-gray-400 text-sm">Send a link. Client answers three questions. We turn it into something usable. They approve it.</p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black mb-3">Get a usable testimonial in 2 minutes</h2>
            <p className="text-gray-500">Four steps. Nothing complicated.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { step: '1', title: 'Send a simple link', desc: 'Share your collection link by email, WhatsApp, or anywhere. No login required for your client.' },
              { step: '2', title: 'Client leaves feedback', desc: 'They answer three quick questions in their own words. Takes less than 2 minutes.' },
              { step: '3', title: 'We turn it into something usable', desc: 'Three polished versions — concise, casual, professional. All based on exactly what they wrote.' },
              { step: '4', title: 'They approve it instantly', desc: 'Client picks the version that sounds most like them. Approval is timestamped. Done.' },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm font-bold mb-4">{s.step}</div>
                <h3 className="text-lg font-black mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Embed step */}
          <div className="mt-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm font-bold shrink-0">5</div>
              <div>
                <h3 className="text-lg font-black mb-2">Embed it anywhere with one line of code</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">Paste one iframe and your testimonials appear on any website — Webflow, WordPress, Framer, Carrd, Squarespace, or any HTML site.</p>
                <div className="bg-gray-900 text-green-400 text-xs font-mono px-4 py-3 rounded-xl">
                  {'<iframe src="proveify.app/widget/..." width="100%" height="400" />'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* No more awkward requests */}
      <section className="py-20 max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-black mb-8">No more awkward testimonial requests.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: '🚫', text: 'No chasing clients' },
            { icon: '🚫', text: 'No vague one-liners' },
            { icon: '🚫', text: 'No rewriting feedback yourself' },
          ].map((item) => (
            <div key={item.text} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <p className="text-2xl mb-2">{item.icon}</p>
              <p className="font-semibold text-sm text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-500 mt-8 text-base leading-relaxed max-w-xl mx-auto">
          Just send a link and get something usable back. Low ratings stay completely private — so you only ever publish social proof you're proud of.
        </p>
      </section>

      {/* Social proof — before/after style */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">What freelancers say</h2>
            <p className="text-gray-500">Real results. Not the vague kind.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: 'Meera R.',
                role: 'Freelance Designer',
                before: 'I had zero testimonials on my site.',
                after: 'Three live testimonials the same day I signed up. Completely effortless.',
              },
              {
                name: 'Tom B.',
                role: 'Web Developer',
                before: 'Clients kept saying they\'d write one. None ever did.',
                after: 'Collected three in my first week. Took less time than writing this.',
              },
              {
                name: 'Ananya S.',
                role: 'Brand Consultant',
                before: 'The testimonials I had were too vague to actually use.',
                after: 'The AI tidies it up but it still sounds like the client wrote it. Exactly what you want.',
              },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="mb-4 space-y-2">
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-red-400 uppercase tracking-wide mb-1">Before</p>
                    <p className="text-gray-500 text-sm leading-relaxed">"{t.before}"</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-green-500 uppercase tracking-wide mb-1">After</p>
                    <p className="text-gray-700 text-sm leading-relaxed">"{t.after}"</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black mb-3">Made for people who rely on trust to win work.</h2>
          <p className="text-gray-500">If clients decide whether to hire you based on what others say — this is for you.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
          {[
            { who: 'Freelancers', what: 'Turn happy clients into proof that wins new ones.' },
            { who: 'Agencies', what: 'Collect testimonials across every client project automatically.' },
            { who: 'Consultants', what: 'Turn project outcomes into proof that closes deals.' },
            { who: 'Designers', what: 'Show what clients say alongside your portfolio.' },
            { who: 'Developers', what: 'Let results speak louder than your GitHub profile.' },
            { who: 'Coaches', what: 'Turn client transformations into compelling social proof.' },
          ].map((u) => (
            <div key={u.who} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <p className="font-bold text-sm mb-1">{u.who}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{u.what}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">Simple pricing</h2>
            <p className="text-gray-500">Cancel anytime. No lock-in. Export your testimonials whenever you want.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: 'Free',
                price: '$0',
                desc: 'For freelancers just getting started',
                features: ['1 collection page', 'Up to 5 testimonials', 'Basic embed widget', 'No credit card needed'],
                cta: 'Create your first testimonial',
                highlight: false,
              },
              {
                name: 'Pro',
                price: '$19',
                desc: 'For growing consultants and creators',
                features: ['Unlimited testimonials', 'AI Polish feature', 'Client approval flow', 'Custom branding', 'Priority support'],
                cta: 'Create your first testimonial',
                highlight: true,
              },
              {
                name: 'Agency',
                price: '$49',
                desc: 'For teams and client work',
                features: ['Everything in Pro', 'Multiple workspaces', 'White-label widget', 'Client management', 'Team access'],
                cta: 'Create your first testimonial',
                highlight: false,
              },
            ].map((tier) => (
              <div key={tier.name} className={`rounded-2xl p-7 border ${tier.highlight ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-gray-100'}`}>
                <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${tier.highlight ? 'text-indigo-200' : 'text-gray-400'}`}>{tier.name}</p>
                <div className={`text-4xl font-black mb-1 ${tier.highlight ? 'text-white' : 'text-gray-900'}`}>
                  {tier.price}<span className="text-sm font-normal">/mo</span>
                </div>
                <p className={`text-sm mb-6 ${tier.highlight ? 'text-indigo-200' : 'text-gray-400'}`}>{tier.desc}</p>
                <ul className="space-y-2 mb-8">
                  {tier.features.map(f => (
                    <li key={f} className={`text-sm flex items-center gap-2 ${tier.highlight ? 'text-indigo-100' : 'text-gray-600'}`}>
                      <span className="text-green-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a href="/login"
                  className={`block text-center py-3 rounded-xl text-sm font-semibold ${tier.highlight ? 'bg-white text-indigo-600 hover:bg-indigo-50' : 'bg-gray-900 text-white hover:bg-gray-700'}`}>
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-6">All plans · Cancel anytime · No lock-in · Export your data whenever</p>
        </div>
      </section>

      {/* Most testimonials are wasted */}
      <section className="py-20 max-w-2xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-black mb-4">Most testimonials are wasted.</h2>
        <p className="text-gray-500 text-lg leading-relaxed mb-3">
          Not because clients don't value your work —
        </p>
        <p className="text-gray-500 text-lg leading-relaxed mb-8">
          but because they don't know what to say.
        </p>
        <p className="text-2xl font-black text-indigo-600">Proveify fixes that.</p>
      </section>

      {/* Final CTA */}
      <section id="waitlist" className="bg-indigo-600 py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-3">Stop losing work to freelancers with better proof.</h2>
          <p className="text-indigo-200 mb-8">Set up in under 5 minutes. Free plan available. No credit card needed.</p>
          {submitted ? (
            <div className="bg-white/20 text-white px-6 py-4 rounded-xl font-medium">
              🎉 You're on the list! We'll be in touch soon.
            </div>
          ) : (
            <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 text-sm focus:outline-none" required />
              <button type="submit" disabled={loading}
                className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-50 disabled:opacity-50 whitespace-nowrap">
                {loading ? 'Joining...' : 'Create your first testimonial →'}
              </button>
            </form>
          )}
          <p className="text-indigo-300 text-xs mt-4">No credit card required · Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold text-gray-900">Proveify</span>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#how-it-works" className="hover:text-gray-600">How it works</a>
            <a href="#pricing" className="hover:text-gray-600">Pricing</a>
            <a href="/blog" className="hover:text-gray-600">Blog</a>
            <a href="/login" className="hover:text-gray-600">Login</a>
          </div>
          <p className="text-xs text-gray-400">© 2026 Proveify. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}
