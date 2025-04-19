import * as THREE from 'three';

//形状缓冲几何体

// //一堆二维向量
const points = [
    // 从三角形顶点开始（顺时针方向）
    new THREE.Vector2(50, 100),  // 屋顶顶点（起点）
    
    // 屋顶右侧（斜边）
    new THREE.Vector2(90, 60),   // 右侧屋檐
    
    // 房屋右侧墙（垂直线）
    new THREE.Vector2(90, 20),   // 右下角
    
    // 房屋底部（水平线）
    new THREE.Vector2(10, 20),   // 左下角
    
    // 房屋左侧墙（垂直线）
    new THREE.Vector2(10, 60),   // 左侧屋檐
    
    // 屋顶左侧（斜边，闭合回顶点）
    new THREE.Vector2(50, 100)   // 与起点相同（闭合路径）
];
// //以上通过一些点画出来 

// //或者通过一些线画出来，如下
// // const shape = new THREE.Shape();
// // shape.moveTo(100, 0);
// // shape.lineTo(0, 0);
// // shape.lineTo(0, 50);
// // shape.lineTo(80, 100);

//画了一个心形
// const x = 0, y = 0;
// const heartShape = new THREE.Shape();
// heartShape.moveTo( x + 5, y + 5 );
// heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
// heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
// heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
// heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
// heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
// heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

// const geometry = new THREE.ShapeGeometry( heartShape );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

const shape = new THREE.Shape(points);
//const geometry = new THREE.ShapeGeometry(shape);

const material = new THREE.MeshPhysicalMaterial({  //MeshPhysicalMaterial 使用金属质感
    color: 0xc3b1e1,
    metalness: 0.5,       // 金属度（0-1）
    roughness: 0.3,       // 粗糙度（0-1）
    clearcoat: 0.8,       // 清漆层
    clearcoatRoughness: 0.1
});
//挖孔
const path = new THREE.Path();
path.arc(50, 50, 10);
shape.holes.push(path);

const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 100
});


const mesh = new THREE.Mesh(geometry, material);

export default mesh;