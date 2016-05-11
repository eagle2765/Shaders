///<reference path='./typings/tsd.d.ts'/>
///<reference path="./localTypings/webglutils.d.ts"/>

/*
 * Portions of this code are
 * Copyright 2015, Blair MacIntyre.
 * 
 * Portions of this code taken from http://webglfundamentals.org, at https://github.com/greggman/webgl-fundamentals
 * and are subject to the following license.  In particular, from 
 *    http://webglfundamentals.org/webgl/webgl-less-code-more-fun.html
 *    http://webglfundamentals.org/webgl/resources/primitives.js
 * 
 * Those portions Copyright 2014, Gregg Tavares.
 * All rights reserved.
 */

import loader = require('./loader');

////////////////////////////////////////////////////////////////////////////////////////////
// stats module by mrdoob (https://github.com/mrdoob/stats.js) to show the performance 
// of your graphics
var stats = new Stats();
stats.setMode( 1 ); // 0: fps, 1: ms, 2: mb

stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );

////////////////////////////////////////////////////////////////////////////////////////////
// utilities
var rand = function(min: number, max?: number) {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return min + Math.random() * (max - min);
};

var randInt = function(range) {
  return Math.floor(Math.random() * range);
};

////////////////////////////////////////////////////////////////////////////////////////////
// get some of our canvas elements that we need
var canvas = <HTMLCanvasElement>document.getElementById("webgl");  

var globalshader = 0;
window["onEffect1"] = () => {
    console.log("install effect1!");
    globalshader = 0;
    
  //////////////
  ///////// YOUR CODE HERE TO cause the program to use your first shader effect
  ///////// (you can probably just use some sort of global variable to indicate which effect)
  //////////////
    
    
} 

window["onEffect2"] = () => {
    console.log("install effect2!");
    globalshader = 1;
  //////////////
  ///////// YOUR CODE HERE TO cause the program to use your second shader effect
  ///////// (you can probably just use some sort of global variable to indicate which effect)
  //////////////
} 

window["onEffect3"] = () => {
    console.log("install effect3!");
    globalshader = 2;
  //////////////
  ///////// YOUR CODE HERE TO cause the program to use your third shader effect
  ///////// (you can probably just use some sort of global variable to indicate which effect)
  //////////////
} 

window["onEffect4"] = () => {
    console.log("install effect4!");
    globalshader = 3;
  //////////////
  ///////// YOUR CODE HERE TO cause the program to use your fourth shader effect
  ///////// (you can probably just use some sort of global variable to indicate which effect)
  //////////////
} 

////////////////////////////////////////////////////////////////////////////////////////////
// some simple interaction using the mouse.
// we are going to get small motion offsets of the mouse, and use these to rotate the object
//
// our offset() function from assignment 0, to give us a good mouse position in the canvas 
function offset(e: MouseEvent): GLM.IArray {
    e = e || <MouseEvent> window.event;

    var target = <Element> e.target || e.srcElement,
        rect = target.getBoundingClientRect(),
        offsetX = e.clientX - rect.left,
        offsetY = e.clientY - rect.top;

    return vec2.fromValues(offsetX, offsetY);
}

var mouseStart = undefined;  // previous mouse position
var mouseDelta = undefined;  // the amount the mouse has moved
var mouseAngles = vec2.create();  // angle offset corresponding to mouse movement

// start things off with a down press
canvas.onmousedown = (ev: MouseEvent) => {
    mouseStart = offset(ev);        
    mouseDelta = vec2.create();  // initialize to 0,0
    vec2.set(mouseAngles, 0, 0);
}

// stop things with a mouse release
canvas.onmouseup = (ev: MouseEvent) => {
    if (mouseStart != undefined) {
        const clickEnd = offset(ev);
        vec2.sub(mouseDelta, clickEnd, mouseStart);        // delta = end - start
        vec2.scale(mouseAngles, mouseDelta, 10/canvas.height);  

        // now toss the two values since the mouse is up
        mouseDelta = undefined;
        mouseStart = undefined; 
    }
}

// if we're moving and the mouse is down        
canvas.onmousemove = (ev: MouseEvent) => {
    if (mouseStart != undefined) {
      const m = offset(ev);
      vec2.sub(mouseDelta, m, mouseStart);    // delta = mouse - start 
      vec2.copy(mouseStart, m);               // start becomes current position
      vec2.scale(mouseAngles, mouseDelta, 10/canvas.height);

      // console.log("mousemove mouseAngles: " + mouseAngles[0] + ", " + mouseAngles[1]);
      // console.log("mousemove mouseDelta: " + mouseDelta[0] + ", " + mouseDelta[1]);
      // console.log("mousemove mouseStart: " + mouseStart[0] + ", " + mouseStart[1]);
   }
}

