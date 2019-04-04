var renderer, scene, camera;
var cubes = [];
var rot = 0;
var randomSpeedX=[];
var randomSpeedY=[];
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
  for (var x = -10; x < 12; x += 5) { // Start from -35 and sequentially add one every 5 pixels
    for (var y = -10; y < 12; y += 5) {

      var boxGeometry = new THREE.BoxGeometry(3, 3, 3);
      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshLambertMaterial({color:  0xFFFF33});
      if (x==-5 && y==-5){
      boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFF39 });
    }else if (x==5 && y==5){
      boxMaterial = new THREE.MeshLambertMaterial({color: "#B452CD" });
    }else{
      boxMaterial = new THREE.MeshLambertMaterial({color:  0xFFFFFF});
    }
      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      //mesh.castShadow = true;

      mesh.position.x = x;
      mesh.position.z = y;

      mesh.rotation.x = Math.random()*2*Math.PI;;
      mesh.rotation.y = Math.random()*2*Math.PI;;
      mesh.rotation.z = Math.random()*2*Math.PI;;

      var randomValueX=(Math.random() *0.1)-0.05;
     randomValueY=(Math.random() *0.1)-0.05;
      randomSpeedX.push(randomValueX);
      randomSpeedY.push(randomValueY);
      scene.add(mesh);
      cubes.push(mesh);
    }
  }

  document.body.appendChild(renderer.domElement);
}

function drawFrame(){
  requestAnimationFrame(drawFrame);
for (var i =0;i<5; i++){
  cubes[6].rotation.x += randomSpeedX[6];
cubes[18].rotation.y += randomSpeedY[18];
}
  //forEach takes all the array entries and passes the c as the object, and i as the index
// cubes.forEach(function(c, i) {
//cubes.rotation.z = rot; //Rotate the object that is referenced in c
  //});

  renderer.render(scene, camera);
}

init();
drawFrame();
