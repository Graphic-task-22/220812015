import * as THREE from 'three';

//管道缓冲几何体  三维曲线延申

const p1 = new THREE.Vector3(-80, 50, -30);   // 起点（更靠近中心）
const p2 = new THREE.Vector3(-40, 180, 50);   // 控制点1（向上向右延伸）
const p3 = new THREE.Vector3(60, -20, 120);   // 控制点2（向下向左弯曲）
const p4 = new THREE.Vector3(120, 80, -50);   // 终点（形成空间对角线）

const curve = new THREE.CubicBezierCurve3(p1, p2, p3, p4);

const geometry = new THREE.TubeGeometry(curve, 60, 20, 100,false);   //传入曲线，分段数量（光滑），横截面分段数量（粗细），疏密程度, 是否闭合

const materail = new THREE.MeshLambertMaterial({
    color: 0x88d8c0,
    side: THREE.DoubleSide,
    wireframe: true
});

const mesh = new THREE.Mesh(geometry, materail);

const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints([p1,p2,p3,p4]);
const material2 = new THREE.PointsMaterial({
    color: new THREE.Color('blue'),
    size: 10
});
const points2 = new THREE.Points(geometry2, material2);
const line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial());
mesh.add(points2, line2);

export default mesh;
