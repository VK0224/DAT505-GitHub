var renderer, scene, camera;
var cubes = [];
var randomSpeedX=[];

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

  //controls = new THREE.OrbitControls(camera, renderer.domElement);

  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -30; x < 30; x += 5) { // Start from -35 and sequentially add one every 5 pixels
    for (var y = -30; y < 30; y += 5) {
      var boxGeometry = new THREE.SphereGeometry(3, 3, 3);
      //The color of the material is assigned a random color
      var boxMaterial = new THREE.MeshLambertMaterial({color:  0xFFFFFF});
      /*var boxMaterial = new THREE.MeshPhongMaterial( {
    		color: 0xffffff,
    		specular: 0x050505,
    		shininess: 50,
    		map: THREE.ImageUtils.loadTexture('images/eye.png'),
    	});*/
      //mesh.castShadow = true;

/*
if(x==-5 && y ==-5){
  boxMaterial =new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
}else if (x ==5 && y==5){
    boxMaterial =new THREE.MeshLambertMaterial({color: Math.random() * 0xFFFFFF});
  }else {
    boxMaterial =new THREE.MeshLambertMaterial({color:  0xFFFFFF});
    }
*/


      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);

      mesh.position.x = x;
      mesh.position.z = y;
      mesh.rotation.x = 360*Math.random();
      mesh.rotation.y = 360*Math.random();
      mesh.rotation.z = 360*Math.random();

var randomValueX =(Math.random()*0.1)-0.05;
randomSpeedX.push(randomValueX)

      scene.add(mesh);
      cubes.push(mesh);
    }
  }

  document.body.appendChild(renderer.domElement);
}

var rot =0;

function drawFrame(ts){
  requestAnimationFrame(drawFrame);

  rot += 0.01;

  //forEach takes all the array entries and passes the c as the object, and i as the index
  cubes.forEach(function(c, i) {
c.scale.y =Math.sin(ts/500*Math.PI +
c.position.x*4.95 + c.position.z/10) + 1;

});

  renderer.render(scene, camera);
}

init();
drawFrame();
