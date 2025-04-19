import * as THREE from 'three';

//车削缓冲体，绕着y轴旋转一周形成一个几何体

const points = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(50, 50),
    new THREE.Vector2(20, 120),
    new THREE.Vector2(80, 150),
    
];

const geometry = new THREE.LatheGeometry(points,28);  //二维向量的数组  数字是分成几段，越大，越圆润

const materail = new THREE.MeshLambertMaterial({  //感光材质
    color: 'pink',
    side:THREE.DoubleSide
});

const mesh = new THREE.Mesh(geometry, materail);

const geometry2 = new THREE.BufferGeometry();
geometry2.setFromPoints(points);   //这里是把构成他的几个点画出来，蓝色
const material2 = new THREE.PointsMaterial({
    color: new THREE.Color('blue'),   
    size: 10
});
const points2 = new THREE.Points(geometry2, material2);
const line2 = new THREE.Line(geometry2, new THREE.LineBasicMaterial());
mesh.add(points2, line2);

export default mesh;
