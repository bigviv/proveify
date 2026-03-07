'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';

export default function CollectPage({ params }: { params: { userId: string } }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const supabase = createClient();

  const handleSubmit = async () => {
    if (!name || !content) return;
    setStatus('loading');
    try {
      const { error } = await supabase.from('testimonials').insert({
        user_id: params.userId,
        client_name: name,
        client_role: role,
        content: content,
        rating: rating,
        approved: false,
      });
      if (error) { setStatus('error'); return; }
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 w-full max-w-md text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold mb-2">Thank you!</h1>
        <p className="text-gray-500 text-sm">Your testimonial has been submitted successfully. We really appreciate you taking the time.</p>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <span className="text-xl font-bold tracking-tight">Proveify</span>
          <h1 className="text-2xl font-bold mt-4 mb-2">Share your experience</h1>
          <p className="text-gray-500 text-sm">Your feedback means the world. It only takes 2 minutes.</p>
        </div>

        <div className="space-y-5">

          {/* Rating */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">Your rating</label>
            <div className="flex gap-2">
              {[1,2,3,4,5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-2xl transition-transform hover:scale-110 ${star <= rating ? 'text-yellow-400' : 'text-gray-200'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Your name <span className="text-red-400">*</span></label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Jane Smith"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Your role / company <span className="text-gray-400 font-normal">(optional)</span></label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="CEO at Acme Inc."
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Testimonial */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Your testimonial <span className="text-red-400">*</span></label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your experience working together. What did we help you achieve?"
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">{content.length}/500 characters</p>
          </div>

          {status === 'error' && (
            <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
          )}

          <button
            onClick={handleSubmit}
            disabled={status === 'loading' || !name || !content}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50"
          >
            {status === 'loading' ? 'Submitting...' : 'Submit testimonial'}
          </button>

          <p className="text-center text-xs text-gray-400">Powered by <a href="https://proveify.vercel.app" className="text-indigo-400 hover:underline">Proveify</a></p>
        </div>
      </div>
    </main>
  );
}
