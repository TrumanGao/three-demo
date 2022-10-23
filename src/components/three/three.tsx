import React, { useEffect } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
} from "three";
import "./three.less";
import { addModel } from "../model/model";
import { addCube } from "../cube/cube";

export const Three = () => {
  useEffect(() => {
    // 获取容器
    const threeContainer = document.querySelector(".three-container");

    // 渲染器
    const renderer = new WebGLRenderer();
    renderer.setSize(
      threeContainer?.clientWidth || 0,
      threeContainer?.clientHeight || 0
    );
    renderer.setClearColor(0xffffff);
    threeContainer?.appendChild(renderer.domElement);

    // 创建场景
    const scene = new Scene();

    // 创建摄像机
    const camera = new PerspectiveCamera(
      100,
      (threeContainer?.clientWidth || 0) / (threeContainer?.clientHeight || 0),
      0.1,
      1000
    );

    // 创建光线，添加进场景
    const ambientLight = new AmbientLight(0x404040);
    ambientLight.position.set(50, 50, 50);
    scene.add(ambientLight);

    const directionLight = new DirectionalLight(0xffffff, 1);
    directionLight.position.set(0, 20, 20);
    directionLight.castShadow = true;
    scene.add(directionLight);

    if (new Date().getHours() % 2) {
      // 一、导入立方体
      addCube(scene, camera);
      // 调整摄像机位置
      camera.position.z = 3;
    } else {
      // 二、导入模型
      addModel(scene);
      camera.position.z = 5;
      camera.position.y = 1.2;
    }

    // 执行渲染D
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return <div className="three-container"></div>;
};
