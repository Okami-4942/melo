import { useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import FirstPlayer from './components/FirstPlayer';

/** 地面 */
const Ground = () => {
  return (
    <>
      <mesh receiveShadow castShadow={false}>
        <cylinderGeometry args={[6.2, 6.2, 0.3, 64]} />
        <meshStandardMaterial color="#7d7d7d" roughness={1} metalness={0} />
      </mesh>
    </>
  );
};

const App = () => {
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <div>
      <Canvas
        shadows
        camera={{ position: [0,2.6,0], fov: 50 }}
        style={{ height: '100vh', width: '100vw' }}
      >
        環境光
         <directionalLight intensity={1} position={[5, 10, 7.5]} castShadow/>

        {/* 床 */}
        <Ground />

        {/* カメラ操作 */}
        {/* <OrbitControls /> */}
        <FirstPlayer/>
      </Canvas>

     
    </div>
  );
};

export default App;