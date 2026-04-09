import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Embed Testimonials on Your Website | Proveify',
  description: 'A practical guide to adding testimonials to Webflow, WordPress, Framer, Carrd, Squarespace, and any other website — including the one-line option.',
  openGraph: {
    title: 'How to Embed Testimonials on Your Website',
    description: 'A practical guide to adding testimonials to Webflow, WordPress, Framer, Carrd, Squarespace, and any other website.',
    url: 'https://proveify.app/blog/how-to-embed-testimonials-on-your-website',
    type: 'article',
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@proveify',
    title: 'How to Embed Testimonials on Your Website',
    description: 'A practical guide to adding testimonials to Webflow, WordPress, Framer, Carrd, and more.',
  },
  alternates: {
    canonical: 'https://proveify.app/blog/how-to-embed-testimonials-on-your-website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'How to Embed Testimonials on Your Website',
  description: 'A practical guide to adding testimonials to Webflow, WordPress, Framer, Carrd, and any other website.',
  author: { '@type': 'Organization', name: 'Proveify' },
  publisher: { '@type': 'Organization', name: 'Proveify', url: 'https://proveify.app' },
  datePublished: '2026-04-09',
  url: 'https://proveify.app/blog/how-to-embed-testimonials-on-your-website',
};

export default function BlogPost4() {
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
            <span className="text-sm text-gray-400">5 min read</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-6">
            How to Embed Testimonials on Your Website
          </h1>

          <p className="text-xl text-gray-500 leading-relaxed">
            You have testimonials. Now you need them on your website. Here is exactly how to add them to every major platform — and the one-line option that works everywhere.
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
            Getting testimonials is one problem. Getting them onto your website so they actually influence people is a different one. A testimonial sitting in a Google Doc or a screenshot folder is doing nothing for you.
          </p>

          <p className="text-gray-600 leading-relaxed mb-10">
            This guide covers every realistic option — from pasting HTML manually to one-line embeds — across the platforms freelancers actually use.
          </p>

          {/* Section 1 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">Where testimonials should actually live on your site</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Before the how, the where matters more than most people realise. A dedicated testimonials page buried in your nav is one of the least effective places to put them. Nobody navigates there.
          </p>

          <div className="space-y-3 mb-10">
            {[
              { place: 'Homepage — above the fold', why: 'This is where trust is built or lost. A strong testimonial near your main CTA directly increases signups and enquiries.' },
              { place: 'Homepage — near the pricing section', why: 'People hesitate most just before they commit. A testimonial at this exact point addresses the last objection.' },
              { place: 'Portfolio or case study pages', why: 'Match the testimonial to the project. A designer testimonial on a design project page is far more credible than a generic wall.' },
              { place: 'Proposals and pitch decks', why: 'Not a website placement but the most direct conversion context. One relevant testimonial in a proposal can close a deal.' },
              { place: 'Contact or booking pages', why: 'People filling in a form are already interested. A testimonial here confirms they are making the right call.' },
            ].map((item) => (
              <div key={item.place} className="flex gap-4 bg-gray-50 rounded-xl p-4">
                <span className="text-indigo-600 font-bold shrink-0 mt-0.5">→</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm mb-1">{item.place}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.why}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Section 2 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">The one-line option that works on every platform</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            If you collect testimonials with Proveify, embedding them anywhere takes one line of code. Paste this wherever you want your testimonials to appear:
          </p>

          <div className="bg-gray-900 rounded-xl p-5 mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">Embed code</p>
            <code className="text-green-400 text-sm leading-relaxed break-all">
              {'<iframe src="https://proveify.app/widget/YOUR-USER-ID" width="100%" height="500" frameborder="0" style="border:none;border-radius:16px;"></iframe>'}
            </code>
          </div>

          <p className="text-gray-600 leading-relaxed mb-10">
            Replace YOUR-USER-ID with your ID from the Proveify dashboard. The widget updates automatically whenever a new testimonial is approved — no need to touch your website again.
          </p>

          {/* Section 3 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">Platform-by-platform instructions</h2>

          {/* Webflow */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-sm font-bold text-blue-600">W</div>
              <h3 className="text-lg font-black">Webflow</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 space-y-2">
              <p className="text-sm text-gray-600 leading-relaxed">1. Open your project in the Webflow Designer</p>
              <p className="text-sm text-gray-600 leading-relaxed">2. Drag an <strong>Embed</strong> element onto your page where you want testimonials to appear</p>
              <p className="text-sm text-gray-600 leading-relaxed">3. Double-click the embed block and paste the iframe code</p>
              <p className="text-sm text-gray-600 leading-relaxed">4. Click Save and close — then publish your site</p>
            </div>
            <p className="text-xs text-gray-400 mt-2">The Embed element is in the Add panel under Components.</p>
          </div>

          {/* WordPress */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center text-sm font-bold text-white">WP</div>
              <h3 className="text-lg font-black">WordPress</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 space-y-2">
              <p className="text-sm text-gray-600 leading-relaxed">1. Open the page you want to edit in the Block Editor</p>
              <p className="text-sm text-gray-600 leading-relaxed">2. Add a <strong>Custom HTML</strong> block (search for it in the block inserter)</p>
              <p className="text-sm text-gray-600 leading-relaxed">3. Paste the iframe code into the HTML block</p>
              <p className="text-sm text-gray-600 leading-relaxed">4. Click Update or Publish</p>
            </div>
            <p className="text-xs text-gray-400 mt-2">If you use Elementor or Divi, look for an HTML widget — same approach.</p>
          </div>

          {/* Framer */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-sm font-bold text-purple-600">Fr</div>
              <h3 className="text-lg font-black">Framer</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 space-y-2">
              <p className="text-sm text-gray-600 leading-relaxed">1. In Framer, press <strong>I</strong> to open the Insert menu</p>
              <p className="text-sm text-gray-600 leading-relaxed">2. Search for <strong>Embed</strong> and drag it onto your canvas</p>
              <p className="text-sm text-gray-600 leading-relaxed">3. In the right panel under Embed, paste your iframe URL (just the src value, not the full tag)</p>
              <p className="text-sm text-gray-600 leading-relaxed">4. Resize the embed block to fit your layout and publish</p>
            </div>
            <p className="text-xs text-gray-400 mt-2">Framer takes the URL directly — use just the https://proveify.app/widget/YOUR-USER-ID part.</p>
          </div>

          {/* Carrd */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-sm font-bold text-green-600">Ca</div>
              <h3 className="text-lg font-black">Carrd</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 space-y-2">
              <p className="text-sm text-gray-600 leading-relaxed">1. Click the <strong>+</strong> button to add a new element</p>
              <p className="text-sm text-gray-600 leading-relaxed">2. Choose <strong>Embed</strong> from the element types</p>
              <p className="text-sm text-gray-600 leading-relaxed">3. Set the type to <strong>Code</strong> and paste the full iframe tag</p>
              <p className="text-sm text-gray-600 leading-relaxed">4. Save and publish</p>
            </div>
            <p className="text-xs text-gray-400 mt-2">Embed elements require Carrd Pro. If you are on the free plan you will need to upgrade.</p>
          </div>

          {/* Squarespace */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-sm font-bold text-white">Sq</div>
              <h3 className="text-lg font-black">Squarespace</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 space-y-2">
              <p className="text-sm text-gray-600 leading-relaxed">1. Edit the page where you want testimonials</p>
              <p className="text-sm text-gray-600 leading-relaxed">2. Click the <strong>+</strong> to add a block and choose <strong>Code</strong></p>
              <p className="text-sm text-gray-600 leading-relaxed">3. Paste the iframe code into the code block</p>
              <p className="text-sm text-gray-600 leading-relaxed">4. Click Apply and save the page</p>
            </div>
            <p className="text-xs text-gray-400 mt-2">Code blocks require a Business plan or higher on Squarespace.</p>
          </div>

          {/* Any HTML site */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-sm font-bold text-orange-600">{'</>'}</div>
              <h3 className="text-lg font-black">Any HTML site</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 space-y-2">
              <p className="text-sm text-gray-600 leading-relaxed">Open your HTML file and paste the iframe code wherever you want testimonials to appear — between sections, at the bottom of a page, or inline with other content.</p>
              <div className="bg-gray-900 rounded-lg p-4 mt-3">
                <code className="text-green-400 text-xs leading-relaxed break-all">
                  {'<!-- Testimonials section -->\n<iframe src="https://proveify.app/widget/YOUR-ID"\n  width="100%" height="500"\n  frameborder="0"\n  style="border:none;border-radius:16px;">\n</iframe>'}
                </code>
              </div>
            </div>
          </div>

          {/* Section 4 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">Tips for making embedded testimonials convert better</h2>

          <div className="space-y-3 mb-10">
            {[
              { tip: 'Put them near your CTA, not below your footer', desc: 'Most freelancers bury testimonials at the bottom. The highest-converting placement is directly above or beside your main call to action.' },
              { tip: 'Three to five is the sweet spot', desc: 'Fewer than three looks thin. More than eight and people stop reading. Three to five well-chosen testimonials outperform a wall of twenty generic ones.' },
              { tip: 'Match the testimonial to the audience', desc: 'If you work with startups and agencies, show testimonials from both. If a prospect sees someone like themselves in your testimonials, conversion goes up significantly.' },
              { tip: 'Make sure they load fast', desc: 'The Proveify widget is lightweight but any embed adds load time. Place it below the fold so it does not block your initial page render.' },
            ].map((item) => (
              <div key={item.tip} className="flex gap-4 bg-gray-50 rounded-xl p-4">
                <span className="text-green-500 font-bold shrink-0 mt-0.5">✓</span>
                <div>
                  <p className="font-semibold text-gray-800 text-sm mb-1">{item.tip}</p>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-indigo-600 rounded-2xl p-8 text-center text-white mt-12">
            <p className="text-2xl font-black mb-2">Collect testimonials and embed them in minutes.</p>
            <p className="text-indigo-200 text-sm mb-6">Proveify collects, polishes, and displays your testimonials with one line of code. Free plan available.</p>
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
              <Link href="/blog/what-makes-a-good-testimonial" className="block text-sm text-indigo-600 hover:underline">What makes a good testimonial? (With examples) →</Link>
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
