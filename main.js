// dom elements
const canvas = document.querySelector(".canvas");

// imports
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as lilGui from "lil-gui";

// gui
const gui = new lilGui.GUI();

// screen size
const w = window.innerWidth;
const h = window.innerHeight;

// textures
const textureLoader = new THREE.TextureLoader();
textureLoader.setCrossOrigin("anonymous");
textureLoader.encoding = THREE.sRGBEncoding;

// walls textures
const wallColor = textureLoader.load(
  "/models/castle_brick_07_4k.blend/textures/castle_brick_07_diff_4k.jpg"
);
const wallDisp = textureLoader.load(
  "/models/castle_brick_07_4k.blend/textures/castle_brick_07_disp_4k.png"
);
const wallRough = textureLoader.load(
  "/models/castle_brick_07_4k.blend/textures/castle_brick_07_rough_4k.jpg"
);

// door textures
const doorColor = textureLoader.load(
  "/models/bark_brown_02_4k.blend/textures/bark_brown_02_diff_4k.jpg"
);
const doorDisp = textureLoader.load(
  "/models/bark_brown_02_4k.blend/textures/bark_brown_02_disp_4k.png"
);
const doorRough = textureLoader.load(
  "/models/bark_brown_02_4k.blend/textures/bark_brown_02_rough_4k.jpg"
);

// roof textures
const roofColor = textureLoader.load(
  "/models/roof_07_4k.blend/textures/roof_07_diff_4k.jpg"
);
const roofDisp = textureLoader.load(
  "/models/roof_07_4k.blend/textures/roof_07_disp_4k.png"
);
const roofRough = textureLoader.load(
  "/models/roof_07_4k.blend/textures/roof_07_rough_4k.jpg"
);

// grave textures
const graveColor = textureLoader.load(
  "/models/dirty_concrete_4k.blend/textures/dirty_concrete_diff_4k.jpg"
);
const graveDisp = textureLoader.load(
  "/models/dirty_concrete_4k.blend/textures/dirty_concrete_disp_4k.png"
);
const graveRough = textureLoader.load(
  "/models/dirty_concrete_4k.blend/textures/dirty_concrete_rough_4k.jpg"
);

// land texture
const landColor = textureLoader.load(
  "/models/texture/dirty_concrete_diff_4k.jpg"
);
const landDisp = textureLoader.load(
  "/models/texture/dirty_concrete_disp_4k.png"
);
const landRough = textureLoader.load(
  "/models/texture/dirty_concrete_rough_4k.jpg"
);

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
camera.position.z = 10;
camera.position.y = 3;

// object
// house group
const house = new THREE.Group();

// walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 3, 4, 300, 300),
  new THREE.MeshStandardMaterial({
    color: "#ac8e82",
    map: wallColor,
    displacementMap: wallDisp,
    roughnessMap: wallRough,
    displacementScale: 0.001,
  })
);
walls.position.y = 1.01;
house.add(walls);

// roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 2, 4, 100),
  new THREE.MeshStandardMaterial({
    color: "Brown",
    map: roofColor,
    displacementMap: roofDisp,
    roughnessMap: roofRough,
    displacementScale: 0.001,
  })
);
roof.position.y = 3.5;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

// door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2, 100, 100),
  new THREE.MeshStandardMaterial({
    color: "brown",
    map: doorColor,
    displacementMap: doorDisp,
    roughnessMap: doorRough,
    displacementScale: 0.001,
  })
);
door.position.z = 2.01;
door.position.y = 0.5;
house.add(door);

// door light
const doorLight = new THREE.PointLight("#e15e25", 15, 100);
doorLight.position.set(0, 2.2, 2.7);
scene.add(doorLight);

// bushes
const bushe1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 100, 100),
  new THREE.MeshStandardMaterial({ color: "#89c854" })
);
bushe1.position.set(1, -0.15, 2.3);

const bushe2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.3, 100, 100),
  new THREE.MeshStandardMaterial({ color: "#89c854" })
);
bushe2.position.set(1.7, -0.29, 2.2);

const bushe3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.3, 100, 100),
  new THREE.MeshStandardMaterial({ color: "#89c854" })
);
bushe3.position.set(-1.4, -0.29, 2.9);

const bushe4 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 100, 100),
  new THREE.MeshStandardMaterial({ color: "#89c854" })
);
bushe4.position.set(-1, -0.15, 2.3);

house.add(bushe1, bushe2, bushe3, bushe4);

// grave yard
const graves = new THREE.Group();
scene.add(graves);

const graveGeo = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMat = new THREE.MeshStandardMaterial({
  color: "grey",
  map: graveColor,
  displacementMap: graveDisp,
  roughnessMap: graveRough,
  displacementScale: 0.001,
});

for (let i = 0; i <= 50; i++) {
  const angel = Math.random() * Math.PI * 2;
  const radius = 5 + Math.random() * 12;
  const x = Math.sin(angel) * radius;
  const z = Math.cos(angel) * radius;

  const grave = new THREE.Mesh(graveGeo, graveMat);
  grave.position.set(x, -0.1, z);
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  graves.add(grave);
}

// fog
const fog = new THREE.Fog("#262837", 0, 17);
scene.fog = fog;

// plane land
const geoLand = new THREE.PlaneGeometry(70, 70, 100, 100);
const matLand = new THREE.MeshStandardMaterial({
  color: "green",
  map: landColor,
  displacementMap: landDisp,
  displacementScale: 0.001,
});
matLand.side = THREE.DoubleSide;
const land = new THREE.Mesh(geoLand, matLand);
land.rotation.x = -(Math.PI * 0.5);
land.position.y = -0.5;

// adding to scene
scene.add(land, house);

// light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.1);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("#purple", 0.1);
directionalLight.position.set(0.21, 1, 1.3);
scene.add(directionalLight);

// adding to gui

gui.add(camera.position, "x").min(-10).max(10).step(0.01).name("cameraX");
gui.add(camera.position, "y").min(0).max(10).step(0.01).name("cameraY");
gui.add(camera.position, "z").min(5).max(20).step(0.01).name("cameraZ");
// gui.add(directionalLight.position, "x").min(-5).max(5).step(0.01).name("DL-X");
// gui.add(directionalLight.position, "y").min(-5).max(5).step(0.01).name("DL-Y");
// gui.add(directionalLight.position, "z").min(-5).max(5).step(0.01).name("DL-Z");
// gui
//   .add(directionalLight, "intensity")
//   .min(0)
//   .max(100)
//   .step(0.01)
//   .name("intensity");

// rendered
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(w, h);
renderer.setClearColor("#262837");

// orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// animate function
const animate = () => {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
};
animate();
