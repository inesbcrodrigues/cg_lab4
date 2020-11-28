//=======================================================================
//GRASS
//=======================================================================

function addGrassPlane(){
    var texture = new THREE.TextureLoader().load("grasstexture.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10,10);
    var bMap = new THREE.TextureLoader().load("grass2.jpg");
    bMap.wrapS = THREE.RepeatWrapping;
    bMap.wrapT = THREE.RepeatWrapping;

    var geometry = new THREE.PlaneBufferGeometry(100, 100, 50, 50);
    materials[0] = new THREE.MeshPhongMaterial({map:texture, bumpMap: bMap, bumpScale: 5});

    pmesh = new THREE.Mesh(geometry, materials[0]);
    pmesh.rotateX(Math.PI/2);
    pmesh.rotateY(Math.PI);
    pmesh.position.set(0, 0, 0);
    pmesh.receiveShadow = true;
    mesh[0] = pmesh;
    scene.add(pmesh);
}