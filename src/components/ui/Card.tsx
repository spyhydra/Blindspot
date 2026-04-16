import React from "react";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    glowing?: boolean;
}

export default function Card({
    children,
    className = "",
    glowing = false,
}: CardProps) {
    return (
        <div
            className={`relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6
        transition-all duration-300 hover:-translate-y-1 hover:bg-white/8 hover:border-white/20
        ${glowing ? "shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40" : ""}
        ${className}`}
        >
            {children}
        </div>
    );
}
