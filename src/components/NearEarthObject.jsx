import { useFrame } from "@react-three/fiber"
import { useRef } from 'react'
import { Propa, trueToEccentricAnomaly, meanToEccentricAnomaly, eccentricToTrueAnomaly } from "../lib/OrbitElements"
import { Vector3 } from 'three'
function NearEarthObject(
  { 
    smA = 1, 
    oI = 0.00005, 
    aP = 102.94719, 
    oE = 0.01671022, 
    aN = 0, 
    mAe=100.47,
    period = 1,
     ...props }) {

  var position = Propa(smA, oI, aP, oE, aN, 0)
  var currentPosition = [];
  var trueAnomoly = 0;
  var simSpeed = 1;
  var deltaTime = 0;
  var time = 0
  var epochMeanAnomaly = mAe * 0.01745329
  //time 
  var n = (2 * Math.PI) / (period * 365.25)
  time = epochMeanAnomaly / n    // time since perigee passage
  var eccAnom = meanToEccentricAnomaly(oE, epochMeanAnomaly)
  var truAnom = eccentricToTrueAnomaly(oE, eccAnom)
  trueAnomoly = truAnom


  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    //deltaTime = deltaTime + (simSpeed * n)*t 
    var position = Propa(smA, oI, aP, oE, aN, trueAnomoly)
    var eA = trueToEccentricAnomaly(oE, trueAnomoly)
    var m0 = eA - oE * Math.sin(eA);
    deltaTime = simSpeed * n
    var mA = deltaTime + m0
    time = time + deltaTime
    eA = meanToEccentricAnomaly(oE, mA)
    var trueAnomaly2 = eccentricToTrueAnomaly(oE, eA)
    trueAnomoly = trueAnomaly2
    //console.log(position)
    ref.current.position.set(position[0], position[1], position[2])
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
