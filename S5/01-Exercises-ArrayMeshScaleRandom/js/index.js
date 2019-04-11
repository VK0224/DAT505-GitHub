var renderer, scene, camera;
var controls;
var cubes=[];
var rot=0;
var randomRotationX =[];
var randomRotationY =[];
var randomSpeedX = [];

function init() {
  scene = new THREE.Scene();

  var W = window.innerWidth,
      H = window.innerHeight;

  camera = new THREE.PerspectiveCamera(45, W / H, .1, 1000);
  camera.position.set(20,25, 45);
  camera.lookAt(scene.position);

  var spotLight = new THREE.SpotLight(0xFFFFFF);
  spotLight.position.set(0, 1000, 0);
  scene.add(spotLight);
  //spotLight.castShadow = true;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;

  controls=new THREE.OrbitControls(camera,renderer.domElement);

  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -10; x <=10 ; x += 5) { // Start from -45 and sequentially add one every 5 pixels
  for (var y = -10; y <=10; y += 5) {
  //for (var z= -10; z <10; z += 5) {

//Concatennation of the x and y values(open Console to see)
    console.log("X:"+x+",Y:"+y/*+",Z:"+z*/);

  var boxGeometry = new THREE.OctahedronGeometry(3,3, 3);
  //The color of the material is assigned a random color
  var boxMaterial = new THREE.MeshLambertMaterial({color: 0xCD69C9});
    if (x == -5 && y == -5){
    boxMaterial = new THREE.MeshLambertMaterial({color: 0x54FF9F});
  } else if (x == 5 && y == 5 ){
      boxMaterial = new THREE.MeshLambertMaterial({color: "#eeb4b4"});
    }
        var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      //mesh.castShadow = true;

      mesh.position.x = x;
      mesh.position.z = y;

      mesh.rotation.x = Math.random() * 2 * Math.PI;
      mesh.rotation.y = Math.random() * 2 * Math.PI;
      mesh.rotation.z = Math.random() * 2 * Math.PI;

      var randomValueX = (Math.random()*0.5-0.25);
      randomSpeedX.push(randomValueX);

      scene.add(mesh);
      cubes.push(mesh);
  }
    }

  console.log(cubes);
  document.body.appendChild(renderer.domElement);
}

var scaleCube = -10;

function drawFrame(){
  requestAnimationFrame(drawFrame);

  scaleCube += 0.02;
  if(scaleCube > 9) scaleCube = -5;

  cubes.forEach(function(c,i){
    c.rotation.x = 0.24;//Rotate the object that is reference
    c.rotation.y = 0.25;
    c.scale.x = scaleCube;
  });


  renderer.render(scene, camera);
}

init();
drawFrame();
