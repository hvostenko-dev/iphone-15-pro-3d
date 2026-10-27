import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../utils';
import { useEffect, useState } from 'react';

const Hero = () => {
    const [videoSrc, setVideoSrc] = useState(
        typeof window !== 'undefined' && window.innerWidth < 760 ? smallHeroVideo : heroVideo
    );

    useEffect(() => {
        const handleVideoSrcSet = () => {
            if (window.innerWidth < 760) {
                setVideoSrc(smallHeroVideo);
            } else {
                setVideoSrc(heroVideo);
            }
        };

        window.addEventListener('resize', handleVideoSrcSet);

        return () => {
            window.removeEventListener('resize', handleVideoSrcSet);
        };
    }, []);

    useGSAP(() => {
        gsap.to('#hero', { opacity: 1, delay: 1.5, duration: 1 });
        gsap.to('#cta', { opacity: 1, y: 0, delay: 1.8, duration: 1 });
    }, []);

    return (
        <section className="w-full nav-height bg-black relative flex flex-col justify-between py-8 sm:py-12 overflow-hidden">
            <div className="flex-1 w-full flex-center flex-col px-4">
                <p id="hero" className="hero-title">
                    iPhone 15 Pro
                </p>
                <div className="md:w-10/12 w-11/12 sm:w-9/12 max-w-4xl flex-center">
                    <video
                        className="pointer-events-none w-full max-h-[55svh] sm:max-h-[65svh] object-contain"
                        autoPlay
                        muted
                        playsInline={true}
                        key={videoSrc}
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                </div>
            </div>

            <div
                id="cta"
                className="flex flex-col items-center opacity-0 translate-y-10 pb-4 sm:pb-6 px-4 z-10"
            >
                <a href="#highlights" className="btn">
                    Buy
                </a>
                <p className="font-normal text-base sm:text-xl text-gray-100 text-center">
                    From $199/month or $999
                </p>
            </div>
        </section>
    );
};

export default Hero;
