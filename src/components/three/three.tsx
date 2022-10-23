import React, { useEffect } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  DirectionalLightHelper,
} from "three";
import "./three.less";
import Stat from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { setCube } from "../cube/cube";
import { setModel as setModelCar } from "../car/car";

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

    // 帧率检测
    const stat = Stat();
    threeContainer?.appendChild(stat.domElement);

    // 创建场景
    const scene = new Scene();

    // 创建摄像机
    const camera = new PerspectiveCamera(
      50,
      (threeContainer?.clientWidth || 0) / (threeContainer?.clientHeight || 0),
      0.1,
      2000
    );
    camera.position.z = 5;

    // 创建光线-环境光
    const ambientLight = new AmbientLight(0x404040);
    ambientLight.position.set(100, 100, 100);
    scene.add(ambientLight);
    // 创建光线-平行光
    const directionLight = new DirectionalLight(0xffffff, 1);
    directionLight.position.set(100, 100, 100);
    scene.add(directionLight);
    // 创建平行光参考线
    const directionalLightHelper = new DirectionalLightHelper(
      directionLight,
      undefined,
      "#000000"
    );
    scene.add(directionalLightHelper);

    // 创建物体
    if (new Date().getHours() % 3) {
      const cube = setCube();
      scene.add(cube);
    } else {
      setModelCar().then((models) => models.map((model) => scene.add(model)));
    }

    // 添加控制
    new OrbitControls(camera, renderer.domElement);

    // 执行渲染D
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      stat.update();
    }
    animate();
  }, []);

  return <div className="three-container"></div>;
};
