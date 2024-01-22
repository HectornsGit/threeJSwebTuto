import * as THREE from "three";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
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

// Load a glTF resource
const loader = new GLTFLoader();
loader.load(
  "DONUT.gltf",
  function (gltf) {
    const model = gltf.scene;

    // This removes the random planes I exported
    model.children = model.children.filter(
      (child) => child.name !== "Plane" && child.name !== "Plane001"
    );
    // The materials weren't exported so I changed the Icing color manually.
    const icing = model.children.filter((child) => child.name == "Icing")[0];
    icing.material.color.setHex(0xff96e5);

    model.position.setZ(20);
    model.scale.set(35, 35, 35);

    scene.add(model);

    function animationDonut() {
      requestAnimationFrame(animationDonut);
      model.rotation.y += 0.01;
      model.rotation.z += 0.005;
      model.rotation.x += 0.01;
      renderer.render(scene, camera);
    }

    animationDonut();
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Torus

/* const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  color: 0x9933cc,
});

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);
 */

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

const pointLight = new THREE.PointLight(0xffffff, 180);
pointLight.position.set(12, 18, 24);

const backLight = new THREE.PointLight(0xffffff, 500);
backLight.position.set(4, 2, -2);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(pointLight, ambientLight, backLight);

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
/* function animate() {
  //requestAnimationFrame(animate);
  //controls.update();
  //renderer.render(scene, camera);
}
animate();
 */

// Resize
window.addEventListener("resize", () => {
  sizes.height = window.innerHeight;
  sizes.width = window.innerWidth;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

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
