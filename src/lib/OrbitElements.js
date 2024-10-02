import { Vector3 } from 'three'
export function Propa(smA = 1, oI = 0.00005, aP = 102.94719, oE = 0.01671022, aN = 0, ang = 0) {
    oI = oI * 0.01745329
    aP = aP * 0.01745329
    aN = aN * 0.01745329
    var sLR = smA * (1 - (oE ^ 2));
    let i = ang
    var point = []

    var r = sLR / (1 + (oE * Math.cos(i)))

    point[0] = r * (Math.cos(aP + i) * Math.cos(aN) - Math.cos(oI) * Math.sin(aP + i) * Math.sin(aN))
    point[1] = r * (Math.cos(aP + i) * Math.sin(aN) + Math.cos(oI) * Math.sin(aP + i) * Math.cos(aN));
    point[2] = r * (Math.sin(aP + i) * Math.sin(oI));
    var position = new Vector3(point[0], point[1], point[2])

    return point;
}
function trueToEccentricAnomaly(e, f) {
    var eccentricAnomaly = 2 * Math.atan(Math.sqrt((1 - e) / (1 + e)) * Math.tan(f / 2));
    return eccentricAnomaly;
}
function eccentricToTrueAnomaly(e, E) {
    var trueAnomaly = 2 * Math.atan(Math.sqrt((1 + e) / (1 - e)) * Math.tan(E / 2));
    return trueAnomaly
}
function meanToEccentricAnomaly(e, M) {
    var tol = 0.0001;  // tolerance
    var eAo = M;       // initialize eccentric anomaly with mean anomaly
    var ratio = 1;     // set ratio higher than the tolerance
    while (Math.abs(ratio) > tol) {
        var f_E = eAo - e * Math.sin(eAo) - M;
        var f_Eprime = 1 - e * Math.cos(eAo);
        ratio = f_E / f_Eprime;
        if (Math.abs(ratio) > tol) {
            eAo = eAo - ratio;
            // console.log ("ratio  " + ratio) ;
        }
        else
            eccentricAnomaly = eAo;
    }
    return eccentricAnomaly
} 