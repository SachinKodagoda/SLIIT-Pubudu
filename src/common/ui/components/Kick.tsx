import { useAnimations, useGLTF } from '@react-three/drei';
import { Vector3 } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

type TProps = {
  position: Vector3;
  scale: number;
};
type TGLTFResult = GLTF & {
  nodes: {
    mixamorigHips: THREE.Mesh;
    Ch03: THREE.SkinnedMesh;
  };
  materials: {
    Ch03_Body: THREE.MeshStandardMaterial;
  };
  actions: {
    Armada: THREE.AnimationAction;
  };
};
const Kick = ({ position, scale }: TProps): JSX.Element => {
  const group = useRef<THREE.Mesh>(null!);
  const { nodes, materials, animations } = useGLTF('3d/kick/kick.glb') as TGLTFResult;
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    actions.Armada?.play();
  });
  return (
    <group ref={group} dispose={null} position={position} scale={scale}>
      <group rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
        <primitive object={nodes.mixamorigHips} />
        <skinnedMesh material={materials.Ch03_Body} geometry={nodes.Ch03.geometry} skeleton={nodes.Ch03.skeleton} />
      </group>
    </group>
  );
};

export default Kick;
