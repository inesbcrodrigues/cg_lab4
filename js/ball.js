var geometry, material, ball, clearcoat;
var ballRadius = 2;
var posx, posy;
var ballHitGround = false;
var slowDown = 1;
var texture;

function updateBallMovement() {
    ball.rotation.y += 0.01;
    if (ballMovement) {
        posx = ball.position.x + slowDown*0.8;
        posy = (-((posx - 20) * ((posx - 20) / 40)) + 12);

        ballHitsGround(posy);

        if (ballHitGround) {
            ball.position.x = posx;
            ball.position.y = 2;
            ballHitGround = false;  
        }
        else {
            ball.position.x = posx;
            ball.position.y = posy;
        }
    }
}

function ballHitsGround(posy) {
    if (posy - ballRadius <= 0) {
        ballHitGround = true;
        slowDown = -slowDown;
    }
}

function createBall() {

    texture = new THREE.TextureLoader().load( "golf.jpg");
    clearcoatMap = new THREE.TextureLoader().load( "clearCoat.png" );

    geometry = new THREE.SphereGeometry(ballRadius, 32, 32);

    material = new THREE.MeshPhysicalMaterial({
        metalness: 0.2,
        roughness: 0.0,
        clearcoat: 10,
        shininess: 100,
        bumpMap: texture,
        bumpScale: 0.04,
        clearcoatMap: clearcoatMap,
        clearCoatMapScale: new THREE.Vector2( 2.0, - 2.0)
    });

    

    var envMap = new THREE.TextureLoader().load('envMap.png');
    envMap.mapping = THREE.SphericalReflectionMapping;
    material.envMap = envMap;

    ball = new THREE.Mesh(geometry, material);
    ball.position.set(0, 2, 0);
    scene.add(ball);
}