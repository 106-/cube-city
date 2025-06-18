import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import CubeBuildings from './CubeBuildings'
import ParticleSystem from './ParticleSystem'
import BlueMist from './BlueMist'
import FloatingGlassCubes from './FloatingGlassCubes'

const CubeCity: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null)
  const pointLight1Ref = useRef<THREE.PointLight>(null)
  const pointLight2Ref = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }
    
    // Dynamic lighting
    const time = state.clock.elapsedTime
    if (pointLight1Ref.current) {
      const hue1 = (time * 20) % 360
      pointLight1Ref.current.color.setHSL(hue1 / 360, 0.8, 0.6)
      pointLight1Ref.current.intensity = 0.3 + Math.sin(time * 0.5) * 0.2
    }
    if (pointLight2Ref.current) {
      const hue2 = (time * 30 + 180) % 360
      pointLight2Ref.current.color.setHSL(hue2 / 360, 0.8, 0.6)
      pointLight2Ref.current.intensity = 0.2 + Math.cos(time * 0.7) * 0.15
    }
  })

  return (
    <>
      <fog attach="fog" args={['#000428', 10, 100]} />
      
      <ambientLight intensity={0.15} color="#004080" />
      <directionalLight
        position={[10, 20, 10]}
        intensity={0.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight ref={pointLight1Ref} position={[-10, 10, -10]} intensity={0.3} color="#0066ff" />
      <pointLight ref={pointLight2Ref} position={[10, 5, 10]} intensity={0.2} color="#00ccff" />
      
      <group ref={groupRef}>
        <CubeBuildings />
        <BlueMist />
      </group>
      
      <FloatingGlassCubes />
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