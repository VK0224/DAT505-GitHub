//Global variables
var scene, camera, renderer;
var geometry1,geometry2,material1,material2, mesh1,mesh2;

function init(){
  // Create an empty scene --------------------------
  scene = new THREE.Scene();

  // Create a basic perspective camera --------------
  camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 300, 10000 );

  // Create a renderer with Antialiasing ------------
  renderer = new THREE.WebGLRenderer({antialias:true});

  // Configure renderer clear color
  renderer.setClearColor("#000000");

  // Configure renderer size
  renderer.setSize( window.innerWidth, window.innerHeight );

  // Append Renderer to DOM
  document.body.appendChild( renderer.domElement );
}

function geometry(){
  // Create a Cube Mesh with basic material ---------
  geometry1 = new THREE.BoxGeometry(100, 100, 100);
  material1 = new THREE.MeshLambertMaterial( { color: "	#C6E2FF" } );
  mesh1 = new THREE.Mesh( geometry1, material1 );
  mesh1.position.set(1,1,1);
  mesh1.position.z = -1000;

  scene.add( mesh1 );

  geometry2 = new THREE.DodecahedronGeometry(400, 400, 400);
  material2 = new THREE.MeshNormalMaterial( { color: "	#0000CD" , wireframe : true } );
  mesh2 = new THREE.Mesh( geometry2, material2 );
  mesh2.position.set(1,1,1);
  mesh2.position.z = -800;

  // Add mesh to scene
  scene.add( mesh2 );
}
// Render Loop
var render = function () {
  requestAnimationFrame( render );

  mesh1.rotation.x += 0.01; //Continuously rotate the mesh
  mesh1.rotation.y += 0.01;
  mesh2.rotation.x += 0.02; //Continuously rotate the mesh
  mesh2.rotation.y += 0.02;

  renderer.setClearColor("#8B636C");

  // Render the scene
  renderer.render(scene, camera);
};

init();
geometry();
render();
