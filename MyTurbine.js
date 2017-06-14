/**
 * MyTurbine
 * @constructor
 */
 function MyTurbine(scene, width, depth, height) {
 	this.width = width;
 	this.depth = depth;
 	this.height = height;
 	CGFobject.call(this,scene);
 	this.quad = new MyUnitCubeQuad(this.scene);
 };

 MyTurbine.prototype = Object.create(CGFobject.prototype);
 MyTurbine.prototype.constructor = MyTurbine;

 MyTurbine.prototype.display = function() {
    this.scene.pushMatrix();
 	this.scene.scale(this.width, this.height, this.depth);
 	this.quad.display();
 	this.scene.popMatrix();
 };



