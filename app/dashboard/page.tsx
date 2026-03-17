'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

type Testimonial = {
  id: string;
  client_name: string;
  client_email: string;
  client_role: string;
  content: string;
  polished_content: string | null;
  rating: number;
  approved: boolean;
  approval_status: string;
  created_at: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [polishing, setPolishing] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();
  const [username, setUsername] = useState('');
  const [usernameSaved, setUsernameSaved] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUser(user);

      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();
      if (profile?.username) setUsername(profile.username);

      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setTestimonials(data || []);
      setLoading(false);
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleApprove = async (id: string, approved: boolean) => {
    await supabase.from('testimonials').update({ approved: !approved }).eq('id', id);
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, approved: !approved } : t));
  };

  const handleDelete = async (id: string) => {
    await supabase.from('testimonials').delete().eq('id', id);
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const handleSaveUsername = async () => {
    if (!username || !user) return;
    await supabase.from('profiles').update({ username }).eq('id', user.id);
    setUsernameSaved(true);
    setTimeout(() => setUsernameSaved(false), 2000);
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-400 text-sm">Loading...</div>
    </div>
  );

  const collectionUrl = user ? `${window.location.origin}/collect/${user.id}` : '';

  const statusLabel = (status: string) => {
    if (status === 'approved' || status === 'ai_approved') return { label: '✓ Approved', style: 'bg-green-100 text-green-600' };
    if (status === 'original_approved' || status === 'rejected') return { label: '✓ Original kept', style: 'bg-green-100 text-green-600' };
    if (status === 'pending_approval') return { label: '⏳ Awaiting approval', style: 'bg-yellow-100 text-yellow-600' };
    if (status === 'low_rating') return { label: '⚠️ Needs attention', style: 'bg-red-50 text-red-500' };
    return { label: 'Pending', style: 'bg-gray-100 text-gray-500' };
  };

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between">
        <span className="text-lg font-bold tracking-tight">Proveify</span>
        <div className="flex items-center gap-2">
          <span className="hidden sm:block text-xs text-gray-400 truncate max-w-[140px]">{user?.email}</span>
          <a href="/upgrade" className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 font-medium whitespace-nowrap">
            Upgrade
          </a>
          <button onClick={handleSignOut} className="text-xs text-gray-500 hover:text-gray-900 whitespace-nowrap">
            Sign out
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Your Dashboard</h1>
          <p className="text-gray-500 text-sm">Manage your testimonials and share your collection link.</p>
        </div>

        {/* Collection link */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 mb-4">
          <h2 className="font-semibold text-indigo-900 mb-1">Your collection link</h2>
          <p className="text-sm text-indigo-700 mb-3">Share this link with clients to collect testimonials automatically.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              readOnly
              value={collectionUrl}
              className="flex-1 bg-white border border-indigo-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none min-w-0"
            />
            <button
              onClick={() => navigator.clipboard.writeText(collectionUrl)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 whitespace-nowrap"
            >
              Copy link
            </button>
          </div>
        </div>

        {/* Embed code */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4">
          <h2 className="font-semibold text-gray-900 mb-1">Embed your wall of love</h2>
          <p className="text-sm text-gray-500 mb-3">Paste this into any website — Webflow, WordPress, Framer, Carrd.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              readOnly
              value={`<iframe src="https://proveify.app/widget/${user?.id}" width="100%" height="400" frameborder="0" style="border:none;border-radius:16px;"></iframe>`}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none font-mono min-w-0"
            />
            <button
              onClick={() => navigator.clipboard.writeText(`<iframe src="https://proveify.app/widget/${user?.id}" width="100%" height="400" frameborder="0" style="border:none;border-radius:16px;"></iframe>`)}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-700 whitespace-nowrap"
            >
              Copy code
            </button>
          </div>
        </div>

        {/* Public proof profile */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-8">
          <h2 className="font-semibold text-gray-900 mb-1">Your public proof profile</h2>
          <p className="text-sm text-gray-500 mb-3">Share this page in proposals and LinkedIn.</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 whitespace-nowrap">
              proveify.app/profile/
            </div>
            <input
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="yourname"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-0"
            />
            <button
              onClick={handleSaveUsername}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 whitespace-nowrap"
            >
              {usernameSaved ? 'Saved ✓' : 'Save'}
            </button>
          </div>
          {username && (
            <a href={`/profile/${username}`} target="_blank"
              className="text-xs text-indigo-500 mt-2 inline-block hover:underline">
              View your profile →
            </a>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: 'Total', value: testimonials.length },
            { label: 'Approved', value: testimonials.filter(t => t.approved).length },
            { label: 'AI Polished', value: testimonials.filter(t => t.polished_content).length },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
              <div className="text-3xl font-black text-indigo-600 mb-1">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <h2 className="font-bold text-lg mb-4 text-gray-900">
            Testimonials
            {testimonials.length > 0 && (
              <span className="text-gray-400 font-normal text-sm ml-2">{testimonials.length} total</span>
            )}
          </h2>

          {testimonials.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-semibold text-gray-700 mb-2">No testimonials yet</h3>
              <p className="text-gray-400 text-sm mb-6">Share your collection link with clients to get started.</p>
              <button
                onClick={() => navigator.clipboard.writeText(collectionUrl)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700"
              >
                Copy your link
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {testimonials.map((t) => {
                const status = statusLabel(t.approval_status);
                return (
                  <div key={t.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 shrink-0">
                        {t.client_name?.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div>
                            <p className="font-semibold text-sm">{t.client_name}</p>
                            {t.client_role && <p className="text-xs text-gray-400">{t.client_role}</p>}
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium shrink-0 ${status.style}`}>
                            {status.label}
                          </span>
                        </div>
                        <div className="flex gap-0.5 mt-1">
                          {[...Array(t.rating)].map((_, i) => <span key={i} className="text-yellow-400 text-xs">★</span>)}
                        </div>
                      </div>
                    </div>

                    {/* Original */}
                    <div className="mb-3">
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">Original</p>
                      <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 rounded-lg p-3">"{t.content}"</p>
                    </div>

                    {/* Polished */}
                    {t.polished_content && (
                      <div className="mb-3">
                        <p className="text-xs text-indigo-400 font-medium uppercase tracking-wide mb-1">✨ AI Polished</p>
                        <p className="text-gray-700 text-sm leading-relaxed bg-indigo-50 rounded-lg p-3">"{t.polished_content}"</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 mt-4 pt-4 border-t border-gray-50 flex-wrap">
                      <button
                        onClick={() => handleApprove(t.id, t.approved)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium ${t.approved ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
                      >
                        {t.approved ? 'Unapprove' : 'Approve'}
                      </button>
                      {t.approval_status === 'low_rating' && (
                        <span className="text-xs bg-red-50 text-red-500 px-3 py-1.5 rounded-lg font-medium">
                          ⚠️ Reach out before publishing
                        </span>
                      )}
                      <div className="ml-auto">
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="text-xs px-3 py-1.5 rounded-lg font-medium bg-red-50 text-red-500 hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
                        
