/**
 * MySubmarine
 * @constructor
 */
function MySubmarine(scene) {
	CGFobject.call(this,scene);

	this.rotation = 180;
	this.Xmovement = 8;
	this.Zmovement = 8;
	this.texIndex = 0;
	this.rotBarbHorizontal = 0;
	this.rotBarbVertical = 0;
	this.extraRot = 0;
	this.rotTurbine = 0;
	this.Ymovement = 2;
	this.extraY = 0;
	this.periscopeHeight = 0;
	this.perisUp = 0;
	

	this.initBuffers();
};

MySubmarine.prototype = Object.create(CGFobject.prototype);
MySubmarine.prototype.constructor= MySubmarine;

MySubmarine.prototype.initBuffers = function () {

	this.body = new MyCylinder(this.scene, 40, 100);
	this.hatch = new MyCylinder(this.scene, 40, 40);
	this.hatchtop = new MyCircle(this.scene,60);
	this.front = new MyLamp(this.scene,60,60);

	this.scope = new MyCylinder(this.scene, 20, 3);
    this.scopebody = new MyCylinder(this.scene,40,1);

    this.barbatanahatch = new MyBarbatana(this.scene, 2, 1.5, 0.5);
    this.barbatanatras = new MyBarbatana(this.scene, 3.4, 2.5, 0.7);
	
	this.turbine = new MyTurbine(this.scene,0.05,0.2,0.7);
	this.turbineCenter = new MyLamp(this.scene, 60,60);
		
	
	this.yellow = new CGFappearance(this.scene);
	this.yellow.setAmbient(0.3,0.3,0.3,1);
	this.yellow.setDiffuse(0.95,0.8,0.3,1);
	this.yellow.setSpecular(0.3,0.3,0.3,1);	
	this.yellow.setShininess(120);

	this.metal = new CGFappearance(this.scene);
	this.metal.loadTexture("../resources/images/metal.png");
	this.metal.setTextureWrap('REPEAT','REPEAT');
	this.metal.setAmbient(0.2,0.2,0.2,1);
	this.metal.setDiffuse(0.5,0.5,0.5,1);
	this.metal.setSpecular(0.5,0.5,0.5,1);
	this.metal.setShininess(120);

	this.rusty = new CGFappearance(this.scene);
	this.rusty.loadTexture("../resources/images/rusty.png");
	this.rusty.setTextureWrap('REPEAT','REPEAT');
	this.rusty.setAmbient(0.2,0.2,0.2,1);
	this.rusty.setDiffuse(0.5,0.5,0.5,1);
	this.rusty.setSpecular(0.5,0.5,0.5,1);
	this.rusty.setShininess(10);

	this.submarineAppearances = [];
	this.submarineAppearances.push(this.metal, this.rusty, this.yellow);

    this.vertices = [
 	0.5, 0.3, 0,
 	-0.5, 0.3, 0,
 	0, 0.3, 2,
 	];

 	this.indices = [
 	0, 1, 2, 
 	];
     
    this.normals = [
     0,0,1,
     0,0,1,
     0,0,1,
    ];

	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();

};

MySubmarine.prototype.rotateLeft = function (rot) {
	this.rotation += rot;
};
MySubmarine.prototype.rotateRight = function (rot) {
	this.rotation -= rot;
};
MySubmarine.prototype.moveForward = function(val) {
	this.Xmovement += Math.sin(this.rotation * degToRad) * val;
	this.Zmovement += Math.cos(this.rotation * degToRad) * val;

};
MySubmarine.prototype.moveBack = function(val) {
	this.Xmovement -= Math.sin(this.rotation * degToRad) * val;
	this.Zmovement -= Math.cos(this.rotation * degToRad) * val;
}

MySubmarine.prototype.update = function(speed) {
	this.Xmovement += Math.sin(this.rotation * degToRad) * speed/10;
	this.Zmovement += Math.cos(this.rotation * degToRad) * speed/10;
	this.rotation += this.extraRot;
	this.rotTurbine += speed*20;
	if(this.Ymovement > 0 && this.extraY < 0) {
		this.Ymovement += this.extraY;
	}
	else if (this.Ymovement < 10 && this.extraY > 0) {
		this.Ymovement += this.extraY;
	}
	if(this.perisUp == 1) {
		if(this.periscopeHeight < 1)
			this.periscopeHeight += 0.05;
	}
	else if (this.periscopeHeight > 0.4)
			this.periscopeHeight -= 0.05;
}

MySubmarine.prototype.handlePeriscope = function(val) {
	if(val == 0) { //up
		if (this.periscopeHeight < 1) {
			this.periscopeHeight += 0.1;
			this.perisUp = 1;
		}
	}
	else if (val == 1) { //down
		if (this.periscopeHeight > 0.4) {
			this.periscopeHeight -= 0.1;
			this.perisUp = 0;
		}
	}
}

MySubmarine.prototype.adjustBarbatanas = function(val, speed) {
	if (speed != 0) {
		if (val == 0) { //left
			if(this.rotBarbVertical > -30) {
				this.rotBarbVertical -= 3;
				this.extraRot = speed*40*degToRad*(this.rotBarbVertical/(-30));
			}
		}
		else if(val == 1) { //right
			if(this.rotBarbVertical < 30) {
				this.rotBarbVertical +=3;
				this.extraRot = speed*(-40)*degToRad*(this.rotBarbVertical/(30));
			}
		}
	}
	if(val == 3) { //up

		if(this.rotBarbHorizontal > -30) {
			if (this.extraY < 0.2)  {
			this.rotBarbHorizontal -= 5;
				this.extraY += 0.05;
			}
		}
	}
	else if(val == 4) { //down
		if(this.rotBarbHorizontal < 30) {
			if(this.extraY > -0.2) {
			this.rotBarbHorizontal += 5;
				this.extraY -= 0.05;
			}
		}
	}
}

