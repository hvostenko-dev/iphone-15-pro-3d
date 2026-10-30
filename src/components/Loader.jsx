import { Html, useProgress } from "@react-three/drei";

const Loader = () => {
    const { progress } = useProgress();

    return (
        <Html center>
            <div className="flex flex-col items-center justify-center gap-3.5 px-7 py-5 rounded-3xl bg-black/80 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-none select-none">
                {/* Glowing spinner ring */}
                <div className="relative w-12 h-12 flex-center">
                    <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue border-r-blue animate-spin" />
                    <span className="text-[11px] font-semibold text-white/90">
                        {Math.round(progress)}%
                    </span>
                </div>

                <div className="flex flex-col items-center gap-1.5">
                    <span className="text-xs font-medium tracking-wide uppercase text-white/80 whitespace-nowrap">
                        Loading 3D Experience
                    </span>
                    <div className="w-32 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue to-cyan-400 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${Math.max(5, progress)}%` }}
                        />
                    </div>
                </div>
            </div>
        </Html>
    );
};

export default Loader;
