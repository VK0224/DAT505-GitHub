var renderer, scene, camera;
var cubes=[];
var rotX=0;
var rotY=0;
var scaleX=0;
var scaleY=0;
var scaleZ=0;
var scaleCube;

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

/*
  var ambLight = new THREE.AmbientLight(0xFFFFFF);
  ambLight.position.set(0, 1000, 0);
  ambLight.add(spotLight);
  scene.add(ambLight);
*/

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x17293a);
  renderer.setSize(W, H);
  //renderer.shadowMapEnabled = true;

  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -10; x <=10 ; x += 5) { // Start from -45 and sequentially add one every 5 pixels
  for (var y = -10; y <=10; y += 5) {


//Concatennation of the x and y values(open Console to see)
    console.log("X:"+x+",Y:"+y);

  var boxGeometry = new THREE.BoxGeometry(3,3,3);

  //The color of the material is assigned a random color
  var boxMaterial = new THREE.MeshLambertMaterial({color: 0xCDC9C9});
    if (x == -5 && y == -5){
    boxMaterial = new THREE.MeshLambertMaterial({color: 0xF67280});
  } else if (x == 5 && y == 5 ){
      boxMaterial = new THREE.MeshLambertMaterial({color: "#eeb4b4"});
    }

  var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      //mesh.castShadow = true;

      mesh.position.x = x;
      mesh.position.z = y;
      mesh.scale.y = 0.5;

      mesh.rotation.x = Math.random() * 2 * Math.PI;
      mesh.rotation.y = Math.random() * 2 * Math.PI;
      mesh.rotation.z = Math.random() * 2 * Math.PI;

      var rotValX = (Math.random()*0.05)-0.025;
      var rotValY = (Math.random()*0.05)-0.025;
      var scValX = Math.random()-0.5;
      var scValY = Math.random()-0.5;
      var scValZ = Math.random()-0.5;

      rotX.push(rotValX);
      rotY.push(rotValY);
      scaleX.push(scValX);
      scaleY.push(scValY);
      scaleZ.push(scValZ);

      scaleCube.push(3);

      scene.add(mesh);
      cubes.push(mesh);
  }
    }

  console.log(cubes);
  document.body.appendChild(renderer.domElement);
}

function drawFrame(){
  requestAnimationFrame(drawFrame);

  cubes.forEach(function(c,i){
    c.rotation.x += rotX[i];//Rotate the object that is reference
    c.rotation.y += rotY[i];
    c.scale.x += rot[i];
    scaleCube[i] +=0.1;
    if(scaleCube[i] > scaleX[i]) scaleCube[i] = -scaleX[i];
    c.scale.x = scaleCube[i];
  });

  renderer.render(scene, camera);
}

init();
drawFrame();
