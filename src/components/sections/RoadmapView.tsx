"use client";

import { AnalysisResult } from "@/types/roadmap";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function RoadmapView({ analysis }: { analysis: AnalysisResult }) {
    const router = useRouter();

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#111116] border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg">
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90 absolute inset-0" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                            <circle
                                cx="50" cy="50" r="40" fill="transparent" stroke="currentColor" strokeWidth="8"
                                strokeDasharray={`${(analysis.score / 100) * 251.2} 251.2`}
                                className={analysis.score >= 80 ? "text-emerald-500" : analysis.score >= 50 ? "text-amber-500" : "text-red-500"}
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className="text-3xl font-black text-white">{analysis.score}%</span>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-400 mt-4 uppercase tracking-widest">Accuracy Score</h3>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-6 flex flex-col justify-start">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-red-400 font-bold flex items-center gap-2">
                                <span className="p-1.5 rounded-lg bg-red-500/20">🚨</span>
                                Misconceptions
                            </h3>
                            <span className="text-2xl font-black text-white">{analysis.misconceptions.length}</span>
                        </div>
                        <p className="text-sm text-red-200/70 mb-3">Questions you answered incorrectly. High priority for unlearning.</p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {analysis.misconceptions.map((m, i) => (
                                <span key={i} className="px-2.5 py-1 rounded bg-red-500/20 text-red-300 text-xs font-semibold">{m}</span>
                            ))}
                            {analysis.misconceptions.length === 0 && <span className="text-sm text-gray-500">None found! 🎉</span>}
                        </div>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-3xl p-6 flex flex-col justify-start">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-amber-400 font-bold flex items-center gap-2">
                                <span className="p-1.5 rounded-lg bg-amber-500/20">🔮</span>
                                Blind Spots
                            </h3>
                            <span className="text-2xl font-black text-white">{analysis.blindSpots.length}</span>
                        </div>
                        <p className="text-sm text-amber-200/70 mb-3">Questions you skipped. You correctly identified your knowledge gaps.</p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {analysis.blindSpots.map((b, i) => (
                                <span key={i} className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-semibold">{b}</span>
                            ))}
                            {analysis.blindSpots.length === 0 && <span className="text-sm text-gray-500">None found! 🧠</span>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Roadmap */}
            <div>
                <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                    Your Learning Roadmap
                    <Badge color="violet">{analysis.roadmap.length} items</Badge>
                </h2>

                <div className="flex flex-col gap-4">
                    {analysis.roadmap.map((item, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 relative overflow-hidden group hover:bg-white/10 transition-colors">
                            {item.priority === "high" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500" />}
                            {item.priority === "medium" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500" />}
                            {item.priority === "low" && <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500" />}

                            <div className="sm:w-1/3">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-lg font-bold text-white">{item.topic}</h4>
                                    <Badge color={item.priority === 'high' ? 'violet' : item.priority === 'medium' ? 'amber' : 'green'}>
                                        {item.priority.toUpperCase()}
                                    </Badge>
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed">{item.reason}</p>
                            </div>

                            <div className="sm:w-2/3 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
                                <h5 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Recommended Resources</h5>
                                <ul className="flex flex-col gap-2">
                                    {item.resources.map((res, i) => (
                                        <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                                            <span className="text-violet-500">▶</span> {res}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}

                    {analysis.roadmap.length === 0 && (
                        <div className="text-center p-10 bg-white/5 rounded-2xl border border-white/10">
                            <span className="text-4xl block mb-4">🏆</span>
                            <h3 className="text-xl font-bold text-white">Flawless Victory</h3>
                            <p className="text-gray-400 mt-2">You crushed the assessment. No remediation needed.</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-center pt-8 md:pt-12 border-t border-white/10 border-dashed">
                <Button onClick={() => router.push("/studio")} variant="primary" size="lg">
                    Try a Different Topic →
                </Button>
            </div>
        </div>
    );
}
