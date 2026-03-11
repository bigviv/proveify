import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { content, testimonialId, clientEmail, clientName, skipEmail, tone } = await request.json();

    const toneInstructions: Record<string, string> = {
      concise: '1-2 sentences max. Clean and clear. No fluff. Sounds like a real person.',
      casual: '2-3 sentences. Warm and conversational. Sounds like a real person talking to a friend.',
      professional: '3-4 sentences. Polished but not corporate. Specific where possible.',
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
        max_tokens: 200,
        messages: [
          {
            role: 'system',
            content: `You are a copywriter improving client testimonials. Rewrite the testimonial with this style: ${toneGuide}

Rules:
- Never invent facts or details not in the original
- Keep the same sentiment — do not make a negative sound positive  
- Write in first person
- Return only the rewritten testimonial, no quotes, no explanation`
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

    await supabase
      .from('testimonials')
      .update({ polished_content: polished })
      .eq('id', testimonialId);

    return NextResponse.json({ polished, awaitingApproval: false });

  } catch (error) {
    console.error('Polish error:', error);
    return NextResponse.json({ error: 'Failed to polish' }, { status: 500 });
  }
}
