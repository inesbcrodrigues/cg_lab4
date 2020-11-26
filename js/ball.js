var geometry, material, ball;
var ballRadius = 2;
var vz = 10;
var delta = 0;
var g = 5;
var posx, posy;
var ballHitGround = false;
var slowDown = 1;
var first_mov = true;
var ref = 0;
var initPos = 0;
var texture;

function updateBallMovement() {
    if (ballMovement) {
        if(slowDown > 0) {

            posx = ball.position.x + 0.8;
            posy = slowDown * (-((posx + ref - 20) * ((posx + ref - 20) / 40)) + 12);

            ballHitsGround(posy);

            if (ballHitGround) {
                ref -= 40;
                ball.position.x = posx;
                ball.position.y = 2;
                ballHitGround = false;  
            }
            else {
                ball.position.x = posx;
                ball.position.y = posy;
            }
        }
        else {
            position.x = posx;
            position.y = 2;
        }
    }
}

function ballHitsGround(posy) {
    if (posy - ballRadius <= 0) {
        ballHitGround = true;
        slowDown -= 0.05;
    }
}

function createBall() {

    texture = new THREE.TextureLoader().load( "golf.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 0.9, 0.9);

    geometry = new THREE.SphereGeometry(ballRadius, 32, 32);

    material = new THREE.MeshPhongMaterial({
        color: "white",
        bumpMap: texture,
        bumpScale: 1.5,
        specular: 0x050505,
        shininess: 100
    });

    var envMap = new THREE.TextureLoader().load('envMap.png');
    envMap.mapping = THREE.SphericalReflectionMapping;
    material.envMap = envMap;

    ball = new THREE.Mesh(geometry, material);
    ball.position.set(0, 2, 0);
    scene.add(ball);
}