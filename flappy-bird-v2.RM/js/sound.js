class sound{

    constructor(src){
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
		//debugger;
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play_started=false;
		
    }

    refresh(){
        this.sound.currentTime = 0;
    }

    play(){
        this.play_started=true;
        this.sound.volume = 0.05; 
        this.sound.play();
              
    }
    stop(){
        this.play_started=false;
        this.sound.pause();
    }  
}

