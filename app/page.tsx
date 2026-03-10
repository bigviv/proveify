'use client';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async () => {
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) { setStatus('success'); setEmail(''); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Nav */}
<nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
  <span className="text-xl font-bold tracking-tight">Proveify</span>
  <div className="flex items-center gap-3">
    <a href="#pricing" className="hidden sm:block text-sm text-gray-500 hover:text-gray-900">Pricing</a>
    <a href="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium">
      Login
    </a>
    <a href="#waitlist" className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 whitespace-nowrap">
      Get started
    </a>
  </div>
</nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-8 pt-24 pb-20 text-center">
        <div className="inline-block bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
          AI-powered social proof
        </div>
        <h1 className="text-5xl font-extrabold leading-tight mb-6">
          Turn client feedback into<br />
          <span className="text-indigo-600">powerful social proof</span>
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
          Proveify collects testimonials automatically, polishes them with AI, and displays them beautifully on your website. No code needed. Set up in 5 minutes.
        </p>
        <div id="waitlist" className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          {status === 'success' ? (
            <div className="w-full bg-green-50 border border-green-200 text-green-700 rounded-lg px-6 py-3 font-semibold">
              🎉 You're on the list! Check your inbox.
            </div>
          ) : (
            <>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleSubmit}
                disabled={status === 'loading'}
                className="whitespace-nowrap bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50"
              >
                {status === 'loading' ? 'Joining...' : 'Join waitlist'}
              </button>
            </>
          )}
        </div>
        {status === 'error' && <p className="text-red-500 text-sm mt-2">Something went wrong. Please try again.</p>}
        <p className="text-sm text-gray-400 mt-4">Free to join · Be first when we launch</p>
      </section>

      {/* Platform badges */}
      <section className="bg-gray-50 border-y border-gray-100 py-8">
        <p className="text-center text-xs text-gray-400 font-semibold uppercase tracking-widest mb-6">Works with every platform — no coding required</p>
        <div className="flex flex-wrap items-center justify-center gap-4 px-8">
          {["Webflow", "Framer", "WordPress", "Carrd", "Wix", "Squarespace", "Notion", "Shopify"].map((p) => (
            <span key={p} className="bg-white border border-gray-200 text-gray-600 text-sm font-medium px-4 py-2 rounded-full shadow-sm">
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* Before / After AI Polish Demo */}
      <section className="max-w-4xl mx-auto px-8 py-24">
        <div className="text-center mb-12">
          <div className="inline-block bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            The AI Polish feature
          </div>
          <h2 className="text-3xl font-bold mb-4">From weak to wow — in one click</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Most testimonials are vague. Proveify's AI rewrites them into specific, compelling social proof that actually converts visitors into clients.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Before */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-1 rounded">BEFORE</span>
              <span className="text-gray-400 text-xs">Raw client feedback</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed italic">
              "Great to work with. Would recommend. Did a good job on our website."
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-gray-500">J</div>
              <div>
                <p className="text-xs font-semibold text-gray-500">James T.</p>
                <p className="text-xs text-gray-400">Small business owner</p>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div className="hidden md:flex flex-col items-center justify-center absolute left-1/2 -translate-x-1/2">
          </div>

          {/* After */}
          <div className="bg-white rounded-2xl p-6 border-2 border-indigo-200 shadow-lg relative">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-2 py-1 rounded">AFTER ✨</span>
              <span className="text-indigo-400 text-xs">Polished by Proveify AI</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed italic">
              "Working with them transformed our online presence. They redesigned our website from scratch — clean, fast, and conversion-focused. Within 2 weeks of launch, our enquiries doubled. Highly recommend for any business serious about growth."
            </p>
            <div className="flex items-center gap-2 mt-4">
              <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">J</div>
              <div>
                <p className="text-xs font-semibold">James T.</p>
                <p className="text-xs text-gray-400">Small business owner</p>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">AI Polished</div>
          </div>
        </div>
        <p className="text-center text-sm text-gray-400 mt-8">✨ One click. Your testimonials go from forgettable to unforgettable.</p>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 border-y border-gray-100 py-24">
        <div className="max-w-5xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-16">What early users are saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "I sent my first testimonial request 10 minutes after signing up. The AI polish feature turned a one-liner into something I'm genuinely proud to show clients.", name: "Sarah K.", role: "Freelance Designer", avatar: "SK", color: "bg-pink-100 text-pink-600" },
              { quote: "I was losing potential clients because I had no social proof on my site. Proveify fixed that in an afternoon. Worth every penny.", name: "Marcus T.", role: "Web Developer", avatar: "MT", color: "bg-blue-100 text-blue-600" },
              { quote: "Our agency manages 12 clients and getting testimonials used to be a nightmare. Now it's fully automated. Game changer.", name: "Priya M.", role: "Agency Founder", avatar: "PM", color: "bg-green-100 text-green-600" }
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${t.color}`}>{t.avatar}</div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-8 py-24">
        <h2 className="text-3xl font-bold text-center mb-16">How Proveify works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { step: "01", title: "Send a link", desc: "Share your unique Proveify link with any client. They fill in a simple form — no account needed on their end." },
            { step: "02", title: "AI polishes it", desc: "Our AI turns vague feedback like 'great to work with' into compelling, specific social proof with one click." },
            { step: "03", title: "Embed anywhere", desc: "Paste one line of code into Webflow, Framer, WordPress, Carrd or any website builder. No developer needed." }
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="text-4xl font-black text-indigo-100 mb-4">{item.step}</div>
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 border-y border-gray-100 py-24">
        <div className="max-w-5xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Everything you need, nothing you don't</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: "✨", title: "AI Polish", desc: "One click transforms weak testimonials into compelling social proof. Before and after — like magic." },
              { icon: "📧", title: "Auto follow-ups", desc: "Proveify chases your clients for you with polite automated reminders. Never awkwardly ask again." },
              { icon: "🧩", title: "Embeddable widget", desc: "One line of code works on any platform — Webflow, WordPress, Framer, Carrd, Wix, Squarespace." },
              { icon: "⚡", title: "5-minute setup", desc: "No technical skills needed. Share your link and collect your first testimonial today." },
              { icon: "🎨", title: "Beautiful by default", desc: "Clean, professional designs that match any website style. Customise colours to fit your brand." },
              { icon: "📊", title: "Simple dashboard", desc: "Manage all your testimonials in one place. Approve, edit, publish — total control." },
            ].map((f) => (
              <div key={f.title} className="flex gap-4 bg-white p-6 rounded-xl border border-gray-100">
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <h3 className="font-semibold mb-1">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-4xl mx-auto px-8 py-24">
        <h2 className="text-3xl font-bold text-center mb-4">Simple pricing</h2>
        <p className="text-center text-gray-500 mb-16">Start free. Upgrade when you're ready.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Free", price: "$0", desc: "Perfect to get started",
              features: ["1 collection page", "Up to 5 testimonials", "Basic widget", "Manual collection"],
              cta: "Join waitlist", highlight: false
            },
            {
              name: "Pro", price: "$19", desc: "For freelancers & founders",
              features: ["Unlimited testimonials", "AI Polish feature", "Auto follow-up emails", "Custom branding", "Priority support"],
              cta: "Join waitlist", highlight: true
            },
            {
              name: "Agency", price: "$49", desc: "For teams & agencies",
              features: ["Everything in Pro", "Multiple client workspaces", "White-label widget (your brand, not ours)", "Client management portal", "Team access"],
              cta: "Join waitlist", highlight: false
            }
          ].map((plan) => (
            <div key={plan.name} className={`rounded-2xl p-8 border ${plan.highlight ? "border-indigo-600 bg-indigo-600 text-white" : "border-gray-200 bg-white"}`}>
              <h3 className={`font-bold text-lg mb-1 ${plan.highlight ? "text-white" : ""}`}>{plan.name}</h3>
              <div className={`text-4xl font-black mb-1 ${plan.highlight ? "text-white" : ""}`}>
                {plan.price}<span className="text-sm font-normal">/mo</span>
              </div>
              <p className={`text-sm mb-6 ${plan.highlight ? "text-indigo-200" : "text-gray-400"}`}>{plan.desc}</p>
              <ul className="space-y-2 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className={`text-sm flex items-center gap-2 ${plan.highlight ? "text-indigo-100" : "text-gray-600"}`}>
                    <span>✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href="#waitlist" className={`block text-center py-2 rounded-lg text-sm font-semibold ${plan.highlight ? "bg-white text-indigo-600 hover:bg-indigo-50" : "bg-gray-900 text-white hover:bg-gray-700"}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-indigo-600 py-24">
        <div className="max-w-2xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to prove your worth?</h2>
          <p className="text-indigo-200 mb-8">Join hundreds of freelancers and agencies building trust with Proveify.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {status === 'success' ? (
              <div className="w-full max-w-md bg-white text-indigo-600 rounded-lg px-6 py-3 font-semibold">
                🎉 You're on the list! Check your inbox.
              </div>
            ) : (
              <>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  className="w-full max-w-sm border-0 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                />
                <button
                  onClick={handleSubmit}
                  disabled={status === 'loading'}
                  className="whitespace-nowrap bg-white text-indigo-600 px-6 py-3 rounded-lg text-sm font-semibold hover:bg-indigo-50 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Joining...' : 'Join waitlist'}
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        © 2026 Proveify · Prove your worth.
      </footer>

    </main>
  );
}
