var camera, p_camera, o_camera, renderer, scene, meshText;
var PC, OC;
let mesh = [];
let materials = [];
var pause = false;
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

//Viewport Vector
var views = [
    { //Vista perspetiva 
        left: 0,
        bottom: 0,
        width: 0.5,
        height: 1.0,
        background: new THREE.Color( 0.5, 0.5, 0.7 ),
        eye: THREE.Vector3( 0, 300, 1800),
        up: THREE.Vector3( 0, 1, 0 ),
    },
    {   //Vista pausa
        left: 0.5,
        bottom: 0,
        width: 0.5,
        height: 0.5,
        background: new THREE.Color( 0.7, 0.5, 0.5 ),
        eye: [ 0, 1800, 0 ],
        up: [ 0, 0, 1 ]
    }
]

//===========================================================================================================================
//FUNCTIONS==================================================================================================================
//===========================================================================================================================
function init(){
    'use strict';
    renderer = new THREE.WebGLRenderer({ antialias : true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);
    PC = true;
    OC = false;
    createPerspCamera(-50, 30, -50);
    createOrthoCamera(0, 0, 50);

    createScene();
    addDirLight();
    addPointLight();
    createSkyBox();
    writePause();

    var axis = new THREE.AxisHelper(30);

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

    if (!pause){
        updateBallMovement();
        rotateFlag();
    }
}

function render(){
    controls.update();
    
    if (PC){
        const left = Math.floor( windowWidth * views[0].left );
        const bottom = Math.floor( windowHeight * views[0].bottom );
        const width = Math.floor( windowWidth * views[0].width );
        const height = Math.floor( windowHeight * views[0].height );

        renderer.setViewport( left, bottom, width, height );
        renderer.setScissor( left, bottom, width, height );
        renderer.setScissorTest( true );
        renderer.setClearColor( views[0].background );

        camera.updateProjectionMatrix();

        renderer.render(scene, p_camera);
    }
    else if(OC) {
        const left = Math.floor( windowWidth * views[1].left );
        const bottom = Math.floor( windowHeight * views[1].bottom );
        const width = Math.floor( windowWidth * views[1].width );
        const height = Math.floor( windowHeight * views[1].height );

        renderer.setViewport( left, bottom, width, height );
        renderer.setScissor( left, bottom, width, height );
        renderer.setScissorTest( true );
        renderer.setClearColor( views[0].background );

        camera.updateProjectionMatrix();

        renderer.render(scene, o_camera);
    }
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

    var pos = views[0];
    p_camera.position.fromArray( pos.eye );
    p_camera.up.fromArray( pos.up );

    p_camera.lookAt(flag.position);

    controls = new THREE.OrbitControls(p_camera, renderer.domElement);
    controls.update();

    document.addEventListener('mousemove', onDocumentMouseMove, false);
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

    var pos = views[1];
    o_camera.position.fromArray( pos.eye );
    o_camera.up.fromArray( pos.up );

    o_camera.lookAt(scene.position);
}

function onDocumentMouseMove( event ) {
    controls.handleMouseMoveRotate(event);
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
    /*var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

    context.font = "normal " + 11 + "px Arial";

    var margin = 2;
    var textWidth = context.measureText("PAUSE").width;
    canvas.width = 32;
    canvas.height = 16;

    context.strokeStyle = "white";
    context.strokeRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = "red";
    context.strokeRect(canvas.width / 2 - textWidth / 2 - margin / 2, canvas.height / 2 - 16 / 2  +margin / 2, textWidth + margin, 16 + margin);

    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "green";
    context.fillText("PAUSE", textWidth / 2, 16 / 2);

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    var material = new THREE.MeshBasicMaterial({map : texture});*/

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

