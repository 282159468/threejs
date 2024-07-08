import { useFrame } from '@react-three/fiber';
import React, { useRef } from 'react';
import { FC, memo } from 'react';
import { Vector3, Spherical, DirectionalLightHelper, HemisphereLightHelper } from 'three';
import { useLoader } from '@react-three/fiber';
import { useControls } from 'leva';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import Tip from './Tip';
import { Helper, useHelper } from '@react-three/drei';

const createV = () => {
  return { x: 1, y: 1, z: 1 };
};

const aNumberInit = createV();
const p2 = createV();
interface TooltipProps {}
const Tooltip: FC<TooltipProps> = (props) => {
  const { aLight, dNum, hNum, dLightPosition } = useControls({
    aLight: p2,
    dLightPosition: aNumberInit,
    hNum: 1,
    dNum: 10,
  });

  console.log('gltf', 2);
  const gltf = useLoader(GLTFLoader, '/models/scene.gltf');
  // const gltf = useLoader(GLTFLoader, '/models/fly/Flamingo.glb');
  useFrame(({ clock }) => {});
  console.log('gltf', gltf);
  return (
    <>
      {/* <Tip ref={tooltip1Ref} /> */}
      {/* <Tip ref={tooltip2Ref} /> */}
      <primitive object={gltf.scene} o />
      {/* <Helper type={BoxHelper} args={['royalblue']} /> */}
      <hemisphereLight args={['#fff', '#000', hNum]}>
        <Helper type={HemisphereLightHelper} args={[1, 'blue']} />
      </hemisphereLight>
      <directionalLight position={[dLightPosition.x, dLightPosition.y, dLightPosition.z]} intensity={dNum}>
        <Helper type={DirectionalLightHelper} args={[1, 'red']} />
      </directionalLight>

      {/* <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh> */}
    </>
  );
};
export default memo(Tooltip);
