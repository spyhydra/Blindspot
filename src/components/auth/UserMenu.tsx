"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export default function UserMenu() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    if (!user) return null;

    const getInitials = (name: string | null) => {
        if (!name) return "?";
        return name.charAt(0).toUpperCase();
    };

    const activeName = user.displayName || user.email?.split("@")[0] || "User";

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.push("/");
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 p-1.5 pr-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-medium text-sm text-gray-300 focus:outline-none"
                aria-label="User menu"
                aria-expanded={isOpen}
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg">
                    {getInitials(user.displayName)}
                </div>
                <span className="hidden sm:inline-block max-w-[100px] truncate">{activeName}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl bg-[#111116] border border-white/10 shadow-2xl overflow-hidden py-2 z-50">
                    <div className="px-4 py-2 border-b border-white/10 mb-2">
                        <p className="text-sm font-bold text-white truncate">{activeName}</p>
                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <button
                        onClick={() => {
                            setIsOpen(false);
                            router.push("/studio");
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                        Prompt Studio
                    </button>
                    <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
                    >
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
}
