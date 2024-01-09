import * as THREE from "three";

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

// Geometry
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({
  color: 0xff6347,
  wireframe: true,
});

const torus = new THREE.Mesh(geometry, material);
scene.add(torus);
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(sizes.width, sizes.height);

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.y += 0.01;
  torus.rotation.x += 0.01;

  renderer.render(scene, camera);
}
animate();
