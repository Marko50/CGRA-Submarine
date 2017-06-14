/**
 * MyInterface
 * @constructor
 */
 
 
function MyInterface() {
	//call CGFinterface constructor 
	CGFinterface.call(this);
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	// add a button:
	// the first parameter is the object that is being controlled (in this case the scene)
	// the identifier 'doSomething' must be a function declared as part of that object (i.e. a member of the scene class)
	// e.g. LightingScene.prototype.doSomething = function () { console.log("Doing something..."); }; 

	//this.gui.add(this.scene, 'doSomething');	

	// add a group of controls (and open/expand by defult)
	
	//var group=this.gui.addFolder("Options");
	//group.open();

	// add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
	// e.g. this.option1=true; this.option2=false;
	
	//group.add(this.scene, 'option1');
	//group.add(this.scene, 'option2');

	//Lights group
	var lights = this.gui.addFolder("Luzes");
	//lights.open();

	lights.add(this.scene, 'Luz1');
	lights.add(this.scene, 'Luz2');
	lights.add(this.scene, 'Luz3');
	lights.add(this.scene, 'Luz4');
	lights.add(this.scene, 'Luz5');

	//Relogio
	this.gui.add(this.scene, 'RelogioAtivo');
	
	// add a slider
	// must be a numeric variable of the scene, initialized in scene.init e.g.
	// this.speed=3;
	// min and max values can be specified as parameters
	
	this.gui.add(this.scene, 'speed', -4, 4);

	this.gui.add(this.scene, 'currSubmarineAppearance', this.scene.submarineAppearanceList);

	return true;
};

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp

	if (event.keyCode == 65 || event.keyCode == 97) {
		console.log("Key 'A' pressed");
			this.scene.submarine.adjustBarbatanas(0, this.scene.speed);
	}
	else if (event.keyCode == 68 || event.keyCode == 100) {
		console.log("Key 'D' pressed");
		this.scene.submarine.adjustBarbatanas(1, this.scene.speed);
	}
	else if (event.keyCode == 87 || event.keyCode == 119) {
		console.log("Key 'W' pressed");
		if(this.scene.speed < 4) 
			this.scene.speed += 0.5;
	}
	else if (event.keyCode == 83 || event.keyCode == 115) {
		console.log("Key 'S' pressed");
		if(this.scene.speed > -4)
			this.scene.speed -= 0.5;
	}
	else if (event.keyCode == 81 || event.keyCode == 113) {
		console.log("Key 'Q' pressed");
		this.scene.submarine.adjustBarbatanas(3, this.scene.speed);
	}
	else if (event.keyCode == 69 || event.keyCode == 101) {
		this.scene.submarine.adjustBarbatanas(4, this.scene.speed);
	}
	else if (event.keyCode == 80 || event.keyCode == 112) {
		this.scene.submarine.handlePeriscope(0);
	}
	else if (event.keyCode == 76 || event.keyCode == 108) {
		this.scene.submarine.handlePeriscope(1);
	}
	else if (event.keyCode == 70 || event.keyCode == 102) {
		this.scene.fireTorpedo();
	}

};
