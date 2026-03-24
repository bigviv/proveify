import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Testimonial Templates for Freelancers — Copy and Paste | Proveify',
  description: '10 ready-to-use testimonial templates for freelancers across different industries — plus how to get testimonials that are even better than any template.',
  openGraph: {
    title: 'Testimonial Templates for Freelancers — Copy and Paste',
    description: '10 ready-to-use testimonial templates for freelancers across different industries — plus how to get testimonials that are even better than any template.',
    url: 'https://proveify.app/blog/testimonial-templates-for-freelancers',
    type: 'article',
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@proveify',
    title: 'Testimonial Templates for Freelancers — Copy and Paste',
    description: '10 ready-to-use testimonial templates for freelancers across different industries.',
  },
  alternates: {
    canonical: 'https://proveify.app/blog/testimonial-templates-for-freelancers',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Testimonial Templates for Freelancers — Copy and Paste',
  description: '10 ready-to-use testimonial templates for freelancers across different industries.',
  author: { '@type': 'Organization', name: 'Proveify' },
  publisher: { '@type': 'Organization', name: 'Proveify', url: 'https://proveify.app' },
  datePublished: '2026-03-24',
  url: 'https://proveify.app/blog/testimonial-templates-for-freelancers',
};

export default function BlogPost2() {
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
            Testimonial Templates for Freelancers — Copy and Paste
          </h1>

          <p className="text-xl text-gray-500 leading-relaxed">
            Ten ready-to-use testimonial templates across different freelance industries. Plus the one thing that makes templates unnecessary entirely.
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
            Most freelancers already know that testimonials matter. The problem isn't motivation — it's the blank page. Either you don't know what to ask clients to write, or clients don't know what to say when you ask them.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            Templates solve the blank page problem. A good testimonial template gives your client a structure they can fill in without having to think too hard — which dramatically increases the chance they actually follow through.
          </p>

          <p className="text-gray-600 leading-relaxed mb-10">
            Below are ten templates across different freelance industries. Take them, adapt them to your voice, and send them to clients who you know are happy with your work.
          </p>

          {/* Section 1 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">How to use these templates</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Don't send a template as-is and ask a client to fill in the blanks — that feels impersonal and puts them to work. Instead, use the template as a prompt: read it yourself, then write to your client in your own voice asking them to address those specific points.
          </p>

          <div className="bg-indigo-50 rounded-2xl p-6 mb-10">
            <p className="text-sm font-bold text-indigo-800 mb-3">The three things every good testimonial needs:</p>
            <div className="space-y-2">
              <div className="flex gap-3 items-start">
                <span className="text-indigo-600 font-bold text-sm shrink-0">01</span>
                <p className="text-sm text-indigo-700"><span className="font-semibold">The problem</span> — what were they trying to solve before working with you?</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-indigo-600 font-bold text-sm shrink-0">02</span>
                <p className="text-sm text-indigo-700"><span className="font-semibold">The result</span> — what changed after working with you, ideally with a specific number or outcome?</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-indigo-600 font-bold text-sm shrink-0">03</span>
                <p className="text-sm text-indigo-700"><span className="font-semibold">The recommendation</span> — would they work with you again and would they refer you?</p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <h2 className="text-2xl font-black text-gray-900 mb-6 mt-12">10 testimonial templates by freelance type</h2>

          {/* Template 1 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold text-white bg-indigo-600 rounded-full px-3 py-1">01</span>
              <h3 className="text-lg font-black text-gray-900">Web Designer / Developer</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-indigo-200">
              <p className="text-sm text-gray-600 leading-relaxed italic">
                "Before working with [name], our website was outdated and wasn't converting visitors into enquiries. They redesigned everything from scratch — the process was straightforward and they kept us in the loop throughout. Since launch, our contact form submissions have increased by [X]% and we've had multiple clients mention they found us through the site. We'd work with them again without hesitation."
              </p>
            </div>
          </div>

          {/* Template 2 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold text-white bg-indigo-600 rounded-full px-3 py-1">02</span>
              <h3 className="text-lg font-black text-gray-900">Copywriter / Content Writer</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-indigo-200">
              <p className="text-sm text-gray-600 leading-relaxed italic">
                "We needed website copy that actually sounded like us — not corporate filler. [Name] nailed it on the first draft. They asked the right questions upfront, understood our tone immediately, and delivered on time. We've since seen our bounce rate drop and our email enquiries are up. Will be using them for all future copy projects."
              </p>
            </div>
          </div>

          {/* Template 3 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold text-white bg-indigo-600 rounded-full px-3 py-1">03</span>
              <h3 className="text-lg font-black text-gray-900">Brand / Graphic Designer</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-indigo-200">
              <p className="text-sm text-gray-600 leading-relaxed italic">
                "We came to [name] with a vague brief and a tight budget. They helped us clarify exactly what we needed, delivered a brand identity that felt completely right, and were patient with our feedback throughout. The new branding has completely changed how clients perceive us — we now look like the premium service we actually offer."
              </p>
            </div>
          </div>

          {/* Template 4 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold text-white bg-indigo-600 rounded-full px-3 py-1">04</span>
              <h3 className="text-lg font-black text-gray-900">SEO Consultant</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-indigo-200">
              <p className="text-sm text-gray-600 leading-relaxed italic">
                "Our website was invisible on Google before [name] came on board. Within three months, we were ranking on page one for our most important keywords and organic traffic had grown by [X]%. What I appreciated most was that they explained everything clearly — no jargon, no mystery. I always knew exactly what was being done and why."
              </p>
            </div>
          </div>

          {/* Template 5 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold text-white bg-indigo-600 rounded-full px-3 py-1">05</span>
              <h3 className="text-lg font-black text-gray-900">Social Media Manager</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-indigo-200">
              <p className="text-sm text-gray-600 leading-relaxed italic">
                "I was posting inconsistently and getting no traction. [Name] took over our Instagram and LinkedIn completely — within two months our follower count had doubled and we were getting genuine enquiries from social for the first time. They're proactive, creative, and always on top of trends without us having to ask."
              </p>
            </div>
          </div>

          {/* Template 6 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold text-white bg-indigo-600 rounded-full px-3 py-1">06</span>
              <h3 className="text-lg font-black text-gray-900">Video Editor / Videographer</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-indigo-200">
              <p className="text-sm text-gray-600 leading-relaxed italic">
                "We had raw footage from our product launch and no idea what to do with it. [Name] turned it into a two-minute brand video that we've used on our website, at events, and across social media. The quality was far beyond what we expected at this price point, and the turnaround was faster than promised. Absolutely recommend."
              </p>
            </div>
          </div>

          {/* Template 7 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold text-white bg-indigo-600 rounded-full px-3 py-1">07</span>
              <h3 className="text-lg font-black text-gray-900">Business / Strategy Consultant</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-indigo-200">
              <p className="text-sm text-gray-600 leading-relaxed italic">
                "We brought [name] in when our growth had stalled and we couldn't identify why. They diagnosed the problem within the first week and gave us a practical roadmap we could actually execute. Six months later, revenue is up [X]% and the team has genuine clarity on our direction. Worth every penny."
              </p>
            </div>
          </div>

          {/* Template 8 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold text-white bg-indigo-600 rounded-full px-3 py-1">08</span>
              <h3 className="text-lg font-black text-gray-900">Photographer</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-indigo-200">
              <p className="text-sm text-gray-600 leading-relaxed italic">
                "We needed brand photography that would work across our website, social channels, and printed materials. [Name] made the whole shoot feel effortless — we felt comfortable immediately and the results were stunning. We've already had multiple clients comment on the photography specifically. Booked them again for next quarter."
              </p>
            </div>
          </div>

          {/* Template 9 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold text-white bg-indigo-600 rounded-full px-3 py-1">09</span>
              <h3 className="text-lg font-black text-gray-900">Coach / Trainer</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-indigo-200">
              <p className="text-sm text-gray-600 leading-relaxed italic">
                "I came to [name] feeling stuck and not sure what I actually wanted. Over three months of working together I got complete clarity on my direction, landed a role I actually want, and feel more confident than I have in years. Their approach is direct but genuinely supportive. If you're considering it, just do it."
              </p>
            </div>
          </div>

          {/* Template 10 */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-bold text-white bg-indigo-600 rounded-full px-3 py-1">10</span>
              <h3 className="text-lg font-black text-gray-900">Marketing Consultant</h3>
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border-l-4 border-indigo-200">
              <p className="text-sm text-gray-600 leading-relaxed italic">
                "We were spending a lot on ads without really understanding what was working. [Name] audited everything, cut our wasted spend by almost half, and rebuilt our campaigns from scratch. Within 60 days our cost per lead had dropped by [X]% and conversion rate was up. They also trained our internal team so we could maintain it ourselves."
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">Why templates are just the starting point</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            These templates will help. But they have a fundamental limitation — they show clients what a good testimonial looks like, rather than extracting the specific details of their experience with you.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            The most compelling testimonials aren't written from a template. They're written from actual memory — specific numbers, particular moments, genuine feelings about working with you. You can't template those details into existence. You have to draw them out.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            The best prompt you can give a client isn't a template to fill in — it's three specific questions:
          </p>

          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-100 rounded-full px-2 py-1 shrink-0 mt-0.5">Q1</span>
              <p className="text-sm text-gray-600">What were you trying to solve when you came to me?</p>
            </div>
            <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-100 rounded-full px-2 py-1 shrink-0 mt-0.5">Q2</span>
              <p className="text-sm text-gray-600">What changed after we worked together — any specific results you remember?</p>
            </div>
            <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
              <span className="text-xs font-bold text-indigo-600 bg-indigo-100 rounded-full px-2 py-1 shrink-0 mt-0.5">Q3</span>
              <p className="text-sm text-gray-600">Would you recommend me to others, and if so, who specifically?</p>
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed mb-10">
            Give clients those three questions with a link where they can answer them in two minutes, and you'll get testimonials that are more specific and more persuasive than any template.
          </p>

          {/* Section 4 */}
          <h2 className="text-2xl font-black text-gray-900 mb-4 mt-12">What to do with a testimonial once you have it</h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Most freelancers collect a testimonial and drop it in a folder somewhere. Here's where it should actually go:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {[
              { place: 'Website homepage', tip: 'Above the fold if possible' },
              { place: 'Portfolio page', tip: 'Next to the relevant project' },
              { place: 'LinkedIn profile', tip: 'In the Featured section' },
              { place: 'Proposals', tip: 'Relevant industry match' },
              { place: 'Email signature', tip: 'Rotating short quotes' },
              { place: 'Cold outreach', tip: 'One line from a similar client' },
            ].map((item) => (
              <div key={item.place} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide mb-1">{item.place}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{item.tip}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed mb-10">
            One testimonial from the right client, placed in the right context, can be the difference between winning and losing a pitch. Don't leave them sitting in a document no one reads.
          </p>

          {/* CTA */}
          <div className="bg-indigo-600 rounded-2xl p-8 text-center text-white mt-12">
            <p className="text-2xl font-black mb-2">Stop sending templates. Start collecting real testimonials.</p>
            <p className="text-indigo-200 text-sm mb-6">Proveify asks your clients the right questions automatically — they answer in 2 minutes, approve the result, and you publish it. Free plan available.</p>
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
              <Link href="/blog/how-to-ask-client-for-testimonial" className="block text-sm text-indigo-600 hover:underline">How to ask a client for a testimonial (without being awkward) →</Link>
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
