/**
 * MyBarbatana
 * @constructor
 */
 function MyBarbatana(scene, bigside, smallside, height) {
   this.bigside = bigside;
   this.height = height;
   this.smallside = smallside;
 	CGFobject.call(this,scene);
 	this.initBuffers();
 };

 MyBarbatana.prototype = Object.create(CGFobject.prototype);
 MyBarbatana.prototype.constructor = MyBarbatana;

 MyBarbatana.prototype.initBuffers = function() {
 	this.vertices = [
 	//front
 	-this.bigside/2, -this.height/2,0,
 	this.bigside/2, -this.height/2, 0,
 	-this.smallside/2, this.height/2, 0,
 	this.smallside/2, this.height/2, 0,

    //back
 	-this.bigside/2, -this.height/2,-0.1,
 	this.bigside/2, -this.height/2, -0.1,
 	-this.smallside/2, this.height/2, -0.1,
 	this.smallside/2, this.height/2, -0.1,

    //top
 	-this.smallside/2, this.height/2, 0,
 	this.smallside/2, this.height/2, 0,
    -this.smallside/2, this.height/2, -0.1,
    this.smallside/2, this.height/2, -0.1,

    //bottom
    -this.bigside/2, -this.height/2, -0.1,
    this.bigside/2, -this.height/2, -0.1,
    -this.bigside/2, -this.height/2, 0,
    this.bigside/2, -this.height/2, 0,
    
    //left
    -this.bigside/2, -this.height/2, 0,
    -this.smallside/2, this.height/2, 0,
    -this.bigside/2, -this.height/2, -0.1,
    -this.smallside/2, this.height/2, -0.1,

    //right
    this.smallside/2, this.height/2, 0,
    this.bigside/2, -this.height/2, 0,
    this.smallside/2, this.height/2, -0.1,
    this.bigside/2, -this.height/2, -0.1
 	];

 	this.indices = [
 	0, 1, 2, 
 	3, 2, 1,

 	4,6,5,
 	7,5,6,

 	8,9,10,
 	11,10,9,

 	12,13,14,
 	15,14,13,

 	16,17,18,
 	19,18,17,

 	20,21,22,
 	23,22,21
 	];

 	this.primitiveType = this.scene.gl.TRIANGLES;

    this.normals = [
    //front and back
    0,0,1,
    0,0,1,
    0,0,1,
    0,0,1,
    0,0,-1,
    0,0,-1,
    0,0,-1,
    0,0,-1,

    //top and bottom
    0,1,0,
    0,1,0,
    0,1,0,
    0,1,0,
    0,-1,0,
    0,-1,0,
    0,-1,0,
    0,-1,0,
    
    //diagonals
    Math.cos(120*degToRad),Math.sin(120*degToRad),0,
    Math.cos(120*degToRad),Math.sin(120*degToRad),0,
    Math.cos(120*degToRad),Math.sin(120*degToRad),0,
    Math.cos(120*degToRad),Math.sin(120*degToRad),0,
    Math.cos(30*degToRad),Math.sin(30*degToRad),0,
    Math.cos(30*degToRad),Math.sin(30*degToRad),0,
    Math.cos(30*degToRad),Math.sin(30*degToRad),0,
    Math.cos(30*degToRad),Math.sin(30*degToRad),0
    ];

    this.texCoords = this.normals;
 	this.initGLBuffers();
 };

