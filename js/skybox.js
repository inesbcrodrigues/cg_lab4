function createSkyBox(){
    var geometry = new THREE.BoxBufferGeometry(200, 200, 200, 20, 20, 20);
    var material = new THREE.CubeTextureLoader().setPath("./").load(
        "sky/xpos.png",
        "sky/xneg.png", 
        "sky/zpos.png", 
        "sky/zneg.png",
        "sky/ypos.png",
        "sky/yneg.png",
    );
    //var material = new THREE.MeshPhongMaterial({color: 0x00ff00});

    var skyBox = new THREE.Mesh(geometry, material);
    skyBox.doubleSided = true;
    skyBox.position.set(0,0,0);
    scene.add(skyBox);
    var mesh = THREE.SceneUtils.createMultiMaterialObject(geometry, material);
    mesh.doubleSided = true;
    mesh.position.set(0,0,0);
    scene.add(mesh);

}