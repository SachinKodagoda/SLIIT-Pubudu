/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useGLTF } from '@react-three/drei';
import { Vector3 } from '@react-three/fiber';
import React, { useRef } from 'react';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

// for more models
// https://sketchfab.com/3d-models?features=downloadable

type TProps = {
  position: Vector3;
  scale: number;
  shouldRotate: boolean;
  isYRotationClock: boolean;
};
type TGLTFResult = GLTF & {
  nodes: {
    Armature_rootJoint: THREE.Mesh;
    RedGeo_0: THREE.SkinnedMesh;
  };
  materials: {
    RedMat: THREE.MeshStandardMaterial;
  };
};
const ThreeModel = ({ isYRotationClock, position, shouldRotate, scale }: TProps): JSX.Element => {
  const group = useRef<THREE.Mesh>(null!);
  const { materials, nodes } = useGLTF('3d/angryBird/scene.glb') as TGLTFResult;

  // useFrame(() => {
  //   if (shouldRotate) {
  //     if (isYRotationClock) {
  //       group.current.rotation.y += 0.05;
  //     } else {
  //       group.current.rotation.y -= 0.05;
  //     }
  //   }
  // });
  return (
    <group ref={group} dispose={null} position={position} scale={scale}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={1.47}>
          <primitive object={nodes.Armature_rootJoint} />
          <skinnedMesh
            geometry={nodes.RedGeo_0.geometry}
            material={materials.RedMat}
            skeleton={nodes.RedGeo_0.skeleton}
          />
        </group>
      </group>
    </group>
  );
};

useGLTF.preload('/scene_draco.glb');

export default ThreeModel;
