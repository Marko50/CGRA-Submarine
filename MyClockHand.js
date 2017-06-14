/**
 * MyClockHand
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyClockHand(scene,size,width, minS, maxS, minT, maxT) {
	CGFobject.call(this,scene);

	width = typeof width !== 'undefined' ? width : 1;
	size = typeof size !== 'undefined' ? size : 1;
	minS = typeof minS !== 'undefined' ? minS : 0.0;
	maxS = typeof maxS !== 'undefined' ? maxS : 1.0;
	minT = typeof minT !== 'undefined' ? minT : 0.0;
	maxT = typeof maxT !== 'undefined' ? maxT : 1.0;
	this.width = width;
	this.size = size;
	this.minS = minS;
	this.maxS = maxS;
	this.minT = minT;
	this.maxT = maxT;
	this.initBuffers();
};

MyClockHand.prototype = Object.create(CGFobject.prototype);
MyClockHand.prototype.constructor=MyClockHand;

MyClockHand.prototype.initBuffers = function () {
	

	this.vertices = [
 	this.width*-0.02, this.size*1, 0,
 	this.width*0.02, this.size*1, 0,
 	this.width*-0.02, 0, 0,
 	this.width*0.02, 0, 0
 	];

 	this.indices = [
 	2, 1, 0, 
 	1, 2, 3
 	];

 	this.primitiveType = this.scene.gl.TRIANGLES;

    this.normals = [
    0, 0, -1,
    0, 0, -1,
    0, 0, -1,
    0, 0, -1
    ];

    this.texCoords = [

	this.maxS,this.minT,
	this.maxS,this.maxT,
	this.minS,this.minT,
	this.minS,this.maxT
	
	];

	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
};