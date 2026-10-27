import { useGSAP } from "@gsap/react";
import { rightImg, watchImg } from "../utils";
import { animateWithGsap } from "../utils/animations";

import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
    useGSAP(() => {
        animateWithGsap("#title", { opacity: 1, y: 0 });
        animateWithGsap(".link", { opacity: 1, y: 0, duration: 1, stagger: 0.25 });
    }, []);

    return (
        <section id="highlights" className="w-screen overflow-hidden h-full common-padding bg-zinc">
            <div className="screen-max-width">
                <div className="mb-8 sm:mb-12 w-full md:flex items-end justify-between">
                    <h1 id="title" className="section-heading">
                        Get the highlights.
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                        <a href="#features" className="link">
                            Watch the film
                            <img src={watchImg} alt="watch" className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                        </a>
                        <a href="#how-it-works" className="link">
                            Watch the event
                            <img src={rightImg} alt="right" className="ml-2 w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </a>
                    </div>
                </div>

                <VideoCarousel />
            </div>
        </section>
    );
};

export default Highlights;
