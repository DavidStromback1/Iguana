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

	var iguana = {
		x:0,
		y:0,
		direction:"down"
	};

	var snake = {
		x:0,
		y:0,
		length:Math.floor(Math.random * (maxSnakeLength+1)),
		positions:[[],[]]
	};

	var snakes = [];

	/*for (var i = 0; i <= snakePool; i++) {
		snakes[i] = snake;
	}*/


	// resize the canvas to fill browser window dynamically
	window.addEventListener('resize', resizeCanvas, false);

	function resizeCanvas(){
		cW = window.innerWidth;
		cH = window.innerHeight;
		w = Math.floor(cW/tileSize);
		h = Math.floor(cH/tileSize);
		canvas.width = cW;
		canvas.height = cH;
		//paint();
	}

	resizeCanvas();
	
	function paintMap(){
		for (var x=0; x<w; x++){
			for (var y=0; y<h; y++){
				paintTile(x,y,boardColor);
			}
		}
	}

	function paintIguana(){
		paintTile(iguana.x,iguana.y,iguanaColor);
	}

	function paintSnake(s){
		paintTile(s.x,s.y,snakeColor);
	}

	function paintAllSnakes(){
		for (var i=0; i<snakes.length; i++){
			paintSnake(snakes[i]);
		}
	}

	function paintTile(x,y,color){
		context.fillStyle = color;
		context.fillRect(x*tileSize,y*tileSize,tileSize,tileSize);
	}

	function paintScore(){
		context.font="20px Georgia";
		context.fillText("Score: "+parseInt(currentTime-startTime).toFixed(0),cW-100,cH-50);
		//context.fillText("x: "+iguana.x+", y: "+iguana.y,50,50);
	}

	function paint(){
		paintMap();
		paintIguana();
		context.fillText("OutofBoundsCheck",50,50);
		paintScore();
	}

	function move(){
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

	var gameloop = function gameLoop(){

		if(startTime === -1){
			startTime = performance.now();
		}
		currentTime = performance.now();
		move();
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

