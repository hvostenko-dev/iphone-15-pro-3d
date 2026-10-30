import { Environment, Lightformer } from "@react-three/drei";

const Lights = () => {
    return (
        <group name="lights">
            {/**
             * Environment with frames={1} only generates the environment map once,
             * preventing continuous heavy FBO rerenders on every single frame.
             */}
            <Environment resolution={256} frames={1}>
                <group>
                    <Lightformer
                        form="rect"
                        intensity={8}
                        position={[-1, 0, -10]}
                        scale={10}
                        color={"#495057"}
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
                color={"#f8f9fa"}
            />
            <spotLight
                position={[0, -25, 10]}
                angle={0.18}
                penumbra={1}
                decay={0}
                intensity={Math.PI * 0.25}
                color={"#f8f9fa"}
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
                color="#ffffff"
            />
            <directionalLight
                position={[-5, -5, -2]}
                intensity={0.4}
                color="#8F8A81"
            />
        </group>
    );
};

export default Lights;
