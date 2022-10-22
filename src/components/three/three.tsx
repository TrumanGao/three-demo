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
import Flower from "../../assets/models/flower.glb";
import Land from "../../assets/models/land.glb";

export const Three = () => {
  // 一、创建立方体，添加进场景，并调整摄像机位置
  function addCube(_scene, _camera) {
    const geometry = new BoxGeometry(1, 1, 1);
    const meterial = new MeshLambertMaterial({ color: "#a52a2a" });
    const cube = new Mesh(geometry, meterial);
    _scene.add(cube);
    animateCube(cube);

    return cube;
  }
  // 立方体运动
  function animateCube(_cube) {
    requestAnimationFrame(() => {
      _cube.rotation.x += 0.01;
      _cube.rotation.y += 0.02;
      animateCube(_cube);
    });
  }
  // 二、导入花模型
  function addFlower(_scene) {
    const loader = new GLTFLoader();
    return new Promise((resolve, reject) => {
      loader.load(
        Flower,
        // Land,
        function (gltf) {
          console.log("导入花模型gltf: ", gltf);
          _scene.add(gltf.scene);
          animateFlower(gltf.scene);

          resolve(gltf.scene);
        },
        function (xhr) {
          console.log("导入花模型xhr: ", xhr);
        },
        function (error) {
          console.log("导入花模型error: ", error);
          reject(error);
        }
      );
    });
  }
  // 花运动
  function animateFlower(_flower) {
    requestAnimationFrame(() => {
      _flower.rotation.x += 0.01;
      _flower.rotation.y += 0.02;
      animateCube(_flower);
    });
  }

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

    // 一、导入立方体
    addCube(scene, camera);
    // 二、导入模型
    addFlower(scene);
    // 调整摄像机位置
    camera.position.z = 5;

    // 执行渲染D
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return <div className="three-container"></div>;
};
