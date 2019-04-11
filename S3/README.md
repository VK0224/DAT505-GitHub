# Session 3

### The aim of the project

In the screen, a fixed structure is used to artificially change its scale, position and rotation.

### Usage
Download the minified library and include it in this HTML.

```html
<script src="build/three.min.js"></script>
<script src="js/dat.gui.min.js"></script>
<script src="build/three.js"></script>
<script src="js/controls/OrbitControls.js"></script>
```

In this code creates a scene, a camera, geometric cubes, materials, a combination of different structurescreate, a controller and GUI to modify its three elements(scale, position and rotation), and it adds the cube to the scene firstly. And then creates a WebGL renderer for the scene and camera, and it adds that viewport to the document.body element. Finally, it animates the cube within the scene for the camera.

##### Change scale, position and rotation

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

  // Create a Cube Mesh with basic material ---------
  geometry = new THREE.BoxGeometry(100, 100, 100);
  material = new THREE.MeshNormalMaterial( );
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.z = -1000;

  // Add mesh to scene
  scene.add( mesh );

  //Set preset values for controllers
  var controller = new function(){
  this.scaleX = 1;
  this.scaleY = 1;
  this.scaleZ = 1;

  this.positionX = 0;
  this.positionY = 0;
  this.positionZ = -400;

  this.rotationX = 0;
  this.rotationY = 0;
  this.rotationZ = 0;

}

//Create a new DAT.GUI
var gui = new dat.GUI();

//Define the folders' names
var f1= gui.addFolder("Scale");
var f2= gui.addFolder("Position");
var f3= gui.addFolder("Rotation");

//Add controller for scale X
f1.add(controller,"scaleX",0.1,5).onChange(function(){
mesh.scale.x = (controller.scaleX);
});
f1.add(controller,"scaleY",1,10).onChange(function(){
mesh.scale.y = (controller.scaleY);
});
f1.add(controller,"scaleZ",0.5,7).onChange(function(){
mesh.scale.z = (controller.scaleZ);
});

f2.add(controller,"positionX",-500,500).onChange(function(){
mesh.position.x = (controller.positionX);
});
f2.add(controller,"positionY",-500,500).onChange(function(){
mesh.position.y = (controller.positionY);
});
f2.add(controller,"positionZ",-5000,-400).onChange(function(){
mesh.position.z = (controller.positionZ);
});

f3.add(controller,"rotationX",-3.14,3.14).onChange(function(){
mesh.rotation.x = (controller.rotationX);
});
f3.add(controller,"rotationY",-3.14,3.14).onChange(function(){
mesh.rotation.y = (controller.rotationY);
});
f3.add(controller,"rotationZ",-3.14,3.14).onChange(function(){
mesh.rotation.z = (controller.rotationZ);
});

}
// Render Loop
var render = function () {
  requestAnimationFrame( render );

  //mesh.rotation.x += 0.01; //Continuously rotate the mesh
  //mesh.rotation.y += 0.01;

  renderer.setClearColor("#FFFFFF");

  // Render the scene
  renderer.render(scene, camera);
};

init();
render();
```

If everything went well you should see [this](https://github.com/VK0224/DAT505-GitHub/tree/master/S3).

Texture:
![S3-01](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/S3-01.PNG)
![S3-03](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/S3-03.PNG)
