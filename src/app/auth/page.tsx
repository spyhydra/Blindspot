"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import Button from "@/components/ui/Button";

export default function AuthPage() {
    const [isSignIn, setIsSignIn] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (isSignIn) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                if (firstName) {
                    await updateProfile(userCredential.user, {
                        displayName: firstName,
                    });
                }
            }
            router.push("/studio");
        } catch (err: any) {
            setError(err.message || "An authentication error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-6 bg-[#09090f] relative overflow-hidden">
            {/* Ambient glowing blobs */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
            </div>

            <div className="w-full max-w-md relative">
                <div className="mb-10 text-center">
                    <div className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 items-center justify-center shadow-lg shadow-violet-500/40 mb-4">
                        <span className="text-white font-black text-xl">B</span>
                    </div>
                    <h1 className="text-3xl font-black text-white">
                        {isSignIn ? "Welcome Back" : "Join Blindspot"}
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">
                        {isSignIn
                            ? "Sign in to continue to your prompt studio."
                            : "Discover your true development blindspots."}
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-md flex flex-col gap-5"
                >
                    {error && (
                        <div
                            className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm"
                            role="alert"
                        >
                            {error}
                        </div>
                    )}

                    {!isSignIn && (
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="firstName"
                                className="text-xs font-semibold text-gray-300 uppercase tracking-widest"
                            >
                                First Name
                            </label>
                            <input
                                id="firstName"
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required={!isSignIn}
                                placeholder="Ada"
                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:bg-white/10 transition-all font-medium"
                            />
                        </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="email"
                            className="text-xs font-semibold text-gray-300 uppercase tracking-widest"
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="ada@lovelace.io"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:bg-white/10 transition-all font-medium"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="password"
                            className="text-xs font-semibold text-gray-300 uppercase tracking-widest flex justify-between"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:bg-white/10 transition-all font-medium"
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full mt-2"
                        disabled={loading}
                    >
                        {loading ? "Please wait..." : isSignIn ? "Sign In" : "Sign Up"}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setIsSignIn(!isSignIn);
                            setError("");
                        }}
                        type="button"
                        className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        {isSignIn
                            ? "Don't have an account? Sign up"
                            : "Already have an account? Sign in"}
                    </button>
                </div>
            </div>
        </main>
    );
}
