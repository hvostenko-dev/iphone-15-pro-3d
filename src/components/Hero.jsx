import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '../utils';
import { useEffect, useRef, useState } from 'react';

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
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [videoSrc]);

    useGSAP(() => {
        gsap.to('#hero-badge', { opacity: 1, y: 0, delay: 0.8, duration: 1, ease: 'power2.out' });
        gsap.to('#hero', { opacity: 1, y: 0, delay: 1.2, duration: 1, ease: 'power2.out' });
        gsap.to('#cta', { opacity: 1, y: 0, delay: 1.8, duration: 1, ease: 'power2.out' });
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full nav-height bg-black relative flex flex-col justify-between py-6 sm:py-10 overflow-hidden"
        >
            {/* Ambient Radial Spotlight */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="flex-1 w-full flex-center flex-col px-4 z-10">
                <div
                    id="hero-badge"
                    className="opacity-0 translate-y-6 mb-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                >
                    <span className="text-xs font-medium tracking-widest uppercase bg-gradient-to-r from-amber-200 via-white to-gray-300 bg-clip-text text-transparent">
                        Titanium · So strong · So light · So Pro
                    </span>
                </div>

                <h1
                    id="hero"
                    className="hero-title opacity-0 translate-y-8 bg-gradient-to-b from-white via-white/90 to-gray-400 bg-clip-text text-transparent text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight"
                >
                    iPhone 15 Pro
                </h1>

                <div className="md:w-10/12 w-11/12 sm:w-9/12 max-w-4xl flex-center mt-2 sm:mt-4">
                    <video
                        ref={videoRef}
                        className="pointer-events-none w-full max-h-[52svh] sm:max-h-[62svh] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
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
                className="flex flex-col items-center opacity-0 translate-y-10 pb-4 sm:pb-6 px-4 z-10 gap-3"
            >
                <div className="flex items-center gap-3">
                    <a
                        href="#model"
                        className="px-8 py-3 rounded-full bg-blue hover:bg-blue/90 text-white font-medium text-sm transition-all shadow-[0_4px_25px_rgba(41,151,255,0.4)] hover:scale-105 active:scale-95"
                    >
                        Buy Now
                    </a>
                    <a
                        href="#model"
                        className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/15 backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                        <span>View 3D Model</span>
                        <span className="text-xs">↗</span>
                    </a>
                </div>

                <p className="font-normal text-xs sm:text-sm text-gray-100 text-center tracking-wide">
                    From $199/month or $999 · Trade-in eligible
                </p>
            </div>
        </section>
    );
};

export default Hero;
