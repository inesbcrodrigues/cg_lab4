//=======================================================================
//GRASS
//=======================================================================

function addGrassPlane(){
    var texture = new THREE.TextureLoader().load("grasstexture.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5,5);

    var geometry = new THREE.PlaneBufferGeometry(200, 200, 100, 100);
    var material = new THREE.MeshPhongMaterial({map:texture});

    pmesh = new THREE.Mesh(geometry, material);
    pmesh.rotateX(Math.PI/2);
    pmesh.rotateY(Math.PI);
    pmesh.position.set(0, 0, 0);
    pmesh.receiveShadow = true;
    scene.add(pmesh);
}