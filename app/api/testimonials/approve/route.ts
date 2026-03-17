import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { testimonialId, isOriginal, polishedContent } = await request.json();

    if (!testimonialId) {
      return NextResponse.json({ error: 'Missing testimonialId' }, { status: 400 });
    }

    await supabase
      .from('testimonials')
      .update({
        polished_content: isOriginal ? null : polishedContent,
        approved: true,
        approval_status: isOriginal ? 'original_approved' : 'ai_approved',
        approved_at: new Date().toISOString(),
      })
      .eq('id', testimonialId);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Approve error:', error);
    return NextResponse.json({ error: 'Failed to approve' }, { status: 500 });
  }
}
