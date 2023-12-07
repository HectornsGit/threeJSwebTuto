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

// Renderer

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
