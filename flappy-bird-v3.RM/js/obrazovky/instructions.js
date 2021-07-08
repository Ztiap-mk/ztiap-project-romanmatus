function instructions()
{
	  gameLoop = false;
    gameEnded = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
   
    ctx.drawImage(Img.ins, 0 ,0);
   // console.log("+");
		ctx.restore();
	//	textDisplayOnCenter("Best: "+bestsc);
    play.show();
    
   // homeicon.show();
    soundic.show();
}