import { Group, AxesHelper, Mesh } from "three";
import {
  GLTFLoader,
  type GLTF,
} from "three/examples/jsm/loaders/GLTFLoader.js";
import Model from "../../assets/models/dragon_sit.glb";

// 二、导入模型
export function setModel() {
  const loader = new GLTFLoader();
  return new Promise((resolve: (value: unknown[]) => void, reject) => {
    loader.load(
      Model,
      (gltf: GLTF) => {
        console.log("导入模型gltf: ", gltf);

        const axes = new AxesHelper(4);
        gltf.scene.add(axes);

        transformModel(gltf.scene);

        animateModel(gltf.scene);

        resolve([{data:gltf, type:'GLTF'}]);
      },
      (xhr) => {
        console.log("导入模型xhr: ", xhr);
      },
      (error) => {
        console.log("导入模型error: ", error);
        reject(error);
      }
    );
  });
}

// 模型变形
export function transformModel(_model: Group) {
  _model.position.set(0, -0.8, 0);
  // _model.rotation.x = 0.02; // 弧度换算为角度： val * (Math.PI / 180)
  _model.scale.set(0.4, 0.4, 0.4);
}

// 模型运动
export function animateModel(_model: Group) {
  requestAnimationFrame(() => {
    _model.rotation.y -= 0.002;
    animateModel(_model);
  });
}
