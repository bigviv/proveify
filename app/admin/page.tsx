import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ secret?: string }>;
}) {
  const { secret } = await searchParams;

  // Auth check
  if (secret !== process.env.ADMIN_SECRET) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl mb-2">🔒</p>
          <p className="text-gray-500 text-sm">Access denied.</p>
        </div>
      </div>
    );
  }

  // Fetch all data in parallel
  const [
    { data: users },
    { data: testimonials },
    { data: waitlist },
  ] = await Promise.all([
    supabase.from('profiles').select('id, email, plan, created_at').order('created_at', { ascending: false }),
    supabase.from('testimonials').select('*').order('created_at', { ascending: false }),
    supabase.from('waitlist').select('email, created_at').order('created_at', { ascending: false }),
  ]);

  const allTestimonials = testimonials || [];
  const allUsers = users || [];
  const allWaitlist = waitlist || [];

  // Stats
  const stats = {
    total_users: allUsers.length,
    pro_users: allUsers.filter(u => u.plan === 'pro' || u.plan === 'agency').length,
    total_testimonials: allTestimonials.length,
    ai_approved: allTestimonials.filter(t => t.approval_status === 'ai_approved').length,
    original_approved: allTestimonials.filter(t => t.approval_status === 'original_approved').length,
    pending: allTestimonials.filter(t => t.approval_status === 'pending').length,
    low_rating: allTestimonials.filter(t => t.approval_status === 'low_rating').length,
    waitlist: allWaitlist.length,
  };

  const lowRating = allTestimonials.filter(t => t.approval_status === 'low_rating');

  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">

      {/* Nav */}
      <div className="border-b border-gray-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">Proveify</span>
          <span className="text-xs bg-indigo-900 text-indigo-300 px-2 py-0.5 rounded-full font-medium">Admin</span>
        </div>
        <Link href="/" className="text-xs text-gray-500 hover:text-gray-300">← Back to site</Link>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-10">

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Registered Users', value: stats.total_users, color: 'text-white' },
            { label: 'Paid Users', value: stats.pro_users, color: 'text-green-400' },
            { label: 'Total Testimonials', value: stats.total_testimonials, color: 'text-indigo-400' },
            { label: 'Waitlist Signups', value: stats.waitlist, color: 'text-yellow-400' },
          ].map((s) => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">{s.label}</p>
              <p className={`text-4xl font-black ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Testimonial breakdown */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-5">Testimonial Breakdown</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'AI Approved', value: stats.ai_approved, color: 'text-indigo-400' },
              { label: 'Original Kept', value: stats.original_approved, color: 'text-green-400' },
              { label: 'Pending', value: stats.pending, color: 'text-yellow-400' },
              { label: 'Low Rating', value: stats.low_rating, color: 'text-red-400' },
            ].map((s) => (
              <div key={s.label} className="bg-gray-800 rounded-xl p-4 text-center">
                <p className={`text-3xl font-black mb-1 ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Low rating feedback */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-5">
            Low Rating Feedback
            <span className="ml-2 text-red-400 normal-case font-normal">({lowRating.length} total — private, never published)</span>
          </h2>
          {lowRating.length === 0 ? (
            <p className="text-gray-600 text-sm">No low rating feedback yet.</p>
          ) : (
            <div className="space-y-4">
              {lowRating.map((t) => (
                <div key={t.id} className="bg-gray-800 rounded-xl p-5 border border-red-900/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-900/50 flex items-center justify-center text-xs font-bold text-red-400">
                        {t.client_name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-200">{t.client_name}</p>
                        {t.client_role && <p className="text-xs text-gray-500">{t.client_role}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(i => (
                          <span key={i} className={`text-sm ${i <= t.rating ? 'text-yellow-400' : 'text-gray-700'}`}>★</span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">{formatDate(t.created_at)}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed bg-gray-900 rounded-lg p-3 italic">
                    "{t.content}"
                  </p>
                  {t.client_email && (
                    <p className="text-xs text-gray-600 mt-2">Email: {t.client_email}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Registered users */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-5">Registered Users</h2>
          {allUsers.length === 0 ? (
            <p className="text-gray-600 text-sm">No users yet.</p>
          ) : (
            <div className="space-y-2">
              {allUsers.map((u) => (
                <div key={u.id} className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-indigo-900 flex items-center justify-center text-xs font-bold text-indigo-300">
                      {u.email?.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-sm text-gray-300">{u.email}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      u.plan === 'pro' ? 'bg-indigo-900 text-indigo-300' :
                      u.plan === 'agency' ? 'bg-purple-900 text-purple-300' :
                      'bg-gray-700 text-gray-400'
                    }`}>
                      {u.plan || 'free'}
                    </span>
                    <span className="text-xs text-gray-600">{formatDate(u.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Waitlist */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-5">Waitlist Signups</h2>
          {allWaitlist.length === 0 ? (
            <p className="text-gray-600 text-sm">No waitlist signups yet.</p>
          ) : (
            <div className="space-y-2">
              {allWaitlist.map((w, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-yellow-900 flex items-center justify-center text-xs font-bold text-yellow-400">
                      {w.email?.charAt(0).toUpperCase()}
                    </div>
                    <p className="text-sm text-gray-300">{w.email}</p>
                  </div>
                  <span className="text-xs text-gray-600">{formatDate(w.created_at)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
