import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import * as THREE from "three";
import Lights from "./Lights";
import Loader from "./Loader";
import IPhone from "./IPhone";
import { Suspense, useMemo } from "react";

const TARGET_ORIGIN = new THREE.Vector3(0, 0, 0);

const ModelView = ({
    index,
    groupRef,
    gsapType,
    controlRef,
    size,
    item,
    isMobile = false,
    interactive = true,
    autoRotate = false,
    mood = "studio",
}) => {
    const modelScale = useMemo(() => {
        if (index === 1) {
            return isMobile ? [13, 13, 13] : [15, 15, 15];
        }
        return isMobile ? [15, 15, 15] : [17, 17, 17];
    }, [index, isMobile]);

    return (
        <View
            index={index}
            id={gsapType}
            className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""} ${
                !interactive ? "pointer-events-none" : "cursor-grab active:cursor-grabbing"
            }`}
        >
            <ambientLight intensity={0.5} />

            <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={isMobile ? 55 : 45} />

            <Lights mood={mood} />

            <OrbitControls
                makeDefault
                ref={controlRef}
                enabled={interactive}
                enableZoom={false}
                enablePan={false}
                enableDamping={true}
                dampingFactor={0.06}
                rotateSpeed={0.55}
                autoRotate={autoRotate}
                autoRotateSpeed={1.4}
                minPolarAngle={Math.PI / 3.4}
                maxPolarAngle={Math.PI / 1.55}
                target={TARGET_ORIGIN}
            />

            <group
                ref={groupRef}
                name={index === 1 ? "small" : "large"}
                position={[0, 0, 0]}
            >
                <Suspense fallback={<Loader />}>
                    <IPhone scale={modelScale} item={item} size={size} />
                </Suspense>
            </group>
        </View>
    );
};

export default ModelView;
