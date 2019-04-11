# Session 1

### The aim of the project

To create a basic structure, a basic material and the way to combine structure and material.

### Usage
Download the minified library and include it in this HTML.

```html
<script src="build/three.js"></script>
<script src="build/three.min.js"></script>
```

In this code creates a scene, a camera, and geometric cubes, and materials and lights, and it adds the cube to the scene firstly. And then creates a WebGL renderer for the scene and camera, and it adds that viewport to the document.body element. Finally, it animates the cube within the scene for the camera.

##### Basic structure and material

```javascript
//Global variables
var scene, camera, renderer;
var geometry, material, mesh;

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
  geometry = new THREE.BoxGeometry(100, 100, 100);
  material = new THREE.MeshBasicMaterial( { color: "#FF00FF" } );
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.z = -1000;

  // Add mesh to scene
  scene.add( mesh );
}

// Render Loop
var render = function () {
  requestAnimationFrame( render );

  mesh.rotation.x += 0.01; //Continuously rotate the mesh
  mesh.rotation.y += 0.01;

  renderer.setClearColor("#000000");

  // Render the scene
  renderer.render(scene, camera);
};

init();
geometry();
render();
```

If everything went well you should see [this](https://github.com/VK0224/DAT505-GitHub/tree/master/S1).
