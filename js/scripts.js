var canvas=document.querySelector("canvas");
var ctx=canvas.getContext("2d");

var cellSize=20;
var rows=canvas.height/cellSize;
var cols=canvas.width/cellSize;
var current;
var stack=["a"];
var player;
var counter=0;


function Cell(x,y){
	this.x=x;
	this.y=y;
	this.top=true;
	this.right=true;
	this.bottom=true;
	this.left=true;
	this.visited=false;
}
Cell.prototype.color = function() {
	ctx.fillStyle="blue";
	ctx.fillRect(this.x,this.y,cellSize,cellSize)
	ctx.fill();
};
Cell.prototype.colorEnd = function() {
	ctx.fillStyle="red";
	ctx.fillRect(this.x,this.y,cellSize,cellSize)
	ctx.fill();
};
Cell.prototype.draw = function() {
	if (this.top) {
		ctx.beginPath();
		ctx.moveTo(this.x,this.y);
		ctx.lineTo(this.x+cellSize,this.y);
		ctx.stroke();
	}if (this.right) {
		ctx.beginPath();
		ctx.moveTo(this.x+cellSize,this.y);
		ctx.lineTo(this.x+cellSize,this.y+cellSize);
		ctx.stroke();
	}if (this.bottom) {
		ctx.beginPath();
		ctx.moveTo(this.x+cellSize,this.y+cellSize);
		ctx.lineTo(this.x,this.y+cellSize);
		ctx.stroke();
	}if (this.left) {
		ctx.beginPath();
		ctx.moveTo(this.x,this.y+cellSize);
		ctx.lineTo(this.x,this.y);
		ctx.stroke();
	}
	if (this.visited) {
		ctx.fillStyle="rgba(100,100,100)";
		ctx.fillRect(this.x,this.y,cellSize,cellSize);
		ctx.fill();
	}
};
Cell.prototype.checkNeighbors = function() {
	var neighbors=[];
	var x=this.x/cellSize;
	var y=this.y/cellSize;
	//console.log(grid[x][y-1]);
	var top=grid[x][y-1];
	//console.log(grid[x+1][y]);
	if (x<cols-1) {
	var right=grid[x+1][y];
	}
	if (y*cellSize<canvas.height-cellSize) {
	var bottom=grid[x][y+1];
	}
	if (x>0) {
	//console.log(grid[x-1][y]);
	var left=grid[x-1][y];
	}
	if (top&&!top.visited) {
		neighbors.push(top);
	}
	if (right&&!right.visited) {
		neighbors.push(right);
	}if (bottom&&!bottom.visited) {
		neighbors.push(bottom);
	}if (left&&!left.visited) {
		neighbors.push(left);
	}
	return neighbors;
};
var grid=[];
function makeGrid(){
	for (var x = 0; x <= cols; x++) {
		grid[x]=[];
		for(var y=0; y<=rows; y++){
			grid[x][y]=new Cell(x*cellSize,y*cellSize);
			//cell.draw();
		}
	}
}
makeGrid();
current=grid[cols/2][rows/2];
function makeMaze(){
	//if (stack.length>0) {
		//if (stack.length>100) {
			//stack.pop();
		//}
	//for(var i=0;i<grid.length;i++){
	//	for(var j=0; j<=rows; j++){
	//		grid[i][j].draw();
	//	}
	//}
	//current.color();
	current.visited=true;
	var arr=current.checkNeighbors();
	//console.log(arr)
	if (arr.length>0) {
		stack.push(current);
		var random=Math.floor(Math.random()*arr.length+1)-1
		//console.log(random)
		next=arr[random]
		if (current.x-next.x<0) {
			next.left=false;
			current.right=false;
		}if (current.x-next.x>0) {
			next.right=false;
			current.left=false;
		}if (current.y-next.y<0) {
			next.top=false;
			current.bottom=false;
		}if (current.y-next.y>0) {
			next.bottom=false;
			current.top=false;
		}
		//console.log(current.x-next.x)
		//console.log(current.y-next.y)
		//console.log(next)
		current=next;
		//console.log(current);
	}
	else if (arr.length===0){
		//console.log("test")
		current=stack.pop();
		
	}
	//console.log(stack.length)
//}
	if(stack.length>0){
		makeMaze();
	}
}
makeMaze();
function makeHoles(){
	//if (stack.length==0) {
		//console.log('test')
		for(var x=0;x<15;x++){
			var randomX=Math.floor(Math.random()*(cols-3))+2;
			//console.log(randomX);
			var randomY=Math.floor(Math.random()*(rows-3))+2;
			//console.log(randomY);
			grid[randomX][randomY].top=false;
			grid[randomX][randomY-1].bottom=false;
			grid[randomX][randomY].right=false;
			grid[randomX+1][randomY].left=false;
			grid[randomX][randomY].bottom=false;
			grid[randomX][randomY+1].top=false;	
			grid[randomX][randomY].left=false;
			grid[randomX-1][randomY].right=false;
		}
	//}
}
makeHoles();
//setInterval(makeMaze,10);
//console.log(stack.length);


	document.addEventListener('keydown',keyDownAction)
	var player=grid[0][0];
	var a=0;
	var b=0;
	player.color();
	//var newArray=[];
	function keyDownAction(e){

		if (e.keyCode==38&&b>0&&!player.top) {
			b--;
		}
		if (e.keyCode==39&&a*cellSize<canvas.width-cellSize&&!player.right) {
			a++;
		}if (e.keyCode==40&&b*cellSize<canvas.height-cellSize&&!player.bottom) {
			b++;
		}if (e.keyCode==37&&a>0&&!player.left) {
			a--;
		}
		player=grid[a][b];
	//	newArray.push(player);
	//	for(var k=0;k<newArray.length;k++){
	//		newArray[k].draw();
	//	}
		for(var i=0;i<grid.length;i++){
			for(var j=0; j<=rows; j++){
				grid[i][j].draw();
			}
	}
	console.log(player);
		player.color();
		grid[cols-1][rows-1].colorEnd();
		//console.log(grid[cols-1][rows-1]);
	
	
}
console.log(grid);