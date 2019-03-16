var renderer, scene, camera;

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

  //Create a two dimensional grid of objects, and position them accordingly
  for (var x = -25; x < 25; x += 5) { // Start from -45 and sequentially add one every 5 pixels
    for (var y = -15; y < 15; y += 5) {
      for(var z = -5; z < 5; z += 5)  {

      //Concatenation of the x and y values(open Console to see)
      console.log("X:" +x+",Y:"+y);

      var boxGeometry = new THREE.BoxGeometry(3, 3, 3);
      //The color of the material is assigned a random color

      if(x >= 0 && y >= 0){
      var boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF });
    }else if(x >= 0 && y < 0){
        var boxMaterial = new THREE.MeshLambertMaterial({color: 0xFF00FF});
      }else if(x < 0 && y >= 0){
          var boxMaterial = new THREE.MeshLambertMaterial({color: 0x00FF00});
        }else if(x < 0 && y < 0){
            var boxMaterial = new THREE.MeshLambertMaterial({color: 0x000000});
          }

      var mesh = new THREE.Mesh(boxGeometry, boxMaterial);
      //mesh.castShadow = true;
      mesh.position.x = x;
      mesh.position.y = y;
      mesh.position.z = z;
      mesh.rotation.x = -180;
      mesh.scale.y = 0.5;
      scene.add(mesh);
      }
    }
  }

  document.body.appendChild(renderer.domElement);
}

function drawFrame(){
  requestAnimationFrame(drawFrame);
  renderer.render(scene, camera);
}

init();
drawFrame();
