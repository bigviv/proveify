import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Ask a Client for a Testimonial (Without Being Awkward) | Proveify',
  description: 'A practical guide for freelancers on how to ask clients for testimonials — including the exact words to use, when to ask, and how to make it effortless for them.',
  openGraph: {
    title: 'How to Ask a Client for a Testimonial (Without Being Awkward)',
    description: 'A practical guide for freelancers on how to ask clients for testimonials — including the exact words to use, when to ask, and how to make it effortless for them.',
    url: 'https://proveify.app/blog/how-to-ask-client-for-testimonial',
    type: 'article',
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@proveify',
    title: 'How to Ask a Client for a Testimonial (Without Being Awkward)',
    description: 'A practical guide for freelancers on how to ask clients for testimonials.',
  },
  alternates: {
    canonical: 'https://proveify.app/blog/how-to-ask-client-for-testimonial',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Ask a Client for a Testimonial (Without Being Awkward)',
  description: 'A practical guide for freelancers on how to ask clients for testimonials.',
  author: { '@type': 'Person', name: 'Vivek Chohan' },
  publisher: { '@type': 'Organization', name: 'Proveify', url: 'https://proveify.app' },
  datePublished: '2026-03-21',
  url: 'https://proveify.app/blog/how-to-ask-client-for-testimonial',
};

