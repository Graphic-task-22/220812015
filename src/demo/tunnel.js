import * as THREE from 'three';

//CatmullRom 样条曲线

//创建一个三维样条曲线
const curve = new THREE.CatmullRomCurve3([
    // 起始段（水平延伸+缓升）
    new THREE.Vector3(-100, 0, 0),      // 起点
    new THREE.Vector3(-80, 10, -20),    // 开始上升并左转
    new THREE.Vector3(-60, 20, -40),    // 继续升高
    
    // 中段（大弧度右转+起伏）
    new THREE.Vector3(-40, 15, -60),    // 轻微下降
    new THREE.Vector3(-20, 0, -80),     // 回归水平
    new THREE.Vector3(0, -10, -70),     // 下沉并右转
    new THREE.Vector3(20, -5, -50),     // 回升
    
    // 后段（螺旋上升+返回）
    new THREE.Vector3(40, 10, -30),     // 加速上升
    new THREE.Vector3(60, 30, -10),     // 顶部弯道
    new THREE.Vector3(80, 20, 20),      // 下降并转向
    new THREE.Vector3(100, 0, 40),      // 水平收尾
    
    // 可选：闭合环路（取消注释以下点）
    new THREE.Vector3(80, -10, 60),
    new THREE.Vector3(50, -20, 70),
    new THREE.Vector3(20, -10, 60),
    new THREE.Vector3(0, 0, 50),
    new THREE.Vector3(-30, 10, 30),
    new THREE.Vector3(-60, 20, 10),
    new THREE.Vector3(-90, 10, -10)   // 接回起点附近
]);


//画出一个“管道”
const geometry = new THREE.TubeGeometry(curve, 100, 10, 32, true);

const loader =new THREE.TextureLoader();
const texture=loader.load('./src/assets/纹理纸张.jpg');
texture.wrapS=THREE.RepeatWrapping;
texture.colorSpace=THREE.SRGBColorSpace;

//texture.repeat.x=20; 
//同样可以使用，如下
texture.repeat.set(20, 1);  

const materail=new THREE.MeshLambertMaterial({
    color:0xf8f8ff,
    side:THREE.DoubleSide,
    map:texture,
    aoMap:texture   //aomap深度
    //wireframe:true
})


const tube=new THREE.Mesh(geometry,materail);


export const tubepoints=curve.getPoints(300);//export把点导出  测试这里面点越多，移动速度越慢

export default tube;
