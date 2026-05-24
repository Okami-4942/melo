import React from 'react'
import { Canvas } from "@react-three/fiber";


const Area = () => {
  return (
    <div>
      <Canvas>
        <mesh>
          {/* 球体ジオメトリ */}
          <sphereGeometry />
          {/* ノーマルマテリアル */}
          <meshNormalMaterial />
        </mesh>
      </Canvas>
       
    </div>
  )
}

export default Area;
