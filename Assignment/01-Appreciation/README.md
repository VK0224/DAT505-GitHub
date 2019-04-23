# Assignment

## First work

### Work content
1.When opening the index, with the **generation of background image and music**, the start interface will appear first. When moving the mouse, there will be the **interaction** between the screen and the mouse.

Texture:
![Start](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/Start.PNG)

2.After clicking the **start button** will appear *a scenario* cannot be operation, to include CircleGeometry, CubicBezierCurve3 and RingGeometry, they are random multiple occurrences with certain rotation value, while the TextGeometry is giving the viewer **a hint**, let it go around can let people easier to focus on the it, and at this point, the scene to interact with the mouse is still there. In the **lower right corner of the scene**, there will be **an end button**. Click this button to pop up a new interface.

Texture:
![Appreciation](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/Appreciation.PNG)

3.When you click the end button, it will jump to the new scene, and there is **a close button** in the middle. When you click this button, a window will pop up, asking whether you really want to close the page.

Of course there is **no music and the mouse interaction** disappears.

Texture:
![End](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/End.PNG)

### Originality
When I first conceived this work, I looked for various reference materials on the Internet without any ideas at first, and stumbled upon a very **dynamic picture**, which gave me some inspiration (see the picture below).

However, I did not completely adopt the geometry like circle, but **added some wireframes and line-like geometry**, which can enrich the scene more.

In addition, the **font effect** is added to make the scene more colorful.

Finally, because the scene was completely **free of human control**, I had an inspiration to **make a scene and mouse interaction**. Make the whole scene a little *more interesting*.

Texture:
![Dynamic](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/Dynamic.jpg)

### Ideas and methods
1.I started by adding all the *necessary things* in the scene, such as camera, lighting, scene size, animation and renderer, to make sure it worked.

```javascript
//Create a screen
scene = new THREE.Scene();

//Set screen size
var W = window.innerWidth,
H = window.innerHeight;

//Create and set the camera position
camera = new THREE.PerspectiveCamera(75, W / H, .1, 1000);
camera.position.set(0, 200, 0);
camera.lookAt(scene.position);

//Creates a spotlight, sets the location and adds it to the screen
var spotLight = new THREE.SpotLight(0xFFFFFF);
spotLight.position.set(0, 1000, 0);
scene.add(spotLight);

//Create the renderer and set the color and size
renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setClearColor(0x000000);
renderer.setSize(W, H);

init();
drawFrame();
```

2.The next step is to put the *most basic three geometries in the scene* and let them show up, and then let them show up in the scene hundreds of times through the for loop.

**CircleGeometry**
```javascript
//Create a two dimensional grid of objects, and position them accordingly
for (var x = -315; x < 345; x += 25) { // Start from -315 and sequentially add one every 25 pixels
  for (var y = -135; y < 165; y += 25) {
    var boxGeometry = new THREE.CircleGeometry(6, 32);

    //The color of the material is assigned a random color
    var boxMaterial = new THREE.MeshPhongMaterial( {
      color: 0xffffff,
      specular: 0x050505,
      shininess: 50,
      map: THREE.ImageUtils.loadTexture('images/9.jpg'),
    });

    //Create mesh and add geometry and materials
    var mesh = new THREE.Mesh(boxGeometry, boxMaterial);

    //Set the meshes' style
    mesh.castShadow = true;
    mesh.position.x = Math.floor( Math.random() * 200 - 100 ) * 4;
    mesh.position.z = Math.floor( Math.random() * 200 - 100 ) * 4;
    mesh.rotation.x = -45.5;
    mesh.rotation.y = 0;

    //Assign the value to the speed
    var randomValueX =(Math.random()*0.1)-0.005;
    randomSpeedX.push(randomValueX)

    //Add it to the screen
    scene.add(mesh);
    cubes.push(mesh);
  }
}
```
**RingGeometry**
```javascript
//Create a two dimensional grid of objects, and position them accordingly
for (var x = -315; x < 345; x += 30) { // Start from -35 and sequentially add one every 5 pixels
  for (var y = -135; y < 165; y += 30) {
var geometry = new THREE.RingGeometry( 7.5, 8, 32 );
var material = new THREE.MeshBasicMaterial( { color: 0xCAE1FF, side: THREE.DoubleSide } );
var mesh1 = new THREE.Mesh( geometry, material );

mesh1.position.x = Math.floor( Math.random() * 200 - 100 ) * 4;
mesh1.position.z = Math.floor( Math.random() * 200 - 100 ) * 4;
mesh1.rotation.x = -45.5;
mesh1.rotation.y = 0;

var randomValueX =(Math.random()*2)-0.5;
randomSpeedX.push(randomValueX)

scene.add(mesh1);
cubes1.push(mesh1);
}
}
```

3.On this basis, the *rotational speed and direction* are added to the geometry.

```javascript
//Set initial rotation
var rot =0;

//Add animation
function drawFrame(ts){
  requestAnimationFrame(drawFrame);

  //Different rotations
  rot += 0.01;

  //To the cube assignment
  cubes2.forEach(function(c, i) {
    c.rotation.x += randomRotationX[i];
    c.rotation.y += randomRotationZ[i];//Rotate the object that is referenced in c
  });

  cubes3.forEach(function(c, i) {
    c.rotation.x += randomRotationX[i];
    c.rotation.y += randomRotationZ[i];//Rotate the object that is referenced in c
  });

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
```

4.Cubicle beziercurve3 is added to one of the geometry to *create a "meteor" effect*.

