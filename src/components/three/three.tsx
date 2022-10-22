import React, { useEffect } from "react";
import "./three.less";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Mesh,
  MeshLambertMaterial,
  BoxGeometry,
  PointLight,
} from "three";

export const Three = () => {
  useEffect(() => {
    // 创建容器
    const threeContainer = document.querySelector(".three-container");
    const renderer = new WebGLRenderer();
    renderer.setSize(
      threeContainer?.clientWidth || 0,
      threeContainer?.clientHeight || 0
    );
    threeContainer?.appendChild(renderer.domElement);

    // 创建场景
    const scene = new Scene();

    // 创建摄像机
    const camera = new PerspectiveCamera(
      75,
      (threeContainer?.clientWidth || 0) / (threeContainer?.clientHeight || 0),
      0.1,
      1000
    );

    // 创建立方体，添加进场景
    const geometry = new BoxGeometry(2, 2, 2);
    const meterial = new MeshLambertMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, meterial);
    scene.add(cube);

    // 调整摄像机位置
    camera.position.z = 5;

    // 创建光线，添加进场景
    const light = new PointLight();
    light.position.set(50, 50, 50);
    scene.add(light);

    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.02;
      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return <div className="three-container"></div>;
};
