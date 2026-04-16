const steps = [
    {
        number: "01",
        title: "Connect Your Stack",
        description:
            "Link your cloud providers, repositories, and monitoring tools in under 5 minutes via OAuth or API keys.",
    },
    {
        number: "02",
        title: "AI Learns Your Baseline",
        description:
            "Blindspot ingests historical data and trains a model tailored to your unique environment and traffic patterns.",
    },
    {
        number: "03",
        title: "Detect Anomalies",
        description:
            "The engine monitors every metric in real time, surfacing deviations the moment they cross defined thresholds.",
    },
    {
        number: "04",
        title: "Act & Resolve",
        description:
            "Receive ranked alerts with full context, suggested fixes, and one-click remediation workflows.",
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-28 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-violet-400 font-semibold text-sm uppercase tracking-widest mb-3">
                        How It Works
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        From noise to{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                            clarity
                        </span>{" "}
                        in 4 steps
                    </h2>
                </div>

                <div className="relative flex flex-col gap-0">
                    {/* Vertical connector line */}
                    <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-violet-500/0 via-violet-500/50 to-violet-500/0 hidden md:block" />

                    {steps.map((step, i) => (
                        <div
                            key={step.number}
                            className="relative flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center py-8 md:pl-20 border-b border-white/5 last:border-0"
                        >
                            {/* Step number badge */}
                            <div className="absolute left-0 md:left-0 top-8 w-12 h-12 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-violet-500/30 hidden md:flex shrink-0">
                                {i + 1}
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-xs font-mono text-violet-400 font-semibold">
                                        {step.number}
                                    </span>
                                    <h3 className="text-white font-bold text-xl">{step.title}</h3>
                                </div>
                                <p className="text-gray-400 leading-relaxed max-w-2xl">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
