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

     var randomValueX =(Math.random()*0.1)-0.05;
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


  document.body.appendChild(renderer.domElement);
}

var rot =0;

function drawFrame(ts){
  requestAnimationFrame(drawFrame);

  rot += 0.01;

  //forEach takes all the array entries and passes the c as the object, and i as the index
  cubes.forEach(function(c, i) {
c.scale.x =Math.sin(ts/500*Math.PI +c.position.x*4.95 + c.position.z/10) + 1;
c.scale.y =Math.sin(ts/500*Math.PI +c.position.x*4.95 + c.position.z/10) + 1;

});
}

function drawFrame(ts){
  requestAnimationFrame(drawFrame);

  rot += 0.005;

  //forEach takes all the array entries and passes the c as the object, and i as the index
  cubes1.forEach(function(c, i) {
c.scale.x =Math.sin(ts/500*Math.PI +c.position.x*4.95 + c.position.z/10) + 1;
c.scale.y =Math.sin(ts/500*Math.PI +c.position.x*4.95 + c.position.z/10) + 1;

});

  renderer.render(scene, camera);
}

init();
drawFrame();
