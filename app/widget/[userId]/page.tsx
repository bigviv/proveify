import { createClient } from '@/lib/supabase-server';

export default async function WidgetPage({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  const supabase = await createClient();

  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .eq('user_id', userId)
    .eq('approved', true)
    .order('created_at', { ascending: false });

  if (!testimonials || testimonials.length === 0) return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', textAlign: 'center', color: '#999' }}>
      No testimonials yet.
    </div>
  );

  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: transparent; }
          .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; padding: 8px; }
          .card { background: white; border: 1px solid #f0f0f0; border-radius: 16px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
          .stars { color: #fbbf24; font-size: 14px; margin-bottom: 12px; }
          .quote { color: #374151; font-size: 14px; line-height: 1.6; font-style: italic; margin-bottom: 16px; }
          .author { display: flex; align-items: center; gap: 10px; }
          .avatar { width: 36px; height: 36px; border-radius: 50%; background: #e0e7ff; color: #4f46e5; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex-shrink: 0; }
          .name { font-weight: 600; font-size: 13px; color: #111; }
          .role { font-size: 12px; color: #9ca3af; }
          .badge { text-align: center; margin-top: 16px; }
          .badge a { font-size: 11px; color: #c4b5fd; text-decoration: none; }
          .badge a:hover { color: #7c3aed; }
        `}</style>
      </head>
      <body>
        <div className="grid">
          {testimonials.map((t: any) => (
            <div key={t.id} className="card">
              <div className="stars">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</div>
              <p className="quote">"{t.polished_content || t.content}"</p>
              <div className="author">
                <div className="avatar">{t.client_name?.charAt(0).toUpperCase()}</div>
                <div>
                  <p className="name">{t.client_name}</p>
                  {t.client_role && <p className="role">{t.client_role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="badge">
          <a href="https://proveify.vercel.app" target="_blank">Powered by Proveify</a>
        </div>
      </body>
    </html>
  );
}
