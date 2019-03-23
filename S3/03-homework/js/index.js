  // Create an empty scene --------------------------
  var scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  var camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

  // Create a renderer with Antialiasing ------------
  var renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#000000");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );

  /*改变视角
  var orbit = new THREE.OrbitControls(camera, renderer.domElement);
  orbit.update();
  orbit.addEventListener('change', render);
  */

  // Create a Cube Mesh with basic material ---------
  var geometry1 = new THREE.RingGeometry( 100, 30, 64 );
  var material1 = new THREE.MeshNormalMaterial( { wireframe:true} );
  var mesh1 = new THREE.Mesh( geometry1, material1 );
  mesh1.position.z = -500;

  var geometry2 = new THREE.PlaneGeometry( 400, 400, 400 );
  var texture2 = new THREE.TextureLoader().load("texture/qiangzhi.jpg");
  var material2 = new THREE.MeshBasicMaterial({map:texture2});
  var mesh2 = new THREE.Mesh( geometry2, material2 );
  mesh2.position.z = -600;

  var geometry3 = new THREE.CylinderGeometry( 150, 150, 20, 150 );
  var texture3 = new THREE.TextureLoader().load("texture/canbu.jpg");
  var material3 = new THREE.MeshBasicMaterial({map:texture3});
  var mesh3 = new THREE.Mesh( geometry3, material3 );
  mesh3.position.z = -550;
  mesh3.rotation.x = 42.5;

  var geometry4 = new THREE.CylinderBufferGeometry( 30, 30, 10, 32 );
  var texture4 = new THREE.TextureLoader().load("texture/canpan.jpg");
  var material4 = new THREE.MeshBasicMaterial({map:texture4});
  var mesh4 = new THREE.Mesh( geometry4, material4 );
  mesh4.position.x = 160;
  mesh4.position.y = 140;
  mesh4.position.z = -600;
  mesh4.rotation.x = 42.5;

  var geometry5 = new THREE.CylinderBufferGeometry( 30, 30, 10, 32 );
  var texture5 = new THREE.TextureLoader().load("texture/panzi.jpg");
  var material5 = new THREE.MeshBasicMaterial({map:texture5});
  var mesh5 = new THREE.Mesh( geometry5, material5 );
  mesh5.position.x = -160;
  mesh5.position.y = 140;
  mesh5.position.z = -600;
  mesh5.rotation.x = 42.5;

  var geometry6 = new THREE.CylinderBufferGeometry( 30, 30, 10, 32 );
  var texture6 = new THREE.TextureLoader().load("texture/panzi.jpg");
  var material6 = new THREE.MeshBasicMaterial({map:texture6});
  var mesh6 = new THREE.Mesh( geometry6, material6 );
  mesh6.position.x = 160;
  mesh6.position.y = -140;
  mesh6.position.z = -600;
  mesh6.rotation.x = 42.5;

  var geometry7 = new THREE.CylinderBufferGeometry( 30, 30, 10, 32 );
  var texture7 = new THREE.TextureLoader().load("texture/canpan.jpg");
  var material7 = new THREE.MeshBasicMaterial({map:texture7});
  var mesh7 = new THREE.Mesh( geometry7, material7 );
  mesh7.position.x = -160;
  mesh7.position.y = -140;
  mesh7.position.z = -600;
  mesh7.rotation.x = 42.5;

  var geometry8 = new THREE.BoxBufferGeometry( 5, 50, 10);
  var material8 = new THREE.MeshBasicMaterial({color: 0x2F4F4F});
  var mesh8 = new THREE.Mesh( geometry8, material8 );
  mesh8.position.x = -175;
  mesh8.position.y = 90;
  mesh8.position.z = -600;
  mesh8.rotation.z = 41.75;

  var geometry9 = new THREE.BoxBufferGeometry( 5, 50, 10);
  var material9 = new THREE.MeshBasicMaterial({color: 0x2F4F4F});
  var mesh9 = new THREE.Mesh( geometry9, material9 );
  mesh9.position.x = -115;
  mesh9.position.y = 170;
  mesh9.position.z = -600;
  mesh9.rotation.z = 41.75;

  var geometry10 = new THREE.BoxBufferGeometry( 5, 50, 10);
  var material10 = new THREE.MeshBasicMaterial({color: 0x2F4F4F});
  var mesh10 = new THREE.Mesh( geometry10, material10 );
  mesh10.position.x = 115;
  mesh10.position.y = -170;
  mesh10.position.z = -600;
  mesh10.rotation.z = 41.75;

  var geometry11 = new THREE.BoxBufferGeometry( 5, 50, 10);
  var material11 = new THREE.MeshBasicMaterial({color: 0x2F4F4F});
  var mesh11 = new THREE.Mesh( geometry11, material11 );
  mesh11.position.x = 175;
  mesh11.position.y = -90;
  mesh11.position.z = -600;
  mesh11.rotation.z = 41.75;

  var geometry12 = new THREE.BoxBufferGeometry( 5, 50, 10);
  var material12 = new THREE.MeshBasicMaterial( {color: 0x2F4F4F} );
  var mesh12 = new THREE.Mesh( geometry12, material12 );
  mesh12.position.x = -175;
  mesh12.position.y = -90;
  mesh12.position.z = -600;
  mesh12.rotation.z = -41.75;

  var geometry13 = new THREE.BoxBufferGeometry( 5, 50, 10);
  var material13 = new THREE.MeshBasicMaterial( {color: 0x2F4F4F} );
  var mesh13 = new THREE.Mesh( geometry13, material13 );
  mesh13.position.x = -115;
  mesh13.position.y = -170;
  mesh13.position.z = -600;
  mesh13.rotation.z = -41.75;

  var geometry14 = new THREE.BoxBufferGeometry( 5, 50, 10);
  var material14 = new THREE.MeshBasicMaterial( {color: 0x2F4F4F} );
  var mesh14 = new THREE.Mesh( geometry14, material14 );
  mesh14.position.x = 175;
  mesh14.position.y = 90;
  mesh14.position.z = -600;
  mesh14.rotation.z = -41.75;

  var geometry15 = new THREE.BoxBufferGeometry( 5, 50, 10);
  var material15 = new THREE.MeshBasicMaterial( {color: 0x2F4F4F} );
  var mesh15 = new THREE.Mesh( geometry15, material15 );
  mesh15.position.x = 115;
  mesh15.position.y = 170;
  mesh15.position.z = -600;
  mesh15.rotation.z = -41.75;

  var geometry16 = new THREE.ConeBufferGeometry( 15, 20, 32 );
  var texture16 = new THREE.TextureLoader().load("texture/cai1.jpg");
  var material16 = new THREE.MeshBasicMaterial({map:texture16});
  var mesh16 = new THREE.Mesh( geometry16, material16 );
  mesh16.position.x = -85;
  mesh16.position.y = 80;
  mesh16.position.z = -500;
  mesh16.rotation.x = 42.5;

  var geometry17 = new THREE.ConeBufferGeometry( 15, 20, 32 );
  var texture17 = new THREE.TextureLoader().load("texture/cai3.jpg");
  var material17 = new THREE.MeshBasicMaterial({map:texture17});
  var mesh17 = new THREE.Mesh( geometry17, material17 );
  mesh17.position.x = 0;
  mesh17.position.y = 118;
  mesh17.position.z = -500;
  mesh17.rotation.x = 42.5;

  var geometry18 = new THREE.ConeBufferGeometry( 15, 20, 32 );
  var texture18 = new THREE.TextureLoader().load("texture/cai4.jpg");
  var material18 = new THREE.MeshBasicMaterial({map:texture18});
  var mesh18 = new THREE.Mesh( geometry18, material18 );
  mesh18.position.x = 85;
  mesh18.position.y = 80;
  mesh18.position.z = -500;
  mesh18.rotation.x = 42.5;

  var geometry19 = new THREE.ConeBufferGeometry( 15, 20, 32 );
  var texture19 = new THREE.TextureLoader().load("texture/cai2.jpg");
  var material19 = new THREE.MeshBasicMaterial({map:texture19});
  var mesh19 = new THREE.Mesh( geometry19, material19 );
  mesh19.position.x = 118;
  mesh19.position.y = 0;
  mesh19.position.z = -500;
  mesh19.rotation.x = 42.5;

  var geometry20 = new THREE.ConeBufferGeometry( 15, 20, 32 );
  var texture20 = new THREE.TextureLoader().load("texture/cai5.jpg");
  var material20 = new THREE.MeshBasicMaterial({map:texture20});
  var mesh20 = new THREE.Mesh( geometry20, material20 );
  mesh20.position.x = 85;
  mesh20.position.y = -80;
  mesh20.position.z = -500;
  mesh20.rotation.x = 42.5;

  var geometry21 = new THREE.ConeBufferGeometry( 15, 20, 32 );
  var texture21 = new THREE.TextureLoader().load("texture/cai7.jpg");
  var material21 = new THREE.MeshBasicMaterial({map:texture21});
  var mesh21 = new THREE.Mesh( geometry21, material21 );
  mesh21.position.x = 0;
  mesh21.position.y = -118;
  mesh21.position.z = -500;
  mesh21.rotation.x = 42.5;

  var geometry22 = new THREE.ConeBufferGeometry( 15, 20, 32 );
  var texture22 = new THREE.TextureLoader().load("texture/cai8.jpg");
  var material22 = new THREE.MeshBasicMaterial({map:texture22});
  var mesh22 = new THREE.Mesh( geometry22, material22 );
  mesh22.position.x = -85;
  mesh22.position.y = -80;
  mesh22.position.z = -500;
  mesh22.rotation.x = 42.5;

  var geometry23 = new THREE.ConeBufferGeometry( 15, 20, 32 );
  var texture23 = new THREE.TextureLoader().load("texture/cai6.jpg");
  var material23 = new THREE.MeshBasicMaterial({map:texture23});
  var mesh23 = new THREE.Mesh( geometry23, material23 );
  mesh23.position.x = -118;
  mesh23.position.y = 0;
  mesh23.position.z = -500;
  mesh23.rotation.x = 42.5;

  var points = [];
  for ( var i = 0; i < 10; i ++ ) {
	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 20 + 10, ( i - 5 ) * 4 ) );
}
  var geometry24 = new THREE.LatheGeometry( points );
  var texture24 = new THREE.TextureLoader().load("texture/hua.jpg");
  var material24 = new THREE.MeshBasicMaterial({map:texture24});
  var mesh24 = new THREE.Mesh( geometry24, material24 );
  mesh24.position.y = -1;
  mesh24.position.z = -500;
  mesh24.rotation.x = 42.5;


  // Add mesh to scene
  scene.add( mesh1 );
  scene.add( mesh2 );
  scene.add( mesh3 );
  scene.add( mesh4 );
  scene.add( mesh5 );
  scene.add( mesh6 );
  scene.add( mesh7 );
  scene.add( mesh8 );
  scene.add( mesh9 );
  scene.add( mesh10 );
  scene.add( mesh11 );
  scene.add( mesh12 );
  scene.add( mesh13 );
  scene.add( mesh14 );
  scene.add( mesh15 );
  scene.add( mesh16 );
  scene.add( mesh17 );
  scene.add( mesh18 );
  scene.add( mesh19 );
  scene.add( mesh20 );
  scene.add( mesh21 );
  scene.add( mesh22 );
  scene.add( mesh23 );
  scene.add( mesh24 );

  // Render Loop
  var render = function () {
  requestAnimationFrame( render );

/*
  //mesh.rotation.x += 0.01; //Continuously rotate the mesh
  mesh1.rotation.x += 0.01;
  mesh2.rotation.x += 0.01;
  mesh3.rotation.x += 0.01;
  mesh4.rotation.x += 0.01;
  mesh5.rotation.x += 0.01;
  mesh6.rotation.x += 0.01;
  mesh7.rotation.x += 0.01;
  mesh8.rotation.x += 0.01;
  mesh9.rotation.x += 0.01;
  mesh10.rotation.x += 0.01;
  mesh11.rotation.x += 0.01;
  mesh12.rotation.x += 0.01;
  mesh13.rotation.x += 0.01;
  mesh14.rotation.x += 0.01;
  mesh15.rotation.x += 0.01;
  mesh16.rotation.x += 0.01;
  mesh17.rotation.x += 0.01;
  mesh18.rotation.x += 0.01;
  mesh19.rotation.x += 0.01;
  mesh20.rotation.x += 0.01;
  mesh21.rotation.x += 0.01;
  mesh22.rotation.x += 0.01;
  mesh23.rotation.x += 0.01;
  mesh24.rotation.x += 0.01;
*/

/*旋转一圈后暂停1s
  for(var i =0.01;i<=1;i=i+0.01){
    if(i%0.02!=0){rot()}
    //else{sleep(1000)}
  }
*/

/*function sleep(d){
  for(var t = Date.now();Date.now() - t <= d;);
}

sleep(5000);
*/

  renderer.setClearColor("#000000");

  // Render the scene
  renderer.render(scene, camera);
};

render();
