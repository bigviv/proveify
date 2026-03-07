import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `You are an expert copywriter. Rewrite this client testimonial to make it more specific, compelling and persuasive. Keep it authentic and in first person. Keep it to 2-4 sentences. Only return the rewritten testimonial, nothing else.

Original testimonial: "${content}"`
        }]
      }),
    });

    const data = await response.json();
    const polished = data.content[0].text;
    return NextResponse.json({ polished });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to polish' }, { status: 500 });
  }
}
