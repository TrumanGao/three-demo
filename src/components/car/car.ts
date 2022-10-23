import {
  Group,
  AxesHelper,
  PlaneGeometry,
  MeshLambertMaterial,
  Mesh,
} from "three";
import {
  GLTFLoader,
  type GLTF,
} from "three/examples/jsm/loaders/GLTFLoader.js";
import Model from "../../assets/models/car.glb";

// 二、导入模型
export function setModel() {
  // 添加地面
  const planeGeometry = new PlaneGeometry(5, 5);
  const planeMeterial = new MeshLambertMaterial({ color: "#999999" });
  const plane = new Mesh(planeGeometry, planeMeterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.8;

  const loader = new GLTFLoader();
  return new Promise((resolve: (value: (Mesh | Group)[]) => void, reject) => {
    loader.load(
      Model,
      (gltf: GLTF) => {
        console.log("导入模型gltf: ", gltf);

        const axes = new AxesHelper(4);
        gltf.scene.add(axes);

        transformModel(gltf.scene);

        animateModel(gltf.scene);

        resolve([plane, gltf.scene]);
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
