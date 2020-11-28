var flag;
const POLE_LENGTH = 20;
const POLE_RADIUS = 0.25;
const CLOTH_WIDTH = 1.5*2;
const CLOTH_HEIGHT = 1.25*2;
const CLOTH_DEPTH = 0.4;

function createFlag(){
    createPole();
    addCloth();
    flag.position.x = -20;
    flag.position.z = 10;
    scene.add(flag);
}

function createPole(){
    let geometry = new THREE.CylinderBufferGeometry(POLE_RADIUS, POLE_RADIUS, POLE_LENGTH, 10);

    materials[1] = new THREE.MeshPhongMaterial({ color: "black", shininess: 100 });
    materials[1].shading = THREE.SmoothShading;

    flag = new THREE.Mesh(geometry, materials[1]);
    flag.position.y = POLE_LENGTH/2;
    mesh[1] = flag;
}

function addCloth(){
    let geometry = new THREE.BoxBufferGeometry(CLOTH_WIDTH, CLOTH_HEIGHT, CLOTH_DEPTH);

    materials[2] = new THREE.MeshPhongMaterial({ color: "red", shininess: 100 });
    materials[2].shading = THREE.SmoothShading;

    mesh[2] = new THREE.Mesh(geometry, materials[2]);
    mesh[2].position.y = POLE_LENGTH/2 - CLOTH_HEIGHT/2;
    mesh[2].position.x = CLOTH_WIDTH/2 + POLE_RADIUS;
    flag.add(mesh[2]);
}

function rotateFlag(){
    flag.rotation.y += 0.1;
}