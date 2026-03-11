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

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      setUser(user);
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

  const handlePolish = async (id: string, content: string, clientEmail: string, clientName: string) => {
    setPolishing(id);
    try {
      const res = await fetch('/api/polish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          testimonialId: id,
          clientEmail,
          clientName
        }),
      });
      const data = await res.json();
      if (data.polished) {
        setTestimonials(prev => prev.map(t =>
          t.id === id ? {
            ...t,
            polished_content: data.polished,
            approval_status: data.awaitingApproval ? 'pending_approval' : 'approved'
          } : t
        ));
      }
    } finally {
      setPolishing(null);
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from('testimonials').delete().eq('id', id);
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const collectionUrl = user ? `${window.location.origin}/collect/${user.id}` : '';

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-400 text-sm">Loading...</div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between">
        <span className="text-lg font-bold tracking-tight">Proveify</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user?.email}</span>
          <a href="/upgrade" className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 font-medium">
            Upgrade
          </a>
          <button onClick={handleSignOut} className="text-sm text-gray-500 hover:text-gray-900">
            Sign out
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-12">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold mb-1">Your Dashboard</h1>
          <p className="text-gray-500 text-sm">Manage your testimonials and share your collection link.</p>
        </div>

        {/* Collection link */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-6">
          <h2 className="font-semibold text-indigo-900 mb-1">Your collection link</h2>
          <p className="text-sm text-indigo-700 mb-4">Share this link with clients to collect testimonials automatically.</p>
          <div className="flex gap-3 items-center">
            <input
              readOnly
              value={collectionUrl}
              className="flex-1 bg-white border border-indigo-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none"
            />
            <button
              onClick={() => navigator.clipboard.writeText(collectionUrl)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700"
            >
              Copy link
            </button>
          </div>
        </div>

        {/* Embed code */}
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-10">
          <h2 className="font-semibold text-gray-900 mb-1">Embed your wall of love</h2>
          <p className="text-sm text-gray-500 mb-4">Paste this into any website — Webflow, WordPress, Framer, Carrd. Works anywhere.</p>
          <div className="flex gap-3 items-center">
            <input
              readOnly
              value={`<iframe src="https://proveify.vercel.app/widget/${user?.id}" width="100%" height="400" frameborder="0" style="border:none;border-radius:16px;"></iframe>`}
              className="flex-1 bg-white border border-gray-200 rounded-lg px-4 py-2 text-xs text-gray-600 focus:outline-none font-mono"
            />
            <button
              onClick={() => navigator.clipboard.writeText(`<iframe src="https://proveify.vercel.app/widget/${user?.id}" width="100%" height="400" frameborder="0" style="border:none;border-radius:16px;"></iframe>`)}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-700 whitespace-nowrap"
            >
              Copy code
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          {[
            { label: "Total testimonials", value: testimonials.length },
            { label: "Approved", value: testimonials.filter(t => t.approved).length },
            { label: "AI Polished", value: testimonials.filter(t => t.polished_content).length },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
              <div className="text-3xl font-black text-indigo-600 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div>
          <h2 className="font-bold text-lg mb-6">
            Testimonials {testimonials.length > 0 && <span className="text-gray-400 font-normal text-sm ml-2">{testimonials.length} total</span>}
          </h2>

          {testimonials.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
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
              {testimonials.map((t) => (
                <div key={t.id} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                          {t.client_name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{t.client_name}</p>
                          <p className="text-xs text-gray-400">{t.client_role}</p>
                        </div>
                        <div className="flex gap-0.5 ml-2">
                          {[...Array(t.rating)].map((_, i) => <span key={i} className="text-yellow-400 text-xs">★</span>)}
                        </div>
                        <span className={`ml-auto text-xs px-2 py-1 rounded-full font-medium ${
                          t.approval_status === 'approved' ? 'bg-green-100 text-green-600' :
                          t.approval_status === 'pending_approval' ? 'bg-yellow-100 text-yellow-600' :
                          t.approval_status === 'low_rating' ? 'bg-red-50 text-red-500' :
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {t.approval_status === 'approved' ? '✓ Approved' :
                           t.approval_status === 'pending_approval' ? '⏳ Awaiting approval' :
                           t.approval_status === 'rejected' ? 'Original kept' :
                           t.approval_status === 'low_rating' ? '⚠️ Needs attention' :
                           'Pending'}
                        </span>
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
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-4 pt-4 border-t border-gray-50 items-center">
                    <button
                      onClick={() => handleApprove(t.id, t.approved)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium ${t.approved ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
                    >
                      {t.approved ? 'Unapprove' : 'Approve'}
                    </button>
                    {t.approval_status === 'low_rating' && (
                      <span className="text-xs bg-red-50 text-red-500 px-3 py-1.5 rounded-lg font-medium">
                        ⚠️ Low rating — reach out before publishing
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
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
