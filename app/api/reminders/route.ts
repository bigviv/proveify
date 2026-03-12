import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  // Protect with a secret so only Vercel cron can call this
  const { searchParams } = new URL(request.url);
  if (searchParams.get('secret') !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Find testimonials that are still pending after 3 days with no reminder sent
  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const { data: pending } = await supabase
    .from('testimonials')
    .select('*')
    .eq('approval_status', 'pending')
    .not('client_email', 'is', null)
    .lt('created_at', threeDaysAgo);

  if (!pending || pending.length === 0) {
    return NextResponse.json({ sent: 0 });
  }

  let sent = 0;

  for (const t of pending) {
    // Skip if already sent a reminder and it's been less than 4 days since
    if (t.reminder_sent_at) {
      const reminderDate = new Date(t.reminder_sent_at);
      const daysSinceReminder = (Date.now() - reminderDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceReminder < 4) continue;
    }

    // Get the freelancer's name for the email
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', t.user_id)
      .single();

    const freelancerName = profile?.full_name || 'your service provider';
    const collectUrl = `${process.env.NEXT_PUBLIC_APP_URL}/collect/${t.user_id}`;

    await resend.emails.send({
      from: 'Proveify <onboarding@resend.dev>',
      to: [t.client_email],
      subject: `Quick reminder — ${freelancerName} would love your feedback`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="font-size: 20px; font-weight: 800; margin-bottom: 8px;">Hi ${t.client_name || 'there'} 👋</h2>
          <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
            Just a quick nudge — ${freelancerName} would really appreciate your feedback on your recent project together.
          </p>
          <p style="color: #555; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
            It takes less than 2 minutes and means a lot to independent professionals like them.
          </p>
          <a href="${collectUrl}" style="background: #6d28d9; color: white; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 600; font-size: 15px; display: inline-block; margin-bottom: 24px;">
            Leave feedback →
          </a>
          <p style="color: #aaa; font-size: 12px;">Powered by Proveify · proveify.vercel.app</p>
        </div>
      `,
    });

    await supabase
      .from('testimonials')
      .update({ reminder_sent_at: new Date().toISOString() })
      .eq('id', t.id);

    sent++;
  }

  return NextResponse.json({ sent });
}
