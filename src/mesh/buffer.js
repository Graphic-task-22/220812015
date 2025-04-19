import * as THREE from 'three';

// 4 个顶点（避免重复）
const vertices = new Float32Array([
    0, 0, 0,      // 0 - 左下
    100, 0, 0,    // 1 - 右下
    0, 100, 0,    // 2 - 左上
    100, 100, 0   // 3 - 右上
]);

// 索引复用顶点，组成两个三角形
const indexes = new Uint16Array([
    0, 1, 2,  // 第一个三角形
    1, 3, 2   // 第二个三角形
]);

const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
geometry.index = new THREE.BufferAttribute(indexes, 1);

const material = new THREE.MeshBasicMaterial({
    color: 'orange',
    wireframe: true
});

const mesh = new THREE.Mesh(geometry, material);
export default mesh;