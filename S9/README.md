# Session 9

### The aim of the project

In the screen, the covering produces different colors and the sound of knocking the glass.

### Usage
Download the minified library and include it in this HTML.

```html
<script src="build/three.min.js"></script>
<script src="build/OBJLoader.js"></script>
<script src="build/MTLLoader.js"></script>
```

In this code creates a scene, a camera, geometric cubes, materials and it adds the cubes to the scene firstly. And then creates a WebGL renderer for the scene and camera, and it adds that viewport to the document.body element. Finally, it animates the cube within the scene for the camera.

##### Produce a sound and different colors

```javascript
//Global variables
var container, stats;
var camera, scene, raycaster, renderer;

var mouse = new THREE.Vector2(), INTERSECTED;
var radius = 100, theta = 0;
var object;

var objects = [];

// create an AudioListener and add it to the camera
var listener = new THREE.AudioListener();

// create a global audio source
var sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
var audioLoader = new THREE.AudioLoader();

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

  for (var i=0; i<100; i++){

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
        var sizeRand = Math.random() * 5;
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

//
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
  //var intersects = raycaster.intersectObjects( scene.children );

  var intersects = raycaster.intersectObjects( objects, true );

  if ( intersects.length > 0 ) {
    if ( INTERSECTED != intersects[ 0 ].object ) {
      if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
      INTERSECTED = intersects[ 0 ].object;
      INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
      INTERSECTED.material.emissive.setHex( Math.random()*0xff0000 );

      audioLoader.load( 'audio/cup.wav', function( buffer ) {
        sound.setBuffer( buffer );
        sound.setLoop( false );
        sound.setVolume( 0.5 );
        sound.play();
      });

    }
  } else {
    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
    INTERSECTED = null;
  }
  renderer.render( scene, camera );
}
```

If everything went well you should see [this](https://github.com/VK0224/DAT505-GitHub/tree/master/S9).

Texture:
![S9-02](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/S9-02.PNG)
