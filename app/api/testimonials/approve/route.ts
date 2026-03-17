import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { testimonialId, approvalToken, isOriginal, polishedContent } = await request.json();

    if (!testimonialId || !approvalToken) {
      return NextResponse.json({ error: 'Missing approval credentials' }, { status: 400 });
    }

    const { data: testimonial, error: fetchError } = await supabase
      .from('testimonials')
      .select('id, approval_status, approval_token, approval_token_expires_at, approved')
      .eq('id', testimonialId)
      .single();

    if (fetchError || !testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    if (testimonial.approved) {
      return NextResponse.json({ error: 'Already approved' }, { status: 409 });
    }

    if (testimonial.approval_status !== 'pending') {
      return NextResponse.json({ error: 'Invalid testimonial state' }, { status: 409 });
    }

    if (testimonial.approval_token !== approvalToken) {
      return NextResponse.json({ error: 'Invalid approval token' }, { status: 403 });
    }

    if (
      testimonial.approval_token_expires_at &&
      new Date(testimonial.approval_token_expires_at) < new Date()
    ) {
      return NextResponse.json({ error: 'Approval token expired' }, { status: 403 });
    }

    const { error: updateError } = await supabase
      .from('testimonials')
      .update({
        approved: true,
        approval_status: isOriginal ? 'original_approved' : 'ai_approved',
        polished_content: isOriginal ? null : typeof polishedContent === 'string' ? polishedContent.trim() : null,
        approved_at: new Date().toISOString(),
        approval_token: null,
        approval_token_expires_at: null,
      })
      .eq('id', testimonialId);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Approve error:', error);
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
