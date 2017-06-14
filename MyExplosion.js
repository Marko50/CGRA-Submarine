/**
 * MyExplosion
 * @constructor
 */
  function MyExplosion(scene, x, y, z) {
 	CGFobject.call(this,scene);
	this.x = x;
	this.y = y;
	this.z = z;
	this.size = 0.3;
    this.half = new MyLamp(this.scene, 60, 60);
    this.over = 0;

 	this.initBuffers();
 };

 MyExplosion.prototype = Object.create(CGFobject.prototype);
 MyExplosion.prototype.constructor = MyExplosion;

 MyExplosion.prototype.initBuffers = function() {
	

	this.lava = new CGFappearance(this.scene);
	this.lava.loadTexture("../resources/images/LavaTexture.png");
	this.lava.setTextureWrap('REPEAT','REPEAT');
	this.lava.setAmbient(0.2,0.2,0.2,1);
	this.lava.setDiffuse(0.5,0.5,0.5,1);
	this.lava.setSpecular(0.5,0.5,0.5,1);
	this.lava.setShininess(10);
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	//this.initGLBuffers();

 }

MyExplosion.prototype.setCoords = function(x,y,z) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.over = 0;
	this.size = 0.3;
}

MyExplosion.prototype.update = function() {
	if (this.size < 2) {
		this.size +=0.1;
	}
	else
		this.over = 1;
}

 MyExplosion.prototype.display = function() {
     this.scene.pushMatrix();
     this.scene.translate(this.x,this.y,this.z-(0.02*this.size/0.3));
     this.scene.scale(this.size,this.size,this.size);
     this.lava.apply();
     this.half.display();
     this.scene.popMatrix();

     this.scene.pushMatrix();
     this.scene.translate(this.x,this.y,this.z);
     this.scene.rotate(Math.PI, 1,0,0);
     this.scene.scale(this.size,this.size,this.size);
     this.lava.apply();
     this.half.display();
     this.scene.popMatrix();
 }