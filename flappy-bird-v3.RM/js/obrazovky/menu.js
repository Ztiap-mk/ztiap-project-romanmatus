function menu()
{
bird.y=200;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.save();
		ctx.drawImage(Img.menu, 0 ,0);
    ctx.restore();
    
    play2.show();
    instrukcie2.show();
    btnbasic2.show();

   //ikonky
   soundmuteicon.show();
   
}