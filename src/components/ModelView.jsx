import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import * as THREE from "three";
import Lights from "./Lights";
import Loader from "./Loader";
import IPhone from "./IPhone";
import { Suspense } from "react";

const ModelView = ({
    index,
    groupRef,
    gsapType,
    controlRef,
    setRotationState,
    size,
    item,
    isMobile = false,
    interactive = true,
    autoRotate = false,
}) => {
    const modelScale =
        index === 1
            ? isMobile
                ? [13, 13, 13]
                : [15, 15, 15]
            : isMobile
              ? [15, 15, 15]
              : [17, 17, 17];

    return (
        <View
            index={index}
            id={gsapType}
            className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""} ${
                !interactive ? "pointer-events-none" : "cursor-grab active:cursor-grabbing"
            }`}
        >
            <ambientLight intensity={0.45} />

            <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={isMobile ? 55 : 45} />

            <Lights />

            <OrbitControls
                makeDefault
                ref={controlRef}
                enabled={interactive}
                enableZoom={false}
                enablePan={false}
                enableDamping={true}
                dampingFactor={0.06}
                rotateSpeed={0.5}
                autoRotate={autoRotate}
                autoRotateSpeed={1.8}
                minPolarAngle={Math.PI / 3.2}
                maxPolarAngle={Math.PI / 1.6}
                target={new THREE.Vector3(0, 0, 0)}
                onEnd={() => {
                    if (controlRef.current) {
                        setRotationState(controlRef.current.getAzimuthalAngle());
                    }
                }}
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