MySubmarine.prototype.display = function() {

    //body
    this.scene.pushMatrix();
    this.scene.scale(0.73,1,4.08);
	this.scene.translate(0,0,-0.5);
    this.submarineAppearances[this.texIndex].apply();
    this.body.display();
    this.scene.popMatrix();

    //hatch
	this.scene.pushMatrix();
	this.scene.scale(0.45,1.17,0.65);
	this.scene.translate(0,1.57,1);
	this.scene.rotate(90*degToRad,1,0,0);
	this.submarineAppearances[this.texIndex].apply();
	this.hatch.display();
	this.scene.popMatrix();

	//hatchtop
	this.scene.pushMatrix();
	this.scene.scale(0.45,1.1,0.65);
	this.scene.translate(0,1.67,1);
	this.scene.rotate(-90*degToRad,1,0,0);
	this.submarineAppearances[this.texIndex].apply();
	this.hatchtop.display();
	this.scene.popMatrix();

	//front
    this.scene.pushMatrix();
    this.scene.scale(0.7,1,1);
 	this.scene.translate(0,0,1.95)
    this.submarineAppearances[this.texIndex].apply();
    this.front.display();
    this.scene.popMatrix();

    //back
    this.scene.pushMatrix();
    this.scene.scale(0.7,1,1);
   	this.scene.rotate(180*degToRad,0,1,0);
    this.scene.translate(0,0,1.95);
    this.submarineAppearances[this.texIndex].apply();
    this.front.display();
    this.scene.popMatrix();

	//scope
	this.scene.pushMatrix();
	this.scene.scale(0.1,1,0.1);
	this.scene.translate(0,this.periscopeHeight*2.7,7.5);
	this.scene.rotate(90*degToRad,1,0,0);
	this.submarineAppearances[this.texIndex].apply();
	this.scope.display();
	this.scene.popMatrix();

	//scope top
	this.scene.pushMatrix();
	this.scene.scale(0.1,0.1,0.5);
	this.scene.translate(0,this.periscopeHeight*26,1.55);
	this.submarineAppearances[this.texIndex].apply();
	this.scope.display();
	this.scene.popMatrix();

	//barbatana hatch
	this.scene.pushMatrix();
	this.scene.translate(0,1.3,0.6);
	this.scene.rotate(-90*degToRad,1,0,0);
	this.scene.rotate(this.rotBarbHorizontal*degToRad,1,0,0);
	this.submarineAppearances[this.texIndex].apply();
	this.barbatanahatch.display();
	this.scene.popMatrix();

	//barbatana tras 1
	this.scene.pushMatrix();
	this.scene.translate(0,0,-2.4);
	this.scene.rotate(90*degToRad,1,0,0);
	this.scene.rotate(90*degToRad,0,1,0);
	this.scene.rotate(this.rotBarbVertical*degToRad,1,0,0);
	this.submarineAppearances[this.texIndex].apply();
	this.barbatanatras.display();
	this.scene.popMatrix();

	//barbatana tras 2
	this.scene.pushMatrix();
	this.scene.translate(0,0,-2.4);
	this.scene.rotate(90*degToRad,1,0,0);
	this.scene.rotate(this.rotBarbHorizontal*degToRad,1,0,0);
	this.submarineAppearances[this.texIndex].apply();
	this.barbatanatras.display();
	this.scene.popMatrix();

	//left cylinder
	this.scene.pushMatrix();
	this.scene.scale(0.4,0.4,.5);
	this.scene.translate(2.5,-1.4,-4.2);
	this.scene.rotate(0,1,1,1);
	this.submarineAppearances[this.texIndex].apply();
	this.body.display();
	this.scene.popMatrix();

	//right cylinder
	this.scene.pushMatrix();
	this.scene.scale(0.4,0.4,0.5);
	this.scene.translate(-2.5,-1.4,-4.2);
	this.submarineAppearances[this.texIndex].apply();
	this.body.display();
	this.scene.popMatrix();

	//left turbine
	this.scene.pushMatrix();	
	this.scene.translate(1,-0.55,-1.8);
	this.scene.rotate(-this.rotTurbine*degToRad +(-45)*degToRad,0,0,1);
	this.submarineAppearances[this.texIndex].apply();
	this.turbine.display();
	this.scene.popMatrix();

	//right turbine
	this.scene.pushMatrix();	
	this.scene.translate(-1,-0.55,-1.8);
	this.scene.rotate(this.rotTurbine*degToRad +(45)*degToRad,0,0,1);
	this.submarineAppearances[this.texIndex].apply();
	this.turbine.display();
	this.scene.popMatrix();

	//left turbineCenter
	this.scene.pushMatrix();
	this.scene.translate(1,-0.55,-1.8);
	this.scene.scale(0.15,0.15,0.15);
	this.submarineAppearances[this.texIndex].apply();
	this.turbineCenter.display();
	this.scene.popMatrix();

	//right turbineCenter
	this.scene.pushMatrix();
	this.scene.translate(-1,-0.55,-1.8);
	this.scene.scale(0.15,0.15,0.15);
	this.submarineAppearances[this.texIndex].apply();
	this.turbineCenter.display();
	this.scene.popMatrix();
}