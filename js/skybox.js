function createSkyBox(){
    
    var geometry = new THREE.BoxBufferGeometry(750, 750, 750, 1000, 1000, 1000);
    var material = [
        new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load("sky/xpos.png"), side: THREE.BackSide}),
        new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load("sky/xneg.png"), side: THREE.BackSide}),
        new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load("sky/ypos.png"), side: THREE.BackSide}),
        new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load("sky/yneg.png"), side: THREE.BackSide}),
        new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load("sky/zpos.png"), side: THREE.BackSide}),
        new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load("sky/zneg.png"), side: THREE.BackSide})
    ];
    var faceMaterial = new THREE.MultiMaterial( material );
    
    var mesh = new THREE.Mesh(geometry, faceMaterial);
    //mesh.doubleSided = true;
    mesh.position.set(0,0,0);
    scene.add(mesh);
    

}