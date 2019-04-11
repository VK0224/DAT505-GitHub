# Session 8

### The aim of the project

In the screen, the object is then sized and completely rotates with the mouse in five fixed positions, and generates three objects in a fixed position and changes colors as the mouse moves over them, and randomly generate hundreds of different sizes of the same object, when the mouse click on each object, its color will change.

### Usage
Download the minified library and include it in this HTML.

```html
<script src="build/three.min.js"></script>
<script src="js/libs/stats.min.js"></script>
<script src="build/three.js"></script>
<script src="js/OrbitControls.js"></script>
<script src="build/OBJLoader.js"></script>
<script src="build/MTLLoader.js"></script>
```

In this code creates a scene, a camera, geometric cubes, materials and it adds the cubes to the scene firstly. And then creates a WebGL renderer for the scene and camera, and it adds that viewport to the document.body element. Finally, it animates the cube within the scene for the camera.

##### Follow the mouse with your eyes

```javascript
//Global variables
var camera, scene, renderer, mesh;
var image;
var mouseX = 0, mouseY = 0;
var container;

var eyesNum = 5;
var eyes = [];
var xPos = [];
var yPos = [];
var xPosMap = [];
var yPosMap = [];

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 0, 0, 150 );
  scene.add( camera ); // since light is child of camera

	scene.add( new THREE.AmbientLight( 0xffffff, 0.2 ) );
	var light = new THREE.PointLight( 0xffffff, 1 );
	camera.add( light );

	var geometry = new THREE.SphereGeometry( 30, 32, 16 );

	var material = new THREE.MeshPhongMaterial( {
		color: 0xffffff,
		specular: 0x050505,
		shininess: 50,
		map: THREE.ImageUtils.loadTexture('images/eye.png'),
	});


  // modify UVs to accommodate MatCap texture
	var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
	for ( i = 0; i < faceVertexUvs.length; i ++ ) {
		var uvs = faceVertexUvs[ i ];
		var face = geometry.faces[ i ];
		for ( var j = 0; j < 3; j ++ ) {
			uvs[ j ].x = face.vertexNormals[ j ].x * 0.5 + 0.5;
			uvs[ j ].y = face.vertexNormals[ j ].y * 0.5 + 0.5;
		}
	}

	for (var i = 0; i < eyesNum; i++) {
		mesh = new THREE.Mesh( geometry, material );

		xPos[i] = Math.random() * 100 - 50;
		yPos[i] = Math.random() * 100 - 50;

		xPos [0] = 0;
		yPos [0] = 0;

		xPos [1] = -50;
		yPos [1] = -50;

		xPos [2] = 50;
		yPos [2] = -50;

		xPos [3] = -50;
		yPos [3] = 50;

		xPos [4] = 50;
		yPos [4] = 50;

		xPosMap[i] = map_range(xPos[i], -50, 50, 0, window.innerWidth);
		yPosMap[i] = map_range(yPos[i], -50, 50, 0, window.innerHeight);

		//console.log(xPosMap[1]);

		mesh.position.x = xPos[i];
		mesh.position.y = yPos[i];

		var randSize = Math.random() * 0.8;
		mesh.scale.x = randSize;
		mesh.scale.y = randSize;
		mesh.scale.z = randSize;

		scene.add( mesh );
		eyes.push( mesh );
	}

	//console.log(mesh);

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	window.addEventListener( 'resize', onWindowResize, false );
}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render() {
	console.log(mouseY)
	for (var i = 0; i < eyesNum; i++) {

		eyes[0].rotation.y = map_range(mouseX, 0, window.innerWidth, -1.14, 1.14);
		eyes[0].rotation.x = map_range(mouseY, 0, window.innerHeight, -1.14, 1.14);

		if (mouseX<140) eyes[1].rotation.y = map_range(mouseX, 0, 140, -0.2, 0.25);
		else eyes[1].rotation.y = map_range(mouseX, 140, window.innerWidth, 0.25, 1.14);
		if (mouseY<810) eyes[1].rotation.x = map_range(mouseY, 0, 810, -1.14, -0.25);
		else eyes[1].rotation.x = map_range(mouseY, 810, window.innerHeight, -0.25, 0);

		if (mouseX<1400) eyes[2].rotation.y = map_range(mouseX, 0, 1400, -1.14, 0);
		else eyes[2].rotation.y = map_range(mouseX, 1400, window.innerWidth, 0, 0.25);
		if (mouseY<850) eyes[2].rotation.x = map_range(mouseY, 0,  850, -1.14, 0);
		else eyes[2].rotation.x = map_range(mouseY, 850, window.innerHeight, 0, 0.2);

		if (mouseX<140) eyes[3].rotation.y = map_range(mouseX, 0, 140, -0.2, 0.25);
		else eyes[3].rotation.y = map_range(mouseX, 140, window.innerWidth, 0.25, 1.14);
		if (mouseY<35) eyes[3].rotation.x = map_range(mouseY, 0, 35, 0, 0.25);
		else eyes[3].rotation.x = map_range(mouseY, 35, window.innerHeight, 0.25, 1.14);

		if (mouseX<1400) eyes[4].rotation.y = map_range(mouseX, 0, 1400, -1.14, 0);
		else eyes[4].rotation.y = map_range(mouseX, 1400, window.innerWidth, 0, 0.25);
		if (mouseY<35) eyes[4].rotation.x = map_range(mouseY, 0, 35, 0, 0.25);
		else eyes[4].rotation.x = map_range(mouseY, 35, window.innerHeight, 0.25, 1.14);
  }
	renderer.render( scene, camera );
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
	//mouseX = event.clientX - windowHalfX;
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function map_range(value, low1, high1, low2, high2) {
	return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}
```

