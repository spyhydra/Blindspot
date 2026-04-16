"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import QuizSession from "@/components/sections/QuizSession";
import { QuizSession as SessionType } from "@/types/session";

export default function AssessmentPage() {
    const [session, setSession] = useState<SessionType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Read the pending prompt from session storage
        const storedPrompt = sessionStorage.getItem("blindspot_session_prompt");
        if (!storedPrompt) {
            router.push("/studio");
            return;
        }

        // Call Gemini API to generate the questions
        const fetchQuestions = async () => {
            try {
                const res = await fetch("/api/generate-questions", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt: storedPrompt }),
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data?.error || "API returned an error");
                }

                // Clear the prompt string so refreshing abandons the quiz (or keeps it, design choice.
                // Clear the prompt string so refreshing or going "back" abandons the quiz.
                // We clear it after successful mount so we don't accidentally re-generate
                // if they navigate back from the Roadmap page to Assessment.
                sessionStorage.removeItem("blindspot_session_prompt");

                setSession({
                    prompt: storedPrompt,
                    questions: data.questions,
                    answers: [],
                });

            } catch (err: any) {
                console.error(err);
                setError(err.message || "Failed to generate assessment. The AI may be overloaded. Please try again.");
            }
        };

        fetchQuestions();
    }, [router]);

    if (error) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-[#09090f] flex flex-col items-center justify-center p-6 text-center">
                    <h1 className="text-2xl font-bold text-white mb-4">Oops!</h1>
                    <p className="text-red-400 mb-6">{error}</p>
                    <button
                        onClick={() => router.push("/studio")}
                        className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                        Return to Studio
                    </button>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-[#09090f] flex flex-col">
                {/* Simple header */}
                <header className="h-16 border-b border-white/10 flex items-center justify-center px-6 bg-[#09090f]/80 backdrop-blur-md sticky top-0 z-50">
                    <span className="text-white font-bold text-lg tracking-widest uppercase text-xs opacity-50">
                        Active Assessment
                    </span>
                </header>

                <main className="flex-1 w-full max-w-4xl mx-auto p-6 md:p-10 flex flex-col justify-center">
                    {!session ? (
                        <div className="flex flex-col items-center justify-center animate-pulse">
                            <div className="w-16 h-16 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin mb-6" />
                            <h2 className="text-2xl font-bold text-white mb-2">Generating Questions...</h2>
                            <p className="text-gray-400">Our AI is building a personalized challenge for you.</p>
                        </div>
                    ) : (
                        <QuizSession session={session} />
                    )}
                </main>
            </div>
        </ProtectedRoute>
    );
}
