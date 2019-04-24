//Global variables
var container, gui;
var camera, scene, renderer,raycaster;
var mesh, geometry;
var mouse = new THREE.Vector2(), INTERSECTED;
var object;
var objects = [];

//Create a collection to place geometry on
var geometries = [
  new THREE.IcosahedronGeometry(10,0),
  new THREE.OctahedronGeometry(12,0),
  new THREE.SphereGeometry(5,32,32),
  new THREE.TetrahedronGeometry(15,0),
  new THREE.ConeGeometry(5,20,32),
  new THREE.BoxGeometry( 5,5,5 ),
  new THREE.DodecahedronGeometry(5,0),
  new THREE.TorusGeometry( 10, 3, 16, 100 ),
  new THREE.TorusKnotGeometry( 10, 3, 100, 16 ),
];

//Create a collection to place music on
var geometries1 = [
  "  ",
  "audio/LightMusic.mp3",
  "audio/PopMusic.mp3",
  "audio/RhythmAndBlues.mp3",
  "audio/RockAndRoll.mp3",
];

//Name the options in the GUI with initial values
var options = {
  AddGeometry: 0
};

var options1 = {
  Music:0,
};

//Give Rotation.Z an initial parameter
var params = {
	RotationZ: 0.001,
};

//Define the material
//First thought
//var material = new THREE.MeshPhysicalMaterial( { opacity: 0.5 , color:Math.random()*0xffffff} );
//Second thought
var material = new THREE.MeshNormalMaterial( { opacity: 0.5,wireframe:true} );

//Call function generates 900 geometry at random positions on the screen
function addMesh() {
  if ( mesh !== undefined ) {
    scene.remove( mesh );
    geometry.dispose();
  }
  geometry = geometries[ options.AddGeometry ];
  depthTest: false;

  for (var i=0; i<900; i++){
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.x = Math.floor( Math.random() * 600 - 300 ) * 4;
    mesh.position.y = Math.floor( Math.random() * 600 - 300 ) * 4;
    mesh.position.z = Math.floor( Math.random() * 600 - 300 ) * 4;
    scene.add( mesh );
    objects.push(mesh);
  }
}

//Call a function to associate an option with an element and play it back
function addMusic() {
    geometry1 = geometries1[ options1.Music ];
    var myAuto = document.getElementById('myaudio');
        myAuto.src = geometry1;
        myAuto.play();
}

function init() {
  //Call the element in the HTML
  container = document.getElementById( 'container' );

  //Create and set the camera position
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 400;

  //Create a screen
  scene = new THREE.Scene();

  //Creates a spotlight, sets the location and adds it to the screen
  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 1000, 0);
  scene.add(spotLight);

  addMesh();

  //Create the renderer and set the color and size
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor(0x707070);
  renderer.setSize( window.innerWidth, window.innerHeight );

  //Container call renderer
  container.appendChild( renderer.domElement );

  //Skybox's first approach and image
/*
//Create cubemap
var cubeMap = new THREE.Texture( [] );
	cubeMap.format = THREE.RGBFormat;
	cubeMap.flipY = false;

//Create loader and call the location of image
var loader = new THREE.ImageLoader();
	loader.load( 'images/skyboxsun25degtest.jpg', function ( image ) {

//Set size
var getSide = function ( x, y ) {
	var size = 1024;

//Read element
var canvas = document.createElement( 'canvas' );
	canvas.width = size;
	canvas.height = size;

//Set element content
var context = canvas.getContext( '2d' );
	context.drawImage( image, - x * size, - y * size );
	return canvas;
		};

  //Image's position
	cubeMap.image[ 0 ] = getSide( 2, 1 ); // px
	cubeMap.image[ 1 ] = getSide( 0, 1 ); // nx
	cubeMap.image[ 2 ] = getSide( 1, 0 ); // py
	cubeMap.image[ 3 ] = getSide( 1, 2 ); // ny
	cubeMap.image[ 4 ] = getSide( 1, 1 ); // pz
	cubeMap.image[ 5 ] = getSide( 3, 1 ); // nz
	cubeMap.needsUpdate = true;
			} );

//Create shader
var cubeShader = THREE.ShaderLib['cube'];
	cubeShader.uniforms['tCube'].value = cubeMap;

//Set skybox's material
var skyBoxMaterial = new THREE.ShaderMaterial( {
	fragmentShader: cubeShader.fragmentShader,
	vertexShader: cubeShader.vertexShader,
	uniforms: cubeShader.uniforms,
	depthWrite: false,
	side: THREE.BackSide
		});

//Create mesh and add geometry and materials
var skyBox = new THREE.Mesh(
	new THREE.BoxGeometry( 100000, 100000, 100000 ),
	skyBoxMaterial
		);

//add skybox in scene
	scene.add( skyBox );
  */

//Skybox's second approach and image
//Set the path
var path = "images/";
    //Set the format
    var format = '.jpg';
        var urls = [
            path + 'px' + format, path + 'nx' + format,
            path + 'py' + format, path + 'ny' + format,
            path + 'pz' + format, path + 'nz' + format
        ];

//Create loader load path
var textureCube = new THREE.CubeTextureLoader().load( urls );

//Set texturecube as the screen background
scene.background = textureCube;

//Create a collection and set the order
  var geometries = {
    IcosahedronGeometry:0,
    OctahedronGeometry:1,
    SphereGeometry:2,
    TetrahedronGeometry:3,
    ConeGeometry:4,
    BoxGeometry:5,
    DodecahedronGeometry:6,
    TorusGeometry:7,
    TorusKnotGeometry:8,
  };

  var geometries1 = {
    Select:0,
    LightMusic:1,
    PopMusic:2,
    RhythmAndBlues:3,
    RockAndRoll:4,
  };

  //Create the GUI and add options, names, and collections to let them master the functions
  gui = new dat.GUI( { width: 350 } );
  gui.add( options, 'AddGeometry', geometries ).onChange( function () {
    addMesh();
  } );
  //Set style
  gui.domElement.style = 'position:absolute;top:0px;left:0px';

  gui1 = new dat.GUI( { width: 350 } );
  gui1.add( options1, 'Music', geometries1 ).onChange( function () {
    addMusic();
  } );
  gui1.domElement.style = 'position:absolute;top:30px;left:0px';

  gui2 = new dat.GUI( { width: 350 } );
	gui2.add( params, 'RotationZ', 0, 0.05 );
  gui2.domElement.style = 'position:absolute;top:60px;left:0px';

//Create controls and place the camera and renderer
  var controls = new THREE.OrbitControls( camera, renderer.domElement );

//Create raycaster
  raycaster = new THREE.Raycaster();

//Add functions to the document
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener( "mousedown", onDocumentMouseDown, false );
}

//Set resize's style
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}

//Set mousemove's style
function onDocumentMouseMove( event ) {
  event.preventDefault();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

//Set mousedown's style
function onDocumentMouseDown( event ){
  var intersects = raycaster.intersectObjects(objects,true);
  if(intersects.length>0){
    intersects[0].object.material.color.set(Math.random()*0xffffff);
  }
}

//Create animate
function animate() {
  requestAnimationFrame( animate );

  //Screen rotation
  scene.rotation.x += 0.001;
  scene.rotation.y += 0.001;
  scene.rotation.z += params.RotationZ;

  //Atomization effect
  scene.fog = new THREE.FogExp2(0xFFFFFF,0.001);

  render();
}

//Place raycaster and renderer in the function
function render() {
  raycaster.setFromCamera( mouse, camera );
  renderer.render( scene, camera );
}

init();
animate();
