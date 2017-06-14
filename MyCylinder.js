/**
 * MyCylinder
 * @constructor
 */
 function MyCylinder(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyCylinder.prototype = Object.create(CGFobject.prototype);
 MyCylinder.prototype.constructor = MyCylinder;

 MyCylinder.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
 	this.texCoords = [];
    this.vertices = [];
    this.normals = [];
    var angle = 2*Math.PI/this.slices;
    this.indices = [];

	var stackHeight = 1/this.stacks;
	//outside
	for(i=0; i <= this.slices; i++){
		for(j=0; j <= this.stacks; j++){
			this.vertices.push(Math.cos(angle*i),Math.sin(angle*i),j*stackHeight);	
			this.normals.push(Math.cos(angle*i),Math.sin(angle*i),0);
			this.texCoords.push(i,j)
		}
	}
	for(i=0; i<this.slices; i++){
		for(j=0; j<this.stacks;j++){
			var temp = i*(this.stacks+1)+j;
			var temp2 = (i+1)*(this.stacks+1)+j;
			this.indices.push(temp,temp2,1+temp2);
			this.indices.push(temp,1+temp2,1+temp);
		}
	}
	
	
	//inside
	for(i=0; i <= this.slices; i++){
		var ang2 = angle*i-(2*Math.PI);
		for(j=0; j <= this.stacks; j++){
			this.vertices.push(Math.cos(angle*i),Math.sin(angle*i),j*stackHeight) ;	
			this.normals.push(Math.cos(angle*i - 2*Math.PI),Math.sin(angle*i - 2*Math.PI),0);
			this.texCoords.push(i,j)
		}
	}
	for(i=0; i<=this.slices; i++){
		for(j=0; j<this.stacks;j++){
			var temp = (this.stacks+1)*(this.slices)+/*indices anteriores->*/i*(this.stacks+1)+j;
			var temp2 = (this.stacks+1)*(this.slices)+/*indices anteriores->*/(i+1)*(this.stacks+1)+j;
			this.indices.push(temp,1+temp2,temp2);
			this.indices.push(temp,1+temp,1+temp2);
		}
	}
    
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
