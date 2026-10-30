import { useGSAP } from "@gsap/react";
import { animateWithGsap } from "../utils/animations";

const specsData = [
    {
        title: "Aerospace-Grade Titanium",
        badge: "Grade 5 Alloy",
        description: "The same alloy used by NASA for spacecraft sent to Mars. Precision contoured edges and the thinnest borders on iPhone.",
        stat: "187g",
        statLabel: "Lightest Pro model ever",
        gradient: "from-amber-200/20 via-zinc-800 to-transparent",
    },
    {
        title: "A17 Pro Chip",
        badge: "3nm Architecture",
        description: "6-core GPU with hardware-accelerated ray tracing up to 4x faster than software ray tracing. Console-level gaming.",
        stat: "Up to 20%",
        statLabel: "Faster GPU graphics",
        gradient: "from-blue/20 via-zinc-800 to-transparent",
    },
    {
        title: "Pro Camera System",
        badge: "48MP Quad-Pixel",
        description: "The equivalent of 7 pro lenses in your pocket. 24mm, 28mm, and 35mm focal lengths plus 5x optical zoom on Pro Max.",
        stat: "120 mm",
        statLabel: "Longest optical zoom in iPhone",
        gradient: "from-purple-500/20 via-zinc-800 to-transparent",
    },
    {
        title: "USB-C with USB 3",
        badge: "10 Gbps Speed",
        description: "Supports USB 3 for a huge leap in data transfer speeds and video workflow with direct external ProRes recording.",
        stat: "20x",
        statLabel: "Faster data transfers",
        gradient: "from-emerald-500/20 via-zinc-800 to-transparent",
    },
];

const TechSpecs = () => {
    useGSAP(() => {
        animateWithGsap("#specs-heading", { y: 0, opacity: 1 });
        animateWithGsap(".spec-card", {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.9,
        });
    }, []);

    return (
        <section id="specs" className="common-padding bg-black relative">
            <div className="screen-max-width">
                <div className="text-center mb-12 sm:mb-16">
                    <span className="text-xs font-semibold tracking-widest uppercase text-blue block mb-2">
                        Pro Performance
                    </span>
                    <h2 id="specs-heading" className="section-heading">
                        Engineered for the extreme.
                    </h2>
                    <p className="text-gray text-base sm:text-xl max-w-2xl mx-auto mt-3">
                        A closer look at the groundbreaking technologies powering iPhone 15 Pro.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {specsData.map((spec, idx) => (
                        <div
                            key={idx}
                            className={`spec-card relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${spec.gradient} p-8 sm:p-10 backdrop-blur-xl transition-all duration-300 hover:border-white/20 group hover:-translate-y-1`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/90">
                                    {spec.badge}
                                </span>
                                <div className="text-right">
                                    <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                                        {spec.stat}
                                    </p>
                                    <p className="text-[11px] text-gray uppercase tracking-wider">
                                        {spec.statLabel}
                                    </p>
                                </div>
                            </div>

                            <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-3">
                                {spec.title}
                            </h3>

                            <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
                                {spec.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechSpecs;
