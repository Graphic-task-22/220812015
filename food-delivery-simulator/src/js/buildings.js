// src/js/buildings.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createNoise2D } from 'simplex-noise'; // 噪声，地面起伏

export async function createGroundAndBuildings(scene) {
  const loader = new GLTFLoader();
  const buildings = [];

  // 创建地面（带贴图和轻微起伏）
  const geometry = new THREE.PlaneGeometry(200, 200, 100, 100); // 细分保持不变
  const ground = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x44aa44 }));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;

  // 添加贴图
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    '../../public/textures/绿地.jpg', // 贴图路径
    (texture) => {
      const groundMaterial = new THREE.MeshLambertMaterial({ map: texture, color: 0x44aa44 });
      ground.material = groundMaterial; // 应用贴图到现有地面
      ground.receiveShadow = true;
    },
    undefined,
    (error) => {
      console.error('❌ 加载地面贴图出错:', error);
      if (error.target) {
        console.error('状态:', error.target.status, 'URL:', error.target.responseURL);
      }
    }
  );

  // 生成轻微起伏
  const noise2D = createNoise2D();
  const positions = geometry.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = noise2D(x / 50, y / 50) * 1.5; // 轻微起伏，幅度 5
    positions.setZ(i, z);
  }
  positions.needsUpdate = true;

  scene.add(ground);

  // 餐厅
  const restaurant = await new Promise(resolve => {
    loader.load('../public/models/R.glb', gltf => {
      const obj = gltf.scene;
      obj.scale.set(30, 30, 30);
      obj.position.set(-70, 0, -70);
      obj.traverse(c => {
        if (c.isMesh) {
          c.castShadow = true;
          c.receiveShadow = true;
        }
      });
      obj.name = 'restaurant';
      scene.add(obj);
      resolve(obj);
    });
  });

  // 配送点1
  const delivery1 = await new Promise(resolve => {
    loader.load('../public/models/K.glb', gltf => {
      const obj = gltf.scene;
      obj.scale.set(3, 3, 3);
      obj.rotateY(Math.PI);
      obj.position.set(70, 0, 70);
      obj.traverse(c => {
        if (c.isMesh) {
          c.castShadow = true;
          c.receiveShadow = true;
        }
      });
      obj.name = 'delivery';
      scene.add(obj);
      resolve(obj);
    });
  });

  // 配送点2（新增）
  const delivery2 = await new Promise(resolve => {
    loader.load('../public/models/B.glb', gltf => {
      const obj = gltf.scene;
      obj.scale.set(3, 3, 3);
      obj.rotateY(Math.PI);
      obj.position.set(0, 0, 80); // 设置第二个配送点的位置
      obj.traverse(c => {
        if (c.isMesh) {
          c.castShadow = true;
          c.receiveShadow = true;
        }
      });
      obj.name = 'delivery2'; // 注意：唯一名称
      scene.add(obj);
      resolve(obj);
    });
  });

  buildings.push(restaurant, delivery1, delivery2);
  return buildings;
}