var canvas 		= document.getElementById('canvas');
var ctx 		= canvas.getContext('2d');
var intervalID;

var ticks 		= 0;
var tickTime 	= 25;
var startTime 	= -1;
var curTime 	= 0;
var gameSpeed 	= 1;

var paintCounter = 0;

var tileSize 	= 30;
var directions 	= [0,1,2,3]; //left, up, right, down

var nOfSnakes 	= 30;
var maxSnakeLen = 10;
var chDirTime 	= 75;
var genTime		= 125;
var liveSnakes 	= 1;

var shadowCnt 	= 0;
var shadowTime	= 250;
var shadowRealm = false;

var score 		= 0;
var multiplier	= 2;
var scoreFont	= '40px Courier New';
var gameOverFont= '270px Courier New';

var nOfPortals 	= 1;
var oPortalCol	= '#FF8C00';
var bPortalCol	= '#00BFFF';
var vortexCol	= '#CC0000';

var boardCol 	= '#FFDF80'; 
var iguanaCol 	= '#000000';
var snakeCol 	= '#008000';

var boardColSh 	= '#141919';
var iguanaColSh = '#FFFFFF';
var snakeColSh 	= '#151919';

var cW 			= window.innerWidth;
var cH 			= window.innerHeight;
var w 			= Math.floor(cW/tileSize)-2;
var h 			= Math.floor(cH/tileSize)-2;

var iguana = {
	x:Math.floor(w/2),
	y:Math.floor(h/2),
	dir:3,
	alive:true,
};

var vortex = {
	x:Math.floor(Math.random() * (w+1)),
	y:Math.floor(Math.random() * (h+1)),
	used:false
};

var portals = {
    x1:[],
    y1:[],
    x2:[],
    y2:[]
};

function Snake(){
	this.x 		= Math.floor(Math.random() * (w+1));
	this.y 		= Math.floor(Math.random() * (h+1));
	this.l 		= Math.floor(Math.random() * maxSnakeLen+5);
	this.dir 	= directions[Math.floor(Math.random() * (4))];
	this.rate 	= Math.floor(Math.random() * chDirTime + chDirTime);
	this.pos 	= [[this.x,this.y]];
	this.cnt 	= 0;
	this.live 	= false;
}

var snakes = new Array();

function initSnakes(){
	for (var i = 0; i < nOfSnakes; i++) {
		snakes[i] = new Snake();
		if(snakes[i].dir === 0){
			for (var j = 1; j < snakes[i].l; j++) {
				snakes[i].pos[j] = [snakes[i].x+j,snakes[i].y];
			}
		}else if(snakes[i].dir === 1){
			for (var j = 1; j < snakes[i].l; j++) {
				snakes[i].pos[j] = [snakes[i].x,snakes[i].y+j];
			}
		}else if(snakes[i].dir === 2){
			for (var j = 1; j < snakes[i].l; j++) {
				snakes[i].pos[j] = [snakes[i].x-j,snakes[i].y];
			}
		}else if(snakes[i].dir === 3){
			for (var j = 1; j < snakes[i].l; j++) {
				snakes[i].pos[j] = [snakes[i].x,snakes[i].y-j];
			}
		}
	}
	snakes[0].live = true;
}

function paintTile(x,y,color){
	ctx.fillStyle = color;
	ctx.fillRect(x*tileSize,y*tileSize,tileSize,tileSize);
}

function paintIguana(){
	if(shadowRealm){
		paintTile(iguana.x,iguana.y,iguanaColSh);
	}else{
		paintTile(iguana.x,iguana.y,iguanaCol);
	}
}

function paintSnakes(){
	if(shadowRealm){
		for (var i=0; i<snakes.length; i++){
			for (var j = 0; j < snakes[i].l; j++) {
				if(snakes[i].live){
					paintTile(snakes[i].pos[j][0],snakes[i].pos[j][1],snakeColSh);
				}
			}	
		}
	}else{
		for (var i=0; i<snakes.length; i++){
			for (var j = 0; j < snakes[i].l; j++) {
				if(snakes[i].live){
					paintTile(snakes[i].pos[j][0],snakes[i].pos[j][1],snakeCol);
				}
			}	
		}
	}
}

function paintPortals(){
    for(var i = 0; i < nOfPortals; i++){
        paintTile(portals.x1[i], portals.y1[i], oPortalCol);
    	paintTile(portals.x2[i], portals.y2[i], bPortalCol);
    }

    if(!vortex.used)
		paintTile(vortex.x,vortex.y,vortexCol);
}

function paintScore(){
	ctx.font = scoreFont;
	if(shadowRealm){
		ctx.fillStyle = iguanaColSh;
		ctx.fillText(multiplier+'X ',20,cH-15);
	}else{
		ctx.fillStyle = iguanaCol;
	}
	ctx.fillText('Score: '+score,70,cH-15);
	
}

function addScore(){
	if(shadowRealm){
		score += multiplier;
	}else{
		score++;
	}
}

function highscoreOverlay(){
    var $score = score;
    var $highscores = $(".highscores");
    
    $highscores.show();
    $("#cScore").html($score);
}


function getHighscore(){
            var $Hscore = score;
            $.ajax({
                method: "POST",
                url: "/getHighscore",
                data: {
                    "_token": $('#token').val(),
                    "Highscore": $Hscore
                }
            });
         }


