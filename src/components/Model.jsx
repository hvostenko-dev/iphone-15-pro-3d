import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { useEffect, useRef, useState, useMemo } from "react";
import { yellowImg } from "../utils";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateWithGsap, animateWithGsapTimeline } from "../utils/animations";

const sizeSpecs = {
    small: {
        name: 'iPhone 15 Pro',
        display: '6.1" Super Retina XDR display',
        weight: '187 grams',
        zoom: '3x optical zoom',
        battery: 'Up to 23 hours video playback',
        startingPrice: '$999',
        monthly: 'From $41.62/mo. for 24 mo.',
        storageOptions: ['128GB', '256GB', '512GB', '1TB'],
    },
    large: {
        name: 'iPhone 15 Pro Max',
        display: '6.7" Super Retina XDR display',
        weight: '221 grams',
        zoom: '5x optical zoom (120 mm)',
        battery: 'Up to 29 hours video playback',
        startingPrice: '$1,199',
        monthly: 'From $49.95/mo. for 24 mo.',
        storageOptions: ['256GB', '512GB', '1TB'],
    },
};

const Model = () => {
    const [size, setSize] = useState("small");
    const [model, setModel] = useState({
        title: "iPhone 15 Pro in Natural Titanium",
        color: ["#8F8A81", "#FFE7B9", "#6F6C64"],
        img: yellowImg,
    });
    const [isMobile, setIsMobile] = useState(
        typeof window !== "undefined" ? window.innerWidth < 640 : false
    );
    const [interactive3D, setInteractive3D] = useState(true);
    const [autoRotate, setAutoRotate] = useState(false);
    const [isSectionInView, setIsSectionInView] = useState(true);
    const [showBuyModal, setShowBuyModal] = useState(false);
    const [selectedStorage, setSelectedStorage] = useState("256GB");
    const [orderSuccess, setOrderSuccess] = useState(false);

    // camera control for the model view
    const cameraControlSmall = useRef();
    const cameraControlLarge = useRef();

    // model
    const small = useRef(new THREE.Group());
    const large = useRef(new THREE.Group());

    // rotation
    const [smallRotation, setSmallRotation] = useState(0);
    const [largeRotation, setLargeRotation] = useState(0);

    const tlRef = useRef(null);
    const sectionRef = useRef(null);

    // Pause WebGL rendering when off-screen to eliminate background GPU drain
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSectionInView(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!tlRef.current) {
            tlRef.current = gsap.timeline();
        }
        const tl = tlRef.current;
        if (size === "large") {
            animateWithGsapTimeline(tl, small, smallRotation, "#view1", "#view2", {
                transform: "translateX(-100%)",
                duration: 1.5,
            });
        }

        if (size === "small") {
            animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
                transform: "translateX(0)",
                duration: 1.5,
            });
        }
    }, [size, smallRotation, largeRotation]);

    const handleAnglePreset = (angleRadian) => {
        setAutoRotate(false);
        const targetRef = size === "small" ? small : large;
        const targetControl = size === "small" ? cameraControlSmall : cameraControlLarge;

        if (targetControl.current) {
            targetControl.current.reset();
        }
        gsap.to(targetRef.current.rotation, {
            y: angleRadian,
            duration: 0.9,
            ease: "power2.out",
        });
        if (size === "small") setSmallRotation(angleRadian);
        else setLargeRotation(angleRadian);
    };

    useGSAP(() => {
        animateWithGsap("#heading", { y: 0, opacity: 1 });
        animateWithGsap("#model-subheading", { y: 0, opacity: 1, delay: 0.2 });
    }, []);

    const currentSpecs = useMemo(() => sizeSpecs[size], [size]);

    return (
        <section id="model" ref={sectionRef} className="common-padding relative">
            <div className="screen-max-width">
                <div className="text-center sm:text-left mb-6 sm:mb-10">
                    <h1 id="heading" className="section-heading">
                        Take a closer look.
                    </h1>
                    <p id="model-subheading" className="text-gray text-base sm:text-xl font-normal mt-2 opacity-0 translate-y-10">
                        Crafted with aerospace-grade titanium. Explore every angle and finish.
                    </p>
                </div>

                <div className="flex flex-col items-center mt-3">
                    {/* 3D Canvas Container */}
                    <div className="w-full h-[60vh] sm:h-[75vh] md:h-[82vh] overflow-hidden relative rounded-3xl bg-gradient-to-b from-zinc/80 to-black/90 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-sm">
                        
                        {/* Dynamic Titanium Ambient Glow */}
                        <div
                            className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-40 blur-3xl"
                            style={{
                                background: `radial-gradient(circle at 50% 50%, ${model.color[0]} 0%, transparent 70%)`,
                            }}
                        />

                        {/* Interactive Top Toolbar */}
                        <div className="absolute top-4 left-0 right-0 z-20 flex flex-wrap justify-center items-center gap-2 px-4 pointer-events-none">
                            <span className="text-xs text-white/90 bg-zinc/90 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full shadow-lg">
                                {interactive3D ? (autoRotate ? "Auto-spinning 360°" : "Drag to rotate 360°") : "Scroll mode"}
                            </span>

                            <button
                                type="button"
                                onClick={() => setAutoRotate((prev) => !prev)}
                                className={`pointer-events-auto text-xs px-3.5 py-1.5 rounded-full border transition-all shadow-lg ${
                                    autoRotate
                                        ? "bg-blue text-white border-blue shadow-blue/30"
                                        : "bg-zinc/90 text-white/80 hover:text-white border-white/15"
                                }`}
                            >
                                {autoRotate ? "Pause Spin" : "Auto Spin"}
                            </button>

                            <button
                                type="button"
                                onClick={() => handleAnglePreset(0)}
                                className="pointer-events-auto text-xs text-white/80 hover:text-white bg-zinc/90 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full transition-all hover:bg-white/10 shadow-lg"
                            >
                                Front
                            </button>

                            <button
                                type="button"
                                onClick={() => handleAnglePreset(Math.PI)}
                                className="pointer-events-auto text-xs text-white/80 hover:text-white bg-zinc/90 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full transition-all hover:bg-white/10 shadow-lg"
                            >
                                Back
                            </button>

                            <button
                                type="button"
                                onClick={() => handleAnglePreset(Math.PI / 2)}
                                className="pointer-events-auto text-xs text-white/80 hover:text-white bg-zinc/90 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full transition-all hover:bg-white/10 shadow-lg"
                            >
                                Profile
                            </button>

                            {isMobile && (
                                <button
                                    type="button"
                                    onClick={() => setInteractive3D((prev) => !prev)}
                                    className="pointer-events-auto text-xs text-blue bg-zinc/90 backdrop-blur-md border border-blue/30 px-3.5 py-1.5 rounded-full transition-all"
                                >
                                    {interactive3D ? "Lock Scroll" : "Touch 3D"}
                                </button>
                            )}
                        </div>

                        {/* Model Views */}
                        <ModelView
                            index={1}
                            groupRef={small}
                            gsapType="view1"
                            controlRef={cameraControlSmall}
                            setRotationState={setSmallRotation}
                            item={model}
                            size={size}
                            isMobile={isMobile}
                            interactive={interactive3D}
                            autoRotate={autoRotate && size === "small"}
                        />

                        <ModelView
                            index={2}
                            groupRef={large}
                            gsapType="view2"
                            controlRef={cameraControlLarge}
                            setRotationState={setLargeRotation}
                            item={model}
                            size={size}
                            isMobile={isMobile}
                            interactive={interactive3D}
                            autoRotate={autoRotate && size === "large"}
                        />

                        <Canvas
                            className="w-full h-full"
                            style={{
                                position: "fixed",
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                overflow: "hidden",
                                pointerEvents: "none",
                            }}
                            eventSource={document.getElementById("root")}
                            frameloop={isSectionInView ? "always" : "never"}
                            dpr={[1, Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2)]}
                            gl={{
                                powerPreference: "high-performance",
                                antialias: true,
                                alpha: true,
                                stencil: false,
                                depth: true,
                            }}
                        >
                            <View.Port />
                        </Canvas>

                        {/* Titanium Finish Badge in Bottom Left */}
                        <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-2.5 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-2xl">
                            <span
                                className="w-3.5 h-3.5 rounded-full border border-white/30 shadow-inner"
                                style={{ backgroundColor: model.color[0] }}
                            />
                            <span className="text-xs font-medium text-white/90">
                                Grade 5 Titanium Finish
                            </span>
                        </div>
                    </div>

                    {/* Model Customization Bar */}
                    <div className="mx-auto w-full mt-4 sm:mt-6 max-w-3xl">
                        <p className="text-base sm:text-lg font-medium text-center mb-3 sm:mb-4 text-white">
                            {model.title}
                        </p>

                        <div className="flex-center flex-wrap gap-4">
                            {/* Color Selector */}
                            <ul className="color-container border border-white/10 shadow-lg">
                                {models.map((item, i) => {
                                    const isSelected = model.title === item.title;
                                    return (
                                        <li
                                            key={i}
                                            role="button"
                                            tabIndex={0}
                                            aria-label={item.title}
                                            className={`w-7 h-7 rounded-full mx-2 cursor-pointer transition-all duration-300 relative ${
                                                isSelected
                                                    ? "ring-2 ring-blue ring-offset-2 ring-offset-black scale-110 shadow-lg"
                                                    : "opacity-75 hover:opacity-100 hover:scale-105"
                                            }`}
                                            style={{ backgroundColor: item.color[0] }}
                                            onClick={() => setModel(item)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    setModel(item);
                                                }
                                            }}
                                        >
                                            {isSelected && (
                                                <span className="absolute inset-0 rounded-full border border-white/40" />
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>

                            {/* Size Selector */}
                            <div className="size-btn-container border border-white/10 shadow-lg">
                                {sizes.map(({ label, value }) => (
                                    <button
                                        type="button"
                                        key={label}
                                        className={`size-btn font-medium transition-all duration-200 ${
                                            size === value
                                                ? "bg-white text-black shadow-md scale-105"
                                                : "bg-transparent text-white/80 hover:text-white"
                                        }`}
                                        onClick={() => setSize(value)}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            {/* Order / Configure Button */}
                            <button
                                type="button"
                                onClick={() => setShowBuyModal(true)}
                                className="px-5 py-2.5 rounded-full bg-blue hover:bg-blue/90 text-white text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(41,151,255,0.4)]"
                            >
                                Configure & Buy
                            </button>
                        </div>

                        {/* Interactive Specs Preview Card */}
                        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-zinc/60 backdrop-blur-md border border-white/10 p-4 sm:p-5 rounded-2xl text-center">
                            <div className="p-2 border-r border-white/5 last:border-none">
                                <p className="text-xs text-gray uppercase tracking-wider">Display</p>
                                <p className="text-sm sm:text-base font-semibold text-white mt-1">{currentSpecs.display.split(" ")[0]} Super Retina</p>
                            </div>
                            <div className="p-2 sm:border-r border-white/5 last:border-none">
                                <p className="text-xs text-gray uppercase tracking-wider">Weight</p>
                                <p className="text-sm sm:text-base font-semibold text-white mt-1">{currentSpecs.weight}</p>
                            </div>
                            <div className="p-2 border-r border-white/5 last:border-none">
                                <p className="text-xs text-gray uppercase tracking-wider">Telephoto</p>
                                <p className="text-sm sm:text-base font-semibold text-white mt-1">{currentSpecs.zoom}</p>
                            </div>
                            <div className="p-2 last:border-none">
                                <p className="text-xs text-gray uppercase tracking-wider">Price</p>
                                <p className="text-sm sm:text-base font-semibold text-blue mt-1">{currentSpecs.startingPrice}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Apple-style Interactive Configuration Modal */}
            {showBuyModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
                    <div className="relative w-full max-w-lg bg-zinc/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => {
                                setShowBuyModal(false);
                                setOrderSuccess(false);
                            }}
                            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex-center transition-colors"
                        >
                            ✕
                        </button>

                        {!orderSuccess ? (
                            <>
                                <div className="text-center mb-6">
                                    <span className="text-xs font-semibold uppercase tracking-widest text-blue">
                                        Customize your device
                                    </span>
                                    <h3 className="text-2xl font-bold text-white mt-1">
                                        {currentSpecs.name}
                                    </h3>
                                    <p className="text-sm text-gray mt-1">
                                        {model.title.replace("iPhone 15 Pro in ", "")} Finish
                                    </p>
                                </div>

                                <div className="space-y-5">
                                    {/* Storage Selector */}
                                    <div>
                                        <label className="text-xs font-medium text-gray block mb-2">
                                            Select Capacity
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {currentSpecs.storageOptions.map((cap) => (
                                                <button
                                                    key={cap}
                                                    type="button"
                                                    onClick={() => setSelectedStorage(cap)}
                                                    className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                                                        selectedStorage === cap
                                                            ? "bg-white text-black border-white shadow-lg"
                                                            : "bg-black/40 text-white/90 border-white/10 hover:border-white/30"
                                                    }`}
                                                >
                                                    {cap}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Summary Price */}
                                    <div className="bg-black/50 border border-white/10 rounded-2xl p-4 flex justify-between items-center">
                                        <div>
                                            <p className="text-xs text-gray">Total Investment</p>
                                            <p className="text-xl font-bold text-white">
                                                {size === "small"
                                                    ? selectedStorage === "128GB" ? "$999" : selectedStorage === "256GB" ? "$1,099" : selectedStorage === "512GB" ? "$1,299" : "$1,499"
                                                    : selectedStorage === "256GB" ? "$1,199" : selectedStorage === "512GB" ? "$1,399" : "$1,599"
                                                }
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray">With Apple Card</p>
                                            <p className="text-sm font-semibold text-blue">
                                                {currentSpecs.monthly}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Perks */}
                                    <div className="text-xs text-gray space-y-1.5 border-t border-white/10 pt-4">
                                        <p className="flex items-center gap-2">
                                            <span className="text-emerald-400">✓</span> Free delivery and contactless returns
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="text-emerald-400">✓</span> Includes 3 months of Apple TV+ & Apple Music
                                        </p>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        type="button"
                                        onClick={() => setOrderSuccess(true)}
                                        className="w-full py-3.5 rounded-2xl bg-blue hover:bg-blue/90 text-white font-semibold text-base transition-all shadow-[0_5px_25px_rgba(41,151,255,0.4)] active:scale-95"
                                    >
                                        Pay with Apple Pay
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8 space-y-4 animate-fadeIn">
                                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex-center mx-auto text-2xl">
                                    ✓
                                </div>
                                <h3 className="text-2xl font-bold text-white">Order Confirmed!</h3>
                                <p className="text-sm text-gray max-w-xs mx-auto">
                                    Your {currentSpecs.name} in {model.title.replace("iPhone 15 Pro in ", "")} ({selectedStorage}) has been reserved.
                                </p>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowBuyModal(false);
                                        setOrderSuccess(false);
                                    }}
                                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
                                >
                                    Close Window
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Model;
