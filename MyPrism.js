/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
 	CGFobject.call(this,scene);
	
	this.slices = slices;
	this.stacks = stacks;

 	this.initBuffers();
 };

 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;

 MyPrism.prototype.initBuffers = function() {
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
    var vertice = 0;
    var stackHeight = 1/this.stacks;
    var stepslice = 1/this.slices;
    var stepstack = 1/this.stacks;
    for(var i = 0; i < this.slices; i++)
    {
 		for(var j = 0; j < this.stacks; j++)
 		{
 			this.texCoords.push(i,j);
 			this.vertices.push(Math.cos(i*angle)); 
 			this.vertices.push(Math.sin(i*angle));
 			this.vertices.push(j*stackHeight);

			this.texCoords.push((i+1),j);
 			this.vertices.push(Math.cos((i+1)*angle));
 			this.vertices.push(Math.sin((i+1)*angle));
 			this.vertices.push(j*stackHeight);

			this.texCoords.push((i+1),(j+1));
 			this.vertices.push(Math.cos((i+1)*angle));
 			this.vertices.push(Math.sin((i+1)*angle));
 			this.vertices.push((j+1)*stackHeight);

			this.texCoords.push(i,(j+1));
 			this.vertices.push(Math.cos(i*angle)); 
 			this.vertices.push(Math.sin(i*angle));
 			this.vertices.push((j+1)*stackHeight);

			this.indices.push(vertice);
			this.indices.push(vertice+1);
			this.indices.push(vertice+2);

			this.indices.push(vertice+2);
			this.indices.push(vertice+3);
			this.indices.push(vertice);

 			vertice+=4;

 			this.normals.push(Math.cos(((i*angle)+(i+1)*angle)/2));
 			this.normals.push(Math.sin(((i*angle)+(i+1)*angle)/2));
 			this.normals.push(0);
 			this.normals.push(Math.cos(((i*angle)+(i+1)*angle)/2));
 			this.normals.push(Math.sin(((i*angle)+(i+1)*angle)/2));
 			this.normals.push(0);

			this.normals.push(Math.cos(((i*angle)+(i+1)*angle)/2));
 			this.normals.push(Math.sin(((i*angle)+(i+1)*angle)/2));
 			this.normals.push(0);
 			this.normals.push(Math.cos(((i*angle)+(i+1)*angle)/2));
 			this.normals.push(Math.sin(((i*angle)+(i+1)*angle)/2));
 			this.normals.push(0);
 			 					
 		}   	
    }
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
