import { Html } from "@react-three/drei";

const Loader = () => {
    return (
        <Html center>
            <div className="flex flex-col justify-center items-center gap-3 px-6 py-4 rounded-2xl bg-zinc/90 backdrop-blur-md border border-white/10">
                <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                <span className="text-xs tracking-wider uppercase text-gray-200 whitespace-nowrap">
                    Loading 3D Model...
                </span>
            </div>
        </Html>
    );
};

export default Loader;
