import Link from 'next/link';

const testimonials = [
  {
    id: '1',
    client_name: 'Sarah Chen',
    client_role: 'Founder, Acme SaaS',
    rating: 5,
    content: 'I needed help with our landing page but honestly wasn\'t sure what to expect. Within two weeks of the redesign going live our conversion rate had improved noticeably. Communication was clear throughout and everything was delivered on time.',
    polished_content: 'Working with Alex transformed our landing page. Conversions improved within two weeks and the whole process was smooth from start to finish.',
    approved_at: '2025-03-01T10:00:00Z',
  },
  {
    id: '2',
    client_name: 'David Okafor',
    client_role: 'CEO, Buildfast',
    rating: 5,
    content: 'Delivered everything on time and was easy to work with. Would definitely hire again.',
    polished_content: 'Exceptional work delivered on time and within budget. One of the most professional freelancers I\'ve worked with — I\'d hire them again without hesitation.',
    approved_at: '2025-03-05T10:00:00Z',
  },
  {
    id: '3',
    client_name: 'Priya Sharma',
    client_role: 'Marketing Director, Growthly',
    rating: 5,
    content: 'Really good at what they do. Our email open rates went up after the copy changes.',
    polished_content: 'Outstanding copywriting that made a real difference. Our email open rates improved significantly after the changes — clear, measurable results.',
    approved_at: '2025-03-08T10:00:00Z',
  },
  {
    id: '4',
    client_name: 'James O\'Brien',
    client_role: 'Product Lead, Stackr',
    rating: 5,
    content: 'Great attention to detail. Did exactly what we asked and flagged things we hadn\'t thought of.',
    polished_content: 'Impressive attention to detail throughout the project. Delivered exactly what we needed and proactively flagged issues we hadn\'t anticipated — genuinely valuable.',
    approved_at: '2025-03-10T10:00:00Z',
  },
];

export default function ExamplePage() {
  const avgRating = (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Top banner */}
      <div className="bg-indigo-600 text-white text-center py-3 px-4">
        <p className="text-sm">
          This is an example Proveify proof profile.{' '}
          <Link href="/" className="underline font-semibold hover:text-indigo-200">
            Create yours free →
          </Link>
        </p>
      </div>

      {/* Profile header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-black text-indigo-600 mx-auto mb-4">
            A
          </div>
          <h1 className="text-2xl font-black mb-1">Alex Rivera</h1>
          <p className="text-gray-500 text-sm mb-4">Freelance Web Designer & Conversion Specialist</p>
          <div className="flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <span key={i} className={`text-lg ${i <= Math.round(Number(avgRating)) ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
              ))}
            </div>
            <span className="text-sm font-bold text-gray-700">{avgRating}</span>
            <span className="text-sm text-gray-400">from {testimonials.length} clients</span>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-2xl mx-auto px-6 py-12 space-y-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-base ${i < t.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
              ))}
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.polished_content}"</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{t.client_name}</p>
                <p className="text-xs text-gray-400">{t.client_role}</p>
              </div>
              <span className="text-xs text-green-500 font-medium">✓ Verified</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
              <p className="text-xs text-gray-300">✓ Approved by {t.client_name.split(' ')[0]}</p>
              <Link href="https://proveify.vercel.app" className="text-xs text-gray-300 hover:text-indigo-400 font-medium">
                Verified by Proveify ↗
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="text-center pb-16 px-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-md mx-auto">
          <p className="text-sm font-semibold text-gray-700 mb-2">Want a proof profile like this?</p>
          <p className="text-xs text-gray-400 mb-4">Collect verified testimonials from your clients in minutes.</p>
          <Link href="/login"
            className="block bg-indigo-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-indigo-700">
            Start free — no credit card needed →
          </Link>
        </div>
      </div>
    </div>
  );
}
