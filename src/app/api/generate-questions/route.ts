import { NextResponse } from "next/server";

// A strict prompt to ensure JSON schema compliance
const SYSTEM_INSTRUCTION = `You are an expert technical interviewer and adaptive skill assessor.
Your goal is to generate exactly 10 high-quality, challenging multiple-choice questions based on the user's provided context/prompt.

CRITICAL RULES FOR OUTPUT FORMAT:
You MUST return ONLY valid JSON in the exact structure requested. No markdown blocks wrapping the JSON.
The JSON must be an object with a "questions" array.

CRITICAL RULES FOR QUESTIONS:
1. "options" must have EXACTLY 5 strings (indices 0 to 4).
2. Options 0-3 (A, B, C, D) must be plausible answers. Only ONE is completely correct.
3. Option 4 (E) MUST ALWAYS BE EXACTLY: "I don't know / Need to study this".
4. "correctIndex" MUST be 0, 1, 2, or 3. It can NEVER be 4.
5. "topic" should be a short, 1-3 word classification for the question.

Example JSON output:
{
  "questions": [
    {
      "id": "q1",
      "text": "What is the primary purpose of the React useMemo hook?",
      "options": [
        "To memoize a component to prevent re-renders when props don't change",
        "To cache the result of an expensive calculation between renders",
        "To persist a mutable value across renders without triggering a re-render",
        "To run side effects conditionally after render",
        "I don't know / Need to study this"
      ],
      "correctIndex": 1,
      "topic": "React Hooks"
    }
  ]
}
`;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const endpoint = `https://aiplatform.googleapis.com/v1/publishers/google/models/gemini-2.5-pro:generateContent?key=${apiKey}`;

    const payload = {
      systemInstruction: {
        parts: [{ text: SYSTEM_INSTRUCTION }]
      },
      contents: [
        {
          role: "user",
          parts: [{ text: `User Context via Prompt Studio:\n${prompt}` }]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
      }
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });

    const resultJson = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", resultJson);
      throw new Error(resultJson.error?.message || `API returned status ${response.status}`);
    }

    const responseText = resultJson.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Extract only the JSON object/array using regex in case the model adds extra chatty text
    const jsonMatch = responseText.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
    const cleanedText = jsonMatch ? jsonMatch[0] : responseText;
    const data = JSON.parse(cleanedText);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    let userMessage = error?.message || "Failed to generate questions. Please try again.";

    if (userMessage.includes("Resource exhausted") || userMessage.includes("429")) {
      userMessage = "We are currently experiencing high traffic. Please wait 60 seconds and try again.";
    }

    return NextResponse.json(
      { error: userMessage },
      { status: 500 }
    );
  }
}
