import { BoxGeometry, MeshLambertMaterial, Mesh } from "three";

// 一、创建立方体，添加进场景，并调整摄像机位置
export function setCube() {
  const geometry = new BoxGeometry(1, 1, 1);
  const meterial = new MeshLambertMaterial({ color: "#a52a2a" });
  const cube = new Mesh(geometry, meterial);

  transformCube(cube);

  animateCube(cube);

  return cube;
}

// 立方体变形
export function transformCube(_cube: Mesh) {
  _cube.rotation.set(1, 1, 1);
}

// 立方体运动
export function animateCube(_cube: Mesh) {
  requestAnimationFrame(() => {
    _cube.rotation.x += 0.01;
    _cube.rotation.y += 0.02;
    animateCube(_cube);
  });
}
