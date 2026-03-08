import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const action = searchParams.get('action');

  if (!token || !action) {
    return new Response('Invalid link.', { status: 400 });
  }

  const { data: testimonial } = await supabase
    .from('testimonials')
    .select('*')
    .eq('approval_token', token)
    .single();

  if (!testimonial) {
    return new Response('Testimonial not found.', { status: 404 });
  }

  if (action === 'approve') {
    await supabase
      .from('testimonials')
      .update({ 
        approved: true, 
        approval_status: 'approved' 
      })
      .eq('approval_token', token);

    return new Response(`
      <html>
        <head><meta name="viewport" content="width=device-width, initial-scale=1"></head>
        <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f9fafb;">
          <div style="text-align: center; padding: 40px;">
            <div style="font-size: 48px; margin-bottom: 16px;">🎉</div>
            <h1 style="font-size: 24px; font-weight: 800; margin-bottom: 8px;">Thank you!</h1>
            <p style="color: #6b7280; font-size: 15px;">Your testimonial has been approved and will be published shortly.</p>
          </div>
        </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });
  }

  if (action === 'reject') {
    await supabase
      .from('testimonials')
      .update({ 
        polished_content: null, 
        approval_status: 'rejected',
        approved: true
      })
      .eq('approval_token', token);

    return new Response(`
      <html>
        <head><meta name="viewport" content="width=device-width, initial-scale=1"></head>
        <body style="font-family: sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f9fafb;">
          <div style="text-align: center; padding: 40px;">
            <div style="font-size: 48px; margin-bottom: 16px;">👍</div>
            <h1 style="font-size: 24px; font-weight: 800; margin-bottom: 8px;">Got it!</h1>
            <p style="color: #6b7280; font-size: 15px;">We'll use your original words. Thanks for your honesty!</p>
          </div>
        </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });
  }

  return new Response('Invalid action.', { status: 400 });
}
