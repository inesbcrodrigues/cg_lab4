var camera, p_camera, o_camera, renderer, meshText, scene;
var PC, OC;
let mesh = [];
let materials = [];
var pause = false;
var flag_object, controls;
var ilum = true;     //quando true deixa de haver calculo de iluminação

//Light variables
//------------------DIRECTIONAL
var dirLight;
//------------------POINT
var pointLight;

// Variable to control ball movement
var ballMovement = false;
var flag;

var width_resize, height_resize;

//===========================================================================================================================
//FUNCTIONS==================================================================================================================
//===========================================================================================================================
function init(){
    'use strict';
    scene = new THREE.Scene();
    scene.background = new THREE.Color("white");
    
    renderer = new THREE.WebGLRenderer({ antialias : true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    PC = true;
    OC = false;
    createScene();
    createPerspCamera(-50, 30, -50);
    createOrthoCamera(0, 0, 50);
}

//=============================================================================================================================
//ANIMATION AND RENDER
//=============================================================================================================================
function animate() {
    'use strict';
    render();
    requestAnimationFrame(animate);

    if (!pause){
        updateBallMovement();
        rotateFlag();
    }
}

function render(){
    controls.update();

    var SCREEN_W, SCREEN_H;
    SCREEN_W = window.innerWidth;
    SCREEN_H = window.innerHeight;
   
    var left,bottom,width,height;


    if (PC){
        left = 1; bottom = 1; width = SCREEN_W-2; height = SCREEN_H-2;
        width_resize = width;
        height_resize = height;
        renderer.setViewport (left,bottom,width,height);
        renderer.setScissor(left,bottom,width,height);
        renderer.enableScissorTest (true);
        p_camera.aspect = width/height;
        p_camera.updateProjectionMatrix();
        renderer.render(scene, p_camera);
    }
    else if(OC) {
        left = 0.25*SCREEN_W+1; bottom = SCREEN_H/4; width = 0.5*SCREEN_W-2; height = 0.5*SCREEN_H-2;
        width_resize = width;
        height_resize = height;
        renderer.setViewport (left,bottom, width,height);
        renderer.setScissor(left,bottom, width,height);
        renderer.enableScissorTest (true);  
        o_camera.aspect = width/height;
        o_camera.updateProjectionMatrix();
        renderer.render (scene, o_camera);
    }
}

//=============================================================================================================================
//SETTING THE SCENE - CREATION AND CAMERAS
//=============================================================================================================================
function createScene(){
    'use strict';
    addDirLight();
    addPointLight();
    createSkyBox();
    writePause();
    addGrassPlane();
    createBall();
    createFlag();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener('resize', onWindowResize, false );
}

function createPerspCamera(x, y, z){
    'use strict'
    var aspectRatio = window.innerWidth / window.innerHeight;
    
    p_camera = new THREE.PerspectiveCamera(35, aspectRatio, 0.1, 1000);

    p_camera.position.x = x;
    p_camera.position.y = y;
    p_camera.position.z = z;

    
    controls = new THREE.OrbitControls(p_camera, render.domElement);
    controls.update();

    p_camera.lookAt(scene.position);
}

function createOrthoCamera(x, y, z){
    'use strict';

    var viewSize = 40;
    var aspectRatio = window.innerWidth / window.innerHeight;

    o_camera = new THREE.OrthographicCamera(-aspectRatio*viewSize/2, aspectRatio*viewSize/2 ,
        viewSize/2 + 10, -viewSize/2 + 10, 5, 1000);

    o_camera.position.x = x;
    o_camera.position.y = y;
    o_camera.position.z = z;

    o_camera.lookAt(scene.position);
}




function addDirLight(){
    dirLight  = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(61.5, 27, 70);
    dirLight.target.position.set(37, 5, 29);

    dirLight.updateMatrixWorld();
    var LightHelper = new THREE.DirectionalLightHelper(dirLight);
    dirLight.castShadow = true;

    scene.add(LightHelper);
    scene.add(dirLight);
}

function handleDirectionalLight(){
    dirLight.visible = !dirLight.visible;
}

function addPointLight(){
    pointLight = new THREE.PointLight(0xffffff, 1.5);
    pointLight.position.set(20, 2, -20); //este z é bom o suficiente para "sobre o relvado"?

    scene.add(pointLight);
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
        case 68://d
            handleDirectionalLight();
            break;
        case 80://p
            handlePointLight();
            break;
        case 82: //R
            if (pause) handleReset();
            break;
        case 83:
            pauseScreen();
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
    if(PC) {
        p_camera.aspect = window.innerWidth / window.innerHeight;
        p_camera.updateProjectionMatrix();
    }
    if(OC) {
        o_camera.aspect = width_rezis/ window.innerHeight;
        o_camera.updateProjectionMatrix();
    }
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
    let counter = 0;
    mesh.forEach((obj) => {
        obj.material = materials[counter++];
        obj.geometry.normalsNeedUpdate = true;
    });
}

function handleWireframe(){
    mesh.forEach((obj) => {
        obj.material.wireframe = ! obj.material.wireframe;
    });
}

function writePause(){
    var texture = new THREE.TextureLoader().load("pauseTexture.jpg");
    var material = new THREE.MeshBasicMaterial({map: texture});

    meshText = new THREE.Mesh(new THREE.PlaneGeometry(40,20, 10, 10), material);
    meshText.overdraw = true;
    meshText.doubleSided = true;
    meshText.position.set(0,16,40);
    scene.add(meshText);
    meshText.visible = false;
}

function pauseScreen(){
    pause = !pause;
    meshText.visible = !meshText.visible;
    if (pause){
        PC = false;
        OC = true;
        createOrthoCamera(0, 0, 50);
    }
    else{
        PC = true;
        OC = false;
        createPerspCamera(-50, 30, -50);
    }
}

function handleReset(){
    ball.position.set(0, 2, 0);
    slowDown = 1;
    pauseScreen();
}

