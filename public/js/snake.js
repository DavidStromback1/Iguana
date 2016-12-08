var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

//Variables
var tileSize = 30; //Size in px of each tile on the map
var cW = window.innerWidth; //canvasWidth
var cH = window.innerHeight; //canvasHeight
var w = Math.floor(cW/tileSize); //board width
var h = Math.floor(cH/tileSize); //board height

var boardColor = "#ffdf80";
var iguanaColor = "black";
var snakeColor = "green";

var boardColorINV = "#141919";
var iguanaColorINV = "#FFFFFF";
var snakeColorINV = "#1F2727";

var maxSnakeLength = 10; //The maximum length in tiles a snake can have
var ticks = 0; //tick counter
var score = 0; //score 
var timeInterval = 20; //How much time in ms there is between ticks
var gameSpeed = 2; //After how many ticks the game goes into another gameloop
var startTime = -1; //Start time for score calculation
var currentTime = 0; //current time
var numberOfPortals = 1; //How many portal pairs there are in the game
var snakePoolSize = 20; //How many snakes there will be on the board at full capacity
var directions = [0,1,2,3]; //left, up, right, down
var switchMin = 75; //The minimum time a snake will take to change direction
var activeSnakes = 1; //The amount of activeSnakes
var shadowCnt = 0; //How many ticks the player has been in the shadowrealm
var shadowRealm = false; //If the user is in the shadow realm or not

//Iguana struct
var iguana = {
	x:Math.floor(w/2),
	y:Math.floor(h/2),
	direction:3,
	trip:0
};

//Snake object
function Snake(){
	this.x = Math.floor(Math.random() * (w+1));
	this.y = Math.floor(Math.random() * (h+1));
	this.length = Math.floor(Math.random() * maxSnakeLength+5);
	this.direction = directions[Math.floor(Math.random() * (4))];
	this.positions = [[this.x,this.y]];
	this.count = 0;
	this.switchRate = Math.floor(Math.random() * switchMin + switchMin);
	this.active = 0;
}

var vortex = {
	x:Math.floor(Math.random() * (w+1)),
	y:Math.floor(Math.random() * (h+1)),
	eaten:false
}

var snakes = new Array();

var portals = {
    x1:[],
    y1:[],
    x2:[],
    y2:[]
}

function initSnakes(){
	for (var i = 0; i < snakePoolSize; i++) {
		snakes[i] = new Snake();
		if(snakes[i].direction === 0){
			for (var j = 1; j < snakes[i].length; j++) {
				snakes[i].positions[j] = [snakes[i].x+j,snakes[i].y];
			}
		}else if(snakes[i].direction === 1){
			for (var j = 1; j < snakes[i].length; j++) {
				snakes[i].positions[j] = [snakes[i].x,snakes[i].y+j];
			}
		}else if(snakes[i].direction === 2){
			for (var j = 1; j < snakes[i].length; j++) {
				snakes[i].positions[j] = [snakes[i].x-j,snakes[i].y];
			}
		}else if(snakes[i].direction === 3){
			for (var j = 1; j < snakes[i].length; j++) {
				snakes[i].positions[j] = [snakes[i].x,snakes[i].y-j];
			}
		}
	}
	snakes[0].active = 1;
}

function paintIguana(){
	if(shadowRealm)
		paintTile(iguana.x,iguana.y,iguanaColorINV);
	else
		paintTile(iguana.x,iguana.y,iguanaColor);
}

function paintAllSnakes(){
	if(shadowRealm){
		for (var i=0; i<snakes.length; i++){
			for (var j = 0; j < snakes[i].length; j++) {
				if(snakes[i].active){
					paintTile(snakes[i].positions[j][0],snakes[i].positions[j][1],snakeColorINV);
				}
			}	
		}
	}else{
		for (var i=0; i<snakes.length; i++){
			for (var j = 0; j < snakes[i].length; j++) {
				if(snakes[i].active){
					paintTile(snakes[i].positions[j][0],snakes[i].positions[j][1],snakeColor);
				}
			}	
		}
	}
}

function paintPortals(){
    for(var i = 0; i < numberOfPortals; i++){
        paintTile(portals.x1[i], portals.y1[i], "#FF8C00");
    	paintTile(portals.x2[i], portals.y2[i], "#00BFFF");
    }       
}

function paintTile(x,y,color){
	context.fillStyle = color;
	context.fillRect(x*tileSize,y*tileSize,tileSize,tileSize);
}

function paintScore(){
	context.font="40px Courier New";
	if(shadowRealm){
		context.fillStyle = iguanaColorINV;
		context.fillText("2X",20,cH-15);
	}else{
		context.fillStyle = iguanaColor;
	}
	context.fillText("Score: "+score,70,cH-15);
	
}

function addScore(){
	if(shadowRealm){
		score += 2;
	}else{
		score++;
	}
	
	if(!(score % 100)){//adds more snakes as time goes on
		activeSnakes++;
		for (var i = 0; i < snakePoolSize; i++) {
			if(i < activeSnakes){
				snakes[i].active = 1;
			}
		}
	}
}

