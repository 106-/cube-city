import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CubeData {
  position: [number, number, number]
  scale: [number, number, number]
  color: string
  emissive: string
}

const CubeBuildings: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null)
  
  const cubes = useMemo(() => {
    const cubeData: CubeData[] = []
    const gridSize = 30
    const spacing = 1
    
    for (let x = -gridSize; x <= gridSize; x += spacing) {
      for (let z = -gridSize; z <= gridSize; z += spacing) {
        const distance = Math.sqrt(x * x + z * z)
        const maxDistance = gridSize * 1.4
        
        if (distance < maxDistance) {
          const heightFactor = 1 - (distance / maxDistance)
          const baseHeight = Math.random() * 3 + 1
          const height = baseHeight * (0.5 + heightFactor * 1.5)
          
          const width = 0.6 + Math.random() * 0.3
          const depth = 0.6 + Math.random() * 0.3
          
          const y = height / 2
          
          const intensity = 0.3 + heightFactor * 0.7
          const hue = 200 + Math.random() * 60
          const color = `hsl(${hue}, 70%, ${30 + intensity * 40}%)`
          const emissive = `hsl(${hue}, 80%, ${5 + intensity * 15}%)`
          
          cubeData.push({
            position: [x + (Math.random() - 0.5) * 0.1, y, z + (Math.random() - 0.5) * 0.1],
            scale: [width, height, depth],
            color,
            emissive
          })
        }
      }
    }
    
    return cubeData
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh
        const material = mesh.material as THREE.MeshStandardMaterial
        
        const time = state.clock.elapsedTime
        const pulse = Math.sin(time * 0.5 + i * 0.1) * 0.3 + 0.7
        
        if (material.emissive) {
          material.emissiveIntensity = pulse * 0.3
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {cubes.map((cube, index) => (
        <mesh
          key={index}
          position={cube.position}
          scale={cube.scale}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={cube.color}
            emissive={cube.emissive}
            emissiveIntensity={0.2}
            metalness={0.1}
            roughness={0.3}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  )
}

export default CubeBuildings