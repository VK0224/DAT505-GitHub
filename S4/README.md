# Session 4

### The aim of the project

In the screen, free to change their directions and speeds in a set of ordered structures.

### Usage
Download the minified library and include it in this HTML.

```html
<script src="build/three.min.js"></script>
<script src="js/OrbitControls.js"></script>
```

In this code creates a scene, a camera, geometric cubes, materials, different speeds and rotations, and it adds the cubes to the scene firstly. And then creates a WebGL renderer for the scene and camera, and it adds that viewport to the document.body element. Finally, it animates the cube within the scene for the camera.

##### Change their directions and speeds

```javascript
//Global variables
var renderer, scene, camera;
var cubes = [];
var rot = 0;

var randomRotationX = [];
var randomRotationY = [];

function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
  H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(0, 55, 85);
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 1000, 0);
  scene.add(spotLight);
  //spotLight.castShadow = true;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -35; x < 40; x += 5) { // Start from -35 and sequentially add one every 5 pixels
    for (var y = -35; y < 40; y += 5) {
      var boxGeometry = new THREE.BoxGeometry(3, 3, 3);
      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      //mesh.castShadow = true;

      mesh.position.x = x;
      mesh.position.z = y;
      mesh.rotation.x = 360*Math.random();

      var randomValueX= (Math.random()*0.1) - 0.05;
        var randomValueY= (Math.random()*0.1) - 0.05;
        randomRotationX.push(randomValueX);
        randomRotationY.push(randomValueY);

      scene.add(mesh);
      cubes.push(mesh);
    }
  }

  document.body.appendChild(renderer.domElement);
}

function drawFrame(){
  requestAnimationFrame(drawFrame);

  rot += 0.01;

  //forEach takes all the array entries and passes the c as the object, and i as the index
  cubes.forEach(function(c, i) {
    c.rotation.x += randomRotationX[i];
    c.rotation.y += randomRotationY[i];//Rotate the object that is referenced in c
  });

  renderer.render(scene, camera);
}

init();
drawFrame();

```

If everything went well you should see [this](https://github.com/VK0224/DAT505-GitHub/tree/master/S4).

Texture:
![S4-01](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/S4-01.PNG)
![S4-02](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/S4-02.PNG)
![S4-03](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/S4-03.PNG)
![S4-04](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/S4-04.PNG)
