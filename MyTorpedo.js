/**
 * MyTorpedo
 * @constructor
 */
function MyTorpedo(scene,x,y,z,rot) {
	CGFobject.call(this,scene);
	this.showTorpedo = 0;
    this.x = x;
    this.y = y-1;
    this.z = z;
    this.rot = rot;
	
	//this.target;
	//this.targetX;
	this.targetY = 0;
	//this.targetZ;

	this.p1x = this.x;
	this.p1y = this.y;
	this.p1z = this.z;
	this.p2x = this.x + Math.sin((this.rot) * degToRad) * 6;
	this.p2y = this.y;
	this.p2z = this.z + Math.cos((this.rot) * degToRad) * 6; 
	//this.p3x = this.targetX;
	this.p3y = this.targetY+3;
	//this.p3z = this.targetZ;
	//this.p4x = this.targetX;
	//this.p4y = this.targetY;
	//this.p4z = this.targetZ;
	this.t = 0;
	this.qtx = this.x;
	this.qty = this.y;
	this.qtz = this.z;
	this.initBuffers();
	this.r = 0;
	this.teta = 0;
	this.fi = 0;
};


MyTorpedo.prototype = Object.create(CGFobject.prototype);
MyTorpedo.prototype.constructor= MyTorpedo;

MyTorpedo.prototype.initBuffers = function () {

	this.body = new MyCylinder(this.scene, 40, 100);
	this.front = new MyLamp(this.scene,60,60);
    this.barbatanatras = new MyBarbatana(this.scene, 1, 0.6, 0.25);

	this.metal = new CGFappearance(this.scene);
	this.metal.loadTexture("../resources/images/metal.png");
	this.metal.setTextureWrap('REPEAT','REPEAT');
	this.metal.setAmbient(0.2,0.2,0.2,1);
	this.metal.setDiffuse(0.5,0.5,0.5,1);
	this.metal.setSpecular(0.5,0.5,0.5,1);
	this.metal.setShininess(120);

	this.primitiveType=this.scene.gl.TRIANGLES;
//	this.initGLBuffers();

};

MyTorpedo.prototype.setCoords = function(x,y,z,rot) {
	this.x = x;
	this.y = y-1;
	this.z = z;
	this.rot = rot;
	this.p1x = this.x;
	this.p1y = this.y;
	this.p1z = this.z;
	this.p2x = this.x + Math.sin((this.rot) * degToRad) * 6;
	this.p2y = this.y;
	this.p2z = this.z + Math.cos((this.rot) * degToRad) * 6; 
	this.p3y = this.targetY+3;
	this.t = 0.01;
}

MyTorpedo.prototype.update = function() {
	if(this.t < 1) {
	this.oldqtx = this.qtx;
	this.oldqty = this.qty;
	this.oldqtz = this.qtz;
	this.qtx = (1-this.t)*(1-this.t)*(1-this.t)*this.p1x + 3*this.t*(1-this.t)*(1-this.t)*this.p2x + 3*this.t*this.t*(1-this.t)*this.p3x+ this.t*this.t*this.t*this.p4x;
	this.qty = (1-this.t)*(1-this.t)*(1-this.t)*this.p1y + 3*this.t*(1-this.t)*(1-this.t)*this.p2y + 3*this.t*this.t*(1-this.t)*this.p3y+ this.t*this.t*this.t*this.p4y;
	this.qtz = (1-this.t)*(1-this.t)*(1-this.t)*this.p1z + 3*this.t*(1-this.t)*(1-this.t)*this.p2z + 3*this.t*this.t*(1-this.t)*this.p3z+ this.t*this.t*this.t*this.p4z;
	this.x = this.qtx;
	this.z = this.qtz;
	this.y = this.qty;
	this.t +=0.015;
	this.r = Math.sqrt((this.qtx-this.oldqtx)*(this.qtx-this.oldqtx)+(this.qty-this.oldqty)*(this.qty-this.oldqty)+(this.qtz-this.oldqtz)*(this.qtz-this.oldqtz));
	this.teta = Math.atan((this.qty-this.oldqty)/(this.qtx-this.oldqtx));
	this.fi = Math.acos((this.qtz-this.oldqtz)/(this.r));
	}
	else {
		this.target.destroyed = 1;
		this.showTorpedo = 0;
		this.scene.explosion.setCoords(this.targetX, this.targetY, this.targetZ);
		this.scene.showExplosion = 1;
	}
	console.log(this.teta);
	console.log(this.fi);
}

MyTorpedo.prototype.setTarget = function(target) {
	this.target = target;
	this.targetX = target.x;
	this.targetZ = target.z;
	
	this.p3x = this.targetX;
	this.p3z = this.targetZ;
	this.p4x = this.targetX;
	this.p4y = this.targetY;
	this.p4z = this.targetZ;
	this.r = 0;
	this.teta = 0;
	this.fi = 0;
}

MyTorpedo.prototype.display = function() {

    //body
    this.scene.pushMatrix();
    this.scene.translate(0,0,-0.5);
    this.scene.scale(0.2,0.2,0.8);
    this.metal.apply();
    this.body.display();
    this.scene.popMatrix();

    //front
    this.scene.pushMatrix();
    this.scene.translate(0,0,0.27);
    this.scene.scale(0.2,0.2,0.2);
    this.metal.apply();
    this.front.display();
    this.scene.popMatrix();

    //back
    this.scene.pushMatrix();
    this.scene.translate(0,0,-0.47);
    this.scene.scale(0.2,0.2,0.2);
 	this.scene.rotate(180*degToRad,0,1,0);
    this.metal.apply();
    this.front.display();
    this.scene.popMatrix();

    //barbatana tras 1
	this.scene.pushMatrix();
	this.scene.translate(0.05,0,-0.35);
	this.scene.rotate(90*degToRad,1,0,0);
	this.scene.rotate(90*degToRad,0,1,0);
	this.metal.apply();
	this.barbatanatras.display();
	this.scene.popMatrix();

	//barbatana tras 2
	this.scene.pushMatrix();
	this.scene.translate(0,-0.05,-0.35);
	this.scene.rotate(90*degToRad,1,0,0);
	this.metal.apply();
	this.barbatanatras.display();
	this.scene.popMatrix();
}