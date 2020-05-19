////////////		CANVAS		////////////
var canvas = document.getElementById("canvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
var ctx = canvas.getContext("2d");

////////////		Premenné		////////////
var bird;
var frameRate = 1;
var pipes = [];
var coins = [];
var gameSpeed = 2;
var rate =120;
var start;
var pause;
var gameLoop = false;
var gameEnded = false;
var score = 0;
var bestsc=0;
var pomocna=0;
var instrukkk= 0;
var zvuky = 0;
var basic = 10;

// /////// ZVUKY /////////

var pozadi;
var wing;
var coin; 
var hit;
var gameoversound;

////////////		IMG VARIABLES		////////////
var Img = {};
Img.map = new Image();
Img.fg = new Image();
Img.bird = new Image();
Img.coin = new Image();
Img.pipeUp = new Image();
Img.pipeDwn = new Image();
//obrazovky
Img.menu = new Image();
Img.gameover = new Image();
Img.ins = new Image();
//// - buttons
Img.buttonPlay = new Image();
Img.buttonInstrukcie = new Image();
Img.buttonBasic = new Image();
//icons
Img.menuicon = new Image();
Img.soundicon = new Image();
Img.soundmuteicon = new Image();

////////////		CANVAS VARIaBLES		////////////
var xMap = 0;

//hraj();

function hraj()
{
	pozadi = new sound("sounds/solomun.mp3");
	wing = new sound("sounds/wing.ogg");
	coin = new sound("sounds/coin.wav");
	hit = new sound("sounds/hit.wav");
	gameoversound = new sound("sounds/gameover.mp3");
	
	if(zvuky==0){
	pozadi.play();
	zvuky=1;
	}	
	
}

////////////		GAME LOOP FUNCTION		////////////
function game() {
	////////////		CANVAS FRAME		////////////
	window.requestAnimationFrame(game);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	////////////		MAP		////////////
	ctx.save();
	drawMap(xMap);
	ctx.restore();
	
	
	////////////		PER FRAME		////////////
	if(gameLoop) {
		
		frameRate += 1;
		
		xMap -= 1;
		if(xMap <= -canvas.width) {
			xMap = 0;
		}
		
		if(frameRate % rate == 0) {
			console.log("+");

			if(basic!=0)
			{
				gameSpeed += 0.2 ;
				
			}	
			pomocna++;

			if(pomocna>=2)
			{
				score++;
			}
		}
	}


	
	////////////		pauza btn		////////////
	if(!gameLoop && !gameEnded && score > 0) {
		ctx.textAlign = "center";
		ctx.fillStyle = "#FFFFFF";
		ctx.font = "45px Arial";
		ctx.fillText("PAUSED!", canvas.width / 2, canvas.height / 2);
	}
	
	////////////		PIPES		////////////
	for(var i = pipes.length - 1; i >= 0; i--) {
		if(gameLoop) {
			pipes[i].update();
		}
		pipes[i].show();
		
		if(pipes[i].collide(bird)) {
			ctx.textAlign = "center";
			
			ctx.fillStyle = "#FFFFFF";
			ctx.font = "15px Arial";
			ctx.fillText("AUUU!", bird.x - 5, bird.y - 15);
			
			
			if(!pipes[i].hit) {
				if(zvuky==1)
				{
					hit.play();
				}
				if(basic==0)
				{
					score= -1;
				} else {	
					score -= 10;
				}
				pipes[i].hit = true;
			}
		}

		if(pipes[i].offScreen()) {
			pipes.splice(i, 1);
		}
	}
	
	////////////		COINS		////////////
	for(var i = coins.length - 1; i >= 0; i--) {
		if(gameLoop) {
			coins[i].update();
		}
		coins[i].show();
		
		if(coins[i].collect(bird)){

			score += 5;
			rate = 120;
			gameSpeed = 2;
			if(zvuky==1)
				{
			coin.play();
				}
			coins.splice(i, 1);  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
			
			bird.collectedCoin = true;
			
			setTimeout(function(){ bird.collectedCoin = false; }, 700);  //https://www.w3schools.com/jsref/met_win_settimeout.asp
		}
		
		if(coins[i]!=undefined && coins[i].offScreen()  ) {
			coins.splice(i, 1);
		}
	}


	

	////////////		NEW PIPES EVERY 200 FRAMES		////////////
	if(frameRate % rate == 0) {
		pipes.push(new Pipe(gameSpeed));
		rate--;
	}
	
	////////////		NEW COIN   	////////////
	if(frameRate % 300 == 0) {
		var coinSize = 15;
		var coinX = canvas.width;
		var coinY = random(0, canvas.height - coinSize);
		
		for(var i in pipes) {
			if(!pipes[i].checkCollision(coinX, coinY, coinSize)) {
				coins.push(new Coin(coinX, coinY, coinSize, gameSpeed));
			}
		}
	}

	//icons
	 homeicon.show();
	
	////////////		BIRD		////////////
	if(gameLoop) {
		bird.update();
	}
	bird.show();
	bird.showTextOnCollectedCoin();

	// SPODEK POHYB
	ctx.save();
	drawfg(xMap);
	ctx.restore();

	
	////////////		SCORE	////////////
	ctx.save();
	drawScore(score);
	ctx.restore();

	////////////		BUTTONS		////////////
	start.show();
	pause.show();
	
	//icons 
	soundic.show();	
	soundmuteicon.show();	
	
	////////////		START GAME		////////////
	if(score == 0 && pomocna == 0 ) {
		menu();
	}
	
	////////////		END GAME		////////////
	if(score < 0) {
		gameover();
	}

	if(instrukkk==1)
	{
		instructions();
	}

}



function textDisplayOnCenter(text) {
	ctx.textAlign = "center";
	ctx.fillStyle = "#FFFFFF";
	ctx.font = "45px Arial";
	ctx.fillText(text, canvas.width / 2, canvas.height / 2-50);
	ctx.font = "15px Arial";
}


//loadnutie obrazkov

window.addEventListener('load', function() {
	//obrazovky
	Img.ins.src = "gallery/obrazovky/instrukcie.png";
	Img.menu.src = "gallery/obrazovky/uvodna.png";
	Img.gameover.src = "gallery/obrazovky/gameover.png";
	Img.map.src = "gallery/img/bg.png";
	Img.fg.src = "gallery/img/backgorund1.png";
	//core
	Img.bird.src = "gallery/img/sprite.png";
	Img.coin.src = "gallery/img/coin.png";
	Img.pipeUp.src = "gallery/img/pipe.png";
	Img.pipeDwn.src = "gallery/img/pipe.png";
	//btns
	Img.buttonPlay.src = "gallery/buttons/hraj.png";
	Img.buttonInstrukcie.src = "gallery/buttons/instrukcie.png";
	Img.buttonBasic.src = "gallery/buttons/basic.png";
	//icons
	Img.menuicon.src = "gallery/icons/home.png";
	Img.soundicon.src = "gallery/icons/zvuk.png";
	Img.soundmuteicon.src = "gallery/icons/mute.png";
	
});

/*
window.onload = function() {
 this.instructions();
}

*/

document.addEventListener('keypress', keypress);

function keypress(e) {
	if(e.code == "Space") {
		if(gameLoop) {
			bird.vel -= 6;
			if(zvuky==1)
				{
			wing.play();
				}
		}
	}
}

var mouseX;
var mouseY;

document.addEventListener('mousemove', function(e) {
	mouseX = e.pageX - canvas.getBoundingClientRect().left;
	mouseY = e.pageY - canvas.getBoundingClientRect().top;
		
	if(start.onButton(mouseX, mouseY) || pause.onButton(mouseX, mouseY)) {
		canvas.style.cursor = "pointer";
	} else {
		canvas.style.cursor = "default";
	}
	
	//console.log(mouseX + " " + mouseY);
}, false);



document.onclick = function(mouse) {

/*	if(start.onButton(mouseX, mouseY) && (gameEnded || score == 0)) {
		canvas.style.cursor = "pointer";
		gameLoop = true;
		startNewGame();
	}

	*/
	
	if(start.onButton(mouseX, mouseY)) {
		canvas.style.cursor = "pointer";
		gameLoop = true;
		//hraj(0);

		//console.log("start");
	}
	
	if(pause.onButton(mouseX, mouseY)) {
		canvas.style.cursor = "pointer";
		gameLoop = false;
		//console.log("pause");
	}

	if(play.onButton(mouseX, mouseY) && !gameLoop) {
		canvas.style.cursor = "pointer";
		gameLoop = true;
		basic=1;
		startNewGame();
		if(zvuky==0)
		{
		hraj();
		zvuky=1;
		
		}
	}

	if(play2.onButton(mouseX, mouseY) && !gameLoop){
		canvas.style.cursor = "pointer";
		gameLoop = true;
		basic=1;
		startNewGame();
		if(zvuky==0)
		{
		hraj();
		zvuky=1;
		}
	}

	if(btnbasic.onButton(mouseX, mouseY) && !gameLoop) {
		canvas.style.cursor = "pointer";
		gameLoop = true;
		basic=0;
		startNewGame();
		if(zvuky==0)
		{
		hraj();
		zvuky=1;
		
		}
	}

	if(btnbasic2.onButton(mouseX, mouseY) && !gameLoop){
		canvas.style.cursor = "pointer";
		gameLoop = true;
		basic=0;
		startNewGame();
		if(zvuky==0)
		{
		hraj();
		zvuky=1;
		}
	}

	if((instrukcie.onButton(mouseX, mouseY) && !gameLoop)) {
		canvas.style.cursor = "pointer";
		//instructions();
		gameloop=false;
		instrukkk=1;
	}

	if(instrukcie2.onButton(mouseX, mouseY) && !gameLoop)
	{
		canvas.style.cursor = "pointer";
		//instructions();
		gameloop=false;
		instrukkk=1;
	}

	if(homeicon.onButton(mouseX, mouseY)) {
		canvas.style.cursor = "pointer";
		gameLoop = false;
		score=0;
		pomocna=0;
	}

	if(soundmuteicon.onButton(mouseX, mouseY)){
		canvas.style.cursor = "pointer";
		
		pozadi.stop();
		zvuky=0;
	}

	if(soundic.onButton(mouseX, mouseY) && zvuky==0){
		canvas.style.cursor = "pointer";
		if(zvuky==0)
		{
		hraj();
		zvuky=1;
		}

	}
	


	if(gameLoop){
		bird.vel -= 6;
		if(zvuky==1)
				{
		wing.play();
				}
	}

}



function drawScore(x){
	ctx.fillStyle = "#FFFFFF";
	ctx.font = "20px Arial";
	ctx.fillText("Score: " + score, 10, 30);
	if(score>bestsc)
	bestsc=score;
	ctx.fillText("Best: " + bestsc, 10, 50);
	ctx.font = "8px Arial";
}


function startNewGame() {
	gamespeed =2;
	score = 0;
	if(basic==0)
		{
		 frameRate = 1;	
		} 
	
	rate = 120;
	pipes = [];
	coins = [];
	xMap = 0;
	gameEnded = false;
	instrukkk=0;
	//zvuky=1;
	init();
	
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}

startNewGame();
score = 0;
game();


