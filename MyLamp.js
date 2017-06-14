/**
 * MyLamp
 * @constructor
 */
 function MyLamp(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyLamp.prototype = Object.create(CGFobject.prototype);
 MyLamp.prototype.constructor = MyLamp;
 
 MyLamp.prototype.initBuffers = function() {
 	/*
 	* TODO:
 	* Replace the following lines in order to build a prism with a **single mesh**.
 	*
 	* How can the vertices, indices and normals arrays be defined to
 	* build a prism with varying number of slices and stacks?
 	*/
    this.vertices = [];
    this.normals = [];
    var angle = 2*Math.PI/this.slices;
    var anglestacks = ((Math.PI/2)/this.stacks);
    this.indices = [];
    var vertice = 0;
    var j = 1;
    var stackHeight = 1/this.stacks;
     for(var i = 0; i < this.slices; i++)
     {
 		this.vertices.push(Math.cos(j*anglestacks)*Math.cos(i*angle)); 
 		this.vertices.push(Math.cos(j*anglestacks)*Math.sin(i*angle));
 		this.vertices.push(Math.sin(j*anglestacks));


 		for(j = 1; j <= this.stacks; j++)
 		{
 			this.vertices.push(Math.cos(j*anglestacks)*Math.cos(i*angle)); 
 			this.vertices.push(Math.cos(j*anglestacks)*Math.sin(i*angle));
 			this.vertices.push(Math.sin(j*anglestacks));
			

			if(vertice < (this.slices * (this.stacks+1)))
				this.indices.push(vertice);
			else this.indices.push(vertice - (this.slices * (this.stacks+1)));

			if(vertice+this.stacks+1 < (this.slices * (this.stacks+1)))
				this.indices.push(vertice+this.stacks+1);
			else this.indices.push(vertice+this.stacks+1 - (this.slices * (this.stacks+1)));

			if(vertice+this.stacks+2 < (this.slices * (this.stacks+1)))
				this.indices.push(vertice+this.stacks+2);
			else this.indices.push(vertice+this.stacks+2 - (this.slices * (this.stacks+1)));

			if(vertice+this.stacks+2 < (this.slices * (this.stacks+1)))
				this.indices.push(vertice+this.stacks+2);
			else this.indices.push(vertice+this.stacks+2 - (this.slices * (this.stacks+1)));

			if(vertice+1 < (this.slices * (this.stacks+1)))
				this.indices.push(vertice+1);
			else this.indices.push(vertice+1 - (this.slices * (this.stacks+1)));

			if(vertice < (this.slices * (this.stacks+1)))
				this.indices.push(vertice);
			else this.indices.push(vertice - (this.slices * (this.stacks+1)));
		

 			vertice+=1;
								
 		}
 		vertice +=1;
 			
    }
    this.normals = this.vertices;
    this.texCoords = this.normals;
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
