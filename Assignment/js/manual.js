//Global variables
var renderer, scene, camera;
var cubes = [];
var cubes1 = [];
var randomSpeedX=[];

function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
  H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(75, W / H, .1, 1000);
  camera.position.set(0, 200, 0);
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 1000, 0);
  scene.add(spotLight);
  //spotLight.castShadow = true;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0xE6E6FA);
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -315; x < 345; x += 30) { // Start from -35 and sequentially add one every 5 pixels
    for (var y = -135; y < 165; y += 30) {
      var boxGeometry = new THREE.CircleGeometry(5, 32);
      //The color of the material is assigned a random color
      //var boxMaterial = new THREE.MeshLambertMaterial({color:  0xFFFFFF});
      var boxMaterial = new THREE.MeshPhongMaterial( {
    		color: 0xffffff,
    		specular: 0x050505,
    		shininess: 50,
    		map: THREE.ImageUtils.loadTexture('images/perlin-512.png'),
    	});
      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);

      mesh.castShadow = true;

      mesh.position.x = x;
      mesh.position.z = y;
      mesh.rotation.x = -45.5;
      mesh.rotation.y = 0;
      //mesh.rotation.z = 360*Math.random();

     var randomValueX =(Math.random()*0.1)-0.005;
     randomSpeedX.push(randomValueX)

      scene.add(mesh);
      cubes.push(mesh);
    }
  }

  for (var x = -315; x < 345; x += 30) { // Start from -35 and sequentially add one every 5 pixels
    for (var y = -135; y < 165; y += 30) {
  var geometry = new THREE.RingGeometry( 7, 8, 32 );
  var material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
  var mesh1 = new THREE.Mesh( geometry, material );

  mesh1.position.x = x;
  mesh1.position.z = y;
  mesh1.rotation.x = -45.5;
  mesh1.rotation.y = 0;

  var randomValueX =(Math.random()*0.01)-0.005;
  randomSpeedX.push(randomValueX)

  scene.add(mesh1);
  cubes1.push(mesh1);

}
}

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

  document.body.appendChild(renderer.domElement);
}

var rot =0;
function drawFrame(ts){
  requestAnimationFrame(drawFrame);

  rot += 0.01;

  //forEach takes all the array entries and passes the c as the object, and i as the index
  cubes.forEach(function(c, i) {
c.scale.x =Math.sin(ts/750*Math.PI +c.position.x*2 + c.position.z/15) + 1;
c.scale.y =Math.sin(ts/750*Math.PI +c.position.x*2 + c.position.z/15) + 1;

});

  rot += 0.05;

  //forEach takes all the array entries and passes the c as the object, and i as the index
  cubes1.forEach(function(c1, i) {
c1.scale.x =Math.sin(ts/500*Math.PI +c1.position.x*4.95 + c1.position.z/10) + 1;
c1.scale.y =Math.sin(ts/500*Math.PI +c1.position.x*4.95 + c1.position.z/10) + 1;

});

  renderer.render(scene, camera);
}

init();
drawFrame();
