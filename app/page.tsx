'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
          <a href="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Login</a>
          <a href="/login" className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800">
            Start free
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          ✨ AI-Powered Social Proof
        </div>
        <h1 className="text-5xl sm:text-6xl font-black leading-tight tracking-tight mb-6">
          Turn client feedback into<br />
          <span className="text-indigo-600">testimonials that win work.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-4 leading-relaxed">
          Proveify automatically collects feedback from clients, turns it into clear testimonials, and lets you embed them on your website in minutes.
        </p>
        <p className="text-base text-gray-400 mb-10">
          No chasing clients. No awkward requests. No copywriting needed.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/login"
            className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-indigo-700 transition-colors">
            Start collecting testimonials →
          </a>
          <a href="#how-it-works"
            className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold text-base hover:bg-gray-200 transition-colors">
            See how it works
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-4">Free plan available · No credit card required</p>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black mb-3">How Proveify works</h2>
            <p className="text-gray-500">Four steps. Under five minutes to set up.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-16">
            {[
              { step: '1', title: 'Send your client a link', desc: 'Share a unique feedback link. Works by email, WhatsApp, or anywhere.' },
              { step: '2', title: 'They answer 3 quick questions', desc: 'What problem did you solve? What result did they see? Would they recommend you?' },
              { step: '3', title: 'AI polishes their words', desc: 'Their answers become a clear, compelling testimonial. They approve it.' },
              { step: '4', title: 'Embed anywhere instantly', desc: 'One line of code. Works on Webflow, WordPress, Framer, Carrd, anywhere.' },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm font-bold mb-4">
                  {s.step}
                </div>
                <h3 className="font-bold text-sm mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Before / After */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-6 text-center">Real example</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Raw client feedback</p>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-gray-500 text-sm italic leading-relaxed">
                    "Working with Sarah helped a lot. Our website traffic increased and communication was smooth."
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wide mb-3">✨ AI-polished testimonial</p>
                <div className="bg-indigo-50 rounded-xl p-4">
                  <p className="text-gray-800 text-sm italic leading-relaxed">
                    "Sarah was fantastic to work with. She improved our website strategy and we saw a noticeable increase in traffic within weeks. Communication was smooth throughout."
                  </p>
                  <div className="flex gap-3 mt-3 pt-3 border-t border-indigo-100">
                    <span className="text-xs text-indigo-500 font-medium">✔ From real feedback</span>
                    <span className="text-xs text-indigo-500 font-medium">✔ AI polished</span>
                    <span className="text-xs text-indigo-500 font-medium">✔ Client approved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Authenticity */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <div className="bg-indigo-600 rounded-3xl p-10 text-center text-white">
          <div className="text-3xl mb-4">🔒</div>
          <h2 className="text-2xl font-black mb-3">Authenticity first. Always.</h2>
          <p className="text-indigo-100 text-base leading-relaxed max-w-xl mx-auto mb-6">
            Proveify never invents testimonials. AI only improves wording based on real client responses.
            Your client reviews and approves every testimonial before it's published.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm font-medium">
            <span className="bg-white/20 px-4 py-2 rounded-lg">✓ Client approves every word</span>
            <span className="bg-white/20 px-4 py-2 rounded-lg">✓ Approval timestamp recorded</span>
            <span className="bg-white/20 px-4 py-2 rounded-lg">✓ Original response always saved</span>
          </div>
        </div>
      </section>

      {/* Widget demo */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">See how it looks on your site</h2>
            <p className="text-gray-500">This is exactly what your visitors will see.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[
              { name: 'David Chen', role: 'Founder, Acme SaaS', rating: 5, text: 'Sarah transformed our website strategy completely. Traffic increased within two weeks of the redesign going live.' },
              { name: 'Priya Sharma', role: 'Marketing Director', rating: 5, text: 'The fastest and most professional web developer I have worked with. Delivered on time, on budget, every time.' },
              { name: 'James O\'Brien', role: 'CEO, Buildfast', rating: 5, text: 'Incredible attention to detail. Our conversion rate improved significantly after working together.' },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
                <p className="text-xs text-gray-300 mt-3 pt-3 border-t border-gray-50">
                  ✓ Enhanced by Proveify AI · Approved by {t.name.split(' ')[0]}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">Embeds on any platform with one line of code</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {['Webflow', 'WordPress', 'Framer', 'Carrd', 'Notion', 'Squarespace'].map(p => (
                <span key={p} className="bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black mb-3">Built for independent professionals</h2>
          <p className="text-gray-500">If you work with clients, you need social proof.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { who: 'Freelance Designers', what: 'Show client praise alongside your portfolio.' },
            { who: 'Consultants', what: 'Turn project feedback into proof that wins new clients.' },
            { who: 'Developers', what: 'Let results speak louder than your GitHub profile.' },
            { who: 'Agencies', what: 'Collect testimonials across all client projects automatically.' },
            { who: 'Coaches', what: 'Turn transformation stories into compelling social proof.' },
            { who: 'Creators', what: 'Show brands what other brands say about working with you.' },
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
                cta: 'Start free',
                highlight: false,
              },
              {
                name: 'Pro',
                price: '$19',
                desc: 'For growing consultants and creators',
                features: ['Unlimited testimonials', 'AI Polish feature', 'Client approval flow', 'Custom branding', 'Priority support'],
                cta: 'Upgrade to Pro',
                highlight: true,
              },
              {
                name: 'Agency',
                price: '$49',
                desc: 'For teams and client work',
                features: ['Everything in Pro', 'Multiple workspaces', 'White-label widget', 'Client management', 'Team access'],
                cta: 'Upgrade to Agency',
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
          <p className="text-center text-xs text-gray-400 mt-6">All plans include cancel anytime · No lock-in · Export your data whenever</p>
        </div>
      </section>

      {/* Founder trust */}
      <section className="py-20 max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-black mb-4">Built for freelancers, by someone who gets it</h2>
        <p className="text-gray-500 leading-relaxed mb-6">
          Proveify was built because freelancers do great work but rarely get the credit they deserve.
          Clients are happy — but they almost never write reviews unless someone makes it easy.
          Proveify makes that process automatic, ethical, and effortless.
        </p>
        <p className="text-gray-400 text-sm">— Vivek, Founder of Proveify</p>
      </section>

      {/* Final CTA */}
      <section id="waitlist" className="bg-indigo-600 py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-3">
            Start collecting testimonials today.
          </h2>
          <p className="text-indigo-200 mb-8">Set up Proveify in under 5 minutes. Free plan available.</p>
          {submitted ? (
            <div className="bg-white/20 text-white px-6 py-4 rounded-xl font-medium">
              🎉 You're on the list! We'll be in touch soon.
            </div>
          ) : (
            <form onSubmit={handleWaitlist} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 text-sm focus:outline-none"
                required
              />
              <button type="submit" disabled={loading}
                className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold text-sm hover:bg-indigo-50 disabled:opacity-50 whitespace-nowrap">
                {loading ? 'Joining...' : 'Start free →'}
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
            <a href="/login" className="hover:text-gray-600">Login</a>
          </div>
          <p className="text-xs text-gray-400">© 2025 Proveify. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}
