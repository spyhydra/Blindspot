import Card from "@/components/ui/Card";

const features = [
    {
        icon: "🎭",
        title: "Prompt Studio",
        description:
            "Don't just take a quiz. Define your role, years of experience, and tech stack to get a customized assessment.",
        color: "violet",
    },
    {
        icon: "🚫",
        title: "The 5th Option",
        description:
            "Our assessments include a mandatory 'I don't know' option to distinguish between guessing and actual blind spots.",
        color: "indigo",
    },
    {
        icon: "🧠",
        title: "AI Misconception Engine",
        description:
            "Gemini Pro analyzes your wrong answers to tell the difference between a minor slip and a fundamental misunderstanding.",
        color: "violet",
    },
    {
        icon: "🗺️",
        title: "Personalized Roadmaps",
        description:
            "Receive a prioritized learning path with recommended resources for every blind spot we find.",
        color: "indigo",
    },
    {
        icon: "🔐",
        title: "Ephemeral Sessions",
        description:
            "We don't store your quiz data. Your assessments are generated on-the-fly and exist only for your session.",
        color: "violet",
    },
    {
        icon: "⚖️",
        title: "Role Calibration",
        description:
            "Set your target role (e.g. Senior Frontend) and the AI will calibrate the difficulty of distractors accordingly.",
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
