"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import RoadmapView from "@/components/sections/RoadmapView";
import { AnalysisResult } from "@/types/roadmap";
import UserMenu from "@/components/auth/UserMenu";

export default function ResultsPage() {
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const router = useRouter();

    useEffect(() => {
        const rawAnalysis = sessionStorage.getItem("blindspot_analysis");
        if (!rawAnalysis) {
            router.push("/studio");
            return;
        }

        try {
            setAnalysis(JSON.parse(rawAnalysis));
        } catch {
            router.push("/studio");
        }
    }, [router]);

    if (!analysis) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-[#09090f] flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-[#09090f] flex flex-col">
                {/* Header */}
                <header className="h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#09090f]/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                            <span className="text-white font-black text-sm">✓</span>
                        </div>
                        <span className="text-white font-bold text-lg hidden sm:block">
                            Assessment <span className="text-emerald-400">Complete</span>
                        </span>
                    </div>
                    <UserMenu />
                </header>

                <main className="flex-1 w-full mx-auto p-6 md:p-10">
                    <RoadmapView analysis={analysis} />
                </main>
            </div>
        </ProtectedRoute>
    );
}
