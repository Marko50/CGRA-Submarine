var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene() {
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

LightingScene.prototype.init = function(application) {
	CGFscene.prototype.init.call(this, application);

	this.Luz1 = false;
	this.Luz2 = true;
	this.Luz3 = true;
	this.Luz4 = false;
	this.Luz5 = false;
	this.RelogioAtivo = true;
	this.option1 = true; 
	this.option2=false;
	this.speed= 0;
	this.showTorpedo = 0;
	this.showExplosion = 0;

	this.enableTextures(true);
	this.initCameras();    
	this.initLights();
	this.gl.clearColor(0.0, 0.0, 64.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);
   

	// Scene elements
	this.table = new MyTable(this);
	this.wall = new MyQuad(this,-0.5,1.5,-0.5,1.5);
	this.floor = new MyQuad(this,0,10,0,12);
	this.prisma = new MyPrism(this, 8, 20);
	this.cylinder = new MyCylinder(this, 8, 20);
	this.lamp = new MyLamp(this,8,20);
	this.clockbody = new MyCylinder(this, 12,1);
	this.clocktop = new MyClock(this);
	this.submarine = new MySubmarine(this,1);
	this.oceanground = new Plane(this,10,0,1,0,1)
	this.myPoste = new MyCylinder(this, 15, 5);
	
	this.target1 = new MyTarget(this, 1,1,1,-5,3);
	this.target2 = new MyTarget(this, 1,1,1,-1,-3);
	this.target3 = new MyTarget(this, 1,1,1, -5,-5);

	this.explosion = new MyExplosion(this, 2,2,2);
	
	this.torpedo = new MyTorpedo(this,this.submarine.Xmovement,this.submarine.Ymovement,this.submarine.Zmovement,this.submarine.rotation);
	
	
	this.boardA = new Plane(this, BOARD_A_DIVISIONS,-0.2,1.2,0,1);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS,-0.2,1.2,0,1);

	this.submarineAppearanceList = [ 'Metal' , 'Rusty' , 'Yellow' ];
	this.currSubmarineAppearance = 0;

	this.targetList=[this.target1, this.target2, this.target3];
	this.numTargets = 3;
	this.currTarget = 0;

	// Materials
	this.materialDefault = new CGFappearance(this);
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120); //10

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	this.materialC = new CGFappearance(this);
	this.materialC.setAmbient(0.3,0.3,0.3,1);
	this.materialC.setDiffuse(0.647059, 0.164706, 0.164706,1);
	this.materialC.setSpecular(0.2,0.2,0.2,1);	
	this.materialC.setShininess(120);

	this.materialD = new CGFappearance(this);
	this.materialD.setAmbient(0.3,0.3,0.3,1);
	this.materialD.setDiffuse( 0.745098, 0.745098, 0.745098,1);
	this.materialD.setSpecular(0.8,0.8,0.8,1);	
	this.materialD.setShininess(300);

	this.tableAppearance = new CGFappearance(this);
	this.tableAppearance.loadTexture("../resources/images/table.png");
	this.tableAppearance.setAmbient(0.3,0.3,0.3,1);
	this.tableAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.tableAppearance.setSpecular(0.1,0.1,0.1,1);
	this.tableAppearance.setShininess(30);

	this.floorAppearance = new CGFappearance(this);
	this.floorAppearance.loadTexture("../resources/images/floor.png");
	this.floorAppearance.setAmbient(0.3,0.3,0.3,1);
	this.floorAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.floorAppearance.setSpecular(0.1,0.1,0.1,1);
	this.floorAppearance.setShininess(30);

	this.windowAppearance = new CGFappearance(this);
	this.windowAppearance.loadTexture("../resources/images/window.png");
	this.windowAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
	this.windowAppearance.setAmbient(0.3,0.3,0.3,1);
	this.windowAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.windowAppearance.setSpecular(0.1,0.1,0.1,1);
	this.windowAppearance.setShininess(30);
	
	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.loadTexture("../resources/images/slides.png");
	this.slidesAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
	this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
	this.slidesAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);
	this.slidesAppearance.setShininess(10);

	this.boardAppearance = new CGFappearance(this);
	this.boardAppearance.loadTexture("../resources/images/board.png");
	this.boardAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
	this.boardAppearance.setAmbient(0.3,0.3,0.3,1);
	this.boardAppearance.setDiffuse(0.4,0.4,0.4,1);
	this.boardAppearance.setSpecular(0.4,0.4,0.4,1);
	this.boardAppearance.setShininess(40);

	this.pillarAppearance = new CGFappearance(this);
	this.pillarAppearance.loadTexture("../resources/images/pillar.png");
	this.pillarAppearance.setAmbient(0.2,0.2,0.2,1);
	this.pillarAppearance.setDiffuse(0.5,0.5,0.5,1);
	this.pillarAppearance.setSpecular(0.5,0.5,0.5,1);
	this.pillarAppearance.setShininess(10);
	
	this.clockAppearance = new CGFappearance(this);
	this.clockAppearance.loadTexture("../resources/images/clock.png");
	this.clockAppearance.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');
	this.clockAppearance.setAmbient(0.2,0.2,0.2,1);
	this.clockAppearance.setDiffuse(0.5,0.5,0.5,1);
	this.clockAppearance.setSpecular(0.5,0.5,0.5,1);
	this.clockAppearance.setShininess(10);

	this.oceanfloor = new CGFappearance(this);
	this.oceanfloor.loadTexture("../resources/images/oceanfloor.png");
	this.oceanfloor.setTextureWrap('REPEAT','REPEAT');
	this.oceanfloor.setAmbient(0.2,0.2,0.2,1);
	this.oceanfloor.setDiffuse(0.5,0.5,0.5,1);
	this.oceanfloor.setSpecular(0.5,0.5,0.5,1);
	this.oceanfloor.setShininess(10);

	this.slidesAppearance = new CGFappearance(this);
	this.slidesAppearance.setTextureWrap("CLAMP_TO_EDGE","CLAMP_TO_EDGE");
	this.slidesAppearance.setAmbient(0.3,0.3,0.3,1);
	this.slidesAppearance.setDiffuse(0.9,0.9,0.9,1);
	this.slidesAppearance.setSpecular(0.1,0.1,0.1,1);	
	this.slidesAppearance.setShininess(30);
	this.slidesAppearance.loadTexture("../resources/images/vilareal.png");


	this.setUpdatePeriod(60);
};

