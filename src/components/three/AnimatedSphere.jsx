import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, Suspense } from 'react'
import { MeshDistortMaterial, Sphere, Environment } from '@react-three/drei'

function GlowSphere() {
  const mesh = useRef()
  const mesh2 = useRef()

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.3
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3
    }
    if (mesh2.current) {
      mesh2.current.rotation.y = -state.clock.elapsedTime * 0.2
      mesh2.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.15) * 0.2
    }
  })

  return (
    <>
      {/* Outer wireframe */}
      <Sphere ref={mesh2} args={[1.3, 32, 32]}>
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.15} />
      </Sphere>
      {/* Main sphere */}
      <Sphere ref={mesh} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#00d4ff"
          distort={0.35}
          speed={2.5}
          transparent
          opacity={0.85}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </>
  )
}

export default function AnimatedSphere() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 50 }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
      gl={{ alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} color="#a855f7" intensity={2} />
        <pointLight position={[-5, -5, -5]} color="#00d4ff" intensity={1} />
        <pointLight position={[0, 5, 0]} color="#ffffff" intensity={0.5} />
        <GlowSphere />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  )
}
