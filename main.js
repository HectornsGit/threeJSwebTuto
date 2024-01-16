import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Scene
const scene = new THREE.Scene();

// Sizes
const sizes = { width: window.innerWidth, height: window.innerHeight };

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.setZ(30);

// Torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0x9933cc,
});

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

// Moon
const moonTexture = new THREE.TextureLoader().load("moon.jpg");
const moonNormals = new THREE.TextureLoader().load("normal.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: moonNormals })
);

moon.position.z = 30;
moon.position.setX(-10);

scene.add(moon);

// Light

const pointLight = new THREE.PointLight(0xffffff, 100);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers
/* const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper);
scene.add(gridHelper); */

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);

// Controls
//const controls = new OrbitControls(camera, renderer.domElement);

// Procedural geometry generation
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

// Background
const spaceTexture = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceTexture;

// Animation
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.y += 0.01;
  torus.rotation.z += 0.005;
  torus.rotation.x += 0.01;

  //controls.update();

  renderer.render(scene, camera);
}
animate();

// Scroll event

function moveCamera() {
  const topScreen = document.body.getBoundingClientRect().top;
  camera.position.z = 30 + topScreen * -0.05;
  camera.position.x = topScreen * -0.002;
  camera.position.y = topScreen * -0.008;

  moon.rotation.y += 0.05;
  moon.rotation.z += 0.03;
  moon.rotation.x += 0.05;
}

document.body.onscroll = moveCamera;
