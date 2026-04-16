"use client";

import React, { useRef, useEffect } from "react";

interface PromptEditorProps {
    value: string;
    onChange: (val: string) => void;
    disabled?: boolean;
}

export default function PromptEditor({ value, onChange, disabled }: PromptEditorProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    return (
        <div className="relative group rounded-2xl bg-[#111116] border border-white/10 hover:border-violet-500/50 transition-colors shadow-inner overflow-hidden focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500">
            <div className="absolute top-0 left-0 w-8 md:w-10 h-full bg-white/5 border-r border-white/5 flex flex-col items-center py-4 text-xs font-mono text-gray-600 select-none pointer-events-none">
                {value.split("\n").map((_, i) => (
                    <span key={i} className="leading-relaxed">
                        {i + 1}
                    </span>
                ))}
            </div>

            <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className="w-full pl-10 md:pl-14 pr-4 py-4 min-h-[200px] bg-transparent text-white font-mono text-sm leading-relaxed resize-none focus:outline-none placeholder-gray-600 disabled:opacity-50 break-words"
                placeholder="Type your context here..."
                spellCheck={false}
            />

            <div className="absolute bottom-3 right-4 flex items-center gap-4">
                <span className="text-xs font-mono text-gray-500">
                    {value.length} / 1000
                </span>
            </div>
        </div>
    );
}
