import * as THREE from 'three';

const rain = new THREE.Points(
  new THREE.BufferGeometry(),
  new THREE.PointsMaterial({
    size: 3,
    map: new THREE.TextureLoader().load('./src/assets/sprites/ball.png'),
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true
  })
);

// 初始化方法
rain.init = function() {
  const positions = new Float32Array(2000 * 3);
  for (let i = 0; i < 2000; i++) {
    positions[i*3] = Math.random() * window.innerWidth * 2 - window.innerWidth;
    positions[i*3+1] = Math.random() * window.innerHeight * 3;
    positions[i*3+2] = (Math.random() - 0.5) * 100;
  }
  this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  this.userData = { speed: 5.0, positions };
};

// 更新方法
rain.update = function() {
  const { positions, speed } = this.userData;
  for (let i = 1; i < positions.length; i += 3) {
    positions[i] -= speed;
    if (positions[i] < -window.innerHeight) {
      positions[i] = window.innerHeight * 2;
      positions[i-1] = Math.random() * window.innerWidth * 2 - window.innerWidth;
    }
  }
  this.geometry.attributes.position.needsUpdate = true;
};

export default rain;