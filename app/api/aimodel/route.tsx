import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// ✅ Full prompt with JSON enforcement
const PROMPT = `
You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time.

Only ask questions about the following details in order:
1. Starting location (source)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Low, Medium, High)
5. Trip duration (number of days)
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation)
7. Special requirements or preferences (if any)

Do not ask multiple questions at once, and never ask irrelevant questions.
If any answer is missing or unclear, politely ask the user to clarify before proceeding.
Always maintain a conversational, interactive style while asking questions.

⚠️ IMPORTANT: Always respond in **strict JSON**, with **no extra text** outside the JSON.

JSON format must be:
{
  "resp": "Text to show the user",
  "ui": "source/groupSize/budget/tripDuration/final"
}

Do NOT include anything else. Do NOT write (ui: ...) in text.
`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4.1-mini",
      messages: [
        { role: "system", content: PROMPT },
        ...messages,
      ],
      max_tokens: 1000,
    });

    const aiMessage = completion.choices[0].message?.content || "";

    // ✅ Parse AI response as JSON
    let jsonResp = { resp: aiMessage, ui: "text" };
    try {
      jsonResp = JSON.parse(aiMessage);
    } catch {
      console.warn("AI did not return valid JSON, sending as text.");
    }

    // ✅ Return AI JSON response dynamically
    return NextResponse.json(jsonResp);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ resp: "Something went wrong", ui: "text" });
  }
}
