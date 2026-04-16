"use client";

import { useState } from "react";
import { MCQuestion } from "@/types/session";
import Button from "@/components/ui/Button";

interface QuizCardProps {
    question: MCQuestion;
    onAnswer: (selectedIndex: number, timeTakenMs: number) => void;
}

const OPTION_LABELS = ["A", "B", "C", "D", "E"];

export default function QuizCard({ question, onAnswer }: QuizCardProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [startTime] = useState(Date.now());

    const handleSelect = (idx: number) => {
        setSelectedIndex(idx);
    };

    const handleSubmit = () => {
        if (selectedIndex === null) return;
        const timeTaken = Date.now() - startTime;
        onAnswer(selectedIndex, timeTaken);
    };

    return (
        <div className="w-full bg-[#111116] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
            {/* Topic Badge */}
            <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-gray-300 mb-6">
                {question.topic}
            </div>

            {/* Question Text */}
            <h2 className="text-xl sm:text-2xl font-semibold text-white leading-relaxed mb-8">
                {question.text}
            </h2>

            {/* Options */}
            <div
                className="flex flex-col gap-3"
                role="radiogroup"
                aria-label="Multiple choice options"
            >
                {question.options.map((opttext, idx) => {
                    const isSelected = selectedIndex === idx;
                    const isSkip = idx === 4; // Option E

                    return (
                        <button
                            key={idx}
                            role="radio"
                            aria-checked={isSelected}
                            onClick={() => handleSelect(idx)}
                            className={`
                group relative w-full text-left p-4 rounded-xl border transition-all duration-200
                flex items-start gap-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#111116]
                ${isSkip
                                    ? isSelected
                                        ? "bg-amber-500/20 border-amber-500/50 text-amber-200 focus:ring-amber-500"
                                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-200 focus:ring-amber-500"
                                    : isSelected
                                        ? "bg-violet-500/20 border-violet-500/50 text-violet-200 focus:ring-violet-500"
                                        : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:border-violet-500/30 focus:ring-violet-500"
                                }
              `}
                        >
                            <div
                                className={`flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-xs font-bold border transition-colors
                  ${isSkip
                                        ? isSelected ? "bg-amber-500 text-white border-amber-500" : "bg-white/10 border-white/20 group-hover:border-amber-500/50"
                                        : isSelected ? "bg-violet-500 text-white border-violet-500" : "bg-white/10 border-white/20 group-hover:border-violet-500/50"
                                    }
                `}
                            >
                                {OPTION_LABELS[idx]}
                            </div>
                            <div className={`text-sm sm:text-base leading-relaxed font-medium mt-0.5 ${isSkip && !isSelected ? "italic" : ""}`}>
                                {opttext}
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Footer / Submit */}
            <div className="mt-8 flex justify-end pt-6 border-t border-white/10">
                <Button
                    variant={selectedIndex === 4 ? "secondary" : "primary"}
                    disabled={selectedIndex === null}
                    onClick={handleSubmit}
                    className={selectedIndex === 4 ? "border-amber-500/50 hover:bg-amber-500/10 text-amber-300" : ""}
                >
                    {selectedIndex === 4 ? "Skip Question" : "Submit Answer"}
                </Button>
            </div>
        </div>
    );
}
