//=======================================================================
//GRASS
//=======================================================================

function addGrassPlane(){
    var texture = new THREE.TextureLoader().load("grasstexture.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(50,50);
    var bMap = new THREE.TextureLoader().load("grassBump.jpg");

    var geometry = new THREE.PlaneBufferGeometry(1000, 1000, 100, 100);
    var material = new THREE.MeshPhongMaterial({map:texture, bumpMap: bMap});

    pmesh = new THREE.Mesh(geometry, material);
    pmesh.rotateX(Math.PI/2);
    pmesh.rotateY(Math.PI);
    pmesh.position.set(0, 0, 0);
    pmesh.receiveShadow = true;
    mesh[0] = pmesh;
    scene.add(pmesh);
}