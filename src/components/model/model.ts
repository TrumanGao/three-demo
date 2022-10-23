import { Group, AxesHelper } from "three";
import {
  GLTFLoader,
  type GLTF,
} from "three/examples/jsm/loaders/GLTFLoader.js";
// import Model from "../../assets/models/flower.glb";
// import Model from "../../assets/models/black_dread.glb";
import Model from "../../assets/models/presidential_state_car.glb";

// 二、导入模型
export function setModel() {
  const loader = new GLTFLoader();
  return new Promise((resolve: (value: Group) => void, reject) => {
    loader.load(
      Model,
      (gltf: GLTF) => {
        console.log("导入模型gltf: ", gltf);

        const axes = new AxesHelper(4);
        gltf.scene.add(axes);

        transformModel(gltf.scene);

        animateModel(gltf.scene);

        resolve(gltf.scene);
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
  _model.scale.set(0.6, 0.6, 0.6);
}

// 模型运动
export function animateModel(_model: Group) {
  requestAnimationFrame(() => {
    _model.rotation.y -= 0.002;
    animateModel(_model);
  });
}
