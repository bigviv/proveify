'use client';
import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { use } from 'react';

export default function CollectPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params);
  const supabase = createClient();

  const [step, setStep] = useState<'form' | 'polishing' | 'review' | 'done'>('form');
  const [form, setForm] = useState({ name: '', email: '', role: '', content: '', rating: 5 });
  const [polished, setPolished] = useState('');
  const [savedId, setSavedId] = useState('');
  const [usePolished, setUsePolished] = useState(true);

  const handleSubmit = async () => {
    if (!form.name || !form.content) return;
    setStep('polishing');

    // Save original first
    const { data } = await supabase.from('testimonials').insert({
      user_id: userId,
      client_name: form.name,
      client_email: form.email,
      client_role: form.role,
      content: form.content,
      rating: form.rating,
      approved: false,
      approval_status: 'pending',
    }).select().single();

    setSavedId(data.id);

    // Polish with AI
    try {
      const res = await fetch('/api/polish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: form.content,
          testimonialId: data.id,
          clientEmail: form.email,
          clientName: form.name,
          skipEmail: true,
        }),
      });
      const result = await res.json();
      setPolished(result.polished || form.content);
      setStep('review');
    } catch {
      setPolished(form.content);
      setStep('review');
    }
  };

  const handleApprove = async (approved: boolean) => {
    setUsePolished(approved);
    await supabase.from('testimonials').update({
      polished_content: approved ? polished : null,
      approved: true,
      approval_status: approved ? 'approved' : 'rejected',
    }).eq('id', savedId);
    setStep('done');
  };

  if (step === 'polishing') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4 animate-pulse">✨</div>
        <p className="text-gray-600 font-medium">Polishing your testimonial...</p>
        <p className="text-gray-400 text-sm mt-1">Just a moment</p>
      </div>
    </div>
  );

  if (step === 'review') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="text-3xl mb-3">✨</div>
          <h1 className="text-2xl font-bold mb-2">Here's your testimonial</h1>
          <p className="text-gray-500 text-sm">We've tidied it up a little. Does this capture your experience?</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-4">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">Your original words</p>
          <p className="text-gray-500 text-sm leading-relaxed italic">"{form.content}"</p>
        </div>

        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-6 mb-8">
          <p className="text-xs text-indigo-400 font-medium uppercase tracking-wide mb-2">✨ Polished version</p>
          <p className="text-gray-800 text-sm leading-relaxed italic">"{polished}"</p>
        </div>

        <p className="text-center text-sm text-gray-500 mb-4">Which version would you like to publish?</p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => handleApprove(true)}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 text-sm"
          >
            ✓ Use the polished version
          </button>
          <button
            onClick={() => handleApprove(false)}
            className="w-full bg-white border border-gray-200 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 text-sm"
          >
            Use my original words instead
          </button>
        </div>
      </div>
    </div>
  );

  if (step === 'done') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold mb-2">Thank you!</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Your testimonial has been submitted and will be published shortly. It means a lot!
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Share your experience</h1>
          <p className="text-gray-500 text-sm">Takes less than 2 minutes. Your words help others make better decisions.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Your name *</label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Smith"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Your email</label>
              <input
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="jane@company.com"
                type="email"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Your role / company</label>
            <input
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              placeholder="Founder at Acme Inc."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1.5">Your experience *</label>
            <textarea
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              placeholder="Tell us about your experience working together..."
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">Rating</label>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(star => (
                <button
                  key={star}
                  onClick={() => setForm({ ...form, rating: star })}
                  className={`text-2xl transition-transform hover:scale-110 ${star <= form.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!form.name || !form.content}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
          >
            Submit testimonial →
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">Powered by Proveify</p>
      </div>
    </div>
  );
}
