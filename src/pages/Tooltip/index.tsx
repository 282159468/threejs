import { Canvas } from '@react-three/fiber';
import { FC, memo, Suspense } from 'react';
import Scene from './Scene';
import { OrbitControls, Stats } from '@react-three/drei';
interface TooltipProps {}
const Tooltip: FC<TooltipProps> = (props) => {
  return (
    <div
      style={{
        height: '500px',
        width: '500px',
      }}
    >
      <Canvas
        camera={{
          near: 0.1,
          far: 1000,
          zoom: 1,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#252934');
        }}
      >
        <Stats />
        <OrbitControls />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};
export default memo(Tooltip);