LightingScene.prototype.doSomething = function (){
		console.log("Doing something...");
	};

LightingScene.prototype.fireTorpedo = function() {
	if(!this.torpedo.showTorpedo && this.currTarget<3 && !this.showExplosion) {
		this.torpedo.showTorpedo = 1;
		this.torpedo.setTarget(this.targetList[this.currTarget]);
		this.torpedo.setCoords(this.submarine.Xmovement, this.submarine.Ymovement, this.submarine.Zmovement, this.submarine.rotation);
		this.currTarget++;
	}
}

LightingScene.prototype.initCameras = function() {
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function() {
	this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true); // show marker on light position (different from enabled)
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[3].setVisible(true); // show marker on light position (different from enabled)
	this.lights[4].setPosition(0.1,5.0,8.0,1.0);
	this.lights[4].setVisible(true);

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 0, 1.0);
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 0, 1.0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(1.0);
	this.lights[3].enable();

	this.lights[4].setAmbient(0,0,0,1);
	this.lights[4].setDiffuse(1.0,1.0,0,1.0);
	//this.lights[4].setConstantAttenuation(1);
	//this.lights[4].setQuadraticAttenuation(1.0);
	this.lights[4].enable();
};

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}

LightingScene.prototype.updateLights = function() {
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}


LightingScene.prototype.update = function(currTime) {
	if (!this.Luz1)
		this.lights[0].disable();
	if (!this.Luz2)
		this.lights[1].disable();
	if (!this.Luz3)
		this.lights[2].disable();
	if (!this.Luz4)
		this.lights[3].disable();
	if(!this.Luz5)
		this.lights[4].disable();

	if (this.Luz1)
		this.lights[0].enable();
	if (this.Luz2)
		this.lights[1].enable();
	if (this.Luz3)
		this.lights[2].enable();
	if (this.Luz4)
		this.lights[3].enable();
	if(this.Luz5) 
		this.lights[4].enable();

	if (this.currSubmarineAppearance == 'Metal') {
		this.submarine.texIndex = 0;
		this.vilareal = 0;

	}
	if (this.currSubmarineAppearance == 'Rusty') {
		this.submarine.texIndex = 1;
		this.vilareal = 0;

	}
	if (this.currSubmarineAppearance == 'Yellow') {
		this.submarine.texIndex = 2;
		this.vilareal = 1;
}

	if(this.RelogioAtivo)
		var time = Math.floor(currTime/1000);
	if(this.time == -1){
		this.time = time;
	}else {
		if(this.time != time){
			this.time = time;
			this.clocktop.update();
		}
	}
	this.submarine.update(this.speed);
	if(this.torpedo.showTorpedo)
		this.torpedo.update();

	if(this.showExplosion)
		this.explosion.update();
	
	if(this.explosion.over)
		this.showExplosion = 0;
	
}

