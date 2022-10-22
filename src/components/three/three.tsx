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
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

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

    // 创建光线，添加进场景
    const light = new PointLight();
    light.position.set(50, 50, 50);
    scene.add(light);

    // 一、创建立方体，添加进场景，并调整摄像机位置
    const geometry = new BoxGeometry(2, 2, 2);
    const meterial = new MeshLambertMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, meterial);
    scene.add(cube);
    camera.position.z = 5;

    // 二、导入gltf
    const loader = new GLTFLoader();
    // loader.load(
    //   "**.gltf",
    //   function (gltf) {
    //     console.log("gltf: ", gltf);
    //     scene.add(gltf.scene);
    //   },
    //   function (xhr) {
    //     console.log("xhr: ", xhr);
    //   },
    //   function (error) {
    //     console.log("error: ", error);
    //   }
    // );

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
