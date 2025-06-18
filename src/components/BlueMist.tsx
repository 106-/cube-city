import React, { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'

const BlueMist: React.FC = () => {
  const mistRef = useRef<THREE.Points>(null)
  const velocitiesRef = useRef<Float32Array>()
  
  const mistTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const context = canvas.getContext('2d')!
    
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32)
    gradient.addColorStop(0, 'rgba(100, 150, 255, 0.8)')
    gradient.addColorStop(0.5, 'rgba(50, 100, 255, 0.4)')
    gradient.addColorStop(1, 'rgba(0, 50, 255, 0)')
    
    context.fillStyle = gradient
    context.fillRect(0, 0, 64, 64)
    
    return new THREE.CanvasTexture(canvas)
  }, [])
  
  const { positions, colors, velocities } = useMemo(() => {
    const particleCount = 500
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      const angle = Math.random() * Math.PI * 2
      const radius = Math.random() * 15 + 5
      
      positions[i3] = Math.cos(angle) * radius
      positions[i3 + 1] = Math.random() * 8 + 1
      positions[i3 + 2] = Math.sin(angle) * radius
      
      velocities[i3] = Math.cos(angle + Math.PI/2) * 0.005
      velocities[i3 + 1] = Math.random() * 0.003 + 0.001
      velocities[i3 + 2] = Math.sin(angle + Math.PI/2) * 0.005
      
      colors[i3] = 0.3
      colors[i3 + 1] = 0.6
      colors[i3 + 2] = 1.0
    }
    
    velocitiesRef.current = velocities
    return { positions, colors, velocities }
  }, [])

  useFrame((state) => {
    if (mistRef.current && velocitiesRef.current) {
      const positions = mistRef.current.geometry.attributes.position.array as Float32Array
      const velocities = velocitiesRef.current
      const time = state.clock.elapsedTime
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i] + Math.sin(time * 0.5 + i) * 0.001
        positions[i + 1] += velocities[i + 1]
        positions[i + 2] += velocities[i + 2] + Math.cos(time * 0.3 + i) * 0.001
        
        if (positions[i + 1] > 15) {
          const angle = Math.random() * Math.PI * 2
          const radius = Math.random() * 15 + 5
          
          positions[i] = Math.cos(angle) * radius
          positions[i + 1] = 0
          positions[i + 2] = Math.sin(angle) * radius
        }
      }
      
      mistRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={mistRef}>
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
        size={2.0}
        map={mistTexture}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default BlueMist