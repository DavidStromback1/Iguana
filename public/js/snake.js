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
        var numberOfPortals = 1;
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
        var portals = {
                x1:[],
                x2:[],
                y1:[],
                y2:[]
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
        //Canvas events
        //Still need to check for overlapping portals and make a check for the 
        //iguana bumping into them (maybe best to do it in combination with the snake checks
        function makePortals(){
            for (var i = 0; i < numberOfPortals; i++){
                portals[i].x1 = getNonDuplicateX();
                portals[i].y1 = getNonDuplicateY();
                portals[i].x2 = getNonDuplicateX();
                portals[i].y2 = getNonDuplicateY();
                paintTile(portal.x1, portal.y1, "orange");
                paintTile(portal.x2, portal.y2, "blue");
                
            }
            function getNonDuplicateX(){
                var x = Math.random() * cW;
                for(var i = 0; i < x1.length; i++){
                    if(x === x1[i]){
                        return getNonDuplicateX();
                    } else {
                        continue;
                    }
                }
                for(var i = 0; i < x2.length; i++){
                    if(x === x2[i]){
                        return getNonDuplicateX();
                    } else {
                        continue;
                    }
                }
                return x;
            }
            function getNonDuplicateY(y){
                var y = Math.random() * cH;
                for(var i = 0; i < y1.length; i++){
                    if(x === y1[i]){
                        return getNonDuplicateX();
                    } else {
                        continue;
                    }
                }
                for(var i = 0; i < y2.length; i++){
                    if(x === y2[i]){
                        return getNonDuplicateX();
                    } else {
                        continue;
                    }
                }
                return y;
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

