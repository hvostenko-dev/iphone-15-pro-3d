import { footerLinks } from "../constants";

const Footer = () => {
    return (
        <footer className="py-8 sm:py-10 sm:px-10 px-5 border-t border-white/10">
            <div className="screen-max-width">
                <div className="space-y-1">
                    <p className="font-semibold text-gray text-xs leading-relaxed">
                        More ways to shop:{" "}
                        <a
                            href="#highlights"
                            className="underline text-blue hover:text-blue/80 transition-colors"
                        >
                            Find an Apple Store
                        </a>{" "}
                        or{" "}
                        <a
                            href="#model"
                            className="underline text-blue hover:text-blue/80 transition-colors"
                        >
                            other retailer
                        </a>{" "}
                        near you.
                    </p>
                    <p className="font-semibold text-gray text-xs">
                        Or call 000800-040-1966
                    </p>
                </div>

                <div className="bg-neutral-700 my-5 h-[1px] w-full" />

                <div className="flex md:flex-row flex-col md:items-center justify-between gap-3">
                    <p className="font-semibold text-gray text-xs">
                        Copyright © 2024 Apple Inc. All rights reserved.
                    </p>
                    <div className="flex flex-wrap items-center gap-y-1.5">
                        {footerLinks.map((link, i) => (
                            <p
                                key={link}
                                className="font-semibold text-gray hover:text-white transition-colors text-xs cursor-pointer"
                            >
                                {link}
                                {i !== footerLinks.length - 1 && (
                                    <span className="mx-2 text-neutral-600">|</span>
                                )}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
