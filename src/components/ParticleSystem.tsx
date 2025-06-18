import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ParticleSystem: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null)
  const velocitiesRef = useRef<Float32Array>()
  
  const { positions, colors, velocities } = useMemo(() => {
    const particleCount = 1000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      positions[i3] = (Math.random() - 0.5) * 50
      positions[i3 + 1] = Math.random() * 30 + 5
      positions[i3 + 2] = (Math.random() - 0.5) * 50
      
      velocities[i3] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 1] = Math.random() * 0.01 + 0.005
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02
      
      const intensity = Math.random()
      colors[i3] = 0.2 + intensity * 0.8
      colors[i3 + 1] = 0.5 + intensity * 0.5
      colors[i3 + 2] = 1.0
    }
    
    velocitiesRef.current = velocities
    return { positions, colors, velocities }
  }, [])

  useFrame((state) => {
    if (particlesRef.current && velocitiesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
      const velocities = velocitiesRef.current
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i]
        positions[i + 1] += velocities[i + 1]
        positions[i + 2] += velocities[i + 2]
        
        if (positions[i + 1] > 35) {
          positions[i] = (Math.random() - 0.5) * 50
          positions[i + 1] = 0
          positions[i + 2] = (Math.random() - 0.5) * 50
        }
        
        if (Math.abs(positions[i]) > 25) {
          positions[i] = (Math.random() - 0.5) * 50
        }
        if (Math.abs(positions[i + 2]) > 25) {
          positions[i + 2] = (Math.random() - 0.5) * 50
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default ParticleSystem