LightingScene.prototype.display = function() {
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	//ClockBody
	this.pushMatrix();
	this.translate(8,5,-0.1);
	this.scale(0.7,0.7,0.3);
	this.materialA.apply();
	this.clockbody.display();
	this.popMatrix();

	//ClockTop
	this.pushMatrix();
	this.translate(8,5,0.2);
	this.scale(0.7,0.7,1);
	this.rotate(3*Math.PI/2,0,0,1);
	this.clockAppearance.apply();
	this.clocktop.display();
	this.popMatrix();

	
	//MySubmarine
	this.pushMatrix();
	this.translate(this.submarine.Xmovement,this.submarine.Ymovement,this.submarine.Zmovement);
	this.rotate(this.submarine.rotation * degToRad,0,1,0);
	this.submarine.display();
	this.popMatrix();
			
	//oceanground
	this.pushMatrix();
	this.oceanfloor.apply();
	this.scale(70,1,70);
	this.rotate(-Math.PI/2,1,0,0);
	this.oceanground.display();
	this.popMatrix();

	//Poste
	this.pushMatrix();
	this.translate(8,0,0);
	this.rotate(-Math.PI/2,1,0,0);
	this.scale(0.2,0.2,4.5);
	this.pillarAppearance.apply();
	this.myPoste.display();
	this.popMatrix();

	//Targets
	for(var i = 0; i<this.numTargets; i++) {
		if (!this.targetList[i].destroyed) {
			this.pushMatrix();
			this.targetList[i].display();
			this.popMatrix();
		}
	}


	if(this.torpedo.showTorpedo) {
		this.pushMatrix();
		this.translate(this.torpedo.x,this.torpedo.y,this.torpedo.z);
		this.rotate(-this.torpedo.fi,0,1,0);
		
		//this.rotate(this.torpedo.teta,0,1,0);
		this.rotate(this.torpedo.teta,1,0,0);
		this.torpedo.display();
		this.popMatrix();
	}

	if(this.vilareal) {
		this.pushMatrix();
			this.translate(8, BOARD_HEIGHT/2, 0.2);
			this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
			this.slidesAppearance.apply();
			this.boardA.display();
		this.popMatrix();
	}

	this.pushMatrix();

	if(this.showExplosion)
		this.explosion.display();
	this.popMatrix();
	// --;-- END Primitive drawing section
};