##### Different colors are produced when overlaying

```javascript
//Global variables
var renderer, scene, camera;
var controls, group;

var raycaster = new THREE.Raycaster();
var mouseVector = new THREE.Vector3();

//Boolean (true or false) to show if an object has been selected
var selectedObject = null;

init();
animate();

function init() {
  // init renderer
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // init scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xffffff );

  group = new THREE.Group();
  scene.add( group );

  // init camera
  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.set( 15, 15, 15 );
  camera.lookAt( scene.position );

  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.enableRotate = true;

  // add sprites
  var sprite = new THREE.Sprite( new THREE.SpriteMaterial( { color: '#69f' } ) );
  sprite.position.set( 6, 5, 5 );
  sprite.scale.set( 2, 5, 1 );
  group.add( sprite );

  var sprite = new THREE.Sprite( new THREE.SpriteMaterial( { color: '#69f' } ) );
  sprite.material.rotation = Math.PI / 3 * 4;
  sprite.position.set( 8, - 2, 2 );
  sprite.center.set( 0.5, 0 );
  sprite.scale.set( 1, - 5, 1 );
  group.add( sprite );

  var sprite = new THREE.Sprite( new THREE.SpriteMaterial( { color: '#69f' } ) );
  sprite.position.set( 0, 2, 5 );
  sprite.scale.set( 10, 2, 3 );
  sprite.center.set( - 0.1, 0 );
  sprite.material.rotation = Math.PI / 3;
  group.add( sprite );

  window.addEventListener( 'resize', onWindowResize, false );
  window.addEventListener( "mousemove", onDocumentMouseMove, false );
  window.addEventListener( "mousedown", onDocumentMouseDown, false );

}

function animate() {
  renderer.render( scene, camera );
  requestAnimationFrame( animate );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseDown( event ) {
  event.preventDefault();
  if ( selectedObject ) {
    selectedObject.material.color.set( '#69f' );
    selectedObject = null;
  }

  var intersects = getIntersects( event.layerX, event.layerY );
  if ( intersects.length > 0 ) {
    var res = intersects.filter( function ( res ) {
      return res && res.object;
    } )[ 0 ];
    if ( res && res.object ) {
      selectedObject = res.object;
      console.log(selectedObject.scale);
    }
  }
}


function onDocumentMouseMove( event ) {
  event.preventDefault();
  if ( selectedObject ) {
    //selectedObject.material.color.set( '#69f' );
    selectedObject = null;
  }


  var intersects = getIntersects( event.layerX, event.layerY );
  if ( intersects.length > 0 ) {
    var res = intersects.filter( function ( res ) {
      return res && res.object;
    } )[ 0 ];
    if ( res && res.object ) {
      selectedObject = res.object;
      selectedObject.material.color.setHex( Math.random() * 0xFFFFFF );
    //console.log(selectedObject.position);
    }
  }
}

function getIntersects( x, y ) {
  x = ( x / window.innerWidth ) * 2 - 1;
  y = - ( y / window.innerHeight ) * 2 + 1;
  mouseVector.set( x, y, 0.5 );
  raycaster.setFromCamera( mouseVector, camera );
  return raycaster.intersectObject( group, true );
}

```

##### Click to produce different colors

```javascript
//Global variables
var container, stats;
var camera, scene, raycaster, renderer;

var mouse = new THREE.Vector2(), INTERSECTED;
var radius = 100, theta = 0;
var object;

var objects = [];

init();
animate();

function init() {
  container = document.createElement( 'div' );
  document.body.appendChild( container );

  camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 10000 );

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xf0f0f0 );

  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 1, 1, 1 ).normalize();
  scene.add( light );

  var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );

  for (var i=0; i<500; i++){

  // Model/material loading!
	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.load("cup.mtl", function(materials){

		materials.preload();

    var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);

  		objLoader.load("cup.obj", function(mesh){
  			mesh.traverse(function(node){
  				if( node instanceof THREE.Mesh ){
  					node.castShadow = true;
  					node.receiveShadow = true;
  				}
  			});
        var sizeRand = Math.random() * 10;
        mesh.scale.set(sizeRand,sizeRand,sizeRand);
        mesh.position.set(Math.random()*800-400, Math.random()*800-400, Math.random()*800-400);
        mesh.rotation.y = -Math.PI/Math.random()*4;

        scene.add(mesh);
        objects.push(mesh); //Add to the array so that we can access for raycasting
  		});
  	});
  }

  raycaster = new THREE.Raycaster();

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  //stats = new Stats();
  //container.appendChild( stats.dom );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener( "mousedown", onDocumentMouseDown, false );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

function onDocumentMouseDown( event ){
  var intersects = raycaster.intersectObjects(objects,true);
  if(intersects.length>0){
    intersects[0].object.material.color.set(Math.random()*0xffffff);
  }
}

function animate() {
  requestAnimationFrame( animate );

  render();
  //stats.update();
}

function render() {
  //Auto rotate camera
  theta += 0.1;
  camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
  camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
  camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
  camera.lookAt( scene.position );
  camera.updateMatrixWorld();

  //Find intersections
  raycaster.setFromCamera( mouse, camera );

  renderer.render( scene, camera );
}
```

If everything went well you should see [this](https://github.com/VK0224/DAT505-GitHub/tree/master/S8).

Texture:
![S8-01](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/S8-01.PNG)
![S8-03](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/S8-03.PNG)
![S8-05](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/S8-05.PNG)
