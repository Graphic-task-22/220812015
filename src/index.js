import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import cube from './mesh/cube';
import sphere from './mesh/sphere';
import plane from './mesh/plane';
import sprite from './sprite'; // 导入精灵模块
import CubicBezierCurve3 from './line/CubicBezierCurve3' // 引入贝塞尔曲线
import CubicBezierCurve2 from './line/QuadraticBezierCurve'
import curvePath from './line/curvePath'
import moutain, { updatePosition } from './demo/moutain'
import bufferG from './mesh/buffer'
import lathe from './line/lathe'
import tube from './mesh/tube'
import shape from './mesh/shape'
import tunnel, { tubepoints } from './demo/tunnel'



let renderer, camera, scene, ambientLight; // 全局变量 场景、相机、渲染器,环境光

function init() {
  // Create a scene
  scene = new THREE.Scene();
  console.log('cube', cube);

  // Add the cube to the scene
  //scene.add(cube);

  // Add the sphere to the scene
  // scene.add(sphere);

  // // Add the plane to the scene
  // //scene.add(plane);

  // // 添加精灵到场景
  // scene.add(sprite);


  // //二维贝塞尔
  // scene.add(CubicBezierCurve2);

  // //三维贝塞尔
  // scene.add(CubicBezierCurve3);

  // curvePath
  // scene.add(curvePath);

  //添加moutain js
  //scene.add(moutain);

  //buffer.js 先构建一个平面从而构建立体图形
  //scene.add(bufferG);

  //lathe 车削缓冲体
  //scene.add(lathe);

  //管道缓冲体
  //scene.add(tube);

  //形状缓冲几何体
  //scene.add(shape);

  //tunnel
  scene.add(tunnel);

  // 环境光
  ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  // 点光源
  const pointLight = new THREE.PointLight(0xffffff, 1); // 添加点光源
  pointLight.position.set(5, 5, 5); // 设置光源位置
  scene.add(pointLight);

  // Create a camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    500
  );
  camera.position.set(400, 400, 400);
  // 设置相机看向的位置
  camera.lookAt(0, 0, 0);

  // Create a renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  // Add the canvas element created by the renderer to document body
  document.body.appendChild(renderer.domElement);
}

// 窗口大小调整
window.onresize = function () {
  if (!renderer) return;
  // 重置渲染器输出画布canvas尺寸
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新相机投影矩阵
  camera.updateProjectionMatrix();
};




// 初始化辅助工具
function initHelper() {
  // 辅助坐标轴
  const axesHelper = new THREE.AxesHelper(50);
  scene.add(axesHelper);

  // 设置相机控件轨道控制器OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
  });

  // 添加一个辅助网格地面
  const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
  scene.add(gridHelper);
}



// 动画循环
// function animate() {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);
//   updatePosition();

//以下是tunnel的动画，使得他在隧道里走
let i=0;
function animate(){
  if(i<tubepoints.length-1){
    const points=tubepoints[i];
    camera.position.copy(points);
    const nextPoint=tubepoints[i+1];  //nextpoint每次加一
    camera.lookAt(nextPoint);         //摄像机永远看向nextpoint
    i++
  }else{
    i=0;
  }
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}
document.addEventListener('keydown',(e)=>{
  if(e.code==='ArrowDown'){
    i+=1;  
  }
});



  // // 立方体旋转 cube.js里面
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;

// }

// 初始化性能监控
function initStats() {
  const stats = new Stats();
  document.body.appendChild(stats.domElement);
  // 渲染函数
  function render() {
    stats.update();
    renderer.render(scene, camera); //执行渲染操作
    requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  }
  render();
}

// 初始化
init();
initHelper();
initStats();
animate();



//旁边的更改下拉框
// 创建 GUI 实例
const gui = new GUI();

// 默认值对象
const defaults = {
  ambientColor: ambientLight.color.getHex(), // 环境光颜色
  ambientIntensity: ambientLight.intensity, // 环境光强度
  cubeColor: cube.material.color.getHex(), // 立方体颜色
  cubePosition: { x: cube.position.x, y: cube.position.y, z: cube.position.z }, // 立方体位置
  cubeRotation: { x: cube.rotation.x, y: cube.rotation.y, z: cube.rotation.z }, // 立方体旋转
  cubeScale: { x: cube.scale.x, y: cube.scale.y, z: cube.scale.z }, // 立方体缩放
};

// 添加环境光控件
const ambientFolder = gui.addFolder('环境光');
ambientFolder.addColor(defaults, 'ambientColor').name('颜色').onChange((value) => {
  ambientLight.color.set(value); // 更新环境光颜色
});
ambientFolder.add(ambientLight, 'intensity', 0, 2).name('强度');

// 添加立方体控件
const cubeFolder = gui.addFolder('立方体');
cubeFolder.addColor(defaults, 'cubeColor').name('颜色').onChange((value) => {
  cube.material.color.set(value); // 更新立方体颜色
});

// 立方体位置
const positionFolder = cubeFolder.addFolder('位置');
positionFolder.add(cube.position, 'x', -100, 100).name('x坐标');
positionFolder.add(cube.position, 'y', -100, 100).name('y坐标');
positionFolder.add(cube.position, 'z', -100, 100).name('z坐标');

// 立方体旋转
const rotationFolder = cubeFolder.addFolder('旋转');
rotationFolder.add(cube.rotation, 'x', 0, Math.PI * 2).name('x轴');
rotationFolder.add(cube.rotation, 'y', 0, Math.PI * 2).name('y轴');
rotationFolder.add(cube.rotation, 'z', 0, Math.PI * 2).name('z轴');

// 立方体缩放
const scaleFolder = cubeFolder.addFolder('缩放');
scaleFolder.add(cube.scale, 'x', 0.1, 5).name('x轴');
scaleFolder.add(cube.scale, 'y', 0.1, 5).name('y轴');
scaleFolder.add(cube.scale, 'z', 0.1, 5).name('z轴');

// 动画控制
const animationFolder = gui.addFolder('动画控制');
let isAnimating = true; // 动画状态
animationFolder.add({ start: () => (isAnimating = true) }, 'start').name('启动动画');
animationFolder.add({ stop: () => (isAnimating = false) }, 'stop').name('停止动画');

// 重置按钮
gui.add({
  reset: () => {
    // 恢复默认值
    ambientLight.color.set(defaults.ambientColor);
    ambientLight.intensity = defaults.ambientIntensity;
    cube.material.color.set(defaults.cubeColor);
    cube.position.set(defaults.cubePosition.x, defaults.cubePosition.y, defaults.cubePosition.z);
    cube.rotation.set(defaults.cubeRotation.x, defaults.cubeRotation.y, defaults.cubeRotation.z);
    cube.scale.set(defaults.cubeScale.x, defaults.cubeScale.y, defaults.cubeScale.z);
    // 更新 GUI 控件的值
    gui.updateDisplay();
  },
}, 'reset').name('重置默认值');

// 关闭菜单
gui.close();
