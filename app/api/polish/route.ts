import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const resend = new Resend(process.env.RESEND_API_KEY);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { content, testimonialId, clientEmail, clientName, skipEmail, tone } = await request.json();

    // Step 1 — Polish with Groq
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1000,
        messages: [
          {
            role: 'system',
            content: 'You are an expert copywriter. When given a client testimonial, rewrite it to be more specific, compelling and persuasive. Keep it authentic and in first person. Keep it to 2-4 sentences. Only return the rewritten testimonial, nothing else. No quotes, no explanation.'
          },
          {
            role: 'user',
            content: `Rewrite this testimonial: ${content}`
          }
        ]
      }),
    });

    const groqData = await groqResponse.json();

    if (!groqResponse.ok) {
      console.error('Groq error:', groqData);
      return NextResponse.json({ error: 'Failed to polish' }, { status: 500 });
    }

    const polished = groqData.choices[0].message.content;

    // Step 2 — Generate approval token
    const token = crypto.randomUUID();

    // Step 3 — Save polished version with pending_approval status
    await supabase
      .from('testimonials')
      .update({
        polished_content: polished,
        approval_token: token,
        approval_status: 'pending_approval',
        approved: false,
      })
      .eq('id', testimonialId);

    // Step 4 — Email client for approval (if we have their email)
    if (clientEmail && !skipEmail) {
      const approveUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/approve?token=${token}&action=approve`;
      const rejectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/approve?token=${token}&action=reject`;

      await resend.emails.send({
        from: 'Proveify <onboarding@resend.dev>',
        to: [clientEmail],
        subject: 'Does this capture your experience?',
        html: `
          <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 40px 20px;">
            <h2 style="font-size: 22px; font-weight: 800; margin-bottom: 8px;">Hi ${clientName || 'there'} 👋</h2>
            <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
              We've tidied up your testimonial to make it shine. Does this accurately capture your experience?
            </p>
            
            <div style="background: #f5f3ff; border-left: 4px solid #6d28d9; padding: 16px 20px; border-radius: 8px; margin-bottom: 32px;">
              <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.6; font-style: italic;">"${polished}"</p>
            </div>

            <p style="color: #555; font-size: 14px; margin-bottom: 24px;">
              If this captures your experience accurately, click approve below. If not, click reject and we'll use your original words instead.
            </p>

            <div style="display: flex; gap: 12px; margin-bottom: 32px;">
              <a href="${approveUrl}" style="background: #6d28d9; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                ✓ Yes, approve this
              </a>
              <a href="${rejectUrl}" style="background: #f3f4f6; color: #374151; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                ✗ No, use my original
              </a>
            </div>

            <p style="color: #aaa; font-size: 12px;">Powered by Proveify · proveify.vercel.app</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ 
      polished,
      awaitingApproval: !!clientEmail 
    });

  } catch (error) {
    console.error('Polish error:', error);
    return NextResponse.json({ error: 'Failed to polish' }, { status: 500 });
  }
}
