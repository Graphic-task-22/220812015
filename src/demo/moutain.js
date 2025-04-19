import { createNoise2D } from 'simplex-noise';
import * as THREE from 'three';

const geometry = new THREE.PlaneGeometry(500, 500, 100, 100);

const noise2D = createNoise2D();

const material = new THREE.MeshBasicMaterial({
    color: 0xb57edc,
    wireframe: true,
});

const planeMesh = new THREE.Mesh(geometry, material);

const positions = geometry.attributes.position;
console.log('positions', positions);
console.log(positions[0]);


export function updatePosition() {
    const positions = geometry.attributes.position;

    for (let i = 0; i < positions.count; i++) {
        //positions.setZ(i, Math.random()*100);
        //console.log(noise2D(positions.getX(i),positions.getY(i)))

        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = noise2D(x / 100, y / 100) * 50; //用噪声生成
        const sinNum = Math.sin(Date.now() * 0.002 + x * 0.05) * 10;  //z有一个三角函数的变化，随着时间
        positions.setZ(i, z + sinNum);

        console.log(positions.getX(i), positions.getY(i, positions.getZ(i)));
        //planeMesh.rotateX(0.01);
    }
    
    positions.needsUpdate = true;
}


console.log(planeMesh);

//planeMesh.rotateX(Math.PI / 2);  //旋转

export default planeMesh;
