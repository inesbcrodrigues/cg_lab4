var flag;
const POLE_LENGTH = 30;
const POLE_RADIUS = 0.4;
const CLOTH_WIDTH = 4;
const CLOTH_HEIGHT = 3;

function createFlag(){
    createPole();
    addCloth();
    scene.add(flag);
}

function createPole(){
    let geometry = new THREE.CylinderBufferGeometry(POLE_RADIUS, POLE_RADIUS, POLE_LENGTH, 10);

    let material = new THREE.MeshPhongMaterial({ color: "black", shininess: 100 });
    material.shading = THREE.SmoothShading;

    flag = new THREE.Mesh(geometry, material);
    flag.position.y = 15;
    mesh[1] = flag;
}

function addCloth(){
    let geometry = new THREE.BoxBufferGeometry(CLOTH_WIDTH, CLOTH_HEIGHT, 0.4);

    let material = new THREE.MeshPhongMaterial({ color: "red", shininess: 100 });
    material.shading = THREE.SmoothShading;

    mesh[2] = new THREE.Mesh(geometry, material);
    mesh[2].position.y = POLE_LENGTH/2 - CLOTH_HEIGHT/2;
    mesh[2].position.x = CLOTH_WIDTH/2 + POLE_RADIUS;
    flag.add(mesh[2]);
}

function rotateFlag(){
    flag.rotation.y += 0.1;
}