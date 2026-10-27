import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { animateWithGsap } from "../utils/animations";
import { explore1Img, explore2Img, exploreVideo } from "../utils";
import gsap from "gsap";

const Features = () => {
    const videoRef = useRef();

    useGSAP(() => {
        gsap.to("#exploreVideo", {
            scrollTrigger: {
                trigger: "#exploreVideo",
                toggleActions: "play pause reverse restart",
                start: "-10% bottom",
            },
            onComplete: () => {
                if (videoRef.current) {
                    const playPromise = videoRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(() => {});
                    }
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
            className="h-full common-padding bg-zinc relative overflow-hidden"
        >
            <div className="screen-max-width">
                <div className="mb-8 sm:mb-12 w-full">
                    <h1 id="features_title" className="section-heading">
                        Explore the full story.
                    </h1>
                </div>

                <div className="flex flex-col justify-center items-center overflow-hidden">
                    <div className="mt-10 sm:mt-24 md:mt-32 mb-10 sm:mb-20 md:mb-24 pl-2 sm:pl-12 md:pl-24 w-full">
                        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-tight">
                            iPhone.
                        </h2>
                        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-semibold tracking-tight">
                            Forged in titanium.
                        </h2>
                    </div>

                    <div className="flex-center flex-col sm:px-10 w-full">
                        <div className="relative h-[35vh] sm:h-[50vh] w-full flex items-center rounded-2xl sm:rounded-3xl overflow-hidden mb-4 sm:mb-5">
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
                                <div className="overflow-hidden w-full md:flex-1 h-[35vh] sm:h-[50vh] rounded-2xl sm:rounded-3xl">
                                    <img
                                        src={explore1Img}
                                        alt="titanium"
                                        className="feature-video g_grow"
                                    />
                                </div>
                                <div className="overflow-hidden w-full md:flex-1 h-[35vh] sm:h-[50vh] rounded-2xl sm:rounded-3xl">
                                    <img
                                        src={explore2Img}
                                        alt="titanium 2"
                                        className="feature-video g_grow"
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
                                        , using the same alloy that spacecrafts use for missions to
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
