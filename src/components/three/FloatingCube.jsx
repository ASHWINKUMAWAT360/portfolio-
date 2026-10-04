import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, Suspense } from 'react'

function Cube({ position, color, speed = 1 }) {
  const mesh = useRef()
  const initY = position[1]

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.008 * speed
      mesh.current.rotation.y += 0.012 * speed
      mesh.current.position.y = initY + Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.3
    }
  })

  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={color} wireframe transparent opacity={0.6} />
    </mesh>
  )
}

export default function FloatingCubes() {
  const cubes = [
    { position: [-3, 0.5, -1], color: '#00d4ff', speed: 0.8 },
    { position: [3, -0.5, -2], color: '#a855f7', speed: 1.2 },
    { position: [0, 1.5, -3], color: '#00d4ff', speed: 0.6 },
    { position: [-2, -1, -1.5], color: '#a855f7', speed: 1.0 },
    { position: [2, 0.5, -0.5], color: '#00d4ff', speed: 1.4 },
    { position: [-1.5, 0, -2], color: '#a855f7', speed: 0.9 },
  ]

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      gl={{ alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} color="#00d4ff" />
        {cubes.map((cube, i) => (
          <Cube key={i} {...cube} />
        ))}
      </Suspense>
    </Canvas>
  )
}
