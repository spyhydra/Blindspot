import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const plans = [
    {
        name: "Starter",
        price: "$0",
        period: "/ month",
        description: "Perfect for indie devs and small projects.",
        features: [
            "Up to 3 integrations",
            "1,000 events / day",
            "7-day log retention",
            "Email alerts",
            "Community support",
        ],
        cta: "Start Free",
        variant: "secondary" as const,
        highlight: false,
    },
    {
        name: "Pro",
        price: "$49",
        period: "/ month",
        description: "For growing teams that need more power.",
        features: [
            "Unlimited integrations",
            "1M events / day",
            "90-day log retention",
            "Slack & PagerDuty alerts",
            "Autonomous remediation",
            "Priority support",
        ],
        cta: "Get Pro →",
        variant: "primary" as const,
        highlight: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "",
        description: "Dedicated infrastructure and SLAs for large orgs.",
        features: [
            "Unlimited everything",
            "Custom data retention",
            "SSO / SAML",
            "Dedicated CSM",
            "SLA guarantee",
            "On-premise option",
        ],
        cta: "Contact Sales",
        variant: "secondary" as const,
        highlight: false,
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-28 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-violet-400 font-semibold text-sm uppercase tracking-widest mb-3">
                        Pricing
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        Simple,{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                            transparent
                        </span>{" "}
                        pricing
                    </h2>
                    <p className="mt-4 text-gray-400 text-lg">
                        No hidden fees. No surprises. Cancel anytime.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-2xl border p-8 flex flex-col gap-6 transition-all duration-300
                ${plan.highlight
                                    ? "bg-gradient-to-b from-violet-900/60 to-indigo-900/40 border-violet-500/50 shadow-2xl shadow-violet-500/20 scale-105"
                                    : "bg-white/5 border-white/10 hover:bg-white/8"
                                }`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <Badge color="violet">Most Popular</Badge>
                                </div>
                            )}

                            <div>
                                <p className="text-gray-400 text-sm font-semibold uppercase tracking-widest">
                                    {plan.name}
                                </p>
                                <div className="flex items-end gap-1 mt-2">
                                    <span className="text-5xl font-black text-white">
                                        {plan.price}
                                    </span>
                                    {plan.period && (
                                        <span className="text-gray-500 mb-2">{plan.period}</span>
                                    )}
                                </div>
                                <p className="text-gray-400 text-sm mt-2">{plan.description}</p>
                            </div>

                            <ul className="flex flex-col gap-3 text-sm">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-center gap-3 text-gray-300">
                                        <span className="text-violet-400 font-bold flex-shrink-0">✓</span>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={plan.variant}
                                id={`pricing-cta-${plan.name.toLowerCase()}`}
                                className="w-full"
                            >
                                {plan.cta}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
