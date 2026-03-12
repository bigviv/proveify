'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { use } from 'react';

type Testimonial = {
  id: string;
  client_name: string;
  client_role: string;
  content: string;
  polished_content: string | null;
  rating: number;
  approved_at: string | null;
};

export default function WidgetPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = use(params);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('testimonials')
        .select('*')
        .eq('user_id', userId)
        .eq('approved', true)
        .in('approval_status', ['approved', 'rejected'])
        .order('approved_at', { ascending: false });
      setTestimonials(data || []);
    };
    fetch();
  }, []);

  if (testimonials.length === 0) return (
    <div className="p-8 text-center text-gray-400 text-sm">No testimonials yet.</div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid gap-4 max-w-4xl mx-auto">
        {testimonials.map((t) => {
          const display = t.polished_content || t.content;
          return (
            <div key={t.id} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < t.rating ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">"{display}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{t.client_name}</p>
                  {t.client_role && <p className="text-xs text-gray-400">{t.client_role}</p>}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between">
                <p className="text-xs text-gray-300">
                  {t.polished_content && t.approved_at ? `✓ Approved by ${t.client_name}` : ''}
                </p>
                <a href="https://proveify.app" target="_blank" rel="noopener noreferrer"
                  className="text-xs text-gray-300 hover:text-indigo-400 transition-colors font-medium">
                  Verified by Proveify ↗
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-center text-xs text-gray-300 mt-6">Powered by Proveify</p>
    </div>
  );
}
