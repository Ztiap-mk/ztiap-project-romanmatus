var cols = 8;

var spriteWidth = 1698; 
var height = 226;

var sirka = 283; 

var speed2 = 0.25; 

var curFrame = 0;

var srcX =0;

function updateFrame(x, y){

	curFrame = ++curFrame % cols; 
	 
	srcX = curFrame * sirka; 
	 
	//ctx.clearRect(x,y,sirka/4,height/4);	
		
	x+=speed2; 

}

class Bird {
	
	constructor() {
		this.size = 65;
		this.x = canvas.width / 4;
		this.y = canvas.height / 2 - this.size / 2;
		this.grav = 0.4;
		this.vel = 4;
		this.collectedCoin = false;
	}
	
	update() {
		if(this.y + this.size >= canvas.height) {
			this.y = canvas.height - this.size;
		}
		
		if(this.y <= 0) {
			this.y = 0;
		}
		
		this.y += this.grav;
		this.y += this.vel;
		if(this.vel < 2) {
			this.vel += this.grav;
		}
	}
	
	
	show() {
		updateFrame(this.x, this.y);
		ctx.drawImage(Img.bird, srcX, 0, sirka, height, this.x, this.y, this.size, this.size);
	}
	
	showTextOnCollectedCoin() {
		if(this.collectedCoin) {
			ctx.textAlign = "center";
			ctx.fillStyle = "#FFFFFF";
			ctx.font = "15px Helvetica";
			ctx.fillText("Penize!", bird.x - 5, bird.y - 15);

		}
	}
}
