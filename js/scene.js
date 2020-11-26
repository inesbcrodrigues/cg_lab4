//const THREE = require("./three");
//import { OrbitControls } from './jsm/controls/OrbitControls.js';

var p_camera, renderer, scene;
var flag, controls;
var basic = false;     //quando true deixa de haver calculo de iluminação

//Light variables
//------------------DIRECTIONAL
var dirLight;



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

    controls.update();

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
    //var LightHelper = new THREE.DirectionalLightHelper(dirLight);
    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 512; // default
    dirLight.shadow.mapSize.height = 512; // default
    dirLight.shadow.camera.near = 0.5; // default
    dirLight.shadow.camera.far = 500; // default

    scene.add(LightHelper, dirLight.target);
    scene.add(dirLight);
}

function handleDirectionalLight(){
    dirLight.visible = !dirLight.visible;
}

function turnOffCalc(){
    mesh.forEach((obj) => {
        var bmaterial = new THREE.MeshBasicMaterial({transparent:true});
        bmaterial.color = obj.material.color;
        bmaterial.side = obj.material.side;
        bmaterial.opacity = obj.material.opacity;

        obj.material = bmaterial;
        obj.geometry.normalsNeedUpdate = true;
    });

}

//=============================================================================================================================
//QUICKTIME EVENTS
//=============================================================================================================================
function onKeyDown(e) {
    'use strict';
    switch (e.keyCode) {
        
    }
}

function onWindowResize(){
    p_camera.aspect = window.innerWidth / window.innerHeight;
    p_camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

