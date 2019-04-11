# Session 7

### The aim of the project

In the screen, multiple cubes are generated at the top of the screen, one of which can be freely dropped, and after generating geometry at random position, add texture and make it follow mouse rotation.

### Usage
Download the minified library and include it in this HTML.

```html
<script src="build/three.min.js"></script>
<script src="js/libs/stats.min.js"></script>
```

In this code creates a scene, a camera, geometric cubes, materials, objects fall and rotate with the mouse, and it adds the cubes to the scene firstly. And then creates a WebGL renderer for the scene and camera, and it adds that viewport to the document.body element. Finally, it animates the cube within the scene for the camera.

##### Free falling codes

```javascript
//Global variables
var camera, scene, renderer, geometry, material, mesh;
var texture;
var cubeNum = 10;

var cubes = [];
var speed = [];

function init() {
	// Create a scene
	scene = new THREE.Scene();

	// Create a geometry
	// 	Create a box (cube) of 10 width, length, and height
	geometry = new THREE.BoxGeometry( 10, 10, 10 );

  //let = var
	for(let i=0; i<cubeNum;i++){
		let randomValue = Math.random() * 0.5;
		speed.push(randomValue);

		//Generate a random number from 1 to 4 (according to the image files)
		let randomSelection = Math.round(Math.random()*15) + 1;

	// Load a texture
	texture = new THREE.TextureLoader().load( "textures/texture"+randomSelection+".jpg" );

	// Create a MeshBasicMaterial with a loaded texture
	material = new THREE.MeshBasicMaterial( { map: texture} );

	// Combine the geometry and material into a mesh
	mesh = new THREE.Mesh( geometry, material );
	mesh.position.y = 30;
  mesh.position.x = (Math.random() * -40) +20;


	// Add the mesh to the scene
	scene.add( mesh );

}

	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 2, 1000 );
	// Move the camera 'out' by 30
	camera.position.z = 30;

	// Create a WebGL Rendered
	renderer = new THREE.WebGLRenderer();
	// Set the size of the rendered to the inner width and inner height of the window
	renderer.setSize( window.innerWidth, window.innerHeight );

	// Add in the created DOM element to the body of the document
	document.body.appendChild( renderer.domElement );
}

function animate() {
	// Call the requestAnimationFrame function on the animate function
	// 	(thus creating an infinite loop)
	requestAnimationFrame( animate );

	// Rotate the x position of the mesh by 0.03
	mesh.rotation.x += 0.02;
	// Rotate the y position of the mesh by 0.02
	mesh.rotation.y += 0.01;

	//Move the mesh towards the bottom of the screen
	mesh.position.y -= 0.2;

	//If the mesh passes the bottom of the screen,
	//make it appear on the top. Also x position is randomized
	if (mesh.position.y <- 30){
		mesh.position.y = 35;
		mesh.position.x = (Math.random() * -20) +10;
	}

	// Render everything using the created renderer, scene, and camera
	renderer.render( scene, camera );
}

init();
animate();

```

##### Follow the code of the move

```javascript
//Global variables
var camera, scene, renderer;
var image;
var mouseX = 0, mouseY = 0;
var container, stats;
var group = [];
var speed = [];
var cubesNum = 10;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var rotX = [];//随机速度
var rotY = [];//随机速度

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

for(a=0;a<15;a++){
	var material = new THREE.MeshPhongMaterial( {
		color: 0xffffff,
		specular: 0x050505,
		shininess: 50,
		map: THREE.ImageUtils.loadTexture('images/eye.png'),
	});

	var geometry = new THREE.SphereGeometry( 30, 32, 16 );


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
	var groupscale = (Math.random() * -2) +1;
	mesh = new THREE.Mesh( geometry, material );

							var mesh = new THREE.Mesh( geometry, material );
							mesh.position.x = (Math.random() * -200)+30;
							mesh.position.y = (Math.random() * -50)+50;

							mesh.scale.x = groupscale;
							mesh.scale.y = groupscale;
							mesh.scale.z = groupscale;

							var rotValX = (Math.random() * 0.1) - 0.25;
							var rotValY = (Math.random() * 0.1) - 0.25;

						rotX.push(rotValX);
							rotY.push(rotValY);

  scene.add( mesh );
							group.push( mesh );
						}

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
	console.log(window.innerHeight)
	group.forEach(function(c, i) {
    group[i].rotation.x += rotX;
    group[i].rotation.y += rotY;

	group[i].rotation.x = mouseY/window.innerHeight*2;
	group[i].rotation.y = mouseX/window.innerWidth*2;});

	renderer.render( scene, camera );
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseMove( event ) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

```
If everything went well you should see [this](https://github.com/VK0224/DAT505-GitHub/tree/master/S7).

Texture:
![S7-02](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/S7-02.PNG)
![S7-04](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/S7-04.PNG)
