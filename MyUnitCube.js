/**
 * MyUnitCube
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function MyUnitCube(scene) {
	CGFobject.call(this,scene);

	this.initBuffers();
};

MyUnitCube.prototype = Object.create(CGFobject.prototype);
MyUnitCube.prototype.constructor=MyUnitCube;

MyUnitCube.prototype.initBuffers = function () {
    
this.vertices = [

          -0.5, 0.5, 0.5,

           -0.5, -0.5, 0.5 ,

           0.5, 0.5, 0.5,

           0.5, -0.5, 0.5,

           -0.5, 0.5, -0.5,

           -0.5, -0.5, -0.5,

           0.5, 0.5, -0.5,

           0.5, -0.5, -0.5

            ];

	this.indices = [
          1, 3, 0,

           3, 2, 0,

           1, 5, 3,

           5, 7, 3,

           3, 7, 6,

           6, 2, 3,

           4, 5, 1,

           1, 0, 4,

           5, 6, 7,

           5, 4, 6,

           2, 6, 0,

           6, 4, 0
          

        ];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();

};
