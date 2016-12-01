(function() {

	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	//Tilemap variables
	var tileSize = 25;
	var cW = window.innerWidth;
	var cH = window.innerHeight;
	var w = Math.floor(cW/tileSize);
	var h = Math.floor(cH/tileSize);

	//Graphical variables
	var boardColor = "#ffdf80";
	var iguanaColor = "black";
	var snakeColor = "green";

	//Game variables
	var maxSnakeLength = 10;
	var score;
	var timeInterval = 80;
	var startTime = -1;
	var currentTime = 0;
	var snakePoolSize = 50;

	var iguana = {
		x:0,
		y:0,
		direction:"down"
	};

	function Snake(x,y){
		this.x = x,
		this.y = y,
		this.length = Math.floor(Math.random() * (maxSnakeLength+1)),
		this.direction = "left"
	}

	var snakes = new Array();

	// resize the canvas to fill browser window dynamically
	window.addEventListener('resize', resizeCanvas, false);

	function initSnakes(){
		for (var i = 0; i < snakePoolSize; i++) {
			snakes[i] = new Snake(Math.floor(Math.random() * (w+1)),Math.floor(Math.random() * (h+1)));
			snakes[i].length = 1//Math.floor(Math.random * (maxSnakeLength+1));
		}
	}

	function resizeCanvas(){
		cW = window.innerWidth;
		cH = window.innerHeight;
		w = Math.floor(cW/tileSize);
		h = Math.floor(cH/tileSize);
		canvas.width = cW;
		canvas.height = cH;
	}

	resizeCanvas();
	
	function paintMap(){
		for (var x=0; x<=w; x++){
			for (var y=0; y<=h; y++){
				paintTile(x,y,boardColor);
			}
		}
	}

	function paintIguana(){
		paintTile(iguana.x,iguana.y,iguanaColor);
	}

	function paintAllSnakes(){
		for (var i=0; i<snakes.length; i++){
			paintTile(snakes[i].x,snakes[i].y,snakeColor);
		}
	}

	function paintTile(x,y,color){
		context.fillStyle = color;
		context.fillRect(x*tileSize,y*tileSize,tileSize,tileSize);
	}

	function paintScore(){
		context.font="20px Georgia";
		context.fillText("Score: "+parseInt(currentTime-startTime).toFixed(0),cW-100,cH-50);
		context.fillText("x: "+iguana.x+", y: "+iguana.y,50,50);
	}

	function paint(){
		paintMap();
		//paintScore();
		paintIguana();
		paintAllSnakes();
	}

	function moveIguana(){
		if(iguana.direction === 'left'){
			iguana.x--;
		}else if(iguana.direction === 'up'){
			iguana.y--;
		}else if(iguana.direction === 'right'){
			iguana.x++;
		}else if(iguana.direction === 'down'){
			iguana.y++;
		}

		var io = isOutOfBounds(iguana.x,iguana.y);
		if(io){
			if(io === 1){
				iguana.x = 0;
			}else if(io === 2){
				iguana.x = w;
			}else if(io === 3){
				iguana.y = 0;
			}else{
				iguana.y = h;
			}
		}
	}

	function moveSnakes(){
		for (var i = 0; i < snakes.length; i++) {
			snakes[i].x -= 1;
			var io = isOutOfBounds(snakes[i].x,snakes[i].y);
			if(io){
				if(io === 1){
					snakes[i].x = 0;
				}else if(io === 2){
					snakes[i].x = w;
				}else if(io === 3){
					snakes[i].y = 0;
				}else{
					snakes[i].y = h;
				}
			}
		}
	}

	function isOutOfBounds(x,y){
		if(x > w){
			return 1;
		}else if(x < 0){
			return 2;
		}else if(y > h){
			return 3;
		}else if(y < 0){
			return 4;
		}else{
			return 0;
		}
	}

	function getRandomDirection(){
		var dir = Math.floor(Math.random() * 3+1);
		if(dir === 0){
			return "left";
		}else if(dir === 1){
			return "up";
		}else if(dir === 2){
			return "right";
		}else if(dir === 3){
			return "down";
		}else{
			return "down";//safeguard
		}
	}

	var gameloop = function gameLoop(){

		if(snakes.length === 0){
			initSnakes();
		}

		if(startTime === -1){
			startTime = performance.now();
		}
		currentTime = performance.now();
		
		moveIguana();
		moveSnakes();
		paint();
	}

	document.addEventListener('keydown', function(event) {
		if(event.keyCode == 37) {
			iguana.direction = 'left';
		}
		else if(event.keyCode == 38){
			iguana.direction = 'up';
		}
		else if(event.keyCode == 39) {
			iguana.direction = 'right';
		}
		else if(event.keyCode == 40){
			iguana.direction = 'down';
		}
	});

	setInterval(gameloop,timeInterval);

})();

