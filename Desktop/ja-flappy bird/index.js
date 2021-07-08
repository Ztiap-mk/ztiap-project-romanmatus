//let cvs = document.getElementById("canvas");  
//let ctx = cvs.getContext("2d");  

const IMAGES = [
  {name: 'bg', src: 'images/bg.png'},
  {name: 'fg', src: 'images/fg.png'},
  {name: 'pipeS', src: 'images/pipe.png'},
  {name: 'pipeJ', src: 'images/pipe.png'},
];
/*
const iBIRD =  [
  {name: '1', src: 'bird/1.png'},
  {name: '2', src: 'bird/2.png'},
  {name: '3', src: 'bird/3.png'},
  {name: '4', src: 'bird/4.png'},
  {name: '5', src: 'bird/5.png'},
  {name: '6', src: 'bird/6.png'},
  {name: '7', src: 'bird/7.png'},
];
*/
/*
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeS = new Image();
let pipeJ = new Image();
const height = 720;
const width = 480;

window.onload = function()
{
  bird.src = "images/bird.png";
  bg.src = "images/bg.png";
  fg.src = "images/fg.png";
  pipeS.src = "images/pipe.png";
  pipeJ.src = "images/pipe.png";
}
*/


/* možno na bird sekvenciu obrazku
var images = {};
['bird.png','pipe.png','bg.png','fg.png'].forEach(imgName => {
    var img = document.createElement('img');
    img.src = 'images/' + imgName;
    images[imgName] = img;
});
*/



class ResourceManager {
  loadedImages = new Map();

  async init() {
      await this.loadImages();
  }

  async loadImages() {
      await Promise.all(
          IMAGES.map(image => this.loadImage(image)),
      )
  }

  
  async loadImage(imgResource) {
      return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = imgResource.src;
          img.onload = () => {
              this.loadedImages.set(imgResource.name, img);
              resolve(img);
          }
          img.onerror = (err) => {
              reject(err);
          }
      });
  }

  // ziskat js object Image, ktory sa posle do canvas
  getImageSource(imageName) {
      const image = this.loadedImages.get(imageName);
      if (image == null) {
          throw new Error(`Image '${imageName}' not found`);
      }
      return image;
  }
}

const resourceManager = new ResourceManager();

//document.addEventListener("keydown",moveUp);  


class Game {
    time = Date.now();
    
    // Set up canvas for 2D rendering
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");


    // tato funkcia sa vola v html pri startovani hry
    // inicializuje obrazky + vytvara objekty
    async start() {
        console.log('starting game');
        await resourceManager.init();
        console.log('resouces loaded');

        this.bgImage = resourceManager.getImageSource('bg');

        
       
       // this.objects.push(new Bird());
        

        this.startLoop();
    }

    // spusta nekonecnu sluzku
    startLoop() {
        this.time = Date.now();
        this.step();
    }

    // 
    step() {
        // console.log("Step");
      
        // Get time delta
        const now = Date.now();
        const dt = (now - this.time) / 100;
        this.time = now;
      
//        this.move(dt);
        this.render();
      
        // tu treba pouzit lambda funkciu -> ktora automaticky nabinduje this pre volanu funkciu
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
        requestAnimationFrame(() => this.step());
    }
/*
    move(dt) {
        this.objects.forEach((object) => {
            object.move(dt);
        });
    }
*/
    // cistenie som presunul do zvlast funkcie
    clearCtx() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // render len zobrazuje a obrazok sa nacita raz pri inicializacii
    render() {
        this.clearCtx();
        this.ctx.drawImage(this.bgImage,0,0);
       
        
        // Render all objects in scene
        this.objects((object) => {
            object.draw(this.ctx);
        });
        
    }
}


class Bird {
    // Initialization
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('bird');
    
        this.x = 180;
        this.y = canvas.height/2;
        this.gravity = 0.6;
        this.lift = -15;
        this.velocity = 0;
      }
    
      
    
      up()
      {
          this.velocity += this.lift;
      }
    
      update()
      {
        this.velocity += this.gravity;
        this.velocity *= 0.9;
        this.y += this.velocity;
    
        if (this.y > height) {
          this.y = height;
          this.velocity = 0;
        }
    
        if (this.y < 0) {
          this.y = 0;
          this.velocity = 0;
        }
      }
    
        draw(ctx){
          ctx.save()
          ctx.drawImage(this.image, 0, 0)
          ctx.restore()
          }
      
  }
  
  class Pipe
  {
    constructor()
    {
        this.canvas = document.getElementById("canvas");
        this.image = resourceManager.getImageSource('pipe');

      this.spacing = 100;
      this.top = random(100, 400)
      this.bottom = this.top + this.spacing;
  
      this.x = width;
      this.w = 20;
      this.speed = 2;
  
      this.highlight = false;
    }
  
    hits()
    {
      if (bird.y < this.top || bird.y > this.bottom) {
        if (bird.x > this.x && bird.x < this.x + this.w) {
          this.highlight = true;
          return true;
        }
      }
      this.highlight = false;
      return false;
    }
  
    show()
    {
        ctx.save()
        ctx.drawImage(this.image, this.x, 0, this.w, this.top)
        ctx.drawImage(this.image, this.x, height - this.bottom, this.w, this.bottom)
        ctx.restore()
    }
  
    update()
    {
      this.x -= this.speed;
    }
  
    offscreen()
    {
      if (this.x < -this.w) {
        return true;
      } else {
        return false;
      }
    }
  
  }




