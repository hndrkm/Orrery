import { Canvas } from '@react-three/fiber'
import NearEarthObject from './NearEarthObject'
import Elipse from './Elipse';
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Stats, OrbitControls, Environment } from '@react-three/drei'
function SceneOrrery() {


  return (
    <div className='h-screen w-screen'>

      <Canvas camera={{ fov: 70, position: [0, 0, 10] }}>
        <color attach="background" args={['black']} />
        <mesh visible={true} >
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshBasicMaterial color={[4, 2, 1]} toneMapped={false} />
        </mesh>
        <Elipse />
        <Elipse smA={1.18} oI={25.8} aP={162.6} oE={0.169} aN={240.3} />
        <NearEarthObject speed={2} radius={2} />
        <NearEarthObject speed={3} radius={3} />
        <OrbitControls />
        <Stats showPanel={0} />
        {
        <Environment 
        files='./HDR_subdued_blue_nebulae.hdr' 
        background 
        backgroundBlurriness={0}
        />  
        }
        
        
        <EffectComposer>
          <Bloom mipmapBlur luminanceThreshold={1} radius={0.7} />
        </EffectComposer>
      </Canvas>


    </div>

  )
}

export default SceneOrrery
