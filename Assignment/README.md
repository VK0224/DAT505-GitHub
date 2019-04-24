# Visual immersion

#### LIANG SUN B161006083

## The first part of work
**Visual immersion**

### Work content
1.When opening the index, with the **generation of background image and music**, the start interface will appear first. When moving the mouse, there will be the **interaction** between the screen and the mouse.

`Texture`:
![Start](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/Start.PNG)

2.After clicking the **start button** will appear *a scenario* cannot be operation, to include CircleGeometry, CubicBezierCurve3 and RingGeometry, they are random multiple occurrences with certain rotation value, while the TextGeometry is giving the viewer **a hint**, let it go around can let people easier to focus on the it, and at this point, the scene to interact with the mouse is still there. In the **lower right corner of the scene**, there will be **an end button**. Click this button to pop up a new interface.

`Texture`:
![Appreciation](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/Appreciation.PNG)

3.When you click the end button, it will jump to the new scene, and there is **a close button** in the middle. When you click this button, a window will pop up, asking whether you really want to close the page.

Of course there is **no music and the mouse interaction** disappears.

`Texture`:
![End](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/End.PNG)

### Originality
When I first conceived this work, I looked for various reference materials on the Internet without any ideas at first, and stumbled upon a very **dynamic picture**, which gave me some inspiration (see the picture below).

However, I did not completely adopt the geometry like circle, but **added some wireframes and line-like geometry**, which can enrich the scene more.

In addition, the **font effect** is added to make the scene more colorful.

Finally, because the scene was completely **free of human control**, I had an inspiration to **make a scene and mouse interaction**. Make the whole scene a little *more interesting*.

`Texture`:
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
`Texture`:
![File structure](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/File%20structure.PNG)

1.`audio`:The audio folder is where to put the **reference music**.

`Texture`:
![audio](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/audio.PNG)

2.`build`:The build folder is placed the **external call js**.

`Texture`:
![build](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/build.PNG)

3.`css`:The css folder is place the **style**.

`Texture`:
![css](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/css.PNG)

4.`fonts`:The fonts folder is placed the **fonts' style**.

`Texture`:
![fonts](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/fonts.PNG)

5.`images`:The images folder is placed the **pictures to use**.

`Texture`:
![images](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/images.PNG)

6.`js`:The js folder is placed the **external call js** and the __js which I wrote__.

`Texture`:
![js](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/js.PNG)

7.The **other three** are **actually displayed**.

