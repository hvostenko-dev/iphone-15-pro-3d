import { Environment, Lightformer } from "@react-three/drei";

const moodPresets = {
    studio: {
        envColor: "#495057",
        dirColor: "#ffffff",
        spotColor: "#f8f9fa",
        accentColor: "#8F8A81",
    },
    neon: {
        envColor: "#1d4ed8",
        dirColor: "#38bdf8",
        spotColor: "#818cf8",
        accentColor: "#a855f7",
    },
    sunset: {
        envColor: "#7c2d12",
        dirColor: "#fbbf24",
        spotColor: "#f97316",
        accentColor: "#ea580c",
    },
};

const Lights = ({ mood = "studio" }) => {
    const config = moodPresets[mood] || moodPresets.studio;

    return (
        <group name="lights">
            <Environment resolution={256} frames={1}>
                <group>
                    <Lightformer
                        form="rect"
                        intensity={8}
                        position={[-1, 0, -10]}
                        scale={10}
                        color={config.envColor}
                    />
                    <Lightformer
                        form="rect"
                        intensity={8}
                        position={[-10, 2, 1]}
                        scale={10}
                        rotation-y={Math.PI / 2}
                    />
                    <Lightformer
                        form="rect"
                        intensity={8}
                        position={[10, 0, 1]}
                        scale={10}
                        rotation-y={Math.PI / 2}
                    />
                    <Lightformer
                        form="ring"
                        intensity={4}
                        position={[0, 10, -2]}
                        scale={8}
                        target={[0, 0, 0]}
                    />
                </group>
            </Environment>

            <spotLight
                position={[-2, 10, 5]}
                angle={0.18}
                penumbra={1}
                decay={0}
                intensity={Math.PI * 0.25}
                color={config.spotColor}
            />
            <spotLight
                position={[0, -25, 10]}
                angle={0.18}
                penumbra={1}
                decay={0}
                intensity={Math.PI * 0.25}
                color={config.spotColor}
            />
            <spotLight
                position={[0, 15, 5]}
                angle={0.18}
                penumbra={1}
                decay={0.1}
                intensity={Math.PI * 2.8}
            />
            <directionalLight
                position={[5, 5, 5]}
                intensity={0.6}
                color={config.dirColor}
            />
            <directionalLight
                position={[-5, -5, -2]}
                intensity={0.4}
                color={config.accentColor}
            />
        </group>
    );
};

export default Lights;
