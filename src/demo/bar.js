import * as THREE from 'three';

const group = new THREE.Group();

function createLine(type) {
    const points = [
        new THREE.Vector3(0, 0, 0),
        type === 'y' ? new THREE.Vector3(0, 100, 0) : new THREE.Vector3(100, 0, 0),
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    return new THREE.Line(geometry, material);
}

function createScaleLine(type) {
    const points = [];
    for (let i = 0; i <= 100; i += 10) {
        if (type === 'y') {
            points.push(new THREE.Vector3(0, i, 0), new THREE.Vector3(-5, i, 0));
        } else {
            points.push(new THREE.Vector3(i, 0, 0), new THREE.Vector3(i, -5, 0));
        }
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    return new THREE.LineSegments(geometry, material);
}

// ⬇️ 核心：生成每个柱子独立的渐变纹理（从下到上）
function createGradientTexture(value, maxValue, colorStops) {
    const canvas = document.createElement('canvas');
    const height = 256;
    canvas.width = 1;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, height, 0, 0); // bottom to top

    const stopCount = colorStops.length;
    const maxLevel = stopCount - 1;
    const normalized = Math.min(value / maxValue, 1) * maxLevel;

    for (let i = 0; i < Math.floor(normalized); i++) {
        const offset = i / maxLevel;
        gradient.addColorStop(offset, colorStops[i]);
    }

    // 插值最后一段
    const floorIndex = Math.floor(normalized);
    const ceilIndex = Math.min(floorIndex + 1, stopCount - 1);
    const t = normalized - floorIndex;

    const col1 = new THREE.Color(colorStops[floorIndex]);
    const col2 = new THREE.Color(colorStops[ceilIndex]);
    const blended = col1.clone().lerp(col2, t).getStyle();
    gradient.addColorStop(normalized / maxLevel, blended);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1, height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearFilter;
    return texture;
}

function createBar(dataArr, maxValue = 50) {
    const bars = new THREE.Group();
    const colorStops = ['#ff0000', '#ffa500', '#00ff00', '#0000ff']; // 红→橙→绿→蓝

    dataArr.forEach((value, index) => {
        const width = 10;
        const height = value;
        const geometry = new THREE.PlaneGeometry(width, height);

        const texture = createGradientTexture(value, maxValue, colorStops);
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: false,
        });

        const bar = new THREE.Mesh(geometry, material);
        bar.position.set(index * 20 + 15, height / 2, 0);
        bars.add(bar);
    });

    return bars;
}

// 添加所有组件
const xLine = createLine('x');
const yLine = createLine('y');
const xScaleLine = createScaleLine('x');
const yScaleLine = createScaleLine('y');

const bar = createBar([10, 20, 30, 35, 40, 45], 45);

group.add(xLine, yLine, xScaleLine, yScaleLine, bar);

export default group;
