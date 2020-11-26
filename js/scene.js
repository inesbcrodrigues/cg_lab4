//const THREE = require("./three");
//import { OrbitControls } from './jsm/controls/OrbitControls.js';

var p_camera, renderer, scene;
var mesh = [];
var flag, controls;
var ilum = true;     //quando true deixa de haver calculo de iluminação

//Light variables
//------------------DIRECTIONAL
var dirLight;
//------------------POINT
var pointLight;

// Variable to control ball movement
var ballMovement = false;
var flag;

//===========================================================================================================================
//FUNCTIONS==================================================================================================================
//===========================================================================================================================
function init(){
    'use strict';
    renderer = new THREE.WebGLRenderer({ antialias : true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    createScene();
    addDirLight();
    addPointLight();

    var axis = new THREE.AxisHelper(30);

    createPerspCamera(0, 50, 200);
    addGrassPlane();
    createBall();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener('resize', onWindowResize, false );
    scene.add(axis);
}

//=============================================================================================================================
//ANIMATION AND RENDER
//=============================================================================================================================
function animate() {
    'use strict';
    render();
    requestAnimationFrame(animate);

    //controls.update();
    updateBallMovement();

    switch(flag) {


    }

    rotateFlag();
}

function render(){
    renderer.render(scene, p_camera);
}


//=============================================================================================================================
//SETTING THE SCENE - CREATION AND CAMERAS
//=============================================================================================================================
function createScene(){
    'use strict';
    scene = new THREE.Scene();
    scene.background = new THREE.Color("white");

    createFlag();
}

function createPerspCamera(x, y, z){
    'use strict'
    var aspectRatio = window.innerWidth / window.innerHeight;
    
    p_camera = new THREE.PerspectiveCamera(35, aspectRatio, 0.1, 1000);

    p_camera.position.x = x;
    p_camera.position.y = y;
    p_camera.position.z = z;

    p_camera.lookAt(scene.position);

    //controls = new OrbitControls( p_camera, renderer.domElement );
    //controls.update();
}

function addDirLight(){
    dirLight  = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(61.5, 27, 70);
    dirLight.target.position.set(37, 5, 29);

    dirLight.updateMatrixWorld();
    var LightHelper = new THREE.DirectionalLightHelper(dirLight);
    dirLight.castShadow = true;

    scene.add(LightHelper, dirLight.target);
    scene.add(dirLight);
}

function handleDirectionalLight(){
    dirLight.visible = !dirLight.visible;
}

function addPointLight(){
    pointLight = new THREE.PointLight(0xffffff, 10);
    pointLight.position.set(0, 1, 40); //este z é bom o suficiente para "sobre o relvado"?
    var PLightHelper = new THREE.PointLightHelper(pointLight, 3);

    scene.add(pointLight);
    scene.add(PLightHelper, pointLight.target);
}

function handlePointLight(){
    pointLight.visible = !pointLight.visible;
}

//=============================================================================================================================
//QUICKTIME EVENTS
//=============================================================================================================================
function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
        case 66:
            ballMovement = !ballMovement;      
            break;
        case 68:
            handleDirectionalLight();
            break;
        case 80:
            handlePointLight();
            break;
        case 87: //W
            handleWireframe();
            break;
        case 73: //I
            if(ilum){
                turnOffCalc();
                console.log("turned off")
            }
            else {
                turnOnCalc();
                console.log("turn on")
            }
            ilum = !ilum;
            break;
            
    }
}

function onWindowResize(){
    p_camera.aspect = window.innerWidth / window.innerHeight;
    p_camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function turnOffCalc(){
    mesh.forEach((obj) => {
        let bmaterial = new THREE.MeshBasicMaterial();
        bmaterial.color = obj.material.color;
        bmaterial.side = obj.material.side;
        bmaterial.map = obj.material.map;
        bmaterial.bumpMap = obj.material.bumpMap;

        obj.material = bmaterial;
        obj.geometry.normalsNeedUpdate = true;
    });

}

function turnOnCalc(){
    mesh.forEach((obj) => {
        let pmaterial = new THREE.MeshPhongMaterial();
        pmaterial.color = obj.material.color;
        pmaterial.map = obj.material.map;
        pmaterial.bumpMap = obj.material.bumpMap;
        //pmaterial.shininess = obj.material.shininess;
        //pmaterial.specular = obj.material.specular;

        pmaterial.shading = THREE.SmoothShading;
        pmaterial.needsUpdate = true;

        obj.material = pmaterial;
        obj.geometry.normalsNeedUpdate = true;
    });
}

function handleWireframe(){
    mesh.forEach((obj) => {
        obj.material.wireframe = ! obj.material.wireframe;
    });
}

