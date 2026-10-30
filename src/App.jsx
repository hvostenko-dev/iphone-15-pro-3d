import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Model from "./components/Model";
import CameraStudio from "./components/CameraStudio";
import ActionButtonSection from "./components/ActionButton";
import Features from "./components/Features";
import TechSpecs from "./components/TechSpecs";
import Comparison from "./components/Comparison";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import * as Sentry from "@sentry/react";

const App = () => {
    return (
        <main className="bg-black text-white overflow-x-hidden selection:bg-blue selection:text-white">
            <Navbar />
            <Hero />
            <Highlights />
            <Model />
            <CameraStudio />
            <ActionButtonSection />
            <Features />
            <TechSpecs />
            <Comparison />
            <HowItWorks />
            <Footer />
            <ScrollToTop />
        </main>
    );
};

const ProfiledApp = Sentry.withProfiler(App);

export default ProfiledApp;
