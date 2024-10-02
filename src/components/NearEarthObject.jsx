import { useFrame } from "@react-three/fiber"
import { useRef } from 'react'
import { Propa } from "../lib/OrbitElements"
import { Vector3 } from 'three'
function NearEarthObject({ smA = 1, oI = 0.00005, aP = 102.94719, oE = 0.01671022, aN = 0, period = 1, ...props }) {

  var position = Propa(smA, oI, aP, oE, aN, 0)
  var currentPosition = [];
  var anomaly = 0;
  var simSpeed = 0.1;
  var deltaTime = 0;
  //time 
  var n = (2 * Math.PI) / (period * 365.25)


  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    deltaTime = deltaTime + (simSpeed * n)*t 
    var position = Propa(smA, oI, aP, oE, aN, deltaTime)
    //console.log(position)
    ref.current.position.set(position[0],position[1],position[2])
  })
  return (
    <group>
      <mesh ref={ref} >
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color={[1, 1, 1.2]} toneMapped={false} />
      </mesh>
    </group>

  )
}

export default NearEarthObject
