import { NextResponse } from "next/server";
import { MCQuestion, UserAnswer } from "@/types/session";

const SYSTEM_INSTRUCTION = `You are a Senior Staff Engineer evaluating a developer's assessment results.
You will receive the original Prompt, the generated Questions, and the User's Answers.

CRITICAL LOGIC - CATEGORIZE EACH ANSWER:
- If UserAnswer.selectedIndex === Question.correctIndex -> "correct"
- If UserAnswer.selectedIndex === 4 -> "blind_spot" (They chose "I don't know")
- If UserAnswer.selectedIndex is anything else -> "misconception" (They guessed wrong, potentially dangerous)

OUTPUT FORMAT:
Return valid JSON representing the AnalysisResult. Do NOT wrap in markdown blocks.
{
  "score": <number 0-100 based on correct answers>,
  "misconceptions": [<array of string topics where they guessed wrong>],
  "blindSpots": [<array of string topics where they admitted they don't know>],
  "roadmap": [
    {
      "topic": "<topic string>",
      "priority": "high" | "medium" | "low", // Misconceptions = high priority! Unlearning is harder than learning.
      "reason": "<short explanation of why they need to study this based on their wrong/skipped answer>",
      "resources": ["<Resource Name 1>", "<Resource Name 2>"] // Just names, no URLs needed
    }
  ]
}
`;

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { prompt, questions, answers } = body as { prompt: string, questions: MCQuestion[], answers: UserAnswer[] };

        if (!prompt || !questions || !answers) {
            return NextResponse.json({ error: "Missing required payload data" }, { status: 400 });
        }

        const payloadString = JSON.stringify({
            userPrompt: prompt,
            quizContext: questions.map(q => ({
                id: q.id,
                topic: q.topic,
                question: q.text,
                options: q.options,
                correctIndex: q.correctIndex
            })),
            userPerformance: answers
        });

        const apiKey = process.env.GEMINI_API_KEY;
        const endpoint = `https://aiplatform.googleapis.com/v1/publishers/google/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        const payload = {
            systemInstruction: {
                parts: [{ text: SYSTEM_INSTRUCTION }]
            },
            contents: [
                {
                    role: "user",
                    parts: [{ text: `Evaluate this quiz performance:\n${payloadString}` }]
                }
            ],
            generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.2
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
            console.error("Analysis API Error:", resultJson);
            throw new Error(resultJson.error?.message || `API returned status ${response.status}`);
        }

        const responseText = resultJson.candidates?.[0]?.content?.parts?.[0]?.text || "";

        // Extract only the JSON object
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        const cleanedText = jsonMatch ? jsonMatch[0] : responseText;

        let data;
        try {
            data = JSON.parse(cleanedText);
        } catch (e) {
            console.error("Failed to parse analysis response:", responseText);
            throw new Error("AI returned malformed analysis: " + responseText.substring(0, 50));
        }

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Analysis Error:", error);
        let userMessage = error?.message || "Failed to analyze results.";

        if (userMessage.includes("Resource exhausted") || userMessage.includes("429")) {
            userMessage = "AI analysis is currently under heavy load. Please try again in a moment.";
        }

        return NextResponse.json({ error: userMessage }, { status: 500 });
    }
}
