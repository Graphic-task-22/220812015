import * as THREE from 'three';

const snow = new THREE.Points(
  new THREE.BufferGeometry(),
  new THREE.PointsMaterial({
    size: 9,
    map: new THREE.TextureLoader().load('./src/assets/sprites/spark1.png'),
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
  })
);

// 初始化方法
snow.init = function() {
  const positions = new Float32Array(1500 * 3);
  for (let i = 0; i < 1500; i++) {
    positions[i*3] = Math.random() * window.innerWidth * 2 - window.innerWidth;
    positions[i*3+1] = Math.random() * window.innerHeight * 2;
    positions[i*3+2] = (Math.random() - 0.5) * 100;
  }
  this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  this.userData = { speed: 1.5, positions };
};

// 更新方法
snow.update = function() {
  const { positions, speed } = this.userData;
  for (let i = 1; i < positions.length; i += 3) {
    positions[i] -= speed;
    if (positions[i] < -window.innerHeight) {
      positions[i] = window.innerHeight * 1.5;
      positions[i-1] = Math.random() * window.innerWidth * 2 - window.innerWidth;
    }
  }
  this.geometry.attributes.position.needsUpdate = true;
};

export default snow;