import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden pt-16"
        >
            {/* Ambient blobs */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-700/30 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] animate-pulse [animation-delay:1s]" />
                <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse [animation-delay:2s]" />
            </div>

            {/* Grid overlay */}
            <div
                className="absolute inset-0 -z-10 opacity-20"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(139,92,246,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.1) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
                <Badge color="violet">✨ Now in Public Beta</Badge>

                <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
                    See What Others{" "}
                    <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                        Miss
                    </span>
                </h1>

                <p className="max-w-2xl text-lg md:text-xl text-gray-400 leading-relaxed">
                    Blindspot uses AI to surface the critical insights buried in your
                    data — giving your team a decisive edge before problems become
                    catastrophes.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mt-4" id="hero-ctas">
                    <Button variant="primary" size="lg" id="hero-cta-primary">
                        Start for Free →
                    </Button>
                    <Button variant="secondary" size="lg" id="hero-cta-secondary">
                        Watch Demo
                    </Button>
                </div>

                {/* Social proof */}
                <p className="text-sm text-gray-500 mt-2">
                    Trusted by{" "}
                    <span className="text-white font-semibold">2,400+</span> teams worldwide
                    · No credit card required
                </p>

                {/* Floating stats row */}
                <div className="mt-10 grid grid-cols-3 gap-6 md:gap-12">
                    {[
                        { value: "98%", label: "Accuracy" },
                        { value: "3×", label: "Faster insights" },
                        { value: "< 5 min", label: "Setup time" },
                    ].map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center">
                            <span className="text-3xl md:text-4xl font-black bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                                {stat.value}
                            </span>
                            <span className="text-sm text-gray-500 mt-1">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
