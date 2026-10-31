import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { animateWithGsap } from "../utils/animations";
import { sounds } from "../utils/audio";

const compareModels = [
    {
        name: "iPhone 15 Pro",
        tagline: "The ultimate iPhone.",
        price: "From $999",
        material: "Titanium with textured matte glass back",
        chip: "A17 Pro chip with 6-core GPU",
        actionBtn: "Action button (customizable)",
        camera: "Pro camera system (48MP Main | 3x Telephoto)",
        opticalZoom: "3x optical zoom in",
        connector: "USB-C (supports USB 3 up to 10Gb/s)",
        battery: "Up to 23 hours video playback",
        weight: "187 grams",
        display: '6.1" Super Retina XDR with ProMotion 120Hz',
    },
    {
        name: "iPhone 15 Pro Max",
        tagline: "The maximum Pro experience.",
        price: "From $1,199",
        material: "Titanium with textured matte glass back",
        chip: "A17 Pro chip with 6-core GPU",
        actionBtn: "Action button (customizable)",
        camera: "Pro camera system (48MP Main | 5x Telephoto)",
        opticalZoom: "5x optical zoom in (120 mm)",
        connector: "USB-C (supports USB 3 up to 10Gb/s)",
        battery: "Up to 29 hours video playback",
        weight: "221 grams",
        display: '6.7" Super Retina XDR with ProMotion 120Hz',
    },
    {
        name: "iPhone 14 Pro",
        tagline: "Previous generation.",
        price: "Discontinued",
        material: "Stainless steel with matte glass back",
        chip: "A16 Bionic chip with 5-core GPU",
        actionBtn: "Single-function Ring/Silent switch",
        camera: "Pro camera system (48MP Main | 3x Telephoto)",
        opticalZoom: "3x optical zoom in",
        connector: "Lightning connector (USB 2 up to 480Mb/s)",
        battery: "Up to 23 hours video playback",
        weight: "206 grams",
        display: '6.1" Super Retina XDR with ProMotion 120Hz',
    },
];

const Comparison = () => {
    const [highlightDiffs, setHighlightDiffs] = useState(true);

    useGSAP(() => {
        animateWithGsap("#compare-heading", { y: 0, opacity: 1 });
        animateWithGsap(".compare-col", {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.9,
        });
    }, []);

    const toggleHighlight = () => {
        sounds.playClick();
        setHighlightDiffs((prev) => !prev);
    };

    return (
        <section id="compare" className="common-padding bg-black relative">
            <div className="screen-max-width">
                <div className="text-center mb-10 sm:mb-14">
                    <span className="text-xs font-semibold tracking-widest uppercase text-blue block mb-2">
                        Side by Side
                    </span>
                    <h2 id="compare-heading" className="section-heading">
                        Compare Pro models.
                    </h2>
                    <p className="text-gray text-base sm:text-xl max-w-xl mx-auto mt-3">
                        See why upgrading to the new titanium architecture makes all the difference.
                    </p>

                    <button
                        type="button"
                        onClick={toggleHighlight}
                        className={`mt-5 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                            highlightDiffs
                                ? "bg-blue/20 border-blue text-blue"
                                : "bg-white/5 border-white/10 text-gray"
                        }`}
                    >
                        {highlightDiffs ? "✓ Highlighting Upgrades" : "Highlight Upgrades"}
                    </button>
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {compareModels.map((item, idx) => {
                        const isLatest = idx < 2;
                        return (
                            <div
                                key={item.name}
                                className={`compare-col rounded-3xl p-6 sm:p-8 border transition-all duration-300 relative flex flex-col justify-between ${
                                    isLatest
                                        ? "bg-gradient-to-b from-white/[0.07] to-white/[0.02] border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl"
                                        : "bg-white/[0.02] border-white/10 opacity-80 hover:opacity-100 backdrop-blur-md"
                                }`}
                            >
                                <div>
                                    {isLatest && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue/20 text-blue border border-blue/30 inline-block mb-3">
                                            Titanium Generation
                                        </span>
                                    )}
                                    <h3 className="text-2xl font-bold text-white tracking-tight">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-gray mt-1">{item.tagline}</p>
                                    <p className="text-xl font-bold text-white mt-3 pb-5 border-b border-white/10">
                                        {item.price}
                                    </p>

                                    <div className="space-y-4 pt-5 text-xs sm:text-sm">
                                        <div>
                                            <p className="text-gray text-[11px] uppercase tracking-wider">Display</p>
                                            <p className="font-semibold text-white mt-0.5">{item.display}</p>
                                        </div>

                                        <div>
                                            <p className="text-gray text-[11px] uppercase tracking-wider">Chassis Material</p>
                                            <p className={`font-semibold mt-0.5 ${highlightDiffs && isLatest ? "text-amber-200" : "text-white"}`}>
                                                {item.material}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray text-[11px] uppercase tracking-wider">Processor</p>
                                            <p className={`font-semibold mt-0.5 ${highlightDiffs && isLatest ? "text-blue" : "text-white"}`}>
                                                {item.chip}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray text-[11px] uppercase tracking-wider">Action Button</p>
                                            <p className={`font-semibold mt-0.5 ${highlightDiffs && isLatest ? "text-emerald-400" : "text-white"}`}>
                                                {item.actionBtn}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray text-[11px] uppercase tracking-wider">Optical Zoom</p>
                                            <p className={`font-semibold mt-0.5 ${highlightDiffs && idx === 1 ? "text-purple-400" : "text-white"}`}>
                                                {item.opticalZoom}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray text-[11px] uppercase tracking-wider">Connector Speed</p>
                                            <p className={`font-semibold mt-0.5 ${highlightDiffs && isLatest ? "text-cyan-400" : "text-white"}`}>
                                                {item.connector}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-gray text-[11px] uppercase tracking-wider">Weight</p>
                                            <p className="font-semibold text-white mt-0.5">{item.weight}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 pt-4 border-t border-white/10">
                                    <a
                                        href="#model"
                                        className={`w-full block py-2.5 rounded-full text-center text-xs font-semibold transition-all ${
                                            isLatest
                                                ? "bg-white text-black hover:bg-gray-200 shadow-md"
                                                : "bg-white/10 text-white/70 hover:bg-white/20"
                                        }`}
                                    >
                                        {isLatest ? "Explore in 3D" : "View Details"}
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Comparison;
