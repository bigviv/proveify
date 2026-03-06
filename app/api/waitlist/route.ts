import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Proveify <onboarding@resend.dev>',
      to: [email],
      subject: 'You\'re on the Proveify waitlist! 🎉',
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 24px; font-weight: 800; margin-bottom: 8px;">You're in! 🎉</h1>
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            Thanks for joining the Proveify waitlist. You'll be among the first to know when we launch.
          </p>
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            Proveify helps freelancers and agencies collect, polish with AI, and display client testimonials — in 5 minutes.
          </p>
          <div style="margin-top: 32px; padding: 20px; background: #f5f3ff; border-radius: 12px;">
            <p style="margin: 0; color: #6d28d9; font-size: 14px; font-weight: 600;">
              💜 Prove your worth — launching soon.
            </p>
          </div>
          <p style="color: #aaa; font-size: 12px; margin-top: 32px;">Proveify · proveify.vercel.app</p>
        </div>
      `,
    });

    await resend.emails.send({
      from: 'Proveify <onboarding@resend.dev>',
      to: ['bigviv@gmail.com'],
      subject: `New waitlist signup: ${email}`,
      html: `<p>${email} just joined the Proveify waitlist!</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
