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

/** BOX */
// const AnimatedBox = ({ isAnimating }) => {
//   const meshRef = useRef(null);

//   // フレームごとに回転アニメーション
//   useFrame(() => {
//     if (meshRef.current && isAnimating) {
//       meshRef.current.rotation.y += 0.02;
//       meshRef.current.rotation.x += 0.01;
//     }
//   });

//   return (
//     <mesh
//       ref={meshRef}
//       scale={1}
//       position={[0, 3, 0]}
//       castShadow
//     >
//       <boxGeometry args={[2, 2, 2]} />
//       <meshStandardMaterial color="royalblue" />
//     </mesh>
//   );
// };

const App = () => {
  const [isAnimating, setIsAnimating] = useState(true);

  return (
    <div>
      <Canvas
        shadows
        camera={{ position: [5, 3, 10], fov: 50 }}
        style={{ height: '100vh', width: '100vw' }}
      >
        環境光
         <directionalLight intensity={10} position={[5, 10, 7.5]} castShadow/>

        {/* 床 */}
        <Ground />

        {/* アニメーションするボックス */}
        <AnimatedBox isAnimating={isAnimating} />

        {/* カメラ操作 */}
        <OrbitControls />
      </Canvas>

      {/* ストップボタン */}
      <button
        onClick={() => setIsAnimating((prev) => !prev)}
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          cursor: 'pointer',
          backgroundColor: 'lightgray',
          boxShadow: '1px 3px 1px rgba(0,0,0,0.3)',
        }}
      >
        {isAnimating ? '停止' : '再生'}
      </button>
    </div>
  );
};

export default App;