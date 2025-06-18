import React from 'react'
import { Canvas } from '@react-three/fiber'
import CubeCity from './components/CubeCity'

const App: React.FC = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      <Canvas
        camera={{ 
          position: [0, 25, 0], 
          fov: 45,
          near: 0.1,
          far: 1000 
        }}
        gl={{ 
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
      >
        <CubeCity />
      </Canvas>
    </div>
  )
}

export default App