function drawMap(x) {
	ctx.drawImage(Img.map, 0, 0, canvas.width, Img.map.height, x, 0, canvas.width, canvas.height);
	ctx.drawImage(Img.map, 0, 0, canvas.width, Img.map.height, canvas.width + x, 0, canvas.width, canvas.height);
}

function drawfg(x){
	ctx.drawImage(Img.fg, 0+13, -380, canvas.width, 500, x, 0, canvas.width, canvas.height);
	ctx.drawImage(Img.fg, 0+13, -380, canvas.width, 500, canvas.width + x, 0, canvas.width, canvas.height);
}