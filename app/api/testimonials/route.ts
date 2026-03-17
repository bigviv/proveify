import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function generateApprovalToken() {
  return crypto.randomBytes(32).toString('hex');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, name, email, role, content, rating, website, phone_number } = body;

    // Honeypot spam protection
    if (website || phone_number) {
      return NextResponse.json({ ok: true });
    }

    if (!userId || !name?.trim() || !content?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const cleanRating = Number(rating);
    if (!Number.isInteger(cleanRating) || cleanRating < 1 || cleanRating > 5) {
      return NextResponse.json({ error: 'Invalid rating' }, { status: 400 });
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Invalid collection link' }, { status: 404 });
    }

    // Generate token for all testimonials — only used for high-rating flow
    const approvalToken = generateApprovalToken();
    const approvalTokenExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7); // 7 days

    const { data, error } = await supabase
      .from('testimonials')
      .insert({
        user_id: userId,
        client_name: name.trim(),
        client_email: email?.trim() || null,
        client_role: role?.trim() || null,
        content: content.trim(),
        rating: cleanRating,
        approved: false,
        approval_status: cleanRating <= 3 ? 'low_rating' : 'pending',
        approval_token: approvalToken,
        approval_token_expires_at: approvalTokenExpiresAt.toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Create testimonial error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, testimonial: data });
  } catch (error) {
    console.error('POST /api/testimonials failed:', error);
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
