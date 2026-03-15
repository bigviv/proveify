import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { content, testimonialId, clientEmail, clientName, skipEmail, tone, previewOnly } = await request.json();

    const toneInstructions: Record<string, string> = {
      concise: 'EXACTLY 1 sentence. Punchy and direct. Natural spoken language. No fluff. No filler words.',
      casual: '1 to 2 sentences maximum. Warm and natural. Realistic everyday tone. Not overly enthusiastic. Sounds like a real person texting a friend.',
      professional: '2 sentences maximum. Polished but still human. No corporate jargon. No buzzwords.',
    };

    const toneGuide = toneInstructions[tone] || toneInstructions.concise;

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 120,
        messages: [
          {
            role: 'system',
            content: `You are improving a client testimonial. Follow these rules without exception:

STYLE: ${toneGuide}

HARD RULES:
- Never invent facts, details, results, or names not in the original
- Never exaggerate sentiment — if the original is lukewarm, keep it lukewarm
- If the original contains criticism or a complaint, preserve it — do not remove or soften it
- Write in first person
- Maximum length is 1.5x the original word count — never exceed this
- No repetition of ideas
- Return only the rewritten text — no quotes, no explanation, no preamble`
          },
          {
            role: 'user',
            content: `Original testimonial: ${content}

Rewrite it now.`
          }
        ]
      }),
    });

    const groqData = await groqResponse.json();

    if (!groqResponse.ok) {
      console.error('Groq error:', groqData);
      return NextResponse.json({ error: 'Failed to polish' }, { status: 500 });
    }

    const polished = groqData.choices[0].message.content.trim();

    // Only save to DB if this is the final chosen version, not during preview
    if (!previewOnly && testimonialId) {
      await supabase
        .from('testimonials')
        .update({ polished_content: polished })
        .eq('id', testimonialId);
    }

    return NextResponse.json({ polished, awaitingApproval: false });

  } catch (error) {
    console.error('Polish error:', error);
    return NextResponse.json({ error: 'Failed to polish' }, { status: 500 });
  }
}
