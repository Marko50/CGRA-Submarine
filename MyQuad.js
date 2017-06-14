/**
 * MyQuad
 * @constructor
 */
 function MyQuad(scene, minS, maxS, minT, maxT) {
 	CGFobject.call(this,scene);

 	this.initBuffers(minS, maxS, minT, maxT);
 };

 MyQuad.prototype = Object.create(CGFobject.prototype);
 MyQuad.prototype.constructor = MyQuad;

 MyQuad.prototype.initBuffers = function(minS, maxS, minT, maxT) {
 
    this.texCoords = [
    minS,maxT,
    maxS,maxT,
    minS,minT,
    maxS,minT
    ];
   
 	this.vertices = [
 	-0.5, -0.5, 0,
 	0.5, -0.5, 0,
 	-0.5, 0.5, 0,
 	0.5, 0.5, 0
 	];

 	this.indices = [
 	0, 1, 2, 
 	3, 2, 1
 	];
     
    this.normals = [
     0,0,1,
     0,0,1,
     0,0,1,
     0,0,1
    ];
      
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
