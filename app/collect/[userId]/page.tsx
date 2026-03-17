'use client';
import { useState } from 'react';
import { use } from 'react';

type Tone = 'concise' | 'casual' | 'professional';

interface PolishedVersions {
  concise: string;
  casual: string;
  professional: string;
}

export default function CollectPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params);

  const [step, setStep] = useState<'form' | 'polishing' | 'review' | 'low_star' | 'done'>('form');
  const [form, setForm] = useState({ name: '', email: '', role: '', content: '', rating: 5, website: '' });
  const [versions, setVersions] = useState<PolishedVersions | null>(null);
  const [savedId, setSavedId] = useState('');
  const [savedToken, setSavedToken] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Tone | 'original' | null>(null);

  const toneLabels: Record<Tone, { label: string; desc: string; emoji: string }> = {
    concise: { label: 'Concise', desc: 'Short & punchy', emoji: '⚡' },
    casual: { label: 'Casual', desc: 'Warm & natural', emoji: '😊' },
    professional: { label: 'Professional', desc: 'Polished & al', emoji: '💼' },
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.content.trim()) {
      setError('Please fill in your name and experience before submitting.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          name: form.name,
          email: form.email,
          role: form.role,
          content: form.content,
          rating: form.rating,
          website: form.website,
        }),
      });

      const payload = await res.json();

      if (!res.ok || !payload?.testimonial) {
        console.error('Create testimonial failed:', payload);
        setError(payload?.error || 'Something went wrong saving your response. Please try again.');
        setSubmitting(false);
        return;
      }

      const data = payload.testimonial;
      setSavedId(data.id);
      setSavedToken(data.approval_token);

      if (data.approval_status === 'low_rating') {
        setStep('low_star');
        setSubmitting(false);
        return;
      }

      setStep('polishing');

      // Polish all three tones in parallel — previewOnly so nothing saves to DB yet
      const [conciseRes, casualRes, professionalRes] = await Promise.all([
        fetch('/api/polish', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: form.content.trim(),
            testimonialId: data.id,
            clientName: form.name.trim(),
            clientEmail: form.email.trim(),
            tone: 'concise',
            skipEmail: true,
            previewOnly: true,
          }),
        }),
        fetch('/api/polish', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: form.content.trim(),
            testimonialId: data.id,
            clientName: form.name.trim(),
            clientEmail: form.email.trim(),
            tone: 'casual',
            skipEmail: true,
            previewOnly: true,
          }),
        }),
        fetch('/api/polish', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: form.content.trim(),
            testimonialId: data.id,
            clientName: form.name.trim(),
            clientEmail: form.email.trim(),
            tone: 'professional',
            skipEmail: true,
            previewOnly: true,
          }),
        }),
      ]);

      const [conciseData, casualData, professionalData] = await Promise.all([
        conciseRes.json(),
        casualRes.json(),
        professionalRes.json(),
      ]);

      setVersions({
        concise: conciseData.polished || form.content,
        casual: casualData.polished || form.content,
        professional: professionalData.polished || form.content,
      });

      setStep('review');

    } catch (err) {
      console.error('Submit error:', err);
      setError('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  const handleApprove = async (choice: Tone | 'original') => {
  setSelected(choice);
  const isOriginal = choice === 'original';

  await fetch('/api/testimonials/approve', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      testimonialId: savedId,
      approvalToken: savedToken,
      isOriginal,
      polishedContent: isOriginal ? null : versions?.[choice as Tone],
    }),
  });

  setStep('done');
};

  if (step === 'polishing') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4 animate-pulse">✨</div>
        <p className="text-gray-600 font-medium">Creating your versions...</p>
        <p className="text-gray-400 text-sm mt-1">We're preparing three options for you</p>
      </div>
    </div>
  );

  if (step === 'low_star') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="text-5xl mb-4">🙏</div>
        <h1 className="text-2xl font-bold mb-3">Thank you for sharing this</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Your feedback is private and will only be seen by the business. It genuinely helps them improve.
        </p>
        <p className="text-gray-400 text-xs mt-4">You can close this tab now.</p>
      </div>
    </div>
  );

  if (step === 'review' && versions) return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-3xl mb-3">✨</div>
          <h1 className="text-2xl font-bold mb-2">Pick your favourite version</h1>
          <p className="text-gray-500 text-sm">Tap the one that sounds most like you.</p>
        </div>

        {/* Original */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-3">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">📝</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Your original words</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed italic mb-4">"{form.content}"</p>
          <button
            onClick={() => handleApprove('original')}
            className="w-full border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Use my original words
          </button>
        </div>

        {/* Three tone versions */}
        <div className="space-y-3">
          {(Object.keys(toneLabels) as Tone[]).map((tone) => (
            <div key={tone} className="bg-white rounded-2xl border border-gray-200 p-5 hover:border-indigo-300 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">{toneLabels[tone].emoji}</span>
                <div>
                  <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">{toneLabels[tone].label}</span>
                  <span className="text-xs text-gray-400 ml-2">{toneLabels[tone].desc}</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed italic mb-4">"{versions[tone]}"</p>
              <button
                onClick={() => handleApprove(tone)}
                className="w-full bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
              >
                Use this version ✓
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6 mb-8">
          All versions are based entirely on what you wrote. Nothing has been invented.
        </p>
      </div>
    </div>
  );

  if (step === 'done') return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold mb-2">Thank you!</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">
          Your testimonial has been submitted. It means a lot!
        </p>
        <p className="text-gray-400 text-xs">You can close this tab now.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">Share your experience</h1>
          <p className="text-gray-500 text-sm">Takes less than 2 minutes.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-5">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Your name *</label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Smith"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1.5">Your email</label>
              <input
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="jane@company.com"
                type="email"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Your role / company</label>
            <input
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
              placeholder="Founder at Acme Inc."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1.5">Your experience *</label>
            <textarea
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              placeholder="Tell us about your experience working together..."
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex gap-2">
              {[1,2,3,4,5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setForm({ ...form, rating: star })}
                  className={`text-3xl transition-transform hover:scale-110 ${star <= form.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Honeypot — hidden from real users, bots will fill this */}
          <input
            type="text"
            value={form.website}
            onChange={e => setForm({ ...form, website: e.target.value })}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || !form.name.trim() || !form.content.trim()}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
          >
            {submitting ? 'Submitting...' : 'Submit testimonial →'}
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">Powered by Proveify</p>
      </div>
    </div>
  );
}
