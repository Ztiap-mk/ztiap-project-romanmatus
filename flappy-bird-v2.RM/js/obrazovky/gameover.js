function gameover()
{
    gameLoop = false;
		//gameEnded = true;
		ctx.save();
		ctx.drawImage(Img.gameover, -1 ,0);
		ctx.restore();
		textDisplayOnCenter("Best: "+bestsc);
		play.show();
	    btnbasic.show();
		
		instrukcie.show();
    
	homeicon.show();
	soundic.show();
	soundmuteicon.show();

	gameoversoundplayer();

}

function gameoversoundplayer()
{	
	gameoversound.loop = false;
	if(zvuky==1)
				{
	gameoversound.play();
				}
}