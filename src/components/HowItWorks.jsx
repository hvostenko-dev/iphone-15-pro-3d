import { useEffect, useRef } from "react";
import { chipImg, frameImg, frameVideo } from "../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { animateWithGsap } from "../utils/animations";

const HowItWorks = () => {
    const videoRef = useRef();
    const sectionRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (videoRef.current) {
                    if (entry.isIntersecting) {
                        videoRef.current.play().catch(() => {});
                    } else {
                        videoRef.current.pause();
                    }
                }
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useGSAP(() => {
        gsap.from("#chip", {
            scrollTrigger: {
                trigger: "#chip",
                start: "20% bottom",
            },
            opacity: 0,
            scale: 2,
            duration: 2,
            ease: "power2.inOut",
        });

        gsap.to("#frameVideo", {
            scrollTrigger: {
                trigger: "#frameVideo",
                toggleActions: "play pause reverse restart",
                start: "-10% bottom",
            },
            onComplete: () => {
                if (videoRef.current) {
                    videoRef.current.play().catch(() => {});
                }
            },
        });

        animateWithGsap(".g_fadeIn", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.inOut",
        });
    }, []);

    return (
        <section id="how-it-works" ref={sectionRef} className="common-padding overflow-hidden bg-black relative">
            {/* Subtle blue glow behind A17 Pro chip */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-blue/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="screen-max-width relative z-10">
                <div id="chip" className="flex-center w-full my-8 sm:my-16">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue/30 via-indigo-500/20 to-purple-500/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse" />
                        <img
                            src={chipImg}
                            alt="A17 Pro chip"
                            width={180}
                            height={180}
                            className="relative w-32 h-32 sm:w-44 sm:h-44 object-contain drop-shadow-[0_20px_40px_rgba(41,151,255,0.3)]"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <span className="text-xs font-semibold tracking-widest uppercase text-blue block mb-2">
                        Next-Generation Apple Silicon
                    </span>
                    <h2 className="hiw-title text-white">
                        A17 Pro chip.
                        <br />
                        <span className="bg-gradient-to-r from-blue via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                            A monster win for gaming.
                        </span>
                    </h2>

                    <p className="hiw-subtitle">
                        It&apos;s here. The biggest redesign in the history of Apple GPUs.
                    </p>
                </div>

                <div className="mt-6 sm:mt-10 md:mt-16 mb-10 sm:mb-16">
                    <div className="relative h-full flex-center max-w-4xl mx-auto">
                        <div className="overflow-hidden">
                            <img
                                src={frameImg}
                                alt="iPhone frame"
                                className="bg-transparent relative z-10 w-full h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
                            />
                        </div>
                        <div className="hiw-video">
                            <video
                                id="frameVideo"
                                className="pointer-events-none w-full h-full object-cover"
                                playsInline
                                preload="none"
                                muted
                                loop
                                autoPlay
                                ref={videoRef}
                            >
                                <source src={frameVideo} type="video/mp4" />
                            </video>
                        </div>
                    </div>
                    <p className="text-gray font-semibold text-center mt-4 text-xs sm:text-sm tracking-wide">
                        Honkai: Star Rail · Hardware-accelerated Ray Tracing
                    </p>
                </div>

                <div className="hiw-text-container bg-zinc/40 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md">
                    <div className="flex flex-1 justify-center flex-col gap-4 sm:gap-6">
                        <p className="hiw-text g_fadeIn">
                            A17 Pro is an entirely new class of iPhone chip that delivers our{" "}
                            <span className="text-white font-semibold">
                                best graphics performance by far
                            </span>
                            .
                        </p>

                        <p className="hiw-text g_fadeIn">
                            Mobile{" "}
                            <span className="text-white font-semibold">
                                games will look and feel so immersive
                            </span>
                            , with incredibly detailed environments and more realistic characters than ever before.
                        </p>
                    </div>

                    <div className="flex-1 flex justify-center flex-col g_fadeIn border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-12">
                        <p className="text-xs uppercase tracking-wider text-blue font-semibold">All-New</p>
                        <p className="hiw-bigtext bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Pro-class GPU
                        </p>
                        <p className="hiw-text text-white/80">with 6 powerful cores & 4x faster ray tracing</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
