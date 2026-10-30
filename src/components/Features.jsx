import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import { animateWithGsap } from "../utils/animations";
import { explore1Img, explore2Img, exploreVideo } from "../utils";
import gsap from "gsap";

const Features = () => {
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
        gsap.to("#exploreVideo", {
            scrollTrigger: {
                trigger: "#exploreVideo",
                toggleActions: "play pause reverse restart",
                start: "-10% bottom",
            },
            onComplete: () => {
                if (videoRef.current) {
                    videoRef.current.play().catch(() => {});
                }
            },
        });

        animateWithGsap("#features_title", { y: 0, opacity: 1 });
        animateWithGsap(
            ".g_grow",
            { scale: 1, opacity: 1, ease: "power1" },
            { scrub: 5.5 }
        );
        animateWithGsap(".g_text", {
            y: 0,
            opacity: 1,
            ease: "power2.inOut",
            duration: 1,
        });
    }, []);

    return (
        <section
            id="features"
            ref={sectionRef}
            className="h-full common-padding bg-zinc relative overflow-hidden"
        >
            <div className="screen-max-width">
                <div className="mb-8 sm:mb-14 w-full">
                    <span className="text-xs font-semibold tracking-widest uppercase text-blue block mb-2">
                        Materials & Design
                    </span>
                    <h1 id="features_title" className="section-heading">
                        Explore the full story.
                    </h1>
                </div>

                <div className="flex flex-col justify-center items-center overflow-hidden">
                    <div className="mt-8 sm:mt-16 md:mt-24 mb-10 sm:mb-16 pl-2 sm:pl-10 md:pl-20 w-full">
                        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-white">
                            iPhone.
                        </h2>
                        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-tight bg-gradient-to-r from-amber-200 via-white to-gray-400 bg-clip-text text-transparent">
                            Forged in titanium.
                        </h2>
                    </div>

                    <div className="flex-center flex-col sm:px-6 w-full">
                        <div className="relative h-[38vh] sm:h-[52vh] w-full flex items-center rounded-2xl sm:rounded-3xl overflow-hidden mb-6 sm:mb-8 border border-white/10 shadow-2xl">
                            <video
                                playsInline
                                id="exploreVideo"
                                className="w-full h-full object-cover object-center"
                                preload="none"
                                muted
                                autoPlay
                                ref={videoRef}
                            >
                                <source src={exploreVideo} type="video/mp4" />
                            </video>
                        </div>

                        <div className="flex flex-col w-full relative">
                            <div className="feature-video-container">
                                <div className="overflow-hidden w-full md:flex-1 h-[35vh] sm:h-[50vh] rounded-2xl sm:rounded-3xl border border-white/10">
                                    <img
                                        src={explore1Img}
                                        alt="titanium close-up"
                                        className="feature-video g_grow"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="overflow-hidden w-full md:flex-1 h-[35vh] sm:h-[50vh] rounded-2xl sm:rounded-3xl border border-white/10">
                                    <img
                                        src={explore2Img}
                                        alt="titanium alloy interior"
                                        className="feature-video g_grow"
                                        loading="lazy"
                                    />
                                </div>
                            </div>

                            <div className="feature-text-container">
                                <div className="flex-1 flex-center">
                                    <p className="feature-text g_text">
                                        iPhone 15 Pro is{" "}
                                        <span className="text-white">
                                            the first iPhone to feature an aerospace-grade titanium
                                            design
                                        </span>
                                        , using the same alloy that spacecraft use for missions to
                                        Mars.
                                    </p>
                                </div>

                                <div className="flex-1 flex-center">
                                    <p className="feature-text g_text">
                                        Titanium has one of the best strength-to-weight ratios of
                                        any metal, making these our{" "}
                                        <span className="text-white">
                                            lightest Pro models ever.
                                        </span>{" "}
                                        You&apos;ll notice the difference the moment you pick one up.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
