import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import Model from "../../assets/models/flower.glb";
// import Model from "../../assets/models/black_dread.glb";
import Model from "../../assets/models/presidential_state_car.glb";

// 二、导入模型
export function addModel(_scene) {
  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.load(
      Model,
      (gltf) => {
        console.log("导入模型gltf: ", gltf);
        _scene.add(gltf.scene);
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

// 模型运动
export function animateModel(_model) {
  requestAnimationFrame(() => {
    _model.rotation.y -= 0.002;
    animateModel(_model);
  });
}
