import { useFBX } from '@react-three/drei';
import { Vector3 } from '@react-three/fiber';
import React, { useRef } from 'react';

type TProps = {
  position: Vector3;
  scale: number;
};

const ThreeNext = ({ position, scale }: TProps): JSX.Element => {
  let fbx = useFBX('3d/dragon/Dragon2.5_fbx.fbx');
  let fbxClone = fbx.clone();
  const group = useRef<THREE.Mesh>(null!);
  return (
    <group ref={group} dispose={null} position={position} scale={scale}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={1.47}>
          <primitive object={fbxClone} dispose={null} />
        </group>
      </group>
    </group>
  );
};

export default ThreeNext;
