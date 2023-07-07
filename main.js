import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import earthTexture from "/src/img/earth.jpg"
import jupiterTexture from "/src/img/jupiter.jpg"
import marsTexture from "/src/img/mars.jpg"
import mercuryTexture from "/src/img/mercury.jpg"
import neptuneTexture from "/src/img/neptune.jpg"
import plutoTexture from "/src/img/pluto.jpg"
import saturnRingTexture from "/src/img/saturn ring.png"
import saturnTexture from "/src/img/saturn.jpg"
import sunTexture from "/src/img/sun.jpg"
import stars from "/src/img/stars.jpg"
import uranusRingTexture from "/src/img/uranus ring.png"
import uranusTexture from "/src/img/uranus.jpg"
import venusTexture from "/src/img/venus.jpg"

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();


// CAMERA

const camera = new THREE.
    PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

//    LIGHTS
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    stars,
    stars,
    stars,
    stars,
    stars,
    stars
]);

// sun light

const pointLight = new THREE.PointLight(
    0xFFFFFF,
    2,
    300
);
scene.add(pointLight);


// PLANETS


//Sun

const sunGeometry = new THREE.SphereGeometry(20, 50, 50);
const sunMaterial = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);
sun.position.set(0, 0, 0)

// FUNCTION CREATE PLANETS

function createPlanet(size, texture, position, ring) {
    const geometry = new THREE.SphereGeometry(size, 50, 50);
    const material = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });

    const planet = new THREE.Mesh(geometry, material);
    const obj = new THREE.Object3D();
    obj.add(planet);
    scene.add(obj)
    planet.position.x = (position);



    if (ring) {
        const ringGeometry = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            52);
        const ringMaterial = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
        obj.add(ringMesh);
        ringMesh.position.x = (position);
        ringMesh.rotation.x = -0.5 * Math.PI;

    }


    return { planet, obj }
}

const mercury = createPlanet(3.2, mercuryTexture, 28);
const venus = createPlanet(5.8, venusTexture, 44)
const earth = createPlanet(6, earthTexture, 62)
const mars = createPlanet(4, marsTexture, 78)
const jupiter = createPlanet(12, jupiterTexture, 100)
const saturn = createPlanet(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
const uranus = createPlanet(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
});
const neptune = createPlanet(7, neptuneTexture, 200)
const pluto = createPlanet(2.8, plutoTexture, 216)


// ANIMATE FUNCTION

function animate() {
    // Planets Self Rotation
    sun.rotateY(0.004);
    mercury.planet.rotateY(0.004)
    venus.planet.rotateY(0.002)
    earth.planet.rotateY(0.02)
    mars.planet.rotateY(0.018)
    jupiter.planet.rotateY(0.04)
    saturn.planet.rotateY(0.038)
    uranus.planet.rotateY(0.03)
    neptune.planet.rotateY(0.032)
    pluto.planet.rotateY(0.008)


    // Planets Around Sun Rotation
    mercury.obj.rotateY(0.04)
    venus.obj.rotateY(0.015)
    earth.obj.rotateY(0.01)
    mars.obj.rotateY(0.008)
    jupiter.obj.rotateY(0.002)
    saturn.obj.rotateY(0.0009)
    uranus.obj.rotateY(0.0004)
    neptune.obj.rotateY(0.0001)
    pluto.obj.rotateY(0.00007)

    renderer.render(scene, camera)


}

renderer.setAnimationLoop(animate);

// RESPONSIVE

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight)
})




