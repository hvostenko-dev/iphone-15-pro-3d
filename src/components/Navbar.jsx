import { useState, useEffect } from 'react';
import { appleImg, bagImg, searchImg } from '../utils';
import { sounds } from '../utils/audio';

const navItems = [
    { label: 'Highlights', href: '#highlights' },
    { label: '3D Studio', href: '#model' },
    { label: 'Cameras', href: '#camera-studio' },
    { label: 'Action Button', href: '#action-button' },
    { label: 'Titanium', href: '#features' },
    { label: 'Specs', href: '#specs' },
    { label: 'Compare', href: '#compare' },
    { label: 'A17 Pro', href: '#how-it-works' },
];

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMuted, setIsMuted] = useState(sounds.isMuted);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                const currentProgress = (window.scrollY / totalScroll) * 100;
                setScrollProgress(currentProgress);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleToggleMute = () => {
        const muted = sounds.toggleMute();
        setIsMuted(muted);
    };

    return (
        <header className="w-full py-3.5 sm:py-4 sm:px-10 px-5 flex justify-between items-center sticky top-0 z-50 bg-black/75 backdrop-blur-xl border-b border-white/10 transition-all">
            {/* Ambient Top Scroll Progress Bar */}
            <div
                className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-blue via-cyan-400 to-indigo-500 transition-all duration-150"
                style={{ width: `${scrollProgress}%` }}
            />

            <nav className="flex w-full screen-max-width items-center justify-between">
                <a
                    href="#"
                    aria-label="Apple Home"
                    className="flex items-center opacity-90 hover:opacity-100 transition-transform hover:scale-105"
                >
                    <img src={appleImg} alt="Apple" width={15} height={19} />
                </a>

                {/* Desktop Nav Items */}
                <div className="flex flex-1 justify-center max-lg:hidden gap-6 xl:gap-8">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className="text-xs font-medium tracking-wide text-gray hover:text-white transition-colors duration-200"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>

                {/* Right utility buttons */}
                <div className="flex items-center gap-4 sm:gap-6 max-lg:justify-end">
                    {/* Apple Haptic Sound Toggle */}
                    <button
                        type="button"
                        onClick={handleToggleMute}
                        title={isMuted ? "Enable sound effects" : "Mute sound effects"}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border flex items-center gap-1.5 transition-all ${
                            !isMuted
                                ? "bg-blue/15 border-blue/40 text-blue shadow-[0_0_12px_rgba(41,151,255,0.25)]"
                                : "bg-white/5 border-white/10 text-gray hover:text-white"
                        }`}
                    >
                        <span>{!isMuted ? "🔊" : "🔇"}</span>
                        <span className="hidden sm:inline">{!isMuted ? "Sound On" : "Muted"}</span>
                    </button>

                    <a
                        href="#highlights"
                        aria-label="Search"
                        className="opacity-75 hover:opacity-100 transition-opacity hover:scale-105"
                    >
                        <img src={searchImg} alt="search" width={16} height={16} />
                    </a>
                    <a
                        href="#model"
                        aria-label="Shopping Bag"
                        className="opacity-75 hover:opacity-100 transition-opacity hover:scale-105"
                    >
                        <img src={bagImg} alt="bag" width={16} height={16} />
                    </a>

                    {/* Mobile Hamburger */}
                    <button
                        type="button"
                        aria-label="Toggle Menu"
                        aria-expanded={mobileMenuOpen}
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        className="lg:hidden flex flex-col justify-center items-center w-8 h-8 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <span
                            className={`block w-4 h-0.5 bg-white rounded-full transition-all duration-300 ${
                                mobileMenuOpen ? 'rotate-45 translate-y-[3px]' : '-translate-y-1'
                            }`}
                        />
                        <span
                            className={`block w-4 h-0.5 bg-white rounded-full transition-all duration-300 ${
                                mobileMenuOpen ? '-rotate-45 -translate-y-[1px]' : 'translate-y-1'
                            }`}
                        />
                    </button>
                </div>
            </nav>

            {/* Mobile Dropdown Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-zinc/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 flex flex-col gap-4 shadow-2xl animate-fadeIn max-h-[85vh] overflow-y-auto">
                    <p className="text-[11px] uppercase tracking-widest text-gray font-semibold">
                        Explore iPhone 15 Pro
                    </p>
                    <div className="flex flex-col gap-2.5">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-base font-medium text-white/90 hover:text-blue transition-colors py-1 flex items-center justify-between"
                            >
                                <span>{item.label}</span>
                                <span className="text-gray text-xs">→</span>
                            </a>
                        ))}
                    </div>

                    <div className="h-[1px] w-full bg-white/10 my-1" />

                    <a
                        href="#model"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full py-3.5 rounded-full bg-white text-black hover:bg-neutral-200 text-center text-sm font-semibold shadow-lg transition-all"
                    >
                        Buy iPhone 15 Pro
                    </a>
                </div>
            )}
        </header>
    );
};

export default Navbar;
