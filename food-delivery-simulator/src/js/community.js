import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function loadCommunityModel(scene) {
    return new Promise((resolve, reject) => {
        const loader = new GLTFLoader();
        loader.load(
            '../../public/models/community.glb',
            (gltf) => {
                const model = gltf.scene;

                // 打印所有节点名称以调试
                console.group('所有可用节点名称');
                model.traverse((child) => {
                    if (child.name) {
                        console.log(`节点名称: ${child.name}`);
                        // 新增：重置每个子节点的旋转和位置
                        child.rotation.set(0, 0, 0);
                        child.position.set(0, 0, 0);
                    }
                });
                console.groupEnd();

                // 更新配置以匹配 GLTF 中的节点名称
                const componentsConfig = [
                    {
                        name: 'hepinggu_static42',//墙1.1
                        pos: [20, -1.5, 0],
                        scale: 30,
                        rotation: [-Math.PI/2, 0,0]
                    },
                    {
                        name: 'hepinggu_static42a',//墙1.2
                        pos: [25, -1.5, 0],
                        scale: 30,
                        rotation: [-Math.PI/2, 0,0]
                    },
                    {
                        name: 'hepinggu_static42',//墙2.1
                        pos: [-12, -1.5, 0],
                        scale: 30,
                        rotation: [-Math.PI/2, 0,0]
                    },
                    {
                        name: 'hepinggu_static42a',//墙2.2
                        pos: [-19.5, -1.5, 0],
                        scale: 30,
                        rotation: [-Math.PI/2, 0,-Math.PI]
                    },
                    
                    {
                        name: 'hepinggu_static31a',//拱
                        pos: [4, -1.2, 0],
                        scale: 30,
                        rotation: [-Math.PI/2, 0,0]
                    },
                    {
                        name: 'hepinggu_static30',//曲折的
                        pos: [-2, -1.5, 20],
                        scale: 30,
                        rotation: [-Math.PI/2, 0,0]
                    },
                    {
                        name: 'hepinggu_static31',//拱的顶
                        pos: [4, -3, 0],
                        scale: 30,
                        rotation: [-Math.PI/2, 0,0]
                    },
                    {
                        name: 'hepinggu_static29',//三个台阶
                        pos: [16.5, -10, 19],
                        scale: 30,
                        rotation: [-Math.PI/2, 0,0]
                    },
                    {
                        name: 'hepinggu_static28',//房子1
                        pos: [20, -1.5, 45],
                        scale: 30,
                        rotation: [-Math.PI/2, 0,Math.PI]
                    },
                    {
                        name: 'hepinggu_static28',//房子2
                        pos: [-30, -1.5, 45],
                        scale: 30,
                        rotation: [-Math.PI/2, 0,Math.PI]
                    },
                   
                ];

                console.group('模型部件加载情况');
                componentsConfig.forEach(config => {
                    const originalPart = model.getObjectByName(config.name);
                    if (originalPart) {
                        const part = originalPart.clone();
                        part.position.set(...config.pos);
                        part.scale.setScalar(config.scale);
                        part.rotation.set(...config.rotation);
                        scene.add(part);
                        console.log(`✅ 成功加载部件: ${config.name}`);
                    } else {
                        console.warn(`⚠️ 未找到部件: ${config.name}`);
                    }
                });
                console.groupEnd();

                // 可选：处理 Pivot 节点
                const pivot = model.getObjectByName('Pivot');
                if (pivot) {
                    pivot.position.set(0, 0, 0);
                    pivot.rotation.set(0, 0, 0);
                }

                // 新增：重置根节点的变换
                model.position.set(0, 0, 0);
                model.rotation.set(0, 0, 0);
                model.scale.set(1, 1, 1);

                resolve(model);
            },
            undefined,
            (error) => {
                console.error('❌ 加载社区模型出错:', error);
                reject(error);
            }
        );
    });
}