```javascript
//Create curve and set it's positions
var curve = new THREE.CubicBezierCurve3(
  new THREE.Vector3( -10, 0, 0 ),
  new THREE.Vector3( -5, 15, 0 ),
  new THREE.Vector3( 20, 15, 0 ),
  new THREE.Vector3( 40, 0, 0 )
);

//Set points
var points = curve.getPoints( 50 );

//Create a two dimensional grid of objects, and position them accordingly
for (var x = -315; x < 345; x += 25) { // Start from -315 and sequentially add one every 25 pixels
  for (var y = -135; y < 165; y += 25) {
    var boxGeometry = new THREE.CircleGeometry(5, 32).setFromPoints( points );

    //The color of the material is assigned a random color
    var boxMaterial = new THREE.MeshPhongMaterial( {
      color: 0xffffff,
      specular: 0x050505,
      shininess: 50,
      map: THREE.ImageUtils.loadTexture('images/9.jpg'),
    });

    //Create mesh and add geometry and materials
    var mesh = new THREE.Mesh(boxGeometry, boxMaterial);

    //Set the meshes' style
    mesh.castShadow = true;
    mesh.position.x = Math.floor( Math.random() * 200 - 100 ) * 4;
    mesh.position.z = Math.floor( Math.random() * 200 - 100 ) * 4;
    mesh.rotation.x = -45.5;
    mesh.rotation.y = 0;

    //Assign the value to the speed
    var randomValueX =(Math.random()*0.1)-0.005;
    randomSpeedX.push(randomValueX)

    //Add it to the screen
    scene.add(mesh);
    cubes.push(mesh);
  }
}
```

5.Added *audio and text geometry*.

**Audio**
```javascript
//Create an AudioListener and add it to the camera
var listener = new THREE.AudioListener();
camera.add( listener );

//Create a global audio source
var sound = new THREE.Audio( listener );

//Load a sound and set it as the Audio object's buffer
var audioLoader = new THREE.AudioLoader();
audioLoader.load( 'audio/ClassicalMusic.mp3', function( buffer ) {
  sound.setBuffer( buffer );
  sound.setLoop( true );
  sound.setVolume( 0.5 );
  sound.play();
});
```

**Text geometry**
```javascript
//Load the fonts and set it's style
var loader = new THREE.FontLoader();
  var geometry;
  loader.load( 'fonts/gentilis_regular.typeface.json',

      //Create 3d text
      function ( font ) {

          //Create geometry and set it's style
          geometry = new THREE.TextGeometry( 'Welcome to', {
              font: font,
              size: 25,
              height: 5,
              curveSegments: 12,
              bevelEnabled: true,
              bevelThickness: 5,
              bevelSize: 3,
              bevelSegments: 3
          } );
          geometry1 = new THREE.TextGeometry( 'Visual precipitation !', {
              font: font,
              size: 35,
              height: 5,
              curveSegments: 12,
              bevelEnabled: true,
              bevelThickness: 2,
              bevelSize: 2,
              bevelSegments: 3
          } );

          //Create normal vector materials
          var meshMaterial = new THREE.MeshNormalMaterial({
              flatShading: THREE.FlatShading,
              transparent: true,
              opacity: 0.7,
      });

          //Create mesh and add geometry and materials
          var mesh = new THREE.Mesh(geometry, meshMaterial);
          mesh.position.set(-100, 0, -75);
          mesh.rotation.x = 360*Math.random();

          var mesh1 = new THREE.Mesh(geometry1, meshMaterial);
          mesh1.position.set(-225, 0, 0);
          mesh1.rotation.x = mesh.rotation.x;

          //Create a variable and assign it to rotation
          var randomValueX= (Math.random()*0.1) - 0.04;
          var randomValueZ= 0;
          randomRotationX.push(randomValueX);
          randomRotationZ.push(randomValueZ);

          //Add mesh to the screen
          scene.add(mesh);
          scene.add(mesh1);

          //Place the mesh into the cube group
          cubes2.push(mesh);
          cubes3.push(mesh1);
      }
   );
```

6.Finally, the *interactive effect of mouse and scene* is added.

```javascript
//Set mouse style
document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		function onDocumentMouseMove( ev ) {
			var e = ev||event
	    e.preventDefault();
	    var drawSize = 10;
	    var drawType = '○';
	    var floatType = 'floatOne';
	    var xPos = e.pageX;
	    var yPos = e.pageY;

	    $('body').append('<div class="draw" style=" font-size:'+drawSize+'px;left:'+xPos+'px;top:'+yPos+'px;-webkit-animation:'+floatType+' .9s 1;-moz-animation:'+floatType+' .9s 1;color:#33a0fc;">'+drawType+'</div>');

	    $('.draw').each(function() {
	      var div = $(this);
	      setTimeout(function() {$(div).remove();},800);
	    });
}
```

### File structure
Texture:
![File structure](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/File%20structure.PNG)

1.audio:The audio folder is where to put the **reference music**.

Texture:
![audio](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/audio.PNG)

2.build:The build folder is placed the **external call js**.

Texture:
![build](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/build.PNG)

3.css:The css folder is place the **style**.

Texture:
![css](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/css.PNG)

4.fonts:The fonts folder is placed the **fonts' style**.

Texture:
![fonts](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/fonts.PNG)

5.images:The images folder is placed the **pictures to use**.

Texture:
![images](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/images.PNG)

6.js:The js folder is placed the **external call js** and the __js which I wrote__.

Texture:
![js](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/js.PNG)

7.The **other three** are **actually displayed**.

## Link
If everything went well you should see [this](https://github.com/VK0224/DAT505-GitHub/tree/master/Assignment/01-Appreciation).
