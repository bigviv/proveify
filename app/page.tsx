'use client';
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

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
          <a href="/example" className="hidden sm:block text-sm text-gray-500 hover:text-gray-900">See example</a>
          <a href="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Login</a>
          <a href="/login" className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800">Start free</a>
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
        <p className="text-base text-gray-400 mb-10">No chasing clients. No awkward requests. No copywriting needed.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/login" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-indigo-700">
            Start collecting testimonials →
          </a>
          <a href="#how-it-works" className="bg-gray-100 text-gray-700 px-8 py-4 rounded-xl font-semibold text-base hover:bg-gray-200">
            See how it works
          </a>
        </div>
        <p className="text-xs text-gray-400 mt-4">Free plan available · No credit card required</p>

        {/* Hero widget preview */}
        <div className="mt-14 max-w-sm mx-auto bg-white rounded-2xl border border-gray-200 shadow-lg p-6 text-left">
          <div className="flex gap-0.5 mb-3">
            {[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-lg">★</span>)}
          </div>
          <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">
            "I always struggled getting testimonials from clients. Proveify made it completely effortless — I had three live on my site the same day."
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-800">Meera R.</p>
              <p className="text-xs text-gray-400">Freelance Designer</p>
            </div>
            <span className="text-xs text-gray-300 font-medium">Verified by Proveify ↗</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black mb-3">How Proveify works</h2>
            <p className="text-gray-500">Four steps. Under five minutes to set up.</p>
          </div>

          {/* Step 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm font-bold mb-4">1</div>
              <h3 className="text-xl font-black mb-3">Send your client a feedback link</h3>
              <p className="text-gray-500 leading-relaxed mb-3">Share a unique link by email, WhatsApp, or anywhere. Clients answer three quick questions — what problem you solved, what result they saw, and whether they'd recommend you.</p>
              <p className="text-sm text-indigo-600 font-medium">Takes clients less than 2 minutes.</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <div className="flex-1 bg-gray-100 rounded text-xs text-gray-400 px-3 py-1 ml-2">proveify.app/collect/...</div>
              </div>
              <p className="text-xs font-bold text-gray-700 mb-4">Share your experience</p>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Your name</p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600">Sarah Johnson</div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Your experience</p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-500 leading-relaxed">Working with Alex helped a lot. Our website traffic went up and communication was really smooth throughout.</div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Rating</p>
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-sm">★</span>)}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Tone</p>
                  <div className="flex gap-2">
                    {['Concise','Casual','Professional'].map((t,i) => (
                      <span key={t} className={`text-xs px-2 py-1 rounded-lg border ${i===0 ? 'border-indigo-500 bg-indigo-50 text-indigo-600 font-medium' : 'border-gray-200 text-gray-400'}`}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-indigo-600 text-white text-xs text-center py-2 rounded-lg font-medium">Submit testimonial →</div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center mb-20">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 order-2 sm:order-1">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-xs text-gray-400 ml-2">AI Polish</span>
              </div>
              <div className="mb-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-2">Original</p>
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 italic leading-relaxed">"Working with Alex helped a lot. Our website traffic went up and communication was really smooth throughout."</p>
                </div>
              </div>
              <div className="flex items-center justify-center my-3">
                <div className="flex items-center gap-2 bg-indigo-50 text-indigo-600 text-xs font-medium px-3 py-1.5 rounded-full">
                  <span>✨</span> AI polishing...
                </div>
              </div>
              <div>
                <p className="text-xs text-indigo-400 uppercase tracking-wide font-medium mb-2">✨ Polished</p>
                <div className="bg-indigo-50 rounded-xl p-3">
                  <p className="text-xs text-gray-700 italic leading-relaxed">"Alex delivered exactly what we needed. Our website traffic increased noticeably and the entire process felt effortless — communication was clear and professional from start to finish."</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="bg-indigo-600 text-white text-xs text-center py-2 rounded-lg font-medium">✓ Use polished</div>
                <div className="bg-gray-100 text-gray-500 text-xs text-center py-2 rounded-lg">Use original</div>
              </div>
            </div>
            <div className="order-1 sm:order-2">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm font-bold mb-4">2</div>
              <h3 className="text-xl font-black mb-3">AI polishes their words — they approve</h3>
              <p className="text-gray-500 leading-relaxed mb-3">Proveify takes their raw feedback and turns it into a clear, compelling testimonial. The client sees both versions and picks the one they're happy with.</p>
              <p className="text-sm text-indigo-600 font-medium">Their words. Just better expressed. With their consent.</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm font-bold mb-4">3</div>
              <h3 className="text-xl font-black mb-3">Manage everything from your dashboard</h3>
              <p className="text-gray-500 leading-relaxed mb-3">See every testimonial, original and polished side by side. Low-rated reviews are flagged automatically so you never accidentally publish a complaint.</p>
              <p className="text-sm text-indigo-600 font-medium">Full control. Zero chaos.</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-xs text-gray-400 ml-2">Dashboard</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[['4','Total'],['3','Approved'],['3','Polished']].map(([n,l]) => (
                  <div key={l} className="bg-gray-50 rounded-xl p-2 text-center">
                    <p className="text-lg font-black text-indigo-600">{n}</p>
                    <p className="text-xs text-gray-400">{l}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Sarah J.', stars: 5, text: 'Alex delivered exactly what we needed...', badge: '✓ Approved', color: 'bg-green-100 text-green-600' },
                  { name: 'David C.', stars: 5, text: 'The fastest developer I have worked with...', badge: '✓ Approved', color: 'bg-green-100 text-green-600' },
                  { name: 'Peter M.', stars: 3, text: 'Good tiling but had an issue...', badge: '⚠️ Needs attention', color: 'bg-red-50 text-red-500' },
                ].map((t) => (
                  <div key={t.name} className="bg-gray-50 rounded-xl p-3 flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0">
                      {t.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1 mb-0.5">
                        <p className="text-xs font-semibold">{t.name}</p>
                        <div className="flex">
                          {[...Array(t.stars)].map((_,i) => <span key={i} className="text-yellow-400 text-xs">★</span>)}
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 truncate">{t.text}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${t.color}`}>{t.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 order-2 sm:order-1">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-xs text-gray-400 ml-2">yourwebsite.com</span>
              </div>
              <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wide">What clients say</p>
              <div className="space-y-3">
                {[
                  { name: 'Sarah Johnson', role: 'Marketing Director', text: 'Alex delivered exactly what we needed. Traffic increased noticeably and communication was clear throughout.' },
                  { name: 'David Chen', role: 'Founder, Acme SaaS', text: 'The fastest and most professional developer I have worked with. On time, on budget, every time.' },
                ].map((t) => (
                  <div key={t.name} className="bg-gray-50 rounded-xl p-4">
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_,i) => <span key={i} className="text-yellow-400 text-xs">★</span>)}
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed italic mb-3">"{t.text}"</p>
                    <div>
                      <p className="text-xs font-semibold">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.role}</p>
                    </div>
                    <p className="text-xs text-gray-300 mt-2 pt-2 border-t border-gray-100">✓ Verified by Proveify</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 sm:order-2">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center text-sm font-bold mb-4">4</div>
              <h3 className="text-xl font-black mb-3">Embed anywhere with one line of code</h3>
              <p className="text-gray-500 leading-relaxed mb-4">Paste one line of code and your testimonial wall appears on any website.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Webflow','WordPress','Framer','Carrd','Notion','Squarespace'].map(p => (
                  <span key={p} className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg">{p}</span>
                ))}
              </div>
              <div className="bg-gray-900 text-green-400 text-xs font-mono px-4 py-3 rounded-xl">
                {'<iframe src="proveify.app/widget/...'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <div className="bg-indigo-600 rounded-3xl p-10 text-center text-white">
          <div className="text-3xl mb-4">🔒</div>
          <h2 className="text-2xl font-black mb-3">Authenticity first. Always.</h2>
          <p className="text-indigo-100 text-base leading-relaxed max-w-xl mx-auto mb-6">
            Proveify never invents testimonials. AI only improves wording based on real client responses. Your client reviews and approves every testimonial before it's published. Approval is timestamped and stored.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm font-medium">
            <span className="bg-white/20 px-4 py-2 rounded-lg">✓ Client approves every word</span>
            <span className="bg-white/20 px-4 py-2 rounded-lg">✓ Approval timestamp recorded</span>
            <span className="bg-white/20 px-4 py-2 rounded-lg">✓ Original response always saved</span>
          </div>
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
                features: ['1 collection page','Up to 5 testimonials','Basic embed widget','No credit card needed'],
                cta: 'Start free',
                highlight: false,
              },
              {
                name: 'Pro',
                price: '$19',
                desc: 'For growing consultants and creators',
                features: ['Unlimited testimonials','AI Polish feature','Client approval flow','Custom branding','Priority support'],
                cta: 'Upgrade to Pro',
                highlight: true,
              },
              {
                name: 'Agency',
                price: '$49',
                desc: 'For teams and client work',
                features: ['Everything in Pro','Multiple workspaces','White-label widget','Client management','Team access'],
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
          <p className="text-center text-xs text-gray-400 mt-6">All plans · Cancel anytime · No lock-in · Export your data whenever</p>
        </div>
      </section>

      {/* Who it's for */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black mb-3">Built for independent professionals</h2>
          <p className="text-gray-500">If you work with clients, you need social proof.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
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
        <div className="bg-gray-50 rounded-2xl border border-gray-100 p-8">
          <h3 className="font-black text-lg mb-2 text-center">One testimonial. Ten places it can live.</h3>
          <p className="text-gray-500 text-sm text-center mb-6">Every approved testimonial can become content across your entire marketing.</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {['Website','Portfolio','LinkedIn','Case studies','Pitch decks','Email','Proposals','Notion','Instagram','Cold outreach'].map(p => (
              <div key={p} className="bg-white border border-gray-200 text-gray-600 text-xs font-medium px-3 py-2 rounded-lg text-center">{p}</div>
            ))}
          </div>
        </div>
      </section>

      {/* What freelancers say */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3">What freelancers say</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: 'Meera R.', role: 'Freelance Designer', text: "I always meant to ask clients for testimonials but never got around to it. This made it really easy — had three on my site within a week." },
              { name: 'Tom B.', role: 'Web Developer', text: "Collected three testimonials in my first week. Honestly took me less time than writing this." },
              { name: 'Ananya S.', role: 'Brand Consultant', text: "The AI tidies it up but it still sounds like the client wrote it. That's exactly what you want." },
            ].map((t) => (
              <div key={t.name} className="bg-white rounded-2xl border border-gray-100 p-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder story */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-10">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Why Proveify exists</p>
            <h2 className="text-2xl font-black mb-5">I got tired of watching great freelancers lose work they deserved.</h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>I'm a Londoner — born and raised. Last year, I made the move to India, and it completely changed how I saw the freelance economy. The talent here is extraordinary. Developers, designers, consultants doing genuinely world-class work for clients across the globe.</p>
              <p>But there was a pattern I kept seeing. Great work would get done, clients would be happy, and then... nothing. No testimonials. No social proof. No record of the results they'd delivered. The next client had to take a leap of faith.</p>
              <p>It wasn't laziness. Clients meant to write something. Freelancers meant to ask. But asking felt awkward, writing felt like work, and it just never happened.</p>
              <p>I built Proveify because that gap felt unnecessary. The feedback was already there — in emails, in messages, in conversations. It just needed a simple way to become something useful.</p>
              <p>Send a link. Client answers three quick questions. AI turns their words into a proper testimonial. They approve it. Done. No chasing, no awkwardness, no blank page.</p>
              <p>If you're a freelancer anywhere in the world — but especially if you're part of the incredible independent community here in India — this is built for you.</p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm font-semibold">Vivek</p>
              <p className="text-xs text-gray-400">Founder, Proveify · London → Bangalore</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="waitlist" className="bg-indigo-600 py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-white mb-3">Turn client feedback into testimonials that win you work.</h2>
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
          <p className="text-xs text-gray-400">© 2026 Proveify. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}
