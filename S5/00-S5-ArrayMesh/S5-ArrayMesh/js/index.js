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

  controls=new THREE.OrbitControls(camera,renderer.domElement);

  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -10; x <=10 ; x += 5) { // Start from -45 and sequentially add one every 5 pixels
  for (var y = -10; y <=10; y += 5) {
  //for (var z= -10; z <10; z += 5) {

//Concatennation of the x and y values(open Console to see)
    console.log("X:"+x+",Y:"+y/*+",Z:"+z*/);

  var boxGeometry = new THREE.BoxGeometry(3,3, 3);
  //The color of the material is assigned a random color
  var boxMaterial = new THREE.MeshLambertMaterial({color: 0xCDC9C9});
    if (x == -5 && y == -5){
    boxMaterial = new THREE.MeshLambertMaterial({color: 0xF67280});
  } else if (x == 5 && y == 5 ){
      boxMaterial = new THREE.MeshLambertMaterial({color: "#eeb4b4"});
    }/* else if(x>=0 && y<=0  && z>=0 ){
      boxMaterial = new THREE.MeshLambertMaterial({color: 0xFF0000});
    } else if(x<=0 && y<=0  && z>=0 ){
    boxMaterial = new THREE.MeshLambertMaterial({color: "#8a2be2"});
  }else if(x>=0 && y>=0&& z<=0){
    boxMaterial = new THREE.MeshLambertMaterial({color: "#eeb422"});
  }else if(x<=0 && y>=0&& z<=0){
    boxMaterial = new THREE.MeshLambertMaterial({color: "#cdcd00"});
  }else if(x>=0 && y<=0&& z<=0){
    boxMaterial = new THREE.MeshLambertMaterial({color: "#ee30a7"});
  } else{
      boxMaterial = new THREE.MeshLambertMaterial({color: "0000ee"});
    }
    */
        var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      //mesh.castShadow = true;

      mesh.position.x = x;
      mesh.position.z = y;
      //mesh.position.z = z;
      //mesh.position.z = 0;
      //mesh.scale.y = 0.5;

      mesh.rotation.x = Math.random() * 2 * Math.PI;
      mesh.rotation.y = Math.random() * 2 * Math.PI;
      mesh.rotation.z = Math.random() * 2 * Math.PI;

      var randomValueX = (Math.random()*0.5-0.25);
      randomSpeedX.push(randomValueX);
      //var randomValueY = (Math.random()*0.1-0.05);
      //randomRotationX.push(randomValueX);
      //randomRotationY.push(randomValueY);

      scene.add(mesh);
      cubes.push(mesh);
  }
    }
  // }
  console.log(cubes);
  document.body.appendChild(renderer.domElement);
}

var scaleCube = -5;

function drawFrame(){
  requestAnimationFrame(drawFrame);


  //rot += 0.01;

  //forEach takes all the array entries and passes the c as the object, and i as the index
  //cubes.forEach(function(c,i){
    //Rotate the object that is referenced in c
    //c.rotation.x += randomRotationX[i];
    //c.rotation.y += randomRotationY[i];
    //c.rotation.z=rot*5;
    //c.scale.x=rot
  //});

  //cubes[6].rotation.x += randomSpeedX[6];
  //cubes[18].rotation.x += randomSpeedX[18];

  scaleCube += 0.02;
  if(scaleCube > 3) scaleCube = -5;

  cubes.forEach(function(c,i){
    c.rotation.x = 0.2;//Rotate the object that is reference
    c.rotation.y = 0.1;
    c.scale.x = scaleCube;
  });

  //cubes[2].rotation.x = 0.2;
  //cubes[0].scale.x += 0.2;
  //cubes[0].material = new THREE.MeshLambertMaterial({color: "#eeb4b4"});

  renderer.render(scene, camera);
}

init();
drawFrame();
