import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'What Makes a Good Testimonial? (With Examples) | Proveify',
  description: "Most testimonials freelancers collect are kind but useless. Here's exactly what separates a testimonial that wins work from one that gets ignored — with real examples.",
  openGraph: {
    title: 'What Makes a Good Testimonial? (With Examples)',
    description: "Most testimonials freelancers collect are kind but useless. Here's exactly what separates a testimonial that wins work from one that gets ignored.",
    url: 'https://proveify.app/blog/what-makes-a-good-testimonial',
    type: 'article',
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@proveify',
    title: 'What Makes a Good Testimonial? (With Examples)',
    description: "Most testimonials freelancers collect are kind but useless. Here's what actually works.",
  },
  alternates: {
    canonical: 'https://proveify.app/blog/what-makes-a-good-testimonial',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What Makes a Good Testimonial? (With Examples)',
  description: "Most testimonials freelancers collect are kind but useless. Here's exactly what separates a testimonial that wins work from one that gets ignored.",
  author: { '@type': 'Organization', name: 'Proveify' },
  publisher: { '@type': 'Organization', name: 'Proveify', url: 'https://proveify.app' },
  datePublished: '2026-03-28',
  url: 'https://proveify.app/blog/what-makes-a-good-testimonial',
};

export default function BlogPost3() {
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
            <span className="text-sm text-gray-400">6 min read</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-6">
            What Makes a Good Testimonial? (With Examples)
          </h1>

          <p className="text-xl text-gray-500 leading-relaxed">
            Most testimonials freelancers receive are kind but completely useless. Here's exactly what separates one that wins you work from one that gets ignored.
          </p>

          <div className="flex items-center gap-3 mt-8 pt-8 border-t border-gray-100">
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-bold text-indigo-600">P</div>
            <div>
              <p className="text-sm font-semibold">Proveify Team</p>
              <p className="text-xs text-gray-400">March 2026</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="prose prose-lg max-w-none">

          <p className="text-gray-600 leading-relaxed mb-6">
            You have a testimonial on your website. It says something like "Great to work with — highly recommend!" The client meant it. They were genuinely happy. But that testimonial is doing almost nothing for you.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            Meanwhile, another freelancer with objectively weaker work is winning pitches because their testimonials are specific, credible, and answer exactly what a prospective client needs to know before they hire someone.
          </p>

          <p className="text-gray-600 leading-relaxed mb-10">
            The difference isn't the clients. It's knowing what a good testimonial actually contains — and how to draw it out.
          </p>

          {/* Section 1 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">The problem with most testimonials</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            When you ask a client to "leave a review" or "write a few words," they default to vague praise. It's not dishonest — they genuinely liked working with you. But without structure, they don't know what to say, so they say something safe and generic.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
              <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3">Useless testimonial</p>
              <div className="space-y-2">
                {[
                  '"Great to work with!"',
                  '"Highly recommend."',
                  '"Very professional and delivered on time."',
                  '"Would definitely use again."',
                ].map((t) => (
                  <p key={t} className="text-sm text-gray-500 italic bg-white rounded-lg px-3 py-2 border border-red-100">{t}</p>
                ))}
              </div>
              <p className="text-xs text-red-400 mt-3 font-medium">Kind. Forgettable. Could apply to anyone.</p>
            </div>

            <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
              <p className="text-xs font-bold text-green-500 uppercase tracking-widest mb-3">Useful testimonial</p>
              <div className="space-y-2">
                {[
                  '"Traffic up 40% in 6 weeks."',
                  '"Closed our biggest deal using the pitch deck."',
                  '"Went from 0 to 12 testimonials in a month."',
                  '"First developer who delivered exactly on spec."',
                ].map((t) => (
                  <p key={t} className="text-sm text-gray-700 italic bg-white rounded-lg px-3 py-2 border border-green-100">{t}</p>
                ))}
              </div>
              <p className="text-xs text-green-600 mt-3 font-medium">Specific. Credible. Impossible to ignore.</p>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-10">
            The difference isn't about the quality of work. It's about the quality of the question you asked.
          </p>

          {/* Section 2 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">The three ingredients every good testimonial needs</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            A testimonial that wins work does three things. It establishes the context, proves the result, and provides a reason to trust you over alternatives.
          </p>

          <div className="space-y-4 mb-10">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex gap-4 items-start">
                <span className="text-indigo-600 font-black text-2xl leading-none shrink-0">01</span>
                <div>
                  <h3 className="font-black text-gray-900 mb-2">The problem — what were they trying to solve?</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">
                    This is the part most testimonials skip entirely. But it's the part prospective clients read most carefully — because they're trying to see if someone like them has hired you before.
                  </p>
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Example</p>
                    <p className="text-sm text-gray-600 italic">"We had a website that hadn't been updated in years and was costing us credibility with every pitch."</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex gap-4 items-start">
                <span className="text-indigo-600 font-black text-2xl leading-none shrink-0">02</span>
                <div>
                  <h3 className="font-black text-gray-900 mb-2">The result — what actually changed?</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">
                    This is the most persuasive part of any testimonial. Specific numbers are far more convincing than vague sentiment. "Traffic improved" means nothing. "Traffic increased 40% in six weeks" means everything.
                  </p>
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Example</p>
                    <p className="text-sm text-gray-600 italic">"Within a month of launch, our contact form submissions had tripled and we started winning pitches we previously lost."</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex gap-4 items-start">
                <span className="text-indigo-600 font-black text-2xl leading-none shrink-0">03</span>
                <div>
                  <h3 className="font-black text-gray-900 mb-2">The recommendation — would they hire you again?</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">
                    This is the trust signal. It answers the last objection a prospective client has before hiring you. Not just "was the result good" but "would someone who's been through this recommend it?"
                  </p>
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Example</p>
                    <p className="text-sm text-gray-600 italic">"We've already booked them for our next two projects and recommended them to three other companies in our network."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">Full examples — bad vs good</h2>

          <p className="text-gray-600 leading-relaxed mb-8">
            Here's what the difference looks like in practice across different freelance types.
          </p>

          {[
            {
              type: 'Web Designer',
              bad: '"Really happy with the new website. Alex did a great job and was easy to work with."',
              good: '"Our old site was losing us clients before they even made contact. Alex redesigned everything in three weeks — since launch, our enquiry rate has doubled and we\'ve had multiple prospects mention the site specifically. Booked her for our next rebrand already."',
            },
            {
              type: 'Copywriter',
              bad: '"Great writer, really understood our brand voice. Would recommend."',
              good: '"We\'d been using the same homepage copy for four years and our bounce rate showed it. Tom rewrote everything in two rounds — no endless revisions, just good instincts. Our time-on-page went from 45 seconds to over two minutes. Worth every penny."',
            },
            {
              type: 'SEO Consultant',
              bad: '"Really knowledgeable about SEO. Saw improvements after working with her."',
              good: '"We were invisible on Google for our most important keywords. Within three months of working with Priya, we ranked on page one for six of them and organic traffic was up 60%. She also explained everything clearly so we understood what we were paying for."',
            },
          ].map((ex) => (
            <div key={ex.type} className="mb-8">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">{ex.type}</p>
              <div className="space-y-3">
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <p className="text-xs font-bold text-red-400 mb-2">❌ Weak</p>
                  <p className="text-sm text-gray-500 italic">{ex.bad}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <p className="text-xs font-bold text-green-500 mb-2">✓ Strong</p>
                  <p className="text-sm text-gray-700 italic">{ex.good}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Section 4 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">Four things that make any testimonial stronger</h2>

          <div className="space-y-3 mb-10">
            {[
              { title: 'Specific numbers', desc: '"Traffic increased 40%" beats "traffic improved significantly" every time. If the client doesn\'t volunteer numbers, ask: "Do you remember roughly what the difference was?"' },
              { title: 'A named outcome', desc: 'What specifically happened? A deal closed, a campaign launched, a rebrand completed, a problem solved. Named outcomes are credible. Vague improvements are not.' },
              { title: 'A before state', desc: 'The best testimonials describe where the client was before they hired you. This creates contrast — and contrast is what makes results feel real.' },
              { title: 'Natural language', desc: 'A testimonial that sounds like a marketing brochure raises suspicion. The most persuasive ones sound like someone talking to a friend. Clients naturally write this way — don\'t over-polish it out of them.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 bg-gray-50 rounded-xl p-4">
                <span className="text-green-500 font-bold shrink-0 mt-0.5">✓</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm mb-1">{item.title}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Section 5 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">How to get testimonials that actually contain this</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            The quality of your testimonials is entirely determined by the quality of your prompt. If you ask a vague question you get a vague answer. Ask a specific one and you get something usable.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">The three questions that reliably produce good testimonials:</p>

          <div className="space-y-3 mb-8">
            {[
              { q: 'Q1', text: 'What were you trying to solve when you came to me?' },
              { q: 'Q2', text: 'What changed after we worked together — any specific results you remember?' },
              { q: 'Q3', text: 'Would you recommend me, and if so, to who specifically?' },
            ].map((item) => (
              <div key={item.q} className="flex items-start gap-3 bg-indigo-50 rounded-xl p-4">
                <span className="text-xs font-bold text-indigo-600 bg-indigo-100 rounded-full px-2 py-1 shrink-0">{item.q}</span>
                <p className="text-sm text-indigo-800 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed mb-10">
            Give clients a link where they can answer these three questions in under two minutes and you'll consistently get testimonials that are specific, credible, and actually useful. The blank page is the enemy — remove it.
          </p>

          {/* CTA */}
          <div className="bg-indigo-600 rounded-2xl p-8 text-center text-white mt-12">
            <p className="text-2xl font-black mb-2">Get testimonials that actually win you work.</p>
            <p className="text-indigo-200 text-sm mb-6">Proveify asks your clients the right questions automatically. They answer in 2 minutes, approve the result, and you publish it. Free plan available.</p>
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