function paint(){
	ctx.clearRect(0, 0, cW, cH);
	
	if(!iguana.alive){
                paintCounter++;
		ctx.fillStyle = iguanaCol;
		ctx.font = gameOverFont;
                ctx.textAlign = "center";
		ctx.fillText("GAME OVER",Math.floor(cW/2),Math.floor(cH/2)+100);
		ctx.font = scoreFont;
		ctx.fillText("Score: "+score,Math.floor(cW/2)-130,Math.floor(cH/2)+150);
		paintSnakes();
		paintPortals();
                if(paintCounter === 1){
                    getHighscore();
                    highscoreOverlay();
                }
                
                
	}else{
		paintSnakes();
		paintPortals();
		paintIguana();
		paintScore();
	}
	
}

function moveIguana(){
	if(iguana.dir === 0){
		iguana.x--;
	}else if(iguana.dir === 1){
		iguana.y--;
	}else if(iguana.dir === 2){
		iguana.x++;
	}else if(iguana.dir === 3){
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

	if(shadowRealm){
		shadowCnt++;
		if(shadowCnt > shadowTime){
			shadowRealm = false;
			shadowCnt = 0;
			gameSpeed /= 2;
			document.getElementById('canvas').style.backgroundColor = boardCol;
			document.getElementById('canvas').style.backgroundImage = 'none';	
		}
	}

	collisionCheck();
}

function moveSnakes(){
	for (var i = 0; i < snakes.length; i++) {
		if(snakes[i].live){
			if(snakes[i].cnt > snakes[i].rate){
				snakes[i].cnt = 0;
				snakes[i].dir = switchDirection(snakes[i].dir);
			}
			snakes[i].cnt++;
			if(snakes[i].dir === 0){
				snakes[i].x -= 1;
			}else if(snakes[i].dir === 1){
				snakes[i].y -= 1;
			}else if(snakes[i].dir === 2){
				snakes[i].x += 1;
			}else if(snakes[i].dir === 3){
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

			snakes[i].pos.pop();
			snakes[i].pos.unshift([snakes[i].x,snakes[i].y]);
		}
	}
}

function collisionCheck(){
	portalCollisionCheck();
    vortexCollisionCheck();
    snakeCollisionCheck();
}

function portalCollisionCheck(){
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

function snakeCollisionCheck(){
	for(var i = 0; i < snakes.length; i++){
		if(snakes[i].live){
			for (var j = 0; j < snakes[i].l; j++) {
				if(snakes[i].pos[j][0] === iguana.x && snakes[i].pos[j][1] === iguana.y){
		            iguana.alive = false;
		            break;
		        }
	        }
    	}
    }
}

function vortexCollisionCheck(){
	if(iguana.x === vortex.x && iguana.y === vortex.y && !vortex.used){
		shadowRealm = true;
		vortex.used = true;
		gameSpeed *= 2;
		document.getElementById('canvas').style.backgroundColor = 'black';
		document.getElementById('canvas').style.backgroundImage = 'url(data:image/png;base64,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)';
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
	var dirNum = Math.floor(Math.random() * directions.length);
	if(direction === 0 || direction === 2){
		while(dirNum === 0 || dirNum === 2){
			dirNum = Math.floor(Math.random() * directions.length);
		}
	}else{
		while(dirNum === 1 || dirNum === 3){
			dirNum = Math.floor(Math.random() * directions.length);
		}
	}
	return directions[dirNum];
}

function makePortals(){
    for (var i = 0; i < nOfPortals; i++){
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

function init(){
	ticks = 0;
	score = 0;
	gameSpeed = 1;
	liveSnakes = 1;
	iguana.alive = true;
	shadowRealm = false;
	vortex.used = false;
	vortex.x = Math.floor(Math.random() * (w+1)),
	vortex.x = Math.floor(Math.random() * (h+1)),
	ctx.font = scoreFont;
	document.getElementById('canvas').style.backgroundColor = boardCol;
	document.getElementById('canvas').style.backgroundImage = 'none';
	initSnakes();
	makePortals();
	
}

var gameloop = function gameLoop(){
	if(ticks - gameSpeed === 0){
		ticks = 0;
		if(startTime === -1){
			startTime = performance.now();
		}
		curTime = performance.now();

		moveSnakes();
		if(iguana.alive){
            addScore();
    	}
		moveIguana();

		if(!(score % genTime)){
			liveSnakes++;
			for (var i = 0; i < nOfSnakes; i++) {
				if(i < liveSnakes){
					snakes[i].live = true;
				}
			}
		}
		paint();
	}
	ticks++;
}

function resizeCanvas(){
	cW = window.innerWidth;
	cH = window.innerHeight;
	w = Math.floor(cW/tileSize);
	h = Math.floor(cH/tileSize);
	canvas.width = cW;
	canvas.height = cH;
}

window.addEventListener('resize', resizeCanvas, false);

resizeCanvas();

document.addEventListener('keydown', function(event) {
	if(event.keyCode == 37) {
		iguana.dir = 0;
	}else if(event.keyCode == 38){
		iguana.dir = 1;
	}else if(event.keyCode == 39) {
		iguana.dir = 2;
	}else if(event.keyCode == 40){
		iguana.dir = 3;
	}else if(event.keyCode == 82){
                removeInstructions();
		init();
		clearInterval(intervalID);
		intervalID = setInterval(gameloop,tickTime);
	}
});

init();