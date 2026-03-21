import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog — Testimonials, Social Proof & Freelance Growth | Proveify',
  description: 'Practical guides for freelancers on collecting testimonials, building social proof, and winning more clients. From the team at Proveify.',
  openGraph: {
    title: 'Blog — Proveify',
    description: 'Practical guides for freelancers on collecting testimonials, building social proof, and winning more clients.',
    url: 'https://proveify.app/blog',
    images: [{ url: '/og-image.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@proveify',
  },
  alternates: {
    canonical: 'https://proveify.app/blog',
  },
};

const posts = [
  {
    slug: 'how-to-ask-client-for-testimonial',
    title: 'How to Ask a Client for a Testimonial (Without Being Awkward)',
    excerpt: 'You did great work. The client was happy. But somehow asking for a testimonial still feels uncomfortable. Here\'s how to make it natural — and how to actually get one.',
    readTime: '5 min read',
    date: 'March 2026',
    published: true,
  },
  {
    slug: 'testimonial-templates-for-freelancers',
    title: 'Testimonial Templates for Freelancers — Copy and Paste',
    excerpt: '10 ready-to-use testimonial templates across different freelance industries — plus how to get testimonials that are even better than any template.',
    readTime: '4 min read',
    date: 'Coming soon',
    published: false,
  },
  {
    slug: 'what-makes-a-good-testimonial',
    title: 'What Makes a Good Testimonial? (With Examples)',
    excerpt: 'Most testimonials freelancers receive are kind but useless. Here\'s exactly what separates a testimonial that wins work from one that gets ignored.',
    readTime: '5 min read',
    date: 'Coming soon',
    published: false,
  },
  {
    slug: 'how-to-embed-testimonials-on-your-website',
    title: 'How to Embed Testimonials on Your Website',
    excerpt: 'A practical guide to adding testimonials to Webflow, WordPress, Framer, Carrd, and any other website — including the one-line option.',
    readTime: '4 min read',
    date: 'Coming soon',
    published: false,
  },
  {
    slug: 'social-proof-for-freelancers',
    title: 'Social Proof for Freelancers: The Complete Guide',
    excerpt: 'Why social proof matters more than your portfolio, how to build it from scratch, and how to use it to win clients you couldn\'t before.',
    readTime: '8 min read',
    date: 'Coming soon',
    published: false,
  },
  {
    slug: 'how-to-collect-client-feedback-automatically',
    title: 'How to Collect Client Feedback Automatically',
    excerpt: 'Stop chasing clients for reviews. Here\'s how to build a system that collects feedback without you having to remember to ask.',
    readTime: '5 min read',
    date: 'Coming soon',
    published: false,
  },
];

export default function BlogIndex() {
  const published = posts.filter(p => p.published);
  const upcoming = posts.filter(p => !p.published);

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100 max-w-6xl mx-auto">
        <Link href="/" className="text-xl font-bold tracking-tight">Proveify</Link>
        <div className="flex items-center gap-4">
          <Link href="/blog" className="text-sm text-indigo-600 font-medium">Blog</Link>
          <Link href="/#pricing" className="hidden sm:block text-sm text-gray-500 hover:text-gray-900">Pricing</Link>
          <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium">Login</Link>
          <Link href="/login" className="bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800">Start free</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          📖 The Proveify Blog
        </div>
        <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-4">
          Win more clients with<br />better social proof.
        </h1>
        <p className="text-xl text-gray-500 max-w-xl leading-relaxed">
          Practical guides on collecting testimonials, building trust, and turning happy clients into your best marketing.
        </p>
      </section>

      {/* Published posts */}
      <section className="max-w-4xl mx-auto px-6 pb-8">
        <div className="space-y-6">
          {published.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white border border-gray-100 rounded-2xl p-7 hover:border-indigo-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">Published</span>
                    <span className="text-xs text-gray-400">{post.date} · {post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-black text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">{post.excerpt}</p>
                </div>
                <span className="text-gray-300 group-hover:text-indigo-400 transition-colors text-xl shrink-0 mt-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Coming soon */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-5 mt-8">Coming soon</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {upcoming.map((post) => (
            <div
              key={post.slug}
              className="bg-gray-50 border border-gray-100 rounded-2xl p-6 opacity-70"
            >
              <p className="text-xs text-gray-400 mb-2">{post.readTime}</p>
              <h3 className="text-base font-bold text-gray-700 mb-2 leading-snug">{post.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-black text-white mb-3">Stop chasing clients for testimonials.</h2>
          <p className="text-indigo-200 mb-6 text-sm">Set up in 5 minutes. Free plan available.</p>
          <Link
            href="/login"
            className="inline-block bg-white text-indigo-600 font-bold px-8 py-3 rounded-xl text-sm hover:bg-indigo-50 transition-colors"
          >
            Start collecting for free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
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
