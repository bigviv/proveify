import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
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

    const data = await response.json();
    console.log('Groq response:', JSON.stringify(data));

    if (!response.ok) {
      console.error('Groq error:', data);
      return NextResponse.json({ error: data.error?.message || 'Groq API error' }, { status: 500 });
    }

    const polished = data.choices[0].message.content;
    return NextResponse.json({ polished });
  } catch (error) {
    console.error('Polish error:', error);
    return NextResponse.json({ error: 'Failed to polish' }, { status: 500 });
  }
}
