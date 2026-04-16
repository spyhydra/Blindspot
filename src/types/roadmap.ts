export type AnswerCategory = "correct" | "misconception" | "blind_spot";

export interface RoadmapItem {
    topic: string;
    priority: "high" | "medium" | "low";
    reason: string;
    resources: string[];
}

export interface AnalysisResult {
    score: number; // 0-100
    misconceptions: string[];
    blindSpots: string[];
    roadmap: RoadmapItem[];
}
