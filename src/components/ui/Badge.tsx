import React from "react";

interface BadgeProps {
    children: React.ReactNode;
    color?: "violet" | "indigo" | "green" | "amber";
}

const colorClasses = {
    violet: "bg-violet-500/20 text-violet-300 border-violet-500/30",
    indigo: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    green: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

export default function Badge({ children, color = "violet" }: BadgeProps) {
    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
        border ${colorClasses[color]}`}
        >
            {children}
        </span>
    );
}
