import Card from "@/components/ui/Card";

const features = [
    {
        icon: "🔍",
        title: "AI-Powered Detection",
        description:
            "Our models continuously scan your pipelines and flag anomalies the moment they appear.",
        color: "violet",
    },
    {
        icon: "⚡",
        title: "Real-Time Alerts",
        description:
            "Push notifications, Slack, email — get pinged on the channel that matters most to you.",
        color: "indigo",
    },
    {
        icon: "📊",
        title: "Deep Analytics",
        description:
            "Interactive dashboards that turn raw telemetry into actionable narratives.",
        color: "violet",
    },
    {
        icon: "🔗",
        title: "One-Click Integrations",
        description:
            "Connect to AWS, GCP, GitHub, Jira, PagerDuty, and 50+ tools without writing a line of code.",
        color: "indigo",
    },
    {
        icon: "🛡️",
        title: "Enterprise Security",
        description:
            "SOC 2 Type II certified. Data encrypted at rest and in transit. SSO ready.",
        color: "violet",
    },
    {
        icon: "🤖",
        title: "Autonomous Remediation",
        description:
            "Let Blindspot auto-fix low-risk issues so your engineers focus on what matters.",
        color: "indigo",
    },
];

export default function Features() {
    return (
        <section id="features" className="py-28 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <p className="text-violet-400 font-semibold text-sm uppercase tracking-widest mb-3">
                        Features
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-white">
                        Everything you need to stay{" "}
                        <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                            ahead
                        </span>
                    </h2>
                    <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
                        A full-stack observability platform designed for modern engineering
                        teams.
                    </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f) => (
                        <Card key={f.title} glowing className="flex flex-col gap-4">
                            <div className="text-4xl">{f.icon}</div>
                            <h3 className="text-white font-bold text-lg">{f.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {f.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
