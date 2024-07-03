import './App.css'
import * as THREE from "three";
import { useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';

function App() {
  let canvas: HTMLCanvasElement;
  let model: THREE.Group;

  useEffect(() => {
   canvas = document.getElementById("canvas") as HTMLCanvasElement;

const sizes = {
  width: innerWidth,
  height: innerHeight,
};

//scene
const scene: THREE.Scene = new THREE.Scene();

//camera
const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(0,0,2);

//renderer
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
canvas: canvas,
antialias: true,
  });
renderer.setSize(sizes.width,sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

//inport3Dmodel
const gltfLoader = new GLTFLoader();

gltfLoader.load('./public/4dP.gltf', (gltf) => {
  model = gltf.scene;
  scene.add(model);
});

// 平行光源
const light1 = new THREE.DirectionalLight(0xFFFFFF);
light1.intensity = 4; // 光の強さを倍に
light1.position.set(-1, 1, 1);
// シーンに追加
scene.add(light1);

const light2 = new THREE.DirectionalLight(0xFFFFFF);
light2.intensity = 2; // 光の強さを倍に
light2.position.set(1, 1, 1);
// シーンに追加
scene.add(light2);


//animation 
const tick = () => {
  renderer.render(scene,camera);
  requestAnimationFrame(tick);
};
tick();
  },[]);

  return( 
    <>
    <canvas id="canvas"></canvas>
  <div className="mainContent"></div>
  </>
  )
}

export default App;
