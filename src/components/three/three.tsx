import React, { useEffect } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AmbientLight,
  DirectionalLight,
  DirectionalLightHelper,
  AnimationMixer,
  Clock,
  PMREMGenerator,
} from "three";
import { LoopOnce, LoopRepeat } from "three/src/constants";
import "./three.less";
import Stat from "three/examples/jsm/libs/stats.module";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";
import { subclip } from "three/src/animation/AnimationUtils";

import { setCube } from "../cube/cube";
import { setModel as setModelCar } from "../car/car";
import { setModel as setModelDinosaur } from "../dinosaur/dinosaur";
import { setModel as setModelDragonSit } from "../dragon_sit/dragon_sit";
import { setModel as setModelRobot } from "../robot/robot";
import { setModel as setModelTiger } from "../tiger/tiger";
import { setModel as setModelTestGlb } from "../test-glb/test-glb";

export const Three = () => {
  useEffect(() => {
    // 创建时钟
    const clock = new Clock();

    // 获取容器
    const threeContainer = document.querySelector(".three-container");

    // 渲染器
    const renderer = new WebGLRenderer();
    renderer.setSize(
      threeContainer?.clientWidth || 0,
      threeContainer?.clientHeight || 0
    );
    renderer.setClearColor("#999999");
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
    const ambientLight = new AmbientLight(0x404040, 1);
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
    // scene.add(directionalLightHelper);
    // 创建光线-平行光2
    const directionLight2 = new DirectionalLight(0xffffff, 0.5);
    directionLight2.position.set(-100, 0, -100);
    scene.add(directionLight2);
    // 创建平行光2参考线
    const directionalLightHelper2 = new DirectionalLightHelper(
      directionLight2,
      undefined,
      "#000000"
    );
    // scene.add(directionalLightHelper2);

    // 创建皮肤
    const pmremGenerator = new PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture;

    // 创建物体
    async function setModel() {
      const test: number = 7;
      let models: unknown[] | Promise<unknown[]> = [];
      switch (test) {
        case 1:
          models = setCube();
          break;
        case 2:
          models = await setModelCar();
          break;
        case 3:
          models = await setModelDinosaur();
          break;
        case 4:
          models = await setModelDragonSit();
          break;
        case 5:
          models = await setModelRobot();
          break;
        case 6:
          models = await setModelTiger();
          break;
        case 7:
          models = await setModelTestGlb();
          break;
        default:
          break;
      }
      return models;
    }

    setModel().then((models) => {
      const mixers: undefined[] | AnimationMixer[] = [];
      models.map((model) => {
        switch (model.type) {
          case "Mesh":
            scene.add(model.data);
            break;
          case "GLTF":
            if (model.data.animations?.length) {
              const mixer = new AnimationMixer(model.data.scene);
              mixers.push(mixer);
              model.data.animations.map((animation) => {
                const action = mixer.clipAction(
                  subclip(animation, "A", 0, 100)
                );
                action.play().setLoop(LoopRepeat, 99);
              });
            }
            scene.add(model.data.scene);
            break;
          default:
            break;
        }
      });

      // 添加控制
      new OrbitControls(camera, renderer.domElement);

      // 执行渲染D
      function animate() {
        renderer.render(scene, camera);
        stat.update();
        if (mixers.length) {
          mixers.map((mixer) => {
            mixer.update(clock.getDelta());
          });
        }
        requestAnimationFrame(animate);
      }

      animate();
    });
  }, []);

  return <div className="three-container"></div>;
};