export default function BlogPost1() {
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

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <Link href="/blog" className="text-sm text-indigo-600 hover:underline">Blog</Link>
            <span className="text-gray-300">·</span>
            <span className="text-sm text-gray-400">5 min read</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-6">
            How to Ask a Client for a Testimonial (Without Being Awkward)
          </h1>

          <p className="text-xl text-gray-500 leading-relaxed">
            You did great work. The client was happy. But somehow asking for a testimonial still feels uncomfortable. Here's how to make it natural — and how to actually get one.
          </p>

          <div className="flex items-center gap-3 mt-8 pt-8 border-t border-gray-100">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600">V</div>
            <div>
              <p className="text-sm font-semibold">Vivek — Founder, Proveify</p>
              <p className="text-xs text-gray-400">March 2026</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="prose prose-lg max-w-none">

          <p className="text-gray-600 leading-relaxed mb-6">
            Every freelancer knows this feeling. A project wraps up well. The client is genuinely pleased — they said so in an email, in a Slack message, maybe even on a call. You know they'd give you a glowing testimonial if they wrote one.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            But asking for it feels like asking for a favour. So you don't ask, or you ask awkwardly, or you ask and they say yes and then nothing ever arrives.
          </p>

          <p className="text-gray-600 leading-relaxed mb-10">
            This guide will change that. Here's exactly how to ask — and how to make it so easy for clients that they actually follow through.
          </p>

          {/* Section 1 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">Why clients don't write testimonials even when they want to</h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            Before fixing the problem, it helps to understand it. Most clients who say they'll write a testimonial and then don't aren't being dishonest. They have four genuine barriers:
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 mb-8 space-y-4">
            <div className="flex gap-3">
              <span className="text-indigo-600 font-bold text-sm mt-0.5 shrink-0">01</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm mb-1">They don't know what to say</p>
                <p className="text-gray-500 text-sm leading-relaxed">A blank page is intimidating. Clients who aren't professional writers freeze when asked to produce something that feels important.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-indigo-600 font-bold text-sm mt-0.5 shrink-0">02</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm mb-1">They think it needs to be long</p>
                <p className="text-gray-500 text-sm leading-relaxed">They imagine writing three paragraphs when two sentences would do the job perfectly.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-indigo-600 font-bold text-sm mt-0.5 shrink-0">03</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm mb-1">They're busy and it keeps slipping</p>
                <p className="text-gray-500 text-sm leading-relaxed">It's not urgent to them the way it is to you. Every day that passes makes it less likely to happen.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="text-indigo-600 font-bold text-sm mt-0.5 shrink-0">04</span>
              <div>
                <p className="font-semibold text-gray-800 text-sm mb-1">The ask creates friction</p>
                <p className="text-gray-500 text-sm leading-relaxed">Sending them to Google Reviews, LinkedIn, or a form they've never seen before adds steps they weren't expecting.</p>
              </div>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-10">
            Remove these four barriers and you'll get the testimonial. That's what the rest of this guide does.
          </p>

          {/* Section 2 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">When to ask — timing is everything</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            The single biggest mistake freelancers make is asking too late. The best moment to ask for a testimonial is immediately after a positive moment — not weeks later when the project feels distant.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">Listen for these signals in conversations with clients:</p>

          <div className="border-l-4 border-indigo-200 pl-6 mb-6 space-y-3">
            <p className="text-gray-600 italic text-sm">"This is exactly what we needed."</p>
            <p className="text-gray-600 italic text-sm">"The results have been better than we expected."</p>
            <p className="text-gray-600 italic text-sm">"We'll definitely work with you again."</p>
            <p className="text-gray-600 italic text-sm">"I've already recommended you to someone."</p>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">
            When you hear something like this — in an email, a message, a call — that's your window. Ask within 24 hours of that moment while the positive feeling is fresh.
          </p>

          <p className="text-gray-600 leading-relaxed mb-10">
            If you're asking at project close as a matter of routine, ask on the final delivery call rather than in a follow-up email two weeks later. Completion energy works in your favour.
          </p>

          {/* Section 3 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">Exactly what to say</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            The key is to make the ask feel small and specific, not like you're requesting a formal written statement.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4 font-semibold">What doesn't work:</p>
          <div className="bg-red-50 rounded-xl p-4 mb-6">
            <p className="text-red-700 text-sm italic">"Would you mind leaving me a review? It would really help me out."</p>
          </div>

          <p className="text-gray-600 leading-relaxed mb-2 text-sm">This is vague, it makes them do all the work, and it subtly puts you in a position of asking for charity rather than documenting a result.</p>

          <p className="text-gray-600 leading-relaxed mb-4 mt-8 font-semibold">What works:</p>
          <div className="bg-green-50 rounded-xl p-4 mb-6 space-y-3">
            <p className="text-green-800 text-sm italic">"Could you share two or three sentences about what problem we solved together and what changed after? I'd love to use it on my site."</p>
          </div>
          <p className="text-gray-600 leading-relaxed mb-4 text-sm">This is specific. It gives them a framework. It feels like a 2-minute task, not a writing assignment.</p>

          <p className="text-gray-600 leading-relaxed mb-4 mt-8 font-semibold">Even better — give them the prompt directly:</p>
          <div className="bg-indigo-50 rounded-xl p-5 mb-6 space-y-2">
            <p className="text-indigo-800 text-sm font-medium mb-3">Try this template:</p>
            <p className="text-indigo-700 text-sm leading-relaxed italic">
              "Hey [name] — really glad the project went well. Would you be up for leaving a quick testimonial? All I'd need is 2-3 sentences covering: what you were trying to achieve, what we built together, and what the result was. Here's a link where you can do it in under 2 minutes: [link]"
            </p>
          </div>

          <p className="text-gray-600 leading-relaxed mb-10">
            Notice that the link is key. Don't ask them to write it and send it back to you — that creates too much friction. Give them a specific destination where the form is ready and the job feels contained.
          </p>

          {/* Section 4 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">How to follow up without being annoying</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            One follow-up is acceptable. Two is the limit. After that you're in diminishing-returns territory and it starts to feel like pressure.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">Follow-up timing:</p>

          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-100 rounded-full px-2 py-1 shrink-0">Day 0</span>
              <p className="text-sm text-gray-600">First ask — warm, specific, with a link</p>
            </div>
            <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-100 rounded-full px-2 py-1 shrink-0">Day 4</span>
              <p className="text-sm text-gray-600">One gentle nudge — "Just a quick reminder in case this got buried"</p>
            </div>
            <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
              <span className="text-xs font-bold text-gray-400 bg-gray-100 rounded-full px-2 py-1 shrink-0">After</span>
              <p className="text-sm text-gray-600">Let it go — don't damage a good relationship chasing a testimonial</p>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-10">
            If they haven't responded after two asks, move on. The relationship with the client is worth more than the testimonial. Some people just won't do it and that's okay.
          </p>

          {/* Section 5 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">What a useful testimonial actually looks like</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Most testimonials freelancers receive are kind but useless. "Great to work with!" tells a prospective client nothing. A testimonial that wins work has three ingredients:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {[
              { label: 'The problem', example: '"We were struggling to convert visitors into leads..."' },
              { label: 'The result', example: '"...our conversion rate went from 1.2% to 4.8% in six weeks."' },
              { label: 'The trust signal', example: '"I\'d recommend Alex to any founder who needs this done properly."' },
            ].map((item) => (
              <div key={item.label} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-2">{item.label}</p>
                <p className="text-xs text-gray-500 italic leading-relaxed">{item.example}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">
            When you give clients a structured prompt — "what problem did we solve, what changed, would you recommend me?" — you get testimonials that hit all three. When you ask vaguely, you get vague answers.
          </p>

          <p className="text-gray-600 leading-relaxed mb-10">
            The other thing worth knowing: clients often undersell the result. They'll write "traffic improved a bit" when what actually happened was a 40% increase. It's worth gently asking them to be specific — "do you remember roughly what the numbers looked like?"
          </p>

          {/* Section 6 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">The easiest way to do all of this automatically</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Everything above works. But it still requires you to remember to ask, craft the message, follow up, chase the response, and then do something with what you receive.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            That's why we built Proveify. Share one link with a client. They answer three quick questions in under 2 minutes. If their rating is high, AI creates three polished versions of their testimonial — concise, casual, and professional. They pick the one that sounds most like them and approve it. You get a verified, publish-ready testimonial.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            Low ratings stay completely private — so you get honest feedback without it going public before you've had a chance to respond.
          </p>

          <p className="text-gray-600 leading-relaxed mb-10">
            The testimonials embed on any website with one line of code. No chasing, no awkward emails, no blank page.
          </p>

          {/* CTA */}
          <div className="bg-indigo-600 rounded-2xl p-8 text-center text-white mt-12">
            <p className="text-2xl font-black mb-2">Start collecting testimonials today</p>
            <p className="text-indigo-200 text-sm mb-6">Free plan available. No credit card required. Takes 5 minutes to set up.</p>
            <Link
              href="/login"
              className="inline-block bg-white text-indigo-600 font-bold px-8 py-3 rounded-xl text-sm hover:bg-indigo-50 transition-colors"
            >
              Get started free →
            </Link>
          </div>

          {/* Internal links */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-sm font-semibold text-gray-500 mb-4">More from the Proveify blog</p>
            <div className="space-y-2">
              <Link href="/blog/testimonial-templates-for-freelancers" className="block text-sm text-indigo-600 hover:underline">Testimonial templates for freelancers — copy and paste →</Link>
              <Link href="/blog/what-makes-a-good-testimonial" className="block text-sm text-indigo-600 hover:underline">What makes a good testimonial? (With examples) →</Link>
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
