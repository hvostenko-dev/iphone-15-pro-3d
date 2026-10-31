import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { animateWithGsap } from "../utils/animations";
import { explore1Img, explore2Img, heroImg } from "../utils";
import { sounds } from "../utils/audio";

const focalLengths = [
    { label: "0.5x", mm: "13 mm", title: "Ultra Wide", fStop: "f/2.2", img: explore2Img, scale: 0.8 },
    { label: "1x", mm: "24 mm", title: "Main (1x)", fStop: "f/1.78", img: heroImg, scale: 1 },
    { label: "1.2x", mm: "28 mm", title: "Main (28mm)", fStop: "f/1.78", img: heroImg, scale: 1.15 },
    { label: "1.5x", mm: "35 mm", title: "Main (35mm)", fStop: "f/1.78", img: heroImg, scale: 1.35 },
    { label: "2x", mm: "48 mm", title: "2x Telephoto", fStop: "f/1.78", img: explore1Img, scale: 1.7 },
    { label: "5x", mm: "120 mm", title: "5x Optical Telephoto", fStop: "f/2.8", img: explore1Img, scale: 2.5 },
];

const CameraStudio = () => {
    const [selectedFocal, setSelectedFocal] = useState(focalLengths[1]);
    const [showGrid, setShowGrid] = useState(true);
    const [isFlashing, setIsFlashing] = useState(false);
    const [photoCount, setPhotoCount] = useState(0);

    useGSAP(() => {
        animateWithGsap("#camera-title", { y: 0, opacity: 1 });
        animateWithGsap("#camera-sub", { y: 0, opacity: 1, delay: 0.2 });
        animateWithGsap("#camera-viewfinder", { y: 0, opacity: 1, delay: 0.3 });
    }, []);

    const handleSelectFocal = (item) => {
        sounds.playClick();
        setSelectedFocal(item);
    };

    const handleSnapPhoto = () => {
        sounds.playShutter();
        setIsFlashing(true);
        setPhotoCount((c) => c + 1);
        setTimeout(() => setIsFlashing(false), 200);
    };

    return (
        <section id="camera-studio" className="common-padding bg-black relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="screen-max-width relative z-10">
                <div className="text-center mb-10 sm:mb-14">
                    <span className="text-xs font-semibold tracking-widest uppercase text-blue block mb-2">
                        Pro Camera System
                    </span>
                    <h2 id="camera-title" className="section-heading">
                        7 pro lenses in your pocket.
                    </h2>
                    <p id="camera-sub" className="text-gray text-base sm:text-xl max-w-2xl mx-auto mt-3 opacity-0 translate-y-10">
                        From dramatic macro framing to a 5x optical telephoto with 120 mm focal length. Switch lenses and test the camera below.
                    </p>
                </div>

                {/* Simulated iOS Camera Viewfinder */}
                <div
                    id="camera-viewfinder"
                    className="max-w-3xl mx-auto rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/15 p-4 sm:p-6 shadow-[0_30px_80px_rgba(0,0,0,0.9)] opacity-0 translate-y-10 backdrop-blur-xl"
                >
                    {/* Viewfinder Header */}
                    <div className="flex items-center justify-between text-xs text-white/80 px-2 sm:px-4 py-2 border-b border-white/10 mb-3">
                        <div className="flex items-center gap-3">
                            <span className="px-2.5 py-1 rounded-full bg-white/10 font-mono font-medium">
                                RAW 48MP
                            </span>
                            <span className="text-gray">{selectedFocal.fStop}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => {
                                    sounds.playClick();
                                    setShowGrid((prev) => !prev);
                                }}
                                className={`px-2.5 py-1 rounded-full border text-[11px] cursor-pointer transition-colors ${
                                    showGrid ? "border-blue text-blue bg-blue/10" : "border-white/15 text-gray hover:text-white"
                                }`}
                            >
                                Grid 3x3
                            </button>
                            <span className="text-[11px] text-gray font-mono">
                                {photoCount > 0 ? `Captured: ${photoCount}` : "Ready"}
                            </span>
                        </div>
                    </div>

                    {/* Viewfinder Frame Screen */}
                    <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black border border-white/10">
                        {/* Shutter Flash Effect */}
                        {isFlashing && (
                            <div className="absolute inset-0 bg-white z-30 animate-pulse pointer-events-none" />
                        )}

                        {/* Image Layer with Zoom Transform */}
                        <div className="w-full h-full overflow-hidden flex-center">
                            <img
                                src={selectedFocal.img}
                                alt={selectedFocal.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out"
                                style={{
                                    transform: `scale(${selectedFocal.scale})`,
                                }}
                            />
                        </div>

                        {/* Rule of Thirds Grid Overlay */}
                        {showGrid && (
                            <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 z-10">
                                <div className="border-r border-b border-white/20" />
                                <div className="border-r border-b border-white/20" />
                                <div className="border-b border-white/20" />
                                <div className="border-r border-b border-white/20" />
                                <div className="border-r border-b border-white/20" />
                                <div className="border-b border-white/20" />
                                <div className="border-r border-white/20" />
                                <div className="border-r border-white/20" />
                                <div />
                            </div>
                        )}

                        {/* Center Focus Box */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-yellow-400/70 rounded pointer-events-none z-10 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
                        </div>

                        {/* Active Lens Badge */}
                        <div className="absolute bottom-3 left-3 z-20 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-xs font-semibold text-white">
                                {selectedFocal.title} · {selectedFocal.mm}
                            </span>
                        </div>
                    </div>

                    {/* Lens Selector Dial */}
                    <div className="mt-5 flex items-center justify-center gap-2 flex-wrap">
                        {focalLengths.map((item) => {
                            const isCurrent = selectedFocal.label === item.label;
                            return (
                                <button
                                    key={item.label}
                                    type="button"
                                    onClick={() => handleSelectFocal(item)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                                        isCurrent
                                            ? "bg-white text-black scale-110 shadow-lg"
                                            : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                                    }`}
                                >
                                    {item.label}
                                    <span className="text-[10px] opacity-70 ml-1">({item.mm})</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Camera Trigger Bar */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between px-4 sm:px-8">
                        <div className="text-left">
                            <p className="text-xs text-gray">Photonic Engine</p>
                            <p className="text-sm font-semibold text-white">48MP Quad-Pixel Sensor</p>
                        </div>

                        {/* Physical Shutter Button */}
                        <button
                            type="button"
                            aria-label="Capture photo"
                            onClick={handleSnapPhoto}
                            className="w-14 h-14 rounded-full border-4 border-white flex-center p-1 hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(255,255,255,0.35)] cursor-pointer"
                        >
                            <span className="w-full h-full rounded-full bg-white transition-transform active:scale-90" />
                        </button>

                        <div className="text-right">
                            <p className="text-xs text-gray">Optical Quality</p>
                            <p className="text-sm font-semibold text-blue">Next-Gen Portraits</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CameraStudio;
