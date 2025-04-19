import * as THREE from 'three';

// 创建纹理加载器
const textureLoader = new THREE.TextureLoader();

// 加载精灵贴图
const spriteTexture = textureLoader.load('/src/assets/sprite.png'); // 确保路径正确

// 创建精灵材质
const spriteMaterial = new THREE.SpriteMaterial({
  map: spriteTexture, // 设置贴图
  transparent: true, // 允许透明
  opacity: 0.8, // 设置透明度
});

// 创建精灵
const sprite = new THREE.Sprite(spriteMaterial);
sprite.scale.set(10, 10, 1); // 设置精灵大小

export default sprite;