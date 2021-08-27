import Heart from '@components/Heart';
import styles from '@components_style/ThreeWorld.module.sass';
import { AnimationContext } from '@ctx/AnimationContext';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { leftTopToCenter } from '@util/common';
import React, { Suspense, useContext, useRef } from 'react';

const ThreeWorld = (): JSX.Element => {
  const { textObj, videoWidth, videoHeight, zoom, rotateX, rotateY, rotateZ, animate, handY, handX } =
    useContext(AnimationContext);
  const threeDCanvas = useRef(null);

  return (
    <Canvas className={styles.threeDCanvas} ref={threeDCanvas}>
      <ambientLight intensity={0.8} />
      <pointLight position={[-500, -500, -500]} intensity={0.8} />
      <pointLight position={[500, 500, 500]} intensity={0.8} />
      <PerspectiveCamera makeDefault position={[0, 0, 200]} rotation={[0, 0, 0]} />
      <OrbitControls />
      <Suspense fallback={null}>
        <Heart
          position={[leftTopToCenter(handX, videoWidth, 2, 0), leftTopToCenter(handY, videoHeight, 2, 0), 0]}
          scale={zoom}
          rotateX={rotateX}
          rotateY={rotateY}
          rotateZ={rotateZ}
          animate={animate}
          textObj={textObj}
        />
      </Suspense>
    </Canvas>
  );
};

export default ThreeWorld;
