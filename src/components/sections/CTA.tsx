"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function CTA() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) setSubmitted(true);
    };

    return (
        <section
            id="cta"
            className="py-28 px-6 relative overflow-hidden"
        >
            {/* Radial glow */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
                <div className="w-[700px] h-[400px] bg-violet-600/25 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
                <h2 className="text-4xl md:text-5xl font-black text-white">
                    Ready to eliminate your{" "}
                    <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                        blindspots?
                    </span>
                </h2>
                <p className="text-gray-400 text-lg">
                    Join 2,400+ teams already using Blindspot to ship with confidence.
                </p>

                {!submitted ? (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
                    >
                        <input
                            id="cta-email-input"
                            type="email"
                            placeholder="you@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/20
                text-white placeholder-gray-500 focus:outline-none focus:border-violet-500
                focus:bg-white/15 transition-all"
                        />
                        <Button type="submit" variant="primary" id="cta-submit-btn">
                            Get Early Access
                        </Button>
                    </form>
                ) : (
                    <div className="px-8 py-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold">
                        🎉 You're on the list! We'll be in touch soon.
                    </div>
                )}

                <p className="text-xs text-gray-600">
                    No spam, ever. Unsubscribe with one click.
                </p>
            </div>
        </section>
    );
}
