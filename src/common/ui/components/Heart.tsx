import { Billboard, Text, useAnimations, useGLTF } from '@react-three/drei';
import { Vector3 } from '@react-three/fiber';
import { TTextObj } from '@ts/common';
import React, { useEffect, useRef } from 'react';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

type TProps = {
  position: Vector3;
  scale: number;
  animate: boolean;
  rotateZ: number;
  rotateX: number;
  rotateY: number;
  textObj: TTextObj;
};

type TGLTFResult = GLTF & {
  nodes: {
    Ch03: THREE.SkinnedMesh;
  };
  materials: {
    Ch03_Body: THREE.MeshStandardMaterial;
  };
  actions: {
    Armada: THREE.AnimationAction;
  };
};
const Heart = ({ rotateZ, rotateX, rotateY, scale, position, textObj }: TProps): JSX.Element => {
  const group = useRef<THREE.Mesh>(null!);
  const { nodes, animations } = useGLTF('3d/Heart/heart.glb') as TGLTFResult;
  const { actions } = useAnimations(animations, group);
  const addLabel = (tIndex: string) => {
    return (
      <Billboard
        follow={true}
        position={textObj[tIndex].position}
        lockX={true}
        lockY={true}
        lockZ={true}
        rotation={textObj[tIndex].rotation}>
        <Text
          fontSize={20}
          outlineWidth={'5%'}
          outlineColor='#000000'
          outlineOpacity={2}
          anchorX={textObj[tIndex].align}
          anchorY='middle'>
          {`${textObj[tIndex].align === 'left' ? '<--' : ''}${
            textObj[tIndex].number ? textObj[tIndex].numberVal : textObj[tIndex].text
          }${textObj[tIndex].align === 'right' ? '-->' : ''}`}
        </Text>
      </Billboard>
    );
  };
  useEffect(() => {
    actions['Take 001']?.play();
  });
  return (
    <group ref={group} dispose={null} scale={scale} position={position} rotation={[rotateX, rotateY, rotateZ]}>
      {/* Main Big body ---> */}
      <group rotation={[rotateX, rotateY, rotateZ]} scale={0.2}>
        <mesh
          name='0'
          geometry={nodes['0'].geometry}
          material={nodes['0'].material}
          morphTargetDictionary={nodes['0'].morphTargetDictionary}
          morphTargetInfluences={nodes['0'].morphTargetInfluences}
        />
        {textObj['right_coronary_artery']?.display && addLabel('right_coronary_artery')}
        {textObj['left_ventricle']?.display && addLabel('left_ventricle')}
        {textObj['left_cardiac_vain']?.display && addLabel('left_cardiac_vain')}
        {textObj['pulmonary_trunk']?.display && addLabel('pulmonary_trunk')}
        {textObj['right_ventricle']?.display && addLabel('right_ventricle')}
      </group>
      {/* Neck Part ---> */}
      <group rotation={[rotateX, rotateY, rotateZ]} scale={0.2}>
        <mesh
          name='1'
          geometry={nodes['1'].geometry}
          material={nodes['1'].material}
          morphTargetDictionary={nodes['1'].morphTargetDictionary}
          morphTargetInfluences={nodes['1'].morphTargetInfluences}
        />
        {textObj['left_atrium']?.display && addLabel('left_atrium')}
        {textObj['left_pulmonary_artery1']?.display && addLabel('left_pulmonary_artery1')}
        {textObj['left_pulmonary_artery2']?.display && addLabel('left_pulmonary_artery2')}
        {textObj['inferior_vena_cava']?.display && addLabel('inferior_vena_cava')}
        {textObj['right_atrium']?.display && addLabel('right_atrium')}
        {textObj['superior_vena_cava']?.display && addLabel('superior_vena_cava')}
        {textObj['right_pulmonary_vein1']?.display && addLabel('right_pulmonary_vein1')}
        {textObj['right_pulmonary_vein2']?.display && addLabel('right_pulmonary_vein2')}
        {textObj['right_pulmonary_artery']?.display && addLabel('right_pulmonary_artery')}
        {textObj['left_pulmonary_artery']?.display && addLabel('left_pulmonary_artery')}
      </group>
      {/* TopPart ---> */}
      <group rotation={[rotateX, rotateY, rotateZ]} scale={0.2}>
        <mesh
          name='2'
          geometry={nodes['heart_03_Material_#57_0'].geometry}
          material={nodes['heart_03_Material_#57_0'].material}
        />
        {textObj['left_pulmonary_artery1']?.display && addLabel('left_pulmonary_artery1')}
        {textObj['brachiocephalic_trunk']?.display && addLabel('brachiocephalic_trunk')}
        {textObj['left_subclavian_artery']?.display && addLabel('left_subclavian_artery')}
        {textObj['left_common_carotid_artery']?.display && addLabel('left_common_carotid_artery')}
        {textObj['aortic_arch']?.display && addLabel('aortic_arch')}
      </group>
    </group>
  );
};

export default Heart;
