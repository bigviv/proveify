import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Social Proof for Freelancers: The Complete Guide | Proveify',
  description: "Why social proof matters more than your portfolio, how to build it from scratch, and how to use it to win clients you couldn't before.",
  openGraph: {
    title: 'Social Proof for Freelancers: The Complete Guide',
    description: "Why social proof matters more than your portfolio, how to build it from scratch, and how to use it to win clients you couldn't before.",
    url: 'https://proveify.app/blog/social-proof-for-freelancers',
    type: 'article',
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@proveify',
    title: 'Social Proof for Freelancers: The Complete Guide',
    description: "Why social proof matters more than your portfolio and how to build it from scratch.",
  },
  alternates: {
    canonical: 'https://proveify.app/blog/social-proof-for-freelancers',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Social Proof for Freelancers: The Complete Guide',
  description: "Why social proof matters more than your portfolio, how to build it from scratch, and how to use it to win clients you couldn't before.",
  author: { '@type': 'Organization', name: 'Proveify' },
  publisher: { '@type': 'Organization', name: 'Proveify', url: 'https://proveify.app' },
  datePublished: '2026-04-09',
  url: 'https://proveify.app/blog/social-proof-for-freelancers',
};

export default function BlogPost5() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100 max-w-6xl mx-auto">
        <Link href="/" className="text-xl font-bold tracking-tight">Proveify</Link>
        <div className="flex items-center gap-4">
          <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900">Blog</Link>
          <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Login</Link>
          <Link href="/login" className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800">Start free</Link>
        </div>
      </nav>

      {/* Article */}
      <article className="max-w-2xl mx-auto px-6 py-16">

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/blog" className="text-sm text-indigo-600 hover:underline">Blog</Link>
            <span className="text-gray-300">·</span>
            <span className="text-sm text-gray-400">8 min read</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-6">
            Social Proof for Freelancers: The Complete Guide
          </h1>

          <p className="text-xl text-gray-500 leading-relaxed">
            Why social proof matters more than your portfolio, how to build it from scratch, and how to use it to win clients you could not before.
          </p>

          <div className="flex items-center gap-3 mt-8 pt-8 border-t border-gray-100">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600">P</div>
            <div>
              <p className="text-sm font-semibold">Proveify Team</p>
              <p className="text-xs text-gray-400">April 2026</p>
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">

          <p className="text-gray-600 leading-relaxed mb-6">
            Two freelancers. Same skills. Same experience. Same rates. One wins the pitch consistently. The other struggles to convert enquiries even when the work is clearly good.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            The difference is almost always social proof. Not portfolio quality. Not pricing. Not proposal length. The person who wins has evidence that other people like the prospect have hired them and been happy about it.
          </p>

          <p className="text-gray-600 leading-relaxed mb-10">
            This guide covers what social proof actually is, why it works, every type worth building, and exactly how to get it — starting from zero.
          </p>

          {/* Section 1 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">What social proof actually is</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Social proof is evidence that other people have made the same decision you are being asked to make — and it worked out for them. When a prospective client considers hiring you, they are asking one fundamental question: is this person safe to hire?
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            Your portfolio answers "can they do the work." Social proof answers "have they actually delivered for people like me." Both matter, but the second question is the one that releases the budget.
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 mb-10">
            <p className="text-sm font-bold text-gray-700 mb-3">The hiring decision in order:</p>
            <div className="space-y-2">
              {[
                { step: '1', q: 'Can they do what I need?', a: 'Answered by portfolio and credentials' },
                { step: '2', q: 'Have they done it for others?', a: 'Answered by case studies and testimonials' },
                { step: '3', q: 'Were those people happy?', a: 'Answered by testimonials and reviews' },
                { step: '4', q: 'Would someone like me hire them?', a: 'Answered by who the testimonials are from' },
              ].map((item) => (
                <div key={item.step} className="flex gap-3 items-start">
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-100 rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">{item.step}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.q}</p>
                    <p className="text-xs text-gray-500">{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">The six types of social proof freelancers can build</h2>

          <div className="space-y-5 mb-10">
            {[
              {
                type: '1. Client testimonials',
                desc: 'The most valuable and most underused. A specific quote from a named client describing a real result. Covered in depth throughout the rest of this guide because it is where most freelancers leave the most money on the table.',
                effort: 'Low effort, high impact',
              },
              {
                type: '2. Case studies',
                desc: 'Longer-form proof that walks through a specific project — the problem, the approach, the result. Takes more time to produce but works extremely well for high-value projects where prospects want to understand how you think.',
                effort: 'High effort, high impact for premium work',
              },
              {
                type: '3. Platform reviews',
                desc: 'Reviews on Upwork, Fiverr, LinkedIn, Google, or Clutch. Carry extra credibility because they are verified by a third party. If you work on platforms, treat every project as an opportunity to collect a review.',
                effort: 'Low effort, medium-high impact',
              },
              {
                type: '4. Notable clients',
                desc: 'Logos of companies you have worked with. You do not need testimonials — the logo itself is proof. Works well for consultants and agencies targeting similar companies.',
                effort: 'Zero effort if you have the permission',
              },
              {
                type: '5. Numbers and outcomes',
                desc: 'Specific metrics from your work — conversion rates, traffic numbers, revenue generated, time saved. Even one real number on your homepage does more work than three paragraphs of description.',
                effort: 'Low effort once collected',
              },
              {
                type: '6. Social engagement',
                desc: 'Follower counts, post engagement, newsletter subscribers. Lower trust signal than testimonials but builds familiarity over time. More useful for building an audience than for direct conversion.',
                effort: 'High ongoing effort, lower conversion impact',
              },
            ].map((item) => (
              <div key={item.type} className="bg-gray-50 rounded-2xl p-5">
                <h3 className="font-black text-gray-900 text-base mb-2">{item.type}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-2">{item.desc}</p>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">{item.effort}</span>
              </div>
            ))}
          </div>

          {/* Section 3 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">Why testimonials beat everything else</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Every type of social proof has value. But for most freelancers, testimonials give the best return on the time invested — specifically because they are the only format that directly answers the question a prospect is actually asking.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { label: 'Portfolio', issue: 'Shows skill, not trustworthiness' },
              { label: 'Case study', issue: 'Written by you — inherently biased' },
              { label: 'Platform reviews', issue: 'Context-dependent, platform-locked' },
              { label: 'Client testimonial', issue: 'Written by them — inherently credible ✓' },
            ].map((item) => (
              <div key={item.label} className={`rounded-xl p-4 border ${item.label === 'Client testimonial' ? 'bg-green-50 border-green-100' : 'bg-gray-50 border-gray-100'}`}>
                <p className={`text-sm font-bold mb-1 ${item.label === 'Client testimonial' ? 'text-green-700' : 'text-gray-700'}`}>{item.label}</p>
                <p className={`text-xs leading-relaxed ${item.label === 'Client testimonial' ? 'text-green-600' : 'text-gray-400'}`}>{item.issue}</p>
              </div>
            ))}
          </div>

          {/* Section 4 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">How to build social proof from zero</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Starting from nothing feels like a catch-22 — you need proof to win clients, but you need clients to get proof. Here is how to break that loop.
          </p>

          <div className="space-y-4 mb-10">
            <div className="bg-gray-50 rounded-2xl p-5">
              <h3 className="font-black text-gray-900 text-base mb-2">Start with your last three clients</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Even if the work was six months ago. Reach out, reference the specific project, and ask for two or three sentences on what changed after working together. Most will say yes if you make it easy for them.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5">
              <h3 className="font-black text-gray-900 text-base mb-2">Do one project at a reduced rate in exchange for a detailed testimonial</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Be explicit about the exchange upfront. A smaller, well-documented project with a strong testimonial is worth more than three anonymous projects with no paper trail.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5">
              <h3 className="font-black text-gray-900 text-base mb-2">Ask for testimonials immediately after a positive moment</h3>
              <p className="text-gray-500 text-sm leading-relaxed">The window is small. The best time to ask is within 24 hours of a client saying something like "this is exactly what we needed." After that, enthusiasm fades and writing feels like effort.</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5">
              <h3 className="font-black text-gray-900 text-base mb-2">Make it as easy as possible for them to say yes</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Give them a specific prompt. Give them a link where they can answer three questions in two minutes. The more friction you remove, the higher your completion rate.</p>
            </div>
          </div>

          {/* Section 5 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">Where to use social proof once you have it</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Most freelancers collect a testimonial and drop it on a testimonials page that nobody visits. Here is where social proof actually converts:
          </p>

          <div className="space-y-3 mb-10">
            {[
              { place: 'Homepage — near your main CTA', impact: 'Highest impact placement. Directly reduces hesitation at the decision point.' },
              { place: 'Proposals', impact: 'One relevant testimonial from a similar client in a proposal can be the difference between winning and losing.' },
              { place: 'Cold outreach emails', impact: 'A single line quoting a result — "I recently helped a similar agency increase their conversion rate by 40%" — adds instant credibility.' },
              { place: 'LinkedIn profile', impact: 'Featured section and the About section are both underused for testimonials. Most LinkedIn profiles have none.' },
              { place: 'Email signature', impact: 'Passive and permanent. One rotating quote from a client in your signature builds familiarity over hundreds of emails.' },
              { place: 'Discovery call follow-up', impact: 'Send a testimonial relevant to the prospect\'s specific situation within an hour of a call. Very few freelancers do this. It works.' },
            ].map((item) => (
              <div key={item.place} className="flex gap-4 bg-gray-50 rounded-xl p-4">
                <span className="text-indigo-600 font-bold shrink-0 mt-0.5">→</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm mb-1">{item.place}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.impact}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Section 6 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">The compounding effect of consistent social proof collection</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            The freelancers who win the most are not necessarily the best at the work. They are often the ones who have systematised how they collect proof after every project.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            After five projects with no testimonials you are starting from zero every time. After five projects where you collected a strong testimonial from each, you have a body of evidence that compounds — each new testimonial makes the next pitch easier.
          </p>

          <p className="text-gray-600 leading-relaxed mb-10">
            The goal is to make testimonial collection a non-negotiable part of every project close, as routine as sending a final invoice. The best time to build that system was after your first project. The second best time is now.
          </p>

          {/* CTA */}
          <div className="bg-indigo-600 rounded-2xl p-8 text-center text-white mt-12">
            <p className="text-2xl font-black mb-2">Start building your social proof today.</p>
            <p className="text-indigo-200 text-sm mb-6">Proveify makes testimonial collection a two-minute process for your clients. Free plan available, no credit card required.</p>
            <Link
              href="/login"
              className="inline-block bg-white text-indigo-600 font-bold px-8 py-3 rounded-xl text-sm hover:bg-indigo-50 transition-colors"
            >
              Create your first usable testimonial →
            </Link>
          </div>

          {/* Internal links */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-500 mb-4">More from the Proveify blog</p>
            <div className="space-y-2">
              <Link href="/blog/how-to-ask-client-for-testimonial" className="block text-sm text-indigo-600 hover:underline">How to ask a client for a testimonial (without being awkward) →</Link>
              <Link href="/blog/what-makes-a-good-testimonial" className="block text-sm text-indigo-600 hover:underline">What makes a good testimonial? (With examples) →</Link>
              <Link href="/blog/testimonial-templates-for-freelancers" className="block text-sm text-indigo-600 hover:underline">Testimonial templates for freelancers — copy and paste →</Link>
              <Link href="/blog/how-to-embed-testimonials-on-your-website" className="block text-sm text-indigo-600 hover:underline">How to embed testimonials on your website →</Link>
            </div>
          </div>

        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6 mt-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold text-gray-900">Proveify</span>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/blog" className="hover:text-gray-600">Blog</Link>
            <Link href="/#how-it-works" className="hover:text-gray-600">How it works</Link>
            <Link href="/#pricing" className="hover:text-gray-600">Pricing</Link>
            <Link href="/login" className="hover:text-gray-600">Login</Link>
          </div>
          <p className="text-xs text-gray-400">© 2026 Proveify. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}
