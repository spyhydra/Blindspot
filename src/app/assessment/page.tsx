"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import QuizSession from "@/components/sections/QuizSession";
import { QuizSession as SessionType, MCQuestion } from "@/types/session";

export default function AssessmentPage() {
    const [questions, setQuestions] = useState<MCQuestion[]>([]);
    const [session, setSession] = useState<SessionType | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loadingDone, setLoadingDone] = useState(false);
    const [activePrompt, setActivePrompt] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
        const storedPrompt = sessionStorage.getItem("blindspot_session_prompt");
        if (!storedPrompt) {
            router.push("/studio");
            return;
        }

        setActivePrompt(storedPrompt);

        let cancelled = false;

        const streamQuestions = async () => {
            try {
                const res = await fetch("/api/generate-questions", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ prompt: storedPrompt }),
                });

                if (!res.ok || !res.body) {
                    const errData = await res.json().catch(() => ({}));
                    throw new Error(errData?.error || "Failed to connect to AI.");
                }

                // Stream is SSE — read line by line
                const reader = res.body.getReader();
                const decoder = new TextDecoder();
                let buffer = "";

                while (true) {
                    const { done, value } = await reader.read();
                    if (done || cancelled) break;

                    buffer += decoder.decode(value, { stream: true });
                    const lines = buffer.split("\n");
                    buffer = lines.pop() ?? "";

                    for (const line of lines) {
                        if (!line.startsWith("data: ")) continue;
                        const payload = line.slice(6).trim();
                        if (!payload) continue;

                        try {
                            const event = JSON.parse(payload);

                            if (event.error) {
                                setError(event.error);
                                return;
                            }

                            if (event.question) {
                                setQuestions((prev) => [...prev, event.question]);
                            }

                            if (event.done) {
                                setLoadingDone(true);
                            }
                        } catch {
                            // ignore malformed SSE lines
                        }
                    }
                }
            } catch (err: any) {
                if (!cancelled) {
                    setError(err.message || "Failed to generate assessment. Please try again.");
                }
            }
        };

        // Keep the prompt in memory, but don't delete immediately to survive React StrictMode double mounts
        // We'll trust state unmount cleaning inside the effect teardown or manually when user finishes
        streamQuestions();

        return () => {
            cancelled = true;
        };
    }, [router]);

    // Once we have at least 1 question and all are done loading, create the session
    useEffect(() => {
        if (loadingDone && questions.length > 0 && !session && activePrompt) {
            setSession({
                prompt: activePrompt,
                questions,
                answers: [],
            });
        }
    }, [loadingDone, questions, session, activePrompt]);

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
                <header className="h-16 border-b border-white/10 flex items-center justify-center px-6 bg-[#09090f]/80 backdrop-blur-md sticky top-0 z-50">
                    <span className="text-white font-bold text-lg tracking-widest uppercase text-xs opacity-50">
                        Active Assessment
                    </span>
                </header>

                <main className="flex-1 w-full max-w-4xl mx-auto p-6 md:p-10 flex flex-col justify-center">
                    {session ? (
                        <QuizSession session={session} />
                    ) : questions.length === 0 ? (
                        /* Initial loading state — no questions yet */
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-16 h-16 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin mb-6" />
                            <h2 className="text-2xl font-bold text-white mb-2">Generating Questions...</h2>
                            <p className="text-gray-400">Our AI is building a personalized challenge for you.</p>
                        </div>
                    ) : (
                        /* Questions streaming in — show count progress */
                        <div className="flex flex-col items-center justify-center gap-4">
                            <div className="w-16 h-16 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin mb-2" />
                            <h2 className="text-2xl font-bold text-white">Preparing your quiz...</h2>
                            <p className="text-violet-400 font-semibold">
                                {questions.length} question{questions.length !== 1 ? "s" : ""} ready
                            </p>
                            <div className="flex gap-2 mt-2">
                                {questions.map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-3 h-3 rounded-full bg-violet-500 animate-pulse"
                                        style={{ animationDelay: `${i * 0.1}s` }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </ProtectedRoute>
    );
}
