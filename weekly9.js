//Morgan Lincicum
//Weekly Challenge 8 - Medieval Courtyard
//10/27/26

import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//Texture Loader + Textures

//Wood Gate + Crates: 
// Wooden Barrel
// Poly Haven
// https://polyhaven.com/a/wooden_barrel
//Stone Wall: 
// Medieval Blocks 03
// Poly Haven
// https://polyhaven.com/a/medieval_blocks_03
//Brick Floor: 
// Medieval Blocks 02
// Poly Haven
// https://polyhaven.com/a/medieval_blocks_02
//Fabric: 
// Quatrefoil Jacquard Fabric
// Poly Haven
// https://polyhaven.com/a/quatrefoil_jacquard_fabric
const textureLoader = new THREE.TextureLoader();
const stoneColorMap = textureLoader.load('textures/stone/medieval_blocks_03_diff_4k.jpg');
stoneColorMap.wrapS = THREE.RepeatWrapping;
stoneColorMap.wrapT = THREE.RepeatWrapping;
stoneColorMap.repeat.set(4, 4);
const brickColorMap = textureLoader.load('textures/brick/medieval_blocks_02_diff_4k.jpg');
brickColorMap.wrapS = THREE.RepeatWrapping;
brickColorMap.wrapT = THREE.RepeatWrapping;
brickColorMap.repeat.set(10, 10);
const fabricColorMap = textureLoader.load('textures/fabric/quatrefoil_jacquard_fabric_diff_4k.jpg');
fabricColorMap.wrapS = THREE.RepeatWrapping;
fabricColorMap.wrapT = THREE.RepeatWrapping;
fabricColorMap.repeat.set(0.125, 0.125);

const woodColorMap = textureLoader.load('textures/wood/wooden_barrel_diff_4k.jpg');


const stoneNormalMap = textureLoader.load('textures/stone/medieval_blocks_03_nor_gl_4k.exr');
stoneNormalMap.wrapS = THREE.RepeatWrapping;
stoneNormalMap.wrapT = THREE.RepeatWrapping;
stoneNormalMap.repeat.set(4, 4);

const brickNormalMap = textureLoader.load('textures/brick/medieval_blocks_02_nor_gl_4k.exr');
brickNormalMap.wrapS = THREE.RepeatWrapping;
brickNormalMap.wrapT = THREE.RepeatWrapping;
brickNormalMap.repeat.set(10, 10);

const fabricNormalMap = textureLoader.load('textures/fabric/quatrefoil_jacquard_fabric_nor_gl_4k.exr');
fabricNormalMap.wrapS = THREE.RepeatWrapping;
fabricNormalMap.wrapT = THREE.RepeatWrapping;
fabricNormalMap.repeat.set(0.125, 0.125);
const woodNormalMap = textureLoader.load('textures/wood/wooden_barrel_nor_gl_4k.exr');

const stoneRoughnessMap = textureLoader.load('textures/stone/rough.png');
stoneRoughnessMap.wrapS = THREE.RepeatWrapping;
stoneRoughnessMap.wrapT = THREE.RepeatWrapping;
stoneRoughnessMap.repeat.set(4, 4);
const brickRoughnessMap = textureLoader.load('textures/brick/medieval_blocks_02_rough_4k.jpg');
brickRoughnessMap.wrapS = THREE.RepeatWrapping;
brickRoughnessMap.wrapT = THREE.RepeatWrapping;
brickRoughnessMap.repeat.set(10, 10);
const fabricRoughMap = textureLoader.load('textures/fabric/quatrefoil_jacquard_fabric_rough_2k.png');
fabricRoughMap.wrapS = THREE.RepeatWrapping;
fabricRoughMap.wrapT = THREE.RepeatWrapping;
fabricRoughMap.repeat.set(0.125, 0.125);
const woodRoughMap = textureLoader.load('textures/wood/wooden_barrel_rough_2k.png');

const fabricAOMap = textureLoader.load('textures/fabric/fabricAO.png');

// ----------------------------------------------------
// Scene
// ----------------------------------------------------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// ----------------------------------------------------
// Camera
// ----------------------------------------------------
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(20, 15, 20);

// ----------------------------------------------------
// Renderer
// ----------------------------------------------------
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

// ----------------------------------------------------
// Orbit Controls
// Allows Zoom, Pan, Orbit (Tilt/Rotate)
// ----------------------------------------------------
const controls = new OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;
controls.dampingFactor = 0.05;

// ----------------------------------------------------
// Ground Plane
// ----------------------------------------------------
const groundGeometry = new THREE.PlaneGeometry(100, 100);

const groundMaterial = new THREE.MeshStandardMaterial({
    map: brickColorMap,
    normalMap: brickNormalMap,
    roughnessMap: brickRoughnessMap
});

const ground = new THREE.Mesh(
    groundGeometry,
    groundMaterial
);

ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;

scene.add(ground);

