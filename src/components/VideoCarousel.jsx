import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";

import { hightlightsSlides } from "../constants";
import { pauseImg, playImg, replayImg } from "../utils";

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
    const videoRef = useRef([]);
    const videoSpanRef = useRef([]);
    const videoDivRef = useRef([]);

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    });

    const [loadedData, setLoadedData] = useState([]);
    const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

    useGSAP(() => {
        gsap.to("#slider", {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 1.6,
            ease: "power2.inOut",
        });

        gsap.to("#video", {
            scrollTrigger: {
                trigger: "#video",
                toggleActions: "restart none none none",
            },
            onComplete: () => {
                setVideo((pre) => ({
                    ...pre,
                    startPlay: true,
                    isPlaying: true,
                }));
            },
        });
    }, [isEnd, videoId]);

    useEffect(() => {
        let currentProgress = 0;
        const span = videoSpanRef.current;

        if (!span[videoId]) return undefined;

        const anim = gsap.to(span[videoId], {
            onUpdate: () => {
                const progress = Math.ceil(anim.progress() * 100);

                if (progress !== currentProgress) {
                    currentProgress = progress;

                    gsap.to(videoDivRef.current[videoId], {
                        width:
                            window.innerWidth < 760
                                ? "10vw"
                                : window.innerWidth < 1200
                                  ? "10vw"
                                  : "4vw",
                    });

                    gsap.to(span[videoId], {
                        width: `${currentProgress}%`,
                        backgroundColor: "white",
                    });
                }
            },
            onComplete: () => {
                if (isPlaying) {
                    gsap.to(videoDivRef.current[videoId], {
                        width: "12px",
                    });
                    gsap.to(span[videoId], {
                        backgroundColor: "#afafaf",
                    });
                }
            },
        });

        if (videoId === 0) {
            anim.restart();
        }

        const animUpdate = () => {
            const currentVid = videoRef.current[videoId];
            if (currentVid && hightlightsSlides[videoId]) {
                anim.progress(
                    currentVid.currentTime / hightlightsSlides[videoId].videoDuration
                );
            }
        };

        if (isPlaying) {
            gsap.ticker.add(animUpdate);
        } else {
            gsap.ticker.remove(animUpdate);
        }

        return () => {
            gsap.ticker.remove(animUpdate);
        };
    }, [videoId, startPlay, isPlaying]);

    useEffect(() => {
        const currentVid = videoRef.current[videoId];
        if (!currentVid) return;

        videoRef.current.forEach((vid, idx) => {
            if (vid && idx !== videoId) {
                vid.pause();
            }
        });

        if (!isPlaying) {
            currentVid.pause();
        } else if (startPlay) {
            const playPromise = currentVid.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {});
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData]);

    const handleProcess = (type, i) => {
        switch (type) {
            case "video-end":
                setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
                break;

            case "video-last":
                setVideo((pre) => ({ ...pre, isLastVideo: true }));
                break;

            case "video-reset":
                if (videoRef.current[0]) {
                    videoRef.current[0].currentTime = 0;
                }
                setVideo((pre) => ({
                    ...pre,
                    videoId: 0,
                    isLastVideo: false,
                    isPlaying: true,
                    startPlay: true,
                }));
                break;

            case "video-select":
                if (videoDivRef.current[videoId]) {
                    gsap.to(videoDivRef.current[videoId], { width: "12px" });
                }
                if (videoSpanRef.current[videoId]) {
                    gsap.to(videoSpanRef.current[videoId], {
                        width: "100%",
                        backgroundColor: "#afafaf",
                    });
                }
                if (videoRef.current[i]) {
                    videoRef.current[i].currentTime = 0;
                }
                setVideo((pre) => ({
                    ...pre,
                    videoId: i,
                    isLastVideo: false,
                    isEnd: false,
                    startPlay: true,
                    isPlaying: true,
                }));
                break;

            case "pause":
            case "play":
                setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
                break;

            default:
                return video;
        }
    };

    const handleLoadedMetaData = (i, e) => setLoadedData((pre) => [...pre, e]);

    return (
        <>
            <div className="flex items-center">
                {hightlightsSlides.map((list, i) => (
                    <div key={list.id} id="slider" className="sm:pr-20 pr-6">
                        <div className="video-carousel_container">
                            <div className="w-full h-full flex-center rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-white/5">
                                <video
                                    id="video"
                                    playsInline={true}
                                    className={`${
                                        list.id === 2
                                            ? "sm:translate-x-44 translate-x-8"
                                            : ""
                                    } w-full h-full object-cover pointer-events-none`}
                                    preload="auto"
                                    muted
                                    ref={(el) => (videoRef.current[i] = el)}
                                    onEnded={() =>
                                        i !== 3
                                            ? handleProcess("video-end", i)
                                            : handleProcess("video-last")
                                    }
                                    onPlay={() =>
                                        setVideo((pre) => ({ ...pre, isPlaying: true }))
                                    }
                                    onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                                >
                                    <source src={list.video} type="video/mp4" />
                                </video>
                            </div>

                            <div className="absolute top-6 sm:top-12 left-[6%] right-[6%] z-10 pointer-events-none">
                                {list.textLists.map((text, idx) => (
                                    <p
                                        key={idx}
                                        className="md:text-2xl sm:text-xl text-base font-medium leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
                                    >
                                        {text}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative flex-center mt-8 sm:mt-10">
                <div className="flex-center py-4 sm:py-5 px-5 sm:px-7 bg-gray-300 backdrop-blur rounded-full">
                    {hightlightsSlides.map((slide, i) => (
                        <button
                            type="button"
                            key={slide.id}
                            aria-label={`Go to highlight slide ${i + 1}`}
                            onClick={() => handleProcess("video-select", i)}
                            className="mx-1.5 sm:mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer overflow-hidden transition-transform hover:scale-110"
                            ref={(el) => (videoDivRef.current[i] = el)}
                        >
                            <span
                                className="absolute left-0 top-0 h-full w-full rounded-full"
                                ref={(el) => (videoSpanRef.current[i] = el)}
                            />
                        </button>
                    ))}
                </div>

                <button
                    type="button"
                    className="control-btn"
                    aria-label={isLastVideo ? "Replay highlights" : !isPlaying ? "Play highlight" : "Pause highlight"}
                    onClick={
                        isLastVideo
                            ? () => handleProcess("video-reset")
                            : !isPlaying
                              ? () => handleProcess("play")
                              : () => handleProcess("pause")
                    }
                >
                    <img
                        src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
                        alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
                        className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                </button>
            </div>
        </>
    );
};

export default VideoCarousel;
