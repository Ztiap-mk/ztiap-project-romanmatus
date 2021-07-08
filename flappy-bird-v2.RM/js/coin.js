class Coin {
	
	constructor(x, y, size, speed) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.speed = speed;
		this.yVel = 0;
		this.grav = random(0.02, 0.04);
		this.top = y - random(0.1, 0.5);
		this.bottom = y + random(0.1, 0.5);
	}
	
	update() {
		this.x -= this.speed;
		this.y += this.yVel;
		this.yVel += this.grav;
		
		if((this.y <= this.top && this.grav < 0) || (this.y >= this.bottom && this.grav > 0)) {
			this.grav = (-1) * this.grav;
		}
	}
	
	collect(bird) {
		return (bird.x + bird.size >= this.x && bird.x <= this.x + this.size && bird.y + bird.size >= this.y && bird.y <= this.y + this.size);
	}
	
	offScreen() {
		return (this.x + this.size < 0);
	}
	
	show() {
		ctx.drawImage(Img.coin, 0, 0, Img.coin.width, Img.coin.height, this.x, this.y, this.size, this.size);
	}
	
}
