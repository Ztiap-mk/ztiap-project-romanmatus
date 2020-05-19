class ButtonImg {
	
	constructor(x, y, width, height, imgName) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.imgName = imgName;
	}
	
	onButton(mouseX, mouseY) {
		return (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y  && mouseY <= this.y + this.height);
	}
	
	show() {
		ctx.save();
		ctx.drawImage(this.imgName, this.x, this.y, this.width, this.height);
		ctx.restore();
	}

	hide() {
		this.clearRect(0, 0, this.width, this.height);
	}
	
}