import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../utils';
import { useEffect, useRef, useState } from 'react';
import { sounds } from '../utils/audio';

const Hero = () => {
    const [videoSrc, setVideoSrc] = useState(
        typeof window !== 'undefined' && window.innerWidth < 760 ? smallHeroVideo : heroVideo
    );
    const videoRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleVideoSrcSet = () => {
            if (window.innerWidth < 760) {
                setVideoSrc(smallHeroVideo);
            } else {
                setVideoSrc(heroVideo);
            }
        };

        window.addEventListener('resize', handleVideoSrcSet);
        return () => window.removeEventListener('resize', handleVideoSrcSet);
    }, []);

    // Optimize video rendering: pause when outside the viewport
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
    }, [videoSrc]);

    useGSAP(() => {
        gsap.to('#hero-badge', { opacity: 1, y: 0, delay: 0.6, duration: 1, ease: 'power2.out' });
        gsap.to('#hero', { opacity: 1, y: 0, delay: 1.0, duration: 1, ease: 'power2.out' });
        gsap.to('#cta', { opacity: 1, y: 0, delay: 1.6, duration: 1, ease: 'power2.out' });
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full min-h-[92svh] sm:min-h-[95svh] bg-black relative flex flex-col justify-between items-center pt-8 sm:pt-12 pb-8 sm:pb-12 overflow-hidden select-none"
        >
            {/* Top Typography & Badge */}
            <div className="w-full flex-center flex-col px-4 z-10 text-center">
                <div
                    id="hero-badge"
                    className="opacity-0 translate-y-6 mb-3 sm:mb-4 px-4 sm:px-5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                >
                    <span className="text-xs sm:text-sm font-medium tracking-widest uppercase text-gray-200">
                        Titanium · So strong. So light. So Pro.
                    </span>
                </div>

                <h1
                    id="hero"
                    className="opacity-0 translate-y-8 bg-gradient-to-b from-white via-white/95 to-gray-400 bg-clip-text text-transparent text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tight"
                >
                    iPhone 15 Pro
                </h1>
            </div>

            {/* Massive iPhone Video Showcase (Centered & Grand Scale) */}
            <div className="w-full max-w-6xl flex-center flex-1 my-3 sm:my-6 px-2 sm:px-6">
                <div className="w-full flex-center">
                    <video
                        ref={videoRef}
                        className="pointer-events-none w-full max-h-[62vh] sm:max-h-[70vh] md:max-h-[75vh] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
                        autoPlay
                        muted
                        playsInline={true}
                        key={videoSrc}
                    >
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                </div>
            </div>

            {/* Premium Apple-Style Action Buttons & Pricing */}
            <div
                id="cta"
                className="w-full flex flex-col items-center opacity-0 translate-y-8 px-4 z-10 gap-4"
            >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full max-w-md">
                    <a
                        href="#model"
                        onClick={() => sounds.playClick()}
                        className="w-full sm:w-auto text-center px-10 py-3.5 sm:py-4 rounded-full bg-white text-black font-semibold text-base sm:text-lg hover:bg-neutral-200 transition-all duration-300 shadow-[0_4px_30px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 cursor-pointer"
                    >
                        Buy Now
                    </a>
                    <a
                        href="#model"
                        onClick={() => sounds.playClick()}
                        className="w-full sm:w-auto text-center px-8 py-3.5 sm:py-4 rounded-full bg-neutral-900/90 text-white font-semibold text-base sm:text-lg border border-white/20 hover:border-white/40 hover:bg-neutral-800 transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-xl cursor-pointer flex items-center justify-center gap-2"
                    >
                        <span>Explore 3D</span>
                        <span className="text-gray-400 text-sm">↗</span>
                    </a>
                </div>

                <div className="text-center space-y-1">
                    <p className="font-medium text-sm sm:text-base text-gray-300 tracking-wide">
                        From $999 or $41.62/mo. for 24 mo.
                    </p>
                    <p className="text-xs text-gray-400">
                        Get $180–$650 in credit when you trade in iPhone 11 or higher.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
