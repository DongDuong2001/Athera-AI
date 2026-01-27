import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY is missing");
      return NextResponse.json(
        { error: "Service configuration error" },
        { status: 500 }
      );
    }

    const groq = new Groq({
      apiKey,
    });

    const { message, conversationHistory = [] } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Build messages array with conversation history
    const messages = [
      {
        role: "system" as const,
        content: `You are Athera, an empathetic AI wellness companion. You help users with:
- Mental wellness and emotional support
- Guided meditation and mindfulness
- Mood tracking insights
- General wellness advice

Be warm, supportive, and encouraging. Keep responses concise but helpful.`,
      },
      ...conversationHistory,
      { role: "user" as const, content: message },
    ];

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.7,
      max_tokens: 1024,
    });

    const reply = response.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    return NextResponse.json({
      reply,
      model: "llama-3.3-70b-versatile",
    });
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return NextResponse.json(
      {
        reply: "I'm experiencing some difficulties right now. Please try again in a moment.",
        error: true,
      },
      { status: 500 }
    );
  }
}
