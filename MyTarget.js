/**
 * MyTarget
 * @constructor
 */
 function MyTarget(scene, width, depth, height, x, z) {
 	this.width = width;
 	this.depth = depth;
 	this.height = height;
 	this.x = x;
 	this.z = z;
 	this.destroyed = 0;
 	CGFobject.call(this,scene);
 	this.quad = new MyUnitCubeQuad(this.scene);
 };

 MyTarget.prototype = Object.create(CGFobject.prototype);
 MyTarget.prototype.constructor = MyTarget;

 MyTarget.prototype.display = function() {
    this.scene.pushMatrix();
    this.scene.translate(this.x,0,this.z);
 	this.scene.scale(this.width, this.height, this.depth);
 	this.quad.display();
 	this.scene.popMatrix();
 };



