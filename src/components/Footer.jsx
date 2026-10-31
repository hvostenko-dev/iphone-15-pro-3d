import { footerLinks } from "../constants";

const Footer = () => {
    return (
        <footer className="py-10 sm:py-14 sm:px-10 px-5 border-t border-white/10 bg-black">
            <div className="screen-max-width">
                <div className="space-y-2">
                    <p className="font-normal text-gray text-xs leading-relaxed">
                        1. Trade-in values will vary based on the condition, year, and configuration of your eligible trade-in device. Not all devices are eligible for credit. You must be at least 18 years old to be eligible to trade in for credit or for an Apple Gift Card.
                    </p>
                    <p className="font-normal text-gray text-xs leading-relaxed">
                        2. A17 Pro performance claims are compared to previous-generation iPhone models. Battery life depends on network configuration and many other factors.
                    </p>
                    <p className="font-semibold text-gray text-xs leading-relaxed pt-2">
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
                        near you. Or call 000800-040-1966.
                    </p>
                </div>

                <div className="bg-white/10 my-6 h-[1px] w-full" />

                <div className="flex md:flex-row flex-col md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm"></span>
                        <p className="font-medium text-gray text-xs">
                            Copyright © 2024 Apple Inc. All rights reserved.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-y-1.5">
                        {footerLinks.map((link, i) => (
                            <p
                                key={link}
                                className="font-medium text-gray hover:text-white transition-colors text-xs cursor-pointer"
                            >
                                {link}
                                {i !== footerLinks.length - 1 && (
                                    <span className="mx-2.5 text-neutral-600">|</span>
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
