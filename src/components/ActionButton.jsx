import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { animateWithGsap } from "../utils/animations";

const actionModes = [
    {
        id: "silent",
        name: "Silent Mode",
        desc: "Mute alerts and ringtones with a gentle haptic buzz.",
        icon: "🔔",
        color: "#FF453A",
        pillText: "Silent",
    },
    {
        id: "camera",
        name: "Camera",
        desc: "Instantly launch your favorite camera lens to capture the moment.",
        icon: "📷",
        color: "#FF9F0A",
        pillText: "Camera Ready",
    },
    {
        id: "flashlight",
        name: "Flashlight",
        desc: "Turn on extra light when you need it without unlocking.",
        icon: "🔦",
        color: "#FFD60A",
        pillText: "Torch On",
    },
    {
        id: "focus",
        name: "Focus",
        desc: "Silence notifications that aren't critical during deep work.",
        icon: "🌙",
        color: "#5E5CE6",
        pillText: "Work Focus",
    },
    {
        id: "voice",
        name: "Voice Memo",
        desc: "Record quick voice memos, musical ideas, or lectures on the go.",
        icon: "🎙️",
        color: "#BF5AF2",
        pillText: "Recording...",
    },
    {
        id: "translate",
        name: "Translate",
        desc: "Translate phrases and have conversations across languages.",
        icon: "🌐",
        color: "#2997FF",
        pillText: "Translating",
    },
];

const ActionButtonSection = () => {
    const [activeMode, setActiveMode] = useState(actionModes[0]);
    const [isTriggered, setIsTriggered] = useState(false);

    useGSAP(() => {
        animateWithGsap("#action-title", { y: 0, opacity: 1 });
        animateWithGsap("#action-sub", { y: 0, opacity: 1, delay: 0.2 });
        animateWithGsap(".action-card", {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
        });
    }, []);

    const handlePressButton = (mode) => {
        setActiveMode(mode);
        setIsTriggered(true);
        setTimeout(() => setIsTriggered(false), 2400);
    };

    return (
        <section id="action-button" className="common-padding bg-zinc relative overflow-hidden">
            {/* Subtle radial ambient background */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 opacity-25"
                style={{ backgroundColor: activeMode.color }}
            />

            <div className="screen-max-width relative z-10">
                <div className="text-center mb-12 sm:mb-16">
                    <span className="text-xs font-semibold tracking-widest uppercase text-blue block mb-2">
                        Next-Generation Control
                    </span>
                    <h2 id="action-title" className="section-heading">
                        All-new Action button.
                        <br />
                        <span className="text-white">What will yours do?</span>
                    </h2>
                    <p id="action-sub" className="text-gray text-base sm:text-xl max-w-xl mx-auto mt-4 opacity-0 translate-y-10">
                        By default, it switches between Ring and Silent. Choose your favorite shortcut and hold to launch action.
                    </p>
                </div>

                {/* Interactive Dynamic Island & Action Demo Mockup */}
                <div className="max-w-2xl mx-auto mb-14 bg-black/90 border border-white/15 rounded-[36px] sm:rounded-[44px] p-6 sm:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.9)] relative backdrop-blur-xl">
                    
                    {/* Simulated Dynamic Island Pill */}
                    <div className="flex justify-center mb-10">
                        <div
                            className={`h-9 px-5 rounded-full bg-neutral-900 border border-white/10 flex items-center gap-3 transition-all duration-500 shadow-2xl ${
                                isTriggered
                                    ? "scale-105 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                                    : ""
                            }`}
                        >
                            <span className="text-sm">{activeMode.icon}</span>
                            <span className="text-xs font-medium text-white tracking-wide">
                                {isTriggered ? activeMode.pillText : "Dynamic Island"}
                            </span>
                            {isTriggered && (
                                <span
                                    className="w-2 h-2 rounded-full animate-ping"
                                    style={{ backgroundColor: activeMode.color }}
                                />
                            )}
                        </div>
                    </div>

                    {/* Simulated Side Profile of Phone with Action Button */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-zinc/70 border border-white/10 rounded-3xl p-6 sm:p-8">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                {/* Action button physical trigger animation */}
                                <div
                                    className={`w-3.5 h-12 rounded-full transition-all duration-300 ${
                                        isTriggered
                                            ? "scale-95 shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                                            : "hover:scale-105"
                                    }`}
                                    style={{
                                        backgroundColor: activeMode.color,
                                    }}
                                />
                            </div>
                            <div>
                                <p className="text-xs text-gray uppercase tracking-wider">Current assignment</p>
                                <h3 className="text-xl font-bold text-white mt-0.5">{activeMode.name}</h3>
                                <p className="text-xs text-gray-200 mt-1 max-w-sm">{activeMode.desc}</p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => handlePressButton(activeMode)}
                            className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-md flex items-center gap-2"
                            style={{
                                backgroundColor: isTriggered ? activeMode.color : "white",
                                color: isTriggered ? "white" : "black",
                            }}
                        >
                            <span>{isTriggered ? "Activated" : "Hold Action Button"}</span>
                            <span>{activeMode.icon}</span>
                        </button>
                    </div>
                </div>

                {/* Grid of Action Mode Options */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {actionModes.map((mode) => {
                        const isSelected = activeMode.id === mode.id;
                        return (
                            <button
                                key={mode.id}
                                type="button"
                                onClick={() => handlePressButton(mode)}
                                className={`action-card p-4 rounded-2xl border text-left transition-all duration-300 group hover:-translate-y-1 ${
                                    isSelected
                                        ? "bg-white/10 border-white/40 shadow-lg"
                                        : "bg-zinc/60 border-white/10 hover:border-white/20"
                                }`}
                            >
                                <div className="text-2xl mb-2 transition-transform group-hover:scale-110">
                                    {mode.icon}
                                </div>
                                <h4 className="text-sm font-semibold text-white">{mode.name}</h4>
                                <p className="text-[11px] text-gray mt-1 line-clamp-2">
                                    {mode.desc}
                                </p>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ActionButtonSection;
