import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { Line } from '@react-three/drei'
import { Vector3 } from 'three'
function Orbit({ smA = 1, oI = 0.00005, aP = 102.94719, oE = 0.01671022, aN = 0, ...props }) {
    //smA:1,oI:0.00005,aP:102.94719,oE:0.01671022,aN:0,mae:100.47,period:1
    const ref = useRef()
    oI = oI * 0.01745329
    aP = aP * 0.01745329
    aN = aN * 0.01745329
    var sLR = smA * (1 - (oE ^ 2));
    var points = []
    let i = 0.0
    var j = 0
    var point = []
    while (i < Math.PI * 2) {
        var r = sLR / (1 + (oE * Math.cos(i)))

        point[0] = r * (Math.cos(aP + i) * Math.cos(aN) - Math.cos(oI) * Math.sin(aP + i) * Math.sin(aN))
        point[1] = r * (Math.cos(aP + i) * Math.sin(aN) + Math.cos(oI) * Math.sin(aP + i) * Math.cos(aN));
        point[2] = r * (Math.sin(aP + i) * Math.sin(oI));
        var position = new Vector3(point[0], point[1],point[2])
        points[j] = position
        i = i + 0.0785;
        j++
    }
    console.log(points)
    return (
        <group>
            <Line worldUnits points={points} color={[1, 1, 4]} lineWidth={0.01}>
            </Line>
        </group>

    )
}

export default Orbit
