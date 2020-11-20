var p_camera, o_camera, renderer, scene;
var flag, shading = 1; //shading (flag): 1 - phong shading phong material, 2 - gouraud shading lambert material
var basic = false;     //quando true deixa de haver calculo de iluminação
var palander, truck;
var PC, OC;

//Light variables
//------------------DIRECTIONAL



//===========================================================================================================================
//FUNCTIONS==================================================================================================================
//===========================================================================================================================
function init(){
    'use strict';
    PC = true;
    renderer = new THREE.WebGLRenderer({ antialias : true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    createScene();

    createPerspCamera(90, 25, 80);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener('resize', onWindowResize, false );
}

//=============================================================================================================================
//ANIMATION AND RENDER
//=============================================================================================================================
function animate() {
    'use strict';
    render();
    requestAnimationFrame(animate);

    switch(flag) {
        
    }
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
}

function createCyberTruck() {
    truck = new THREE.Object3D();
    createPlane();
    createPalander();
    createWheels();
    createChassis();
    createBottomPartTruck();
    createTopPartTruck();
    createTrunk();
    createWindows();
    createLights();
    groupCyberTruck();
}

function createPerspCamera(x, y, z){
    'use strict'
    var aspectRatio = window.innerWidth / window.innerHeight;
    
    p_camera = new THREE.PerspectiveCamera(35, aspectRatio, 0.1, 1000);

    p_camera.position.x = x;
    p_camera.position.y = y;
    p_camera.position.z = z;

    p_camera.lookAt(scene.position);
}

function createOrthoCamera(x, y, z){
    'use strict';

    var viewSize = 40;
    var aspectRatio = window.innerWidth / window.innerHeight;

    o_camera = new THREE.OrthographicCamera(-aspectRatio*viewSize/2 + 20, aspectRatio*viewSize/2 + 20,
        viewSize/2 + 10, -viewSize/2 + 10, 5, 1000);

    o_camera.position.x = x;
    o_camera.position.y = y;
    o_camera.position.z = z;

    o_camera.lookAt(scene.position);
}

//=============================================================================================================================
//QUICKTIME EVENTS
//=============================================================================================================================
function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
        case 49:
            handleSpotlight1();
            break;
        case 50:
            handleSpotlight2();
            break;
        case 51:
            handleSpotlight3();
            break;
        case 52: // 4
            flag = 52;
            break;
        case 53: // 5
            flag = 53;
            break;
        case 37: //right arrow
            palander.rotation.y -= 0.1;
            break;
        case 39: //left arrow
            palander.rotation.y  += 0.1;
            break;
        case 81: //Q
            handleDirectionalLight();
            break;
        case 87: //W
            flag = 87;
            basic = !basic;
            //turn off/on illumination calculations
        case 69: //E
            flag = 69;
            if(shading === 1) shading = 2;
            else if(shading === 2) shading = 1;
            //switch between gouraud and phong
    }
}

function onWindowResize(){
    p_camera.aspect = window.innerWidth / window.innerHeight;
    p_camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

