import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { useEffect, useRef, useState } from "react";
import { yellowImg } from "../utils";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateWithGsap, animateWithGsapTimeline } from "../utils/animations";

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
                duration: 2,
            });
        }

        if (size === "small") {
            animateWithGsapTimeline(tl, large, largeRotation, "#view2", "#view1", {
                transform: "translateX(0)",
                duration: 2,
            });
        }
    }, [size, smallRotation, largeRotation]);

    const handleResetView = () => {
        if (cameraControlSmall.current) {
            cameraControlSmall.current.reset();
        }
        if (cameraControlLarge.current) {
            cameraControlLarge.current.reset();
        }
        gsap.to(small.current.rotation, { y: 0, duration: 0.8, ease: "power2.out" });
        gsap.to(large.current.rotation, { y: 0, duration: 0.8, ease: "power2.out" });
        setSmallRotation(0);
        setLargeRotation(0);
    };

    useGSAP(() => {
        animateWithGsap("#heading", { y: 0, opacity: 1 });
    }, []);

    return (
        <section id="model" className="common-padding">
            <div className="screen-max-width">
                <h1 id="heading" className="section-heading">
                    Take a closer look.
                </h1>

                <div className="flex flex-col items-center mt-5">
                    <div className="w-full h-[58vh] sm:h-[75vh] md:h-[85vh] overflow-hidden relative rounded-3xl">
                        <div className="absolute top-3 left-0 right-0 z-20 flex justify-center items-center gap-2 px-4 pointer-events-none">
                            <span className="text-xs text-gray-200 bg-zinc/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full">
                                {interactive3D ? "Drag to rotate 360°" : "Scroll mode active"}
                            </span>
                            <button
                                type="button"
                                onClick={handleResetView}
                                className="pointer-events-auto text-xs text-white/80 hover:text-white bg-zinc/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full transition-colors"
                            >
                                Reset angle
                            </button>
                            {isMobile && (
                                <button
                                    type="button"
                                    onClick={() => setInteractive3D((prev) => !prev)}
                                    className="pointer-events-auto text-xs text-blue bg-zinc/80 backdrop-blur-md border border-blue/30 px-3 py-1.5 rounded-full transition-colors"
                                >
                                    {interactive3D ? "Lock for scroll" : "Enable 3D touch"}
                                </button>
                            )}
                        </div>

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
                        >
                            <View.Port />
                        </Canvas>
                    </div>

                    <div className="mx-auto w-full mt-2 sm:mt-4">
                        <p className="text-sm sm:text-base font-light text-center mb-4 sm:mb-5 text-white/90">
                            {model.title}
                        </p>

                        <div className="flex-center">
                            <ul className="color-container">
                                {models.map((item, i) => {
                                    const isSelected = model.title === item.title;
                                    return (
                                        <li
                                            key={i}
                                            role="button"
                                            tabIndex={0}
                                            aria-label={item.title}
                                            className={`w-6 h-6 rounded-full mx-2 cursor-pointer transition-all duration-200 ${
                                                isSelected
                                                    ? "ring-2 ring-white ring-offset-2 ring-offset-black scale-110"
                                                    : "opacity-80 hover:opacity-100 hover:scale-105"
                                            }`}
                                            style={{ backgroundColor: item.color[0] }}
                                            onClick={() => setModel(item)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    setModel(item);
                                                }
                                            }}
                                        />
                                    );
                                })}
                            </ul>

                            <div className="size-btn-container">
                                {sizes.map(({ label, value }) => (
                                    <button
                                        type="button"
                                        key={label}
                                        className="size-btn font-medium"
                                        style={{
                                            backgroundColor: size === value ? "white" : "transparent",
                                            color: size === value ? "black" : "white",
                                        }}
                                        onClick={() => setSize(value)}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Model;
