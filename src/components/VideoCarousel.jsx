import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";
import { sounds } from "../utils/audio";

const VideoCarousel = () => {
    const videoRef = useRef([]);
    const [videoId, setVideoId] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isLastVideo, setIsLastVideo] = useState(false);
    const [progress, setProgress] = useState(0);

    // Handle video playback synchronization
    useEffect(() => {
        videoRef.current.forEach((vid, idx) => {
            if (vid) {
                if (idx === videoId) {
                    if (isPlaying) {
                        vid.play().catch(() => {});
                    } else {
                        vid.pause();
                    }
                } else {
                    vid.pause();
                    vid.currentTime = 0;
                }
            }
        });
    }, [videoId, isPlaying]);

    // Track time progress of currently active video
    useEffect(() => {
        const currentVid = videoRef.current[videoId];
        if (!currentVid) return;

        const updateTime = () => {
            if (currentVid.duration) {
                const pct = (currentVid.currentTime / currentVid.duration) * 100;
                setProgress(pct);
            }
        };

        const handleEnded = () => {
            if (videoId < hightlightsSlides.length - 1) {
                setVideoId((prev) => prev + 1);
                setProgress(0);
            } else {
                setIsLastVideo(true);
                setIsPlaying(false);
            }
        };

        currentVid.addEventListener("timeupdate", updateTime);
        currentVid.addEventListener("ended", handleEnded);

        return () => {
            currentVid.removeEventListener("timeupdate", updateTime);
            currentVid.removeEventListener("ended", handleEnded);
        };
    }, [videoId]);

    const handleSelectSlide = (index) => {
        sounds.playClick();
        setIsLastVideo(false);
        setVideoId(index);
        setProgress(0);
        setIsPlaying(true);
    };

    const handleTogglePlay = () => {
        sounds.playClick();
        if (isLastVideo) {
            handleSelectSlide(0);
        } else {
            setIsPlaying((prev) => !prev);
        }
    };

    const handlePrev = () => {
        sounds.playClick();
        if (videoId > 0) {
            handleSelectSlide(videoId - 1);
        } else {
            handleSelectSlide(hightlightsSlides.length - 1);
        }
    };

    const handleNext = () => {
        sounds.playClick();
        if (videoId < hightlightsSlides.length - 1) {
            handleSelectSlide(videoId + 1);
        } else {
            handleSelectSlide(0);
        }
    };

    return (
        <div className="w-full max-w-5xl flex flex-col items-center">
            {/* Main Carousel Screen Container */}
            <div className="w-full relative aspect-[16/10] sm:aspect-[16/9] md:h-[62vh] max-h-[560px] rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
                
                {/* Slides Track */}
                <div
                    className="w-full h-full flex transition-transform duration-700 ease-out"
                    style={{
                        transform: `translateX(-${videoId * 100}%)`,
                    }}
                >
                    {hightlightsSlides.map((slide, i) => (
                        <div
                            key={slide.id}
                            className="w-full h-full flex-shrink-0 relative flex-center bg-black"
                        >
                            <video
                                ref={(el) => (videoRef.current[i] = el)}
                                className="w-full h-full object-cover pointer-events-none"
                                playsInline
                                muted
                                preload="metadata"
                            >
                                <source src={slide.video} type="video/mp4" />
                            </video>

                            {/* Caption Text Overlay with Drop Shadow */}
                            <div className="absolute top-6 sm:top-10 left-6 sm:left-12 right-6 sm:right-12 z-10 pointer-events-none">
                                {slide.textLists.map((text, idx) => (
                                    <p
                                        key={idx}
                                        className="text-lg sm:text-2xl md:text-3xl font-semibold text-white leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
                                    >
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Left/Right Arrow Navigation Overlays for Desktop & Tablet */}
                <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous Highlight"
                    className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white/80 hover:text-white border border-white/15 backdrop-blur-md items-center justify-center transition-all hover:scale-105 active:scale-95"
                >
                    ‹
                </button>
                <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next Highlight"
                    className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 text-white/80 hover:text-white border border-white/15 backdrop-blur-md items-center justify-center transition-all hover:scale-105 active:scale-95"
                >
                    ›
                </button>
            </div>

            {/* Carousel Control Bar & Progress Indicator */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                {/* Progress Indicators */}
                <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-neutral-900/90 border border-white/10 backdrop-blur-xl shadow-lg">
                    {hightlightsSlides.map((slide, i) => {
                        const isCurrent = videoId === i;
                        return (
                            <button
                                key={slide.id}
                                type="button"
                                aria-label={`Go to slide ${i + 1}`}
                                onClick={() => handleSelectSlide(i)}
                                className={`h-2.5 rounded-full relative overflow-hidden transition-all duration-300 ${
                                    isCurrent ? "w-10 sm:w-14 bg-white/20" : "w-2.5 bg-white/20 hover:bg-white/40"
                                }`}
                            >
                                {isCurrent && (
                                    <span
                                        className="absolute left-0 top-0 bottom-0 bg-white rounded-full transition-all duration-100 ease-linear"
                                        style={{ width: `${progress}%` }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Play / Pause / Replay Button */}
                <button
                    type="button"
                    aria-label={isLastVideo ? "Replay video" : isPlaying ? "Pause video" : "Play video"}
                    onClick={handleTogglePlay}
                    className="w-11 h-11 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-white/10 backdrop-blur-xl flex-center transition-all hover:scale-105 active:scale-95 shadow-lg"
                >
                    <img
                        src={isLastVideo ? replayImg : isPlaying ? pauseImg : playImg}
                        alt="controls"
                        className="w-4 h-4"
                    />
                </button>
            </div>
        </div>
    );
};

export default VideoCarousel;
