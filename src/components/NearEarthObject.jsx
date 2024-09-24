import { useFrame } from "@react-three/fiber"
import { useRef } from 'react'
function NearEarthObject({ radius = 3, speed = 1, ...props }) {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed
    ref.current.position.set(Math.sin(t) * radius, (Math.cos(t) * radius), 0)
  })
  return (
    <group>
      <mesh ref={ref} >
        <sphereGeometry args={[0.1, 8, 8]}>
          
        </sphereGeometry>
        <meshBasicMaterial color={[1, 1, 1.2]} toneMapped={false} />
      </mesh>
    </group>

  )
}

export default NearEarthObject