### Link
If everything went well you should see [this](https://github.com/VK0224/DAT505-GitHub/tree/master/Assignment/01-Appreciation).

## The second part of work
**Inspiration of starry sky**

### Work content
1.When the index is opened, the main interface appears, which is mainly for the experiencer to operate, so the scene is **all operable parts**.

2.When the experiencer enters the scene, some part of the geometry has already come out. Second, the top left corner is the `GUI`, which can be used to `increase the geometry of different shapes`, `select music` and `change the rotation.z speed of the scene`.

`Texture`:
![Scene](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/Scene.PNG)

### Originality
Because in the previous part, the content is only for the audio-visual feelings of the experirer and cannot be selected. Therefore, in this part, I want to give the experirer **a certain degree of selectivity** to make their audio-visual feelings more real.

The reason why I choose the `universe as the sky box` is to make the scene more dreamy. The reason why I choose the `geometry of wireframe` is that when the camera pulls away, the geometry is almost solid, and when the camera pulls back, the geometry is wireframe, which makes the whole scene more harmonious.

### Ideas and methods
1.I started by adding all the *necessary things* in the scene, such as camera, lighting, scene size, animation and renderer, to make sure it worked.

```javascript
//Global variables
var container, gui;
var camera, scene, renderer,raycaster;
var mesh, geometry;
var mouse = new THREE.Vector2(), INTERSECTED;
var object;
var objects = [];

function init() {
//Call the element in the HTML
container = document.getElementById( 'container' );

//Create and set the camera position
camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 400;

//Create a screen
scene = new THREE.Scene();

//Creates a spotlight, sets the location and adds it to the screen
var spotLight = new THREE.SpotLight(0xFFFFFF);
spotLight.position.set(0, 1000, 0);
scene.add(spotLight);

addMesh();

//Create the renderer and set the color and size
renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setClearColor(0x707070);
renderer.setSize( window.innerWidth, window.innerHeight );

//Container call renderer
container.appendChild( renderer.domElement );

//Place raycaster and renderer in the function
function render() {
  raycaster.setFromCamera( mouse, camera );
  renderer.render( scene, camera );
}
}
init();
animate();
```

2.Create the skybox.
```javascript
//Skybox's second approach and image
//Set the path
var path = "images/";
    //Set the format
    var format = '.jpg';
        var urls = [
            path + 'px' + format, path + 'nx' + format,
            path + 'py' + format, path + 'ny' + format,
            path + 'pz' + format, path + 'nz' + format
        ];

//Create loader load path
var textureCube = new THREE.CubeTextureLoader().load( urls );

//Set texturecube as the screen background
scene.background = textureCube;

```

3.The next step is to *creates a collection where all the geometry* is placed in order to make it optional and let them show up, and then let them show up in the scene hundreds of times through the for loop with *different rotations*.

```javascript
//Create a collection to place geometry on
var geometries = [
  new THREE.IcosahedronGeometry(10,0),
  new THREE.OctahedronGeometry(12,0),
  new THREE.SphereGeometry(5,32,32),
  new THREE.TetrahedronGeometry(15,0),
  new THREE.ConeGeometry(5,20,32),
  new THREE.BoxGeometry( 5,5,5 ),
  new THREE.DodecahedronGeometry(5,0),
  new THREE.TorusGeometry( 10, 3, 16, 100 ),
  new THREE.TorusKnotGeometry( 10, 3, 100, 16 ),
];

//Name the options in the GUI with initial values
var options = {
  AddGeometry: 0
};

//Define the material
var material = new THREE.MeshNormalMaterial( { opacity: 0.5,wireframe:true} );

//Call function generates 900 geometry at random positions on the screen
function addMesh() {
  if ( mesh !== undefined ) {
    scene.remove( mesh );
    geometry.dispose();
  }
  geometry = geometries[ options.AddGeometry ];
  depthTest: false;

  for (var i=0; i<900; i++){
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.x = Math.floor( Math.random() * 600 - 300 ) * 4;
    mesh.position.y = Math.floor( Math.random() * 600 - 300 ) * 4;
    mesh.position.z = Math.floor( Math.random() * 600 - 300 ) * 4;
    scene.add( mesh );
    objects.push(mesh);
  }
}

//Create the GUI and add options, names, and collections to let them master the functions
gui = new dat.GUI( { width: 350 } );
gui.add( options, 'AddGeometry', geometries ).onChange( function () {
  addMesh();
} );
//Set style
gui.domElement.style = 'position:absolute;top:0px;left:0px';
```

4.The music is also placed in a collection in order and given an *empty initial option* so that music does not immediately appear when the scene is first opened.

```javascript
//Create a collection to place music on
var geometries1 = [
  "  ",
  "audio/LightMusic.mp3",
  "audio/PopMusic.mp3",
  "audio/RhythmAndBlues.mp3",
  "audio/RockAndRoll.mp3",
];

var options1 = {
  Music:0,
};

//Call a function to associate an option with an element and play it back
function addMusic() {
    geometry1 = geometries1[ options1.Music ];
    var myAuto = document.getElementById('myaudio');
        myAuto.src = geometry1;
        myAuto.play();
}

gui1 = new dat.GUI( { width: 350 } );
gui1.add( options1, 'Music', geometries1 ).onChange( function () {
  addMusic();
} );
gui1.domElement.style = 'position:absolute;top:30px;left:0px';
```

5.Finally, make the *rotation parameters into a set*, put the Z in it and give an initial value, and then give this parameter *a range* so that the experiencer can adjust the rotation speed of the scene in the scene and give the scene atomization effect

```javascript
//Give Rotation.Z an initial parameter
var params = {
	RotationZ: 0.001,
};

gui2 = new dat.GUI( { width: 350 } );
gui2.add( params, 'RotationZ', 0, 0.05 );
gui2.domElement.style = 'position:absolute;top:60px;left:0px';

//Screen rotation
scene.rotation.x += 0.001;
scene.rotation.y += 0.001;
scene.rotation.z += params.RotationZ;

//Atomization effect
scene.fog = new THREE.FogExp2(0xFFFFFF,0.001);
```

### File structure
`Texture`:
![File structure1](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/File%20structure1.PNG)

1.`audio`:The audio folder is where to put the **reference music**.

`Texture`:
![audio1](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/audio1.PNG)

2.`build`:The build folder is placed the **external call js**.

`Texture`:
![build1](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/build1.PNG)

3.`css`:The css folder is place the **style**.

`Texture`:
![css1](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/css1.PNG)

4.`images`:The images folder is placed the **pictures to use**.

`Texture`:
![images1](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/images1.PNG)

5.`js`:The js folder is placed the **external call js** and the __js which I wrote__.

`Texture`:
![js1](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/js1.PNG)

6.The **other** is **actually displayed**.

### Link
If everything went well you should see [this](https://github.com/VK0224/DAT505-GitHub/tree/master/Assignment/02-Selective%20Regulation).

### Statement
1.In fact, at first I wanted to put the **two works in a file**, by establishing two buttons in the start screen to open the two different HTML, but late in the process of writing code, I just put two buttons, although the two buttons have effect, but can `only be the first to work really displayed`. And when I click the second button, it `just goes white and doesn't show what I'm showing`. After consulting the teacher, this problem was still not solved. I could only separate the two indexes and put them in two folders, but actually they belong to one work. It is regrettable that this problem cannot be solved.

`Texture`:
![Button1](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/Button1.PNG)

2.In the `first` part of work
* When the end button is clicked it does not open on this page, but a new page pops up.

* `Texture`:
![Buttons](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/Buttons.PNG)

* When I click the close button, the two options displayed in the window are Chinese instead of English, which is also something I am very sorry about.
* `Texture`:
![Close](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/Close.PNG)

3.In the `second` part of work
* The choice of skybox and whether the geometry is a wireframe or a solid is a bit of a struggle for me.

* (1).In the beginning, I made four effects for comparison, and later selected two effects of Select2 and Select3, and finally chose Select3.
* `Texture`:
![Selcet1](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/Select1.PNG)

* `Texture`:
![Selcet2](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/Select2.PNG)

* `Texture`:
![Selcet3](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/Select3.PNG)

* `Texture`:
![Selcet4](https://github.com/VK0224/DAT505-GitHub/blob/master/Textures/Select4.PNG)

* (2).But after picking out Select3 I thought it was too colorful, so I added wireframes to the geometry. This really makes a difference because the geometry appears as solid when the view is pushed back, and becomes wireframe when the view is pulled back. This gave me something new and I decided to use this effect.

4.So what you see now is my final presentation !
