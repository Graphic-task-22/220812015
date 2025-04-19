import * as THREE from 'three';


const Vector2=[
    new THREE.Vector2(0,0),
    new THREE.Vector2(100,100),
    new THREE.Vector2(100,0),
]

// 1. 创建几何体
const points = curve.getPoints(20);
const geometry = new THREE.BufferGeometry().setFromPoints(points);

// 2. 创建红色曲线
const curveMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
const splineCurve = new THREE.Line(geometry, curveMaterial);

// 3. 创建蓝色点集
const points2 = new THREE.Points(
  geometry,
  new THREE.PointsMaterial({ color: 0x0000ff, size: 2 })
);

// 4. 创建绿色点集（需先定义vector2）

const geometry2 = new THREE.BufferGeometry().setFromPoints(vector2);
const points3 = new THREE.Points(
  geometry2,
  new THREE.PointsMaterial({ color: 0x00ff00, size: 5 })
);

// 组合对象
splineCurve.add(points2);
splineCurve.add(points3);