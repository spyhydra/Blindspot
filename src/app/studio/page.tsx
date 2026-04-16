"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import PromptEditor from "@/components/ui/PromptEditor";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar"; // Assume we update Navbar to handle auth state
import UserMenu from "@/components/auth/UserMenu";

const INITIAL_PROMPT = `I am a mid-level Frontend Engineer with 3 years of experience.
My current stack: React, TypeScript, and some Node.js.

Generate a 10-question MCQ assessment to find my blind spots in:
- React hooks lifecycle
- Async programming patterns
- TypeScript generics

Keep the questions challenging but fair.`;

export default function StudioPage() {
    const [prompt, setPrompt] = useState(INITIAL_PROMPT);
    const [roleHint, setRoleHint] = useState("");
    const [showRoleBanner, setShowRoleBanner] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Check if role hint exists in localStorage
        const savedRole = localStorage.getItem("blindspot_role");
        if (!savedRole && user) {
            setShowRoleBanner(true);
        } else if (savedRole) {
            setShowRoleBanner(false);
        }
    }, [user]);

    const saveRoleHint = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem("blindspot_role", roleHint);
        setShowRoleBanner(false);
    };

    const handleStart = () => {
        if (!prompt.trim() || prompt.length > 2000) return;

        // Save to session storage before routing
        sessionStorage.setItem("blindspot_session_prompt", prompt);
        router.push("/assessment");
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-[#09090f] flex flex-col">
                {/* Simple auth-aware header manually injected for the studio if Navbar isn't updated yet */}
                <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#09090f]/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg">
                            <span className="text-white font-black text-sm">B</span>
                        </div>
                        <span className="text-white font-bold text-lg hidden sm:block">
                            Blind<span className="text-violet-400">spot</span>
                        </span>
                    </div>
                    <UserMenu />
                </header>

                <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-10 flex flex-col gap-8">

                    {showRoleBanner && (
                        <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-top-4">
                            <div className="flex-1">
                                <p className="text-sm text-indigo-200 font-semibold mb-1">Set your default role (Optional)</p>
                                <p className="text-xs text-indigo-300">We'll use this to tailor your experience later.</p>
                            </div>
                            <form onSubmit={saveRoleHint} className="flex gap-2 w-full sm:w-auto">
                                <input
                                    type="text"
                                    value={roleHint}
                                    onChange={(e) => setRoleHint(e.target.value)}
                                    placeholder="e.g. Student, Data Scientist..."
                                    className="flex-1 sm:w-48 px-3 py-2 text-sm rounded-lg bg-black/20 border border-indigo-500/30 text-white focus:outline-none focus:border-indigo-400"
                                />
                                <button type="submit" className="px-4 py-2 text-sm font-semibold rounded-lg bg-indigo-500 text-white hover:bg-indigo-400 transition-colors">
                                    Save
                                </button>
                            </form>
                        </div>
                    )}

                    <div>
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">Prompt Studio</h1>
                        <p className="text-gray-400">
                            Customize the prompt below to generate your personalized skill assessment. You can change your role, experience, or targeted topics.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <PromptEditor
                            value={prompt}
                            onChange={(val) => {
                                if (val.length <= 1000) setPrompt(val);
                            }}
                        />
                        <div className="flex justify-end mt-2 animate-in fade-in slide-in-from-bottom-2">
                            <Button
                                onClick={handleStart}
                                variant="primary"
                                size="lg"
                                disabled={!prompt.trim()}
                                className="w-full sm:w-auto shadow-violet-500/50"
                            >
                                Generate Assessment →
                            </Button>
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/10">
                        <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="text-violet-400">💡</span> Pro Tips
                        </h3>
                        <ul className="text-sm text-gray-400 space-y-3">
                            <li><strong className="text-gray-200">Be Specific:</strong> Instead of "test me on Python", try "test me on Python multithreading and GIL limitations".</li>
                            <li><strong className="text-gray-200">Set Constraints:</strong> You can add rules like "Only ask questions regarding edge cases" or "Focus on memory leaks".</li>
                            <li><strong className="text-gray-200">Include Experience:</strong> Mentioning your YOE helps the AI calibrate the difficulty of the distractors.</li>
                        </ul>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
}
