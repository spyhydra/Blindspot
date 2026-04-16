import React from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    children: React.ReactNode;
}

const variantClasses: Record<Variant, string> = {
    primary:
        "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/30",
    secondary:
        "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-sm",
    ghost: "text-violet-300 hover:text-white hover:bg-white/10",
};

const sizeClasses: Record<Size, string> = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
};

export default function Button({
    variant = "primary",
    size = "md",
    className = "",
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold
        transition-all duration-200 active:scale-95 cursor-pointer focus:outline-none
        focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-transparent
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
