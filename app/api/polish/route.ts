import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { content } = await request.json();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an expert copywriter. Rewrite this client testimonial to make it more specific, compelling and persuasive. Keep it authentic and in first person. Keep it to 2-4 sentences. Only return the rewritten testimonial, nothing else.

Original testimonial: "${content}"`
            }]
          }]
        }),
      }
    );

    const data = await response.json();
    const polished = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ polished });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to polish' }, { status: 500 });
  }
}
