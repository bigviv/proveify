import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (!profile) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <p className="text-2xl mb-2">👤</p>
        <p className="text-gray-500 text-sm">Profile not found.</p>
      </div>
    </div>
  );

  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('user_id', profile.id)
    .eq('approved', true)
    .in('approval_status', ['approved', 'rejected'])
    .order('approved_at', { ascending: false });

  const list = testimonials || [];
  const avgRating = list.length
    ? (list.reduce((sum, t) => sum + t.rating, 0) / list.length).toFixed(1)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-black text-indigo-600 mx-auto mb-4">
            {profile.full_name?.charAt(0).toUpperCase() || '?'}
          </div>
          <h1 className="text-2xl font-black mb-1">{profile.full_name || username}</h1>
          {profile.bio && <p className="text-gray-500 text-sm mb-4">{profile.bio}</p>}

          {avgRating && (
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className={`text-lg ${i <= Math.round(Number(avgRating)) ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                ))}
              </div>
              <span className="text-sm font-bold text-gray-700">{avgRating}</span>
              <span className="text-sm text-gray-400">from {list.length} client{list.length !== 1 ? 's' : ''}</span>
            </div>
          )}
        </div>
      </div>

      {/* Testimonials */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        {list.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-12">No testimonials yet.</div>
        ) : (
          <div className="space-y-4">
            {list.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`text-base ${i < t.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  "{t.polished_content || t.content}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">{t.client_name}</p>
                    {t.client_role && <p className="text-xs text-gray-400">{t.client_role}</p>}
                  </div>
                  {t.approved_at && (
                    <span className="text-xs text-green-500 font-medium">✓ Verified</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Proveify footer */}
        <div className="text-center mt-12">
          <a href="https://proveify.vercel.app" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-indigo-600 transition-colors">
            <span>Powered by</span>
            <span className="font-bold text-gray-600">Proveify</span>
            <span>· Build your proof profile →</span>
          </a>
        </div>
      </div>
    </div>
  );
}
