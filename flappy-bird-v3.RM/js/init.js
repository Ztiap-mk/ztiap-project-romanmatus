function init() {
	////////////		BUTTONS		////////////
	var x = 10;
	var width = 75;
	var height = 25;
	var y = canvas.height - height - 10;
	var text = "RESTART";
	var font = "15px Arial";
	var color = "#15d315";
	
	start = new Button(x, y, width, height, text, font, color);
	
	x += width + x;
	var color = "#fc320a";
	var text = "PAUSE";
	pause = new Button(x, y, width, height, text, font, color);
	
	////////////		BIRD		////////////
	bird = new Bird();

	////// asi play  /////
	var hrajX =110;
	var HrajY = 410;
	var HrajWidth = 250;
	var HrajHeight = 100;

	play = new ButtonImg(hrajX, HrajY , HrajWidth/1.25, HrajHeight, Img.buttonPlay );

	btnbasic = new ButtonImg(hrajX+HrajWidth/1.25+10, HrajY , HrajWidth/5, HrajHeight ,Img.buttonBasic);

	var InstrukcieY = 530;

	instrukcie = new ButtonImg(hrajX, InstrukcieY , HrajWidth, HrajHeight, Img.buttonInstrukcie );

	//buttony do menu
	var hrajXm =110;
  	var HrajYm = 250;
  	var HrajWidth = 250;
    var HrajHeight = 100;
    
	  play2 = new ButtonImg(hrajXm, HrajYm , HrajWidth/1.25, HrajHeight, Img.buttonPlay );

	  btnbasic2 = new ButtonImg(hrajXm+HrajWidth/1.25+10, HrajYm , HrajWidth/5, HrajHeight ,Img.buttonBasic);

	var InstrukcieYm = 400;

	instrukcie2 = new ButtonImg(hrajXm, InstrukcieYm , HrajWidth, HrajHeight, Img.buttonInstrukcie );

	

    /////////    IKONY   /////////////
    //menu

	var mx = canvas.width-25-50 ;
	var my = 25;
	var scx = 50;
	var scy = 50;
	homeicon = new ButtonImg(mx,my,scx,scy,Img.menuicon);
	
	var icy = 665;
	soundic = new ButtonImg(mx,icy,scx,scy-15,Img.soundicon);

	var imcx = canvas.width-25-50-scx-10;
	soundmuteicon = new ButtonImg(imcx,icy,scx,scy-15,Img.soundmuteicon);

	
    

}