// ----------------------------------------------------
// Objects
// ----------------------------------------------------
const cubeGeometry = new THREE.BoxGeometry(4, 4, 4);

const wallMaterial = new THREE.MeshStandardMaterial({
    map: stoneColorMap,
    normalMap: stoneNormalMap,
    roughnessMap: stoneRoughnessMap
});

const bannerMaterial = new THREE.MeshStandardMaterial({
    map: fabricColorMap,
    normalMap: fabricNormalMap,
    roughnessMap: fabricRoughMap,
    aoMap: fabricAOMap
})

const woodMaterial = new THREE.MeshStandardMaterial({
    map: woodColorMap,
    normalMap: woodNormalMap,
    roughnessMap: woodRoughMap
})

//Walls
const leftWall = new THREE.Mesh(cubeGeometry, wallMaterial);
leftWall.scale.set(1, 6, 8);
leftWall.position.set(-20, 2, 8);
leftWall.castShadow = true;
scene.add(leftWall);

const leftBackWall = new THREE.Mesh(cubeGeometry, wallMaterial);
leftBackWall.scale.set(1, 6, 3);
leftBackWall.rotation.y = Math.PI / 2;
leftBackWall.position.set(-12, 2, -8);
leftBackWall.castShadow = true;
scene.add(leftBackWall);

const rightWall = new THREE.Mesh(cubeGeometry, wallMaterial);
rightWall.scale.set(1, 6, 8);
rightWall.position.set(20, 2, 8);
rightWall.castShadow = true;
scene.add(rightWall);

const rightBackWall = new THREE.Mesh(cubeGeometry, wallMaterial);
rightBackWall.scale.set(1, 6, 3);
rightBackWall.rotation.y = Math.PI / 2;
rightBackWall.position.set(12, 2, -8);
rightBackWall.castShadow = true;
scene.add(rightBackWall);

//Gate
const gate = new THREE.Mesh(cubeGeometry, woodMaterial);
gate.scale.set(1, 4, 3);
gate.rotation.y = Math.PI / 2;
gate.position.set(0, 2, -8);
gate.castShadow = true;
scene.add(gate);

//Banners
const banner = new THREE.Mesh(cubeGeometry, bannerMaterial);
banner.scale.set(0.5, 2, 1);
banner.rotation.y = Math.PI / 2;
banner.position.set(-12, 8, -6);
banner.castShadow = true;
scene.add(banner);

const banner2 = new THREE.Mesh(cubeGeometry, bannerMaterial);
banner2.scale.set(0.5, 2, 1);
banner2.rotation.y = Math.PI / 2;
banner2.position.set(12, 8, -6);
banner2.castShadow = true;
scene.add(banner2);

//crates
const crate1 = new THREE.Mesh(cubeGeometry, woodMaterial);
crate1.scale.set(0.5, 0.5, 0.5);
crate1.position.set(-5, 1, -5);
crate1.castShadow = true;
scene.add(crate1);

const crate2 = new THREE.Mesh(cubeGeometry, woodMaterial);
crate2.scale.set(1, 1, 1);
crate2.position.set(-8, 2, -4);
crate2.castShadow = true;
scene.add(crate2);

const crate3 = new THREE.Mesh(cubeGeometry, woodMaterial);
crate3.scale.set(0.5, 0.5, 0.5);
crate3.position.set(-8, 1, 0);
crate3.castShadow = true;
scene.add(crate3);

const crate4 = new THREE.Mesh(cubeGeometry, woodMaterial);
crate4.scale.set(0.5, 0.5, 0.5);
crate4.position.set(-9, 5, -5);
crate4.castShadow = true;
scene.add(crate4);

const crate5 = new THREE.Mesh(cubeGeometry, woodMaterial);
crate5.scale.set(0.5, 0.5, 0.5);
crate5.position.set(8, 1, -4);
crate5.castShadow = true;
scene.add(crate5);

// ----------------------------------------------------
// Ambient Light
// ----------------------------------------------------
const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.5
);


scene.add(ambientLight);

// ----------------------------------------------------
// Directional Light
// ----------------------------------------------------
const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    1
);

directionalLight.position.set(20, 30, 10);
directionalLight.castShadow = true;

scene.add(directionalLight);

const pointLight = new THREE.PointLight(
    0xffffff,
    50
);

pointLight.position.set(0, 5, 0);
pointLight.castShadow = true;

scene.add(pointLight);

// ----------------------------------------------------
// Toggle Lights
// ----------------------------------------------------
let lightsOn = true;

document
    .getElementById("toggleButton")
    .addEventListener("click", () => {

        lightsOn = !lightsOn;

        ambientLight.visible = lightsOn;
        directionalLight.visible = lightsOn;
    });

// ----------------------------------------------------
// Window Resize
// ----------------------------------------------------
window.addEventListener("resize", () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});

// ----------------------------------------------------
// Animation Loop
// ----------------------------------------------------
function animate() {

    requestAnimationFrame(animate);

    //cube.rotation.y += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

animate();