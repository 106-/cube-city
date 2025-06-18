import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface FloatingCube {
  position: [number, number, number]
  scale: number
  rotationSpeed: [number, number, number]
  floatSpeed: number
  floatOffset: number
  color: string
}

const FloatingGlassCubes: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null)
  
  const cubes = useMemo(() => {
    const cubeData: FloatingCube[] = []
    const cubeCount = 4
    
    for (let i = 0; i < cubeCount; i++) {
      const angle = (i / cubeCount) * Math.PI * 2
      const radius = 8 + Math.random() * 10
      
      cubeData.push({
        position: [
          Math.cos(angle) * radius,
          12 + Math.random() * 8,
          Math.sin(angle) * radius
        ],
        scale: 0.8 + Math.random() * 0.5,
        rotationSpeed: [
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ],
        floatSpeed: 0.5 + Math.random() * 0.5,
        floatOffset: Math.random() * Math.PI * 2,
        color: `hsl(${200 + Math.random() * 80}, 60%, ${70 + Math.random() * 20}%)`
      })
    }
    
    return cubeData
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime
      
      groupRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh
        const cube = cubes[i]
        
        // 回転
        mesh.rotation.x += cube.rotationSpeed[0]
        mesh.rotation.y += cube.rotationSpeed[1]
        mesh.rotation.z += cube.rotationSpeed[2]
        
        // ゆっくりとした浮遊
        const floatY = Math.sin(time * cube.floatSpeed + cube.floatOffset) * 2
        mesh.position.y = cube.position[1] + floatY
        
        // わずかな水平移動
        const driftX = Math.sin(time * 0.3 + cube.floatOffset) * 0.5
        const driftZ = Math.cos(time * 0.2 + cube.floatOffset) * 0.5
        mesh.position.x = cube.position[0] + driftX
        mesh.position.z = cube.position[2] + driftZ
        
        // パルス効果
        const material = mesh.material as THREE.MeshStandardMaterial
        const pulse = Math.sin(time * 0.8 + i * 0.5) * 0.3 + 0.7
        material.opacity = pulse * 0.4 + 0.2
        material.emissiveIntensity = pulse * 0.3
      })
    }
  })

  return (
    <group ref={groupRef}>
      {cubes.map((cube, index) => (
        <mesh
          key={index}
          position={cube.position}
          scale={[cube.scale, cube.scale, cube.scale]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={cube.color}
            emissive={cube.color}
            emissiveIntensity={0.2}
            metalness={0.95}
            roughness={0.05}
            transparent
            opacity={0.3}
            envMapIntensity={1.5}
          />
        </mesh>
      ))}
    </group>
  )
}

export default FloatingGlassCubes