// stop things if you move out of the window
canvas.onmouseout = (ev: MouseEvent) => {
    if (mouseStart != undefined) {
      vec2.set(mouseAngles, 0, 0);
      mouseDelta = undefined;
      mouseStart = undefined;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////
// start things off by calling initWebGL
initWebGL();

function initWebGL() {
  // get the rendering context for webGL
  var gl: WebGLRenderingContext = getWebGLContext(canvas);
  if (!gl) {
    return;  // no webgl!  Bye bye
  }

  // turn on backface culling and zbuffering
  //gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);

  // attempt to download and set up our GLSL shaders.  When they download, processed to the next step
  // of our program, the "main" routing
  // 
  // YOU SHOULD MODIFY THIS TO DOWNLOAD ALL YOUR SHADERS and set up all four SHADER PROGRAMS,
  // THEN PASS AN ARRAY OF PROGRAMS TO main().  You'll have to do other things in main to deal
  // with multiple shaders and switch between them
  loader.loadFiles(['shaders/a3-shader0.vert', 'shaders/a3-shader0.frag','shaders/a3-shader1.vert', 'shaders/a3-shader1.frag', 'shaders/a3-shader2.vert', 'shaders/a3-shader2.frag', 'shaders/a3-shader3.vert', 'shaders/a3-shader3.frag'], function (shaderText) {
    var shaderText0 = [shaderText[0], shaderText[1]];
    
    var shaderText1 = [shaderText[2], shaderText[3]];
    
    var shaderText2 = [];
    shaderText2.push(shaderText[4]);
    shaderText2.push(shaderText[5]);
    
    var shaderText3 = [];
    shaderText3.push(shaderText[6]);
    shaderText3.push(shaderText[7]);
    
    var program0 = createProgramFromSources(gl, shaderText0);
    var program1 = createProgramFromSources(gl, shaderText1);
    var program2 = createProgramFromSources(gl, shaderText2);
    var program3 = createProgramFromSources(gl, shaderText3);
    
    var programs = [program0, program1, program2, program3];
    main(gl, programs);
  }, function (url) {
      alert('Shader failed to download "' + url + '"');
  }); 
}

////////////////////////////////////////////////////////////////////////////////////////////
// webGL is set up, and our Shader program has been created.  Finish setting up our webGL application       
function main(gl: WebGLRenderingContext, programs: WebGLProgram[]) {
  
  // use the webgl-utils library to create setters for all the uniforms and attributes in our shaders.
  // It enumerates all of the uniforms and attributes in the program, and creates utility functions to 
  // allow "setUniforms" and "setAttributes" (below) to set the shader variables from a javascript object. 
  // The objects have a key for each uniform or attribute, and a value containing the parameters for the
  // setter function
  
  // z is number of squares
  function createPositionArray(z) {
    var anArray = [];
    var a = Math.sqrt(z);
    var increment = 10 / a;

    // rows first
    for (var y = 0; y <= 10; y = y + increment) {
      for (var x = 0; x <= 10; x = x + increment) {
          anArray.push(x);
          anArray.push(y);
          anArray.push(0);
      }
    }

    return anArray;
  }

  // posArray is position array
  function createTexArray(posArray) {
    var anArray = [];
    for (var i = 0; i < posArray.length; i = i + 3) {
      anArray.push(posArray[i] / 10);
      anArray.push(posArray[i + 1] / 10);
    }
    return anArray;
  }

  function createNormalArray(posArray) {
    var anArray = [];
    for (var i = 0; i < posArray.length / 3; i = i + 1) {
      anArray.push(0);
      anArray.push(0);
      anArray.push(-1);
    }
    return anArray;
  }

  // z is the number of squares
  function createIndiciesArray(z) {
    var anArray = [];
    var offset = Math.sqrt(z) + 1;
    // vertex number
    var current = offset;

    // do for every vertex
    for (; current < (offset * offset); current++) {

      // add triangles to the array by square
      if ((current + 1) % offset != 0) {
        //triangle 1
        anArray.push(current);
        anArray.push(current - offset);
        anArray.push(current - offset + 1);

        //triangle 2
        anArray.push(current);
        anArray.push(current + 1);
        anArray.push(current - offset + 1);
      }
    }
    return anArray;
  }

  var positionArray = createPositionArray(64);
  var texcoordArray = createTexArray(positionArray);
  var normalArray = createNormalArray(positionArray);
  var indiciesArray = createIndiciesArray(64);


  // an indexed quad
  var arrays = {
     position: { numComponents: 3, data: positionArray,                 },
     texcoord: { numComponents: 2, data: texcoordArray,                 },
     normal:   { numComponents: 3, data: normalArray,                   },
     indices:  { numComponents: 3, data: indiciesArray,                 },
  };
  var center = [5,5,0];
  var scaleFactor = 20;
  
  var bufferInfo = createBufferInfoFromArrays(gl, arrays);
  
  function degToRad(d) {
    return d * Math.PI / 180;
  }

  var cameraAngleRadians = degToRad(0);
  var fieldOfViewRadians = degToRad(60);
  var cameraHeight = 50;

  var uniformsThatAreTheSameForAllObjects = {
    u_lightWorldPos:         [50, 30, -100],
    u_viewInverse:           mat4.create(),
    u_lightColor:            [1, 1, 1, 1],
    u_ambient:               [0.1, 0.1, 0.1, 0.1]
  };

  var uniformsThatAreComputedForEachObject = {
    u_worldViewProjection:   mat4.create(),
    u_world:                 mat4.create(),
    u_worldInverseTranspose: mat4.create(),
  };


  var texture1 = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture1);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 255, 255]));
  // Asynchronously load an image
  var image1 = new Image();
  image1.src = "imgs/pic1.jpg";
  image1.addEventListener('load', function() {
  // Now that the image has loaded make copy it to the texture.
  gl.bindTexture(gl.TEXTURE_2D, texture1);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image1);
  gl.generateMipmap(gl.TEXTURE_2D);
  });
  

  var texture2 = gl.createTexture();
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, texture2);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 255, 255]));
  // Asynchronously load an image
  var image2 = new Image();
  image2.src = "imgs/pic2.jpg";
  image2.addEventListener('load', function() {
  //Now that the image has loaded make copy it to the texture.
  gl.bindTexture(gl.TEXTURE_2D, texture2);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, image2);
  gl.generateMipmap(gl.TEXTURE_2D);
  });


  var baseColor = rand(240);
  var objectState = { 
      materialUniforms: {
        u_colorMult:             chroma.hsv(rand(baseColor, baseColor + 120), 0.5, 1).gl(),
        //u_diffuse:               texture,
        u_specular:              [1, 1, 1, 1],
        u_shininess:             450,
        u_specularFactor:        0.75,
      }
  };

  // some variables we'll reuse below
  var projectionMatrix = mat4.create();
  var viewMatrix = mat4.create();
  var rotationMatrix = mat4.create();
  var matrix = mat4.create();  // a scratch matrix
  var invMatrix = mat4.create();
  var axisVector = vec3.create();
  
  requestAnimationFrame(drawScene);

  // Draw the scene.
  function drawScene(time: number) {
    //picks shader based on button. Starts with mandelbrot
    var uniformSetters = createUniformSetters(gl, programs[globalshader]);
    var attribSetters  = createAttributeSetters(gl, programs[globalshader]);
    time *= 0.001; 
   
    // measure time taken for the little stats meter
    stats.begin();

    // if the window changed size, reset the WebGL canvas size to match.  The displayed size of the canvas
    // (determined by window size, layout, and your CSS) is separate from the size of the WebGL render buffers, 
    // which you can control by setting canvas.width and canvas.height
    resizeCanvasToDisplaySize(canvas);

    // Set the viewport to match the canvas
    gl.viewport(0, 0, canvas.width, canvas.height);
    
    // Clear the canvas AND the depth buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Compute the projection matrix
    var aspect = canvas.clientWidth / canvas.clientHeight;
    mat4.perspective(projectionMatrix,fieldOfViewRadians, aspect, 1, 2000);

    // Compute the camera's matrix using look at.
    var cameraPosition = [0, 0, -200];
    var target = [0, 0, 0];
    var up = [0, 1, 0];
    var cameraMatrix = mat4.lookAt(uniformsThatAreTheSameForAllObjects.u_viewInverse, cameraPosition, target, up);

    // Make a view matrix from the camera matrix.
    mat4.invert(viewMatrix, cameraMatrix);

        
    // tell WebGL to use our shader program (will need to change this)
    gl.useProgram(programs[globalshader]);
    

    // pass variables into the shaders
    if (globalshader == 2) {
      var u_image0Location = gl.getUniformLocation(programs[globalshader], "u_image0");
      var u_image1Location = gl.getUniformLocation(programs[globalshader], "u_image1");
      var u_mouse_y = gl.getUniformLocation(programs[globalshader], "mouse_y");

      //create texture units
      gl.uniform1i(u_image0Location, 0);  // texture unit 0
      gl.uniform1i(u_image1Location, 1);  // texture unit 1

      // when the mouse moves give the shader the new mouse y position
      document.onmousemove = function(e) {
      gl.uniform1f(u_mouse_y, e.clientY - canvas.getBoundingClientRect().top);
      };
    }

    if (globalshader == 3) {
      // pass in time
      var atime = gl.getUniformLocation(programs[globalshader], "a_time");
      gl.uniform1f(u_mouse_y, time);
      
      // pass in mouse y
      var u_mouse_y = gl.getUniformLocation(programs[globalshader], "mouse_y");
      //when the mouse moves give the shader the new mouse y position
      document.onmousemove = function(e) {
      gl.uniform1f(u_mouse_y, e.clientY - canvas.getBoundingClientRect().top);
      };
    }
    

    // Setup all the needed attributes and buffers.  
    setBuffersAndAttributes(gl, attribSetters, bufferInfo);

    // Set the uniforms that are the same for all objects.  Unlike the attributes, each uniform setter
    // is different, depending on the type of the uniform variable.  Look in webgl-util.js for the
    // implementation of  setUniforms to see the details for specific types       
    setUniforms(uniformSetters, uniformsThatAreTheSameForAllObjects);
   
    ///////////////////////////////////////////////////////
    // Compute the view matrix and corresponding other matrices for rendering.
    
    // first make a copy of our rotationMatrix
    mat4.copy(matrix, rotationMatrix);
    
    // adjust the rotation based on mouse activity.  mouseAngles is set if user is dragging 
    if (mouseAngles[0] !== 0 || mouseAngles[1] !== 0) {
      /*
       * only rotate around Y, use the second mouse value for scale.  Leaving the old code from A3 
       * here, commented out
       * 
      // need an inverse world transform so we can find out what the world X axis for our first rotation is
      mat4.invert(invMatrix, matrix);
      // get the world X axis
      var xAxis = vec3.transformMat4(axisVector, vec3.fromValues(1,0,0), invMatrix);

      // rotate about the world X axis (the X parallel to the screen!)
      mat4.rotate(matrix, matrix, -mouseAngles[1], xAxis);
      */
            
      // now get the inverse world transform so we can find the world Y axis
      mat4.invert(invMatrix, matrix);
      // get the world Y axis
      var yAxis = vec3.transformMat4(axisVector, vec3.fromValues(0,1,0), invMatrix);

      // rotate about teh world Y axis
      mat4.rotate(matrix, matrix, mouseAngles[0], yAxis);
      
      // save the resulting matrix back to the cumulative rotation matrix 
      mat4.copy(rotationMatrix, matrix);
      
      // use mouseAngles[1] to scale
      scaleFactor += mouseAngles[1];
      
      vec2.set(mouseAngles, 0, 0);        
    }   

    // add a translate and scale to the object World xform, so we have:  R * T * S
    mat4.translate(matrix, rotationMatrix, [-center[0]*scaleFactor, -center[1]*scaleFactor, 
                                            -center[2]*scaleFactor]);
    mat4.scale(matrix, matrix, [scaleFactor, scaleFactor, scaleFactor]);
    mat4.copy(uniformsThatAreComputedForEachObject.u_world, matrix);
    
    // get proj * view * world
    mat4.multiply(matrix, viewMatrix, uniformsThatAreComputedForEachObject.u_world);
    mat4.multiply(uniformsThatAreComputedForEachObject.u_worldViewProjection, projectionMatrix, matrix);

    // get worldInvTranspose.  For an explaination of why we need this, for fixing the normals, see
    // http://www.unknownroad.com/rtfm/graphics/rt_normals.html
    mat4.transpose(uniformsThatAreComputedForEachObject.u_worldInverseTranspose, 
                   mat4.invert(matrix, uniformsThatAreComputedForEachObject.u_world));

    // Set the uniforms we just computed
    setUniforms(uniformSetters, uniformsThatAreComputedForEachObject);

    // Set the uniforms that are specific to the this object.
    setUniforms(uniformSetters, objectState.materialUniforms);

    // Draw the geometry.   Everything is keyed to the ""
    gl.drawElements(gl.TRIANGLES, bufferInfo.numElements, gl.UNSIGNED_SHORT, 0);

    // stats meter
    stats.end();

    requestAnimationFrame(drawScene);
  }
}

