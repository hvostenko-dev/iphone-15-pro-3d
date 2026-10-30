import { useEffect, useState } from "react";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility, { passive: true });
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!isVisible) return null;

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-zinc/80 hover:bg-zinc backdrop-blur-xl border border-white/20 text-white flex-center shadow-[0_10px_25px_rgba(0,0,0,0.8)] transition-all duration-300 hover:scale-110 active:scale-95 group"
        >
            <span className="text-base group-hover:-translate-y-0.5 transition-transform">
                ↑
            </span>
        </button>
    );
};

export default ScrollToTop;
