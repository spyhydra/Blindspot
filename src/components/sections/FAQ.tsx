"use client";

import { useState } from "react";

const faqs = [
    {
        q: "How long does it take to set up Blindspot?",
        a: "Most teams are up and running in under 5 minutes. Connect your integrations via OAuth, and Blindspot handles the rest — no agents or complex configuration required.",
    },
    {
        q: "Is my data secure?",
        a: "Absolutely. We are SOC 2 Type II certified. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We never sell or share your data with third parties.",
    },
    {
        q: "Can I use Blindspot with my existing monitoring stack?",
        a: "Yes! Blindspot is designed to complement, not replace, your existing tools. We integrate with Datadog, Grafana, Prometheus, CloudWatch, and 50+ other platforms.",
    },
    {
        q: "What happens if I exceed my plan limits?",
        a: "We will notify you before you hit your limits. You can upgrade at any time with a single click, or we can discuss a custom plan tailored to your usage.",
    },
    {
        q: "Do you offer a free trial for paid plans?",
        a: "Yes — all paid plans come with a 14-day free trial, no credit card required. You can explore every feature before you commit.",
    },
];

export default function FAQ() {
    const [openIdx, setOpenIdx] = useState<number | null>(null);

    return (
        <section id="faq" className="py-28 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-violet-400 font-semibold text-sm uppercase tracking-widest mb-3">
                        FAQ
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        Frequently asked{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                            questions
                        </span>
                    </h2>
                </div>

                <div className="flex flex-col gap-3">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="rounded-xl border border-white/10 bg-white/5 overflow-hidden"
                        >
                            <button
                                id={`faq-item-${i}`}
                                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                                className="w-full flex items-center justify-between px-6 py-5 text-left text-white font-semibold hover:bg-white/5 transition-colors"
                            >
                                <span>{faq.q}</span>
                                <span
                                    className={`text-violet-400 transition-transform duration-300 text-xl flex-shrink-0 ml-4 ${openIdx === i ? "rotate-45" : ""}`}
                                >
                                    +
                                </span>
                            </button>
                            {openIdx === i && (
                                <div className="px-6 pb-5 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
