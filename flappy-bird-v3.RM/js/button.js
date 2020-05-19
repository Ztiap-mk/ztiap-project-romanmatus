class Button {
	
	constructor(x, y, width, height, text, font, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.text = text;
		this.font = font;
		this.color = color;
	}
	
	onButton(mouseX, mouseY) {
		return (mouseX >= this.x && mouseX <= this.x + this.width && mouseY >= this.y  && mouseY <= this.y + this.height);
	}
	
	show() {
		ctx.strokeStyle = "#FFFFFF";
		ctx.lineWidth = 2;
		ctx.strokeRect(this.x, this.y, this.width, this.height);
		
		ctx.strokeStyle = "#FFFFFF";
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.textAlign = "center"; 
		ctx.fillStyle = "#FFFFFF";
		ctx.font = this.font;
		ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height - 7.5);
		
		ctx.font = "10px Arial";
		ctx.textAlign = "start"; 
	}
	
}