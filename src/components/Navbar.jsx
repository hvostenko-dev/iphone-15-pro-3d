import { useState } from 'react';
import { appleImg, bagImg, searchImg } from '../utils';
import { navLists } from '../constants';

const sectionTargets = {
    Store: '#highlights',
    Mac: '#model',
    iPhone: '#features',
    Support: '#how-it-works',
};

const mobileSectionLinks = [
    { label: 'Highlights', href: '#highlights' },
    { label: '3D Studio', href: '#model' },
    { label: 'Titanium', href: '#features' },
    { label: 'A17 Pro Chip', href: '#how-it-works' },
];

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="w-full py-4 sm:py-5 sm:px-10 px-5 flex justify-between items-center sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <nav className="flex w-full screen-max-width items-center justify-between">
                <a
                    href="#"
                    aria-label="Apple Home"
                    className="flex items-center opacity-90 hover:opacity-100 transition-opacity"
                >
                    <img src={appleImg} alt="Apple" width={14} height={18} />
                </a>

                <div className="flex flex-1 justify-center max-sm:hidden">
                    {navLists.map((nav) => (
                        <a
                            key={nav}
                            href={sectionTargets[nav] || '#highlights'}
                            className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
                        >
                            {nav}
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-5 sm:gap-7 max-sm:justify-end">
                    <a
                        href="#highlights"
                        aria-label="Search"
                        className="opacity-80 hover:opacity-100 transition-opacity"
                    >
                        <img src={searchImg} alt="search" width={18} height={18} />
                    </a>
                    <a
                        href="#model"
                        aria-label="Shopping Bag"
                        className="opacity-80 hover:opacity-100 transition-opacity"
                    >
                        <img src={bagImg} alt="bag" width={18} height={18} />
                    </a>

                    <button
                        type="button"
                        aria-label="Toggle Menu"
                        aria-expanded={mobileMenuOpen}
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        className="sm:hidden flex flex-col justify-center items-center w-8 h-8 rounded-full hover:bg-white/10 transition-colors"
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

            {mobileMenuOpen && (
                <div className="sm:hidden absolute top-full left-0 w-full bg-zinc/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-4 shadow-2xl">
                    <div className="flex flex-col gap-3">
                        <p className="text-xs uppercase tracking-widest text-gray">Explore iPhone 15 Pro</p>
                        {mobileSectionLinks.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-lg font-medium text-white/90 hover:text-blue transition-colors py-1"
                            >
                                {item.label}
                            </a>
                        ))}
                    </div>

                    <div className="h-[1px] w-full bg-white/10 my-1" />

                    <div className="flex flex-wrap gap-4">
                        {navLists.map((nav) => (
                            <a
                                key={nav}
                                href={sectionTargets[nav] || '#highlights'}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-sm text-gray hover:text-white transition-colors"
                            >
                                {nav}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
