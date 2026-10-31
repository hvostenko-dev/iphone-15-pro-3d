import { useGSAP } from "@gsap/react";
import { rightImg, watchImg } from "../utils";
import { animateWithGsap } from "../utils/animations";
import { sounds } from "../utils/audio";
import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
    useGSAP(() => {
        animateWithGsap("#title", { opacity: 1, y: 0 });
        animateWithGsap(".highlight-link", { opacity: 1, y: 0, duration: 1, stagger: 0.2 });
    }, []);

    return (
        <section id="highlights" className="w-full overflow-hidden common-padding bg-black relative">
            <div className="screen-max-width mx-auto">
                {/* Header with Title and Film Links */}
                <div className="mb-8 sm:mb-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <span className="text-xs font-semibold tracking-widest uppercase text-blue block mb-2">
                            Overview
                        </span>
                        <h1 id="title" className="section-heading">
                            Get the highlights.
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                        <a
                            href="#features"
                            onClick={() => sounds.playClick()}
                            className="highlight-link link flex items-center text-sm sm:text-base text-blue hover:underline"
                        >
                            <span>Watch the film</span>
                            <img src={watchImg} alt="watch" className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                        </a>
                        <a
                            href="#how-it-works"
                            onClick={() => sounds.playClick()}
                            className="highlight-link link flex items-center text-sm sm:text-base text-blue hover:underline"
                        >
                            <span>Watch the event</span>
                            <img src={rightImg} alt="right" className="ml-2 w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </a>
                    </div>
                </div>

                {/* Fully Centered & Responsive Video Carousel */}
                <div className="w-full flex-center flex-col">
                    <VideoCarousel />
                </div>
            </div>
        </section>
    );
};

export default Highlights;
