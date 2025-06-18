import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import CubeBuildings from './CubeBuildings'
import ParticleSystem from './ParticleSystem'
import BlueMist from './BlueMist'

const CubeCity: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }
  })

  return (
    <>
      <fog attach="fog" args={['#000428', 10, 100]} />
      
      <ambientLight intensity={0.1} color="#004080" />
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.3} color="#0066ff" />
      <pointLight position={[10, 5, 10]} intensity={0.2} color="#00ccff" />
      
      <group ref={groupRef}>
        <CubeBuildings />
        <BlueMist />
      </group>
      
      <ParticleSystem />
      
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={15}
        maxDistance={50}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 4}
      />
    </>
  )
}

export default CubeCity