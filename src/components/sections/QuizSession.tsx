"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MCQuestion, UserAnswer, QuizSession as SessionType } from "@/types/session";
import ProgressBar from "@/components/ui/ProgressBar";
import QuizCard from "./QuizCard";

export default function QuizSession({ session }: { session: SessionType }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<UserAnswer[]>([]);
    const [analyzing, setAnalyzing] = useState(false);
    const router = useRouter();

    const handleAnswer = async (selectedIndex: number, timeTakenMs: number) => {
        const currentQ = session.questions[currentIndex];
        const newAnswer: UserAnswer = {
            questionId: currentQ.id,
            selectedIndex,
            timeTakenMs,
        };

        const updatedAnswers = [...answers, newAnswer];
        setAnswers(updatedAnswers);

        if (currentIndex < session.questions.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        } else {
            // Quiz complete!
            setAnalyzing(true);
            try {
                // We will call the analyze API here and push to results
                const res = await fetch("/api/analyze-results", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        prompt: session.prompt,
                        questions: session.questions,
                        answers: updatedAnswers,
                    }),
                });

                if (!res.ok) throw new Error("Analysis failed");
                const data = await res.json();

                // Save analysis to session storage so /results can read it
                sessionStorage.setItem("blindspot_analysis", JSON.stringify(data));
                router.push("/results");

            } catch (e) {
                console.error(e);
                // Handle error state gracefully in production, for now alert:
                alert("Failed to analyze results. Please try again.");
                setAnalyzing(false);
            }
        }
    };

    if (analyzing) {
        return (
            <div className="flex flex-col items-center justify-center p-10 animate-in fade-in">
                <div className="w-16 h-16 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin mb-6" />
                <h2 className="text-2xl font-bold text-white mb-2">Analyzing your responses...</h2>
                <p className="text-gray-400">Our AI is mapping your misconceptions and blind spots.</p>
            </div>
        );
    }

    const currentQuestion = session.questions[currentIndex];

    return (
        <div className="w-full max-w-3xl mx-auto flex flex-col gap-6">
            <ProgressBar current={currentIndex + 1} total={session.questions.length} />

            {/* Key is required to fully remount the component and reset timer/selection states */}
            <QuizCard
                key={currentQuestion.id}
                question={currentQuestion}
                onAnswer={handleAnswer}
            />
        </div>
    );
}
