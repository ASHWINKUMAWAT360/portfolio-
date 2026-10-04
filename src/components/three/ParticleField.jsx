import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo, Suspense } from 'react'
import * as THREE from 'three'

function Particles() {
  const mesh = useRef()
  const count = 1500

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return pos
  }, [])

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const t = Math.random()
      if (t < 0.5) {
        col[i * 3] = 0; col[i * 3 + 1] = 0.83; col[i * 3 + 2] = 1.0
      } else {
        col[i * 3] = 0.66; col[i * 3 + 1] = 0.33; col[i * 3 + 2] = 0.97
      }
    }
    return col
  }, [])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.03
      mesh.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.06} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  )
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: 'transparent', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <Particles />
      </Suspense>
    </Canvas>
  )
}