function paint(){
	context.clearRect(0, 0, cW, cH);
	if(shadowRealm){
   		context.fillStyle = boardColorINV;
   	}else{
		context.fillStyle = boardColor;
   	}
   	context.rect(0, 0, cW, cH);
	context.fill();
	paintIguana();
	paintAllSnakes();
	if(!vortex.eaten)
		paintTile(vortex.x,vortex.y,"red");
	paintScore();
	paintPortals();
}

function moveIguana(){

	if(iguana.direction === 0){
		iguana.x--;
	}else if(iguana.direction === 1){
		iguana.y--;
	}else if(iguana.direction === 2){
		iguana.x++;
	}else if(iguana.direction === 3){
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

	collisionCheck();
	collisionSnakeCheck();
	
	if(shadowRealm){
		shadowCnt++;
		if(shadowCnt > 250){
			shadowCnt = 0;
			shadowRealm = false;
			gameSpeed /= 2;
		}
	}
	if(iguana.x === vortex.x && iguana.y === vortex.y){
		shadowRealm = true;
		vortex.eaten = true;
		gameSpeed *= 2;
	}
}

function collisionCheck(){
    for(var i = 0; i < portals.x1.length; i++){
        if(portals.x1[i] === iguana.x){
            if(portals.y1[i] === iguana.y){
                iguana.x = portals.x2[i];
                iguana.y = portals.y2[i];
                break;
            }
        } else if(portals.x2[i] === iguana.x){
            if(portals.y2[i] === iguana.y){
                iguana.x = portals.x1[i];
                iguana.y = portals.y1[i];
                break;
            }
        }
    }
}

function collisionSnakeCheck(){
    for(var i = 0; i < snakes.length; i++){
        if(snakes[i].x === iguana.x){
            if(snakes[i].y === iguana.y){
                console.log("DEAD");
                break;
            }
        }
    }
}

function moveSnakes(){
	for (var i = 0; i < snakes.length; i++) {
		if(snakes[i].active){
			if(snakes[i].count > snakes[i].switchRate){
				snakes[i].count = 0;
				snakes[i].direction = switchDirection(snakes[i].direction);
			}
			snakes[i].count++;
			if(snakes[i].direction === 0){
				snakes[i].x -= 1;
			}else if(snakes[i].direction === 1){
				snakes[i].y -= 1;
			}else if(snakes[i].direction === 2){
				snakes[i].x += 1;
			}else if(snakes[i].direction === 3){
				snakes[i].y += 1;
			}
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
			snakes[i].positions.pop();
			snakes[i].positions.unshift([snakes[i].x,snakes[i].y]);
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

function switchDirection(direction){
	var dirNum = Math.floor(Math.random() * (3));
	if(direction === 0 || direction === 2){
		while(dirNum === 0 || dirNum === 2){
			dirNum = Math.floor(Math.random() * 4);
		}
	}else{
		while(dirNum === 1 || dirNum === 3){
			dirNum = Math.floor(Math.random() * 4);
		}
	}
	return directions[dirNum];
}

function makePortals(){
    for (var i = 0; i < numberOfPortals; i++){
        portals.x1[i] = Math.round(getNonDuplicateX());
        portals.y1[i] = Math.round(getNonDuplicateY());
        portals.x2[i] = Math.round(getNonDuplicateX());
        portals.y2[i] = Math.round(getNonDuplicateY());
    }
    function getNonDuplicateX(){
        var x = Math.random() * w;
            for(var i = 0; i < portals.x1.length; i++){
                if(x === portals.x1[i]){
                    return getNonDuplicateX();
                } else {
                    continue;
                }
            }
        for(var i = 0; i < portals.x2.length; i++){
            if(x === portals.x2[i]){
                return getNonDuplicateX();
            } else {
                continue;
            }
        }
        return x;
    }
    function getNonDuplicateY(){
	    var y = Math.random() * h;
        for(var i = 0; i < portals.y1.length; i++){
            if(y === portals.y1[i]){
                return getNonDuplicateX();
            } else {
                continue;
            }
        }
        for(var i = 0; i < portals.y2.length; i++){
            if(y === portals.y2[i]){
                return getNonDuplicateX();
            } else {
                continue;
            }
        }
        return y;
    }
}

var gameloop = function gameLoop(){

	if(ticks - gameSpeed === 0){
		ticks = 0;
		if(snakes.length === 0){
			initSnakes();
			makePortals();
		}
		if(startTime === -1){
			startTime = performance.now();
		}
		currentTime = performance.now();
		
		moveIguana();
		moveSnakes();
		addScore();
		paint();
	}
	ticks++;
}

window.addEventListener('resize', resizeCanvas, false);


function resizeCanvas(){
	cW = window.innerWidth;
	cH = window.innerHeight;
	w = Math.floor(cW/tileSize);
	h = Math.floor(cH/tileSize);
	canvas.width = cW;
	canvas.height = cH;
}

resizeCanvas();

document.addEventListener('keydown', function(event) {
	if(event.keyCode == 37) {
		iguana.direction = 0;
	}
	else if(event.keyCode == 38){
		iguana.direction = 1;
	}
	else if(event.keyCode == 39) {
		iguana.direction = 2;
	}
	else if(event.keyCode == 40){
		iguana.direction = 3;
	}
});

setInterval(gameloop,timeInterval);