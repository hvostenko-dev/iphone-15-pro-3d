import { useRef } from "react";
import { chipImg, frameImg, frameVideo } from "../utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { animateWithGsap } from "../utils/animations";

const HowItWorks = () => {
    const videoRef = useRef();

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
                    const playPromise = videoRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(() => {});
                    }
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
        <section id="how-it-works" className="common-padding overflow-hidden">
            <div className="screen-max-width">
                <div id="chip" className="flex-center w-full my-10 sm:my-20">
                    <img
                        src={chipImg}
                        alt="A17 Pro chip"
                        width={180}
                        height={180}
                        className="w-32 h-32 sm:w-44 sm:h-44 object-contain"
                    />
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="hiw-title">
                        A17 Pro chip.
                        <br /> A monster win for gaming.
                    </h2>

                    <p className="hiw-subtitle">
                        It&apos;s here. The biggest redesign in the history of Apple GPUs.
                    </p>
                </div>

                <div className="mt-6 sm:mt-10 md:mt-20 mb-10 sm:mb-14">
                    <div className="relative h-full flex-center">
                        <div className="overflow-hidden">
                            <img
                                src={frameImg}
                                alt="iPhone frame"
                                className="bg-transparent relative z-10 w-full h-auto"
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
                    <p className="text-gray font-semibold text-center mt-3 text-sm sm:text-base">
                        Honkai: Star Rail
                    </p>
                </div>

                <div className="hiw-text-container">
                    <div className="flex flex-1 justify-center flex-col gap-4 sm:gap-6">
                        <p className="hiw-text g_fadeIn">
                            A17 Pro is an entirely new class of iPhone chip that delivers our{" "}
                            <span className="text-white">
                                best graphic performance by far
                            </span>
                            .
                        </p>

                        <p className="hiw-text g_fadeIn">
                            Mobile{" "}
                            <span className="text-white">
                                games will look and feel so immersive
                            </span>
                            , with incredibly detailed environments and characters.
                        </p>
                    </div>

                    <div className="flex-1 flex justify-center flex-col g_fadeIn">
                        <p className="hiw-text">New</p>
                        <p className="hiw-bigtext">Pro-class GPU</p>
                        <p className="hiw-text">with 6 cores</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
