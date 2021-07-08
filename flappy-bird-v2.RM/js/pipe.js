class Pipe {
	
	constructor(speed) {
		this.width = 40;
		this.x = canvas.width + this.width;
		this.height = random(100, 300);
		this.gap =  180; //random(60, 200);
		this.speed = speed;
		this.bottom = this.height + this.gap;
		this.hit = false;
	}
	
	update() {
		this.x -= this.speed;
	}
	
	offScreen() {
		return (this.x + this.width < 0);
	}
	
	collide(bird) {
		return ((bird.x + bird.size-10 >= this.x && bird.x <= this.x + this.width && bird.y + bird.size-10 >= 0 && bird.y <= this.height+10)
			|| (bird.x + bird.size-10 >= this.x && bird.x <= this.x + this.width && bird.y + bird.size-10 >= this.bottom && bird.y <= canvas.height));
	}

	
	checkCollision(x, y, size) {
		return ((x + size >= this.x && x <= this.x + this.width && y + size >= 0 && y <= this.height+10)
			|| (x + size >= this.x && x <= this.x + this.width && y + size >= this.bottom && y <= canvas.height-350));
	}
	
	show() {
		ctx.drawImage(Img.pipeDwn, 0, 0, Img.pipeDwn.width, Img.pipeDwn.height, this.x, -20, this.width, this.height+50);
		ctx.drawImage(Img.pipeUp, 0, 0, Img.pipeUp.width, Img.pipeUp.height, this.x, this.bottom, this.width, canvas.height-350);
		
	}
	
}