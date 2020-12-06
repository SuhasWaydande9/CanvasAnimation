/** @type {CanvasRenderingContext2D} */
const ctx = document.getElementById("canvas").getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

window.addEventListener("resize", ()=>{
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
})

//-----------------------------------------------------------------------//

// function Main(){
  // let KeyMap = {
  //   left: "a",
  //   right:"d"
  // }

  // let Player ={
  //   x: window.innerWidth / 2,
  //   y: window.innerHeight - 100,
  //   w: 50,
  //   h: 50,
  //   speed: 2,
  //   direction:null
  // }

  

  // function Draw(){
  //   ctx.save();
  //   // ctx.fillStyle = "rgba(255,255,255,0.5)";
  //   // ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  //   ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  //   if(Player.x < 30){
  //     Player.direction = null;
  //     Player.x = 32
  //   }

  //   if(Player.x > ctx.canvas.width - (Player.w + 30)){
  //     Player.direction = null;
  //     Player.x = ctx.canvas.width - (Player.w + 32);
  //   }

  //   if(Player.direction != null){
  //     if(Player.direction === KeyMap.left){
  //       Player.x -= Math.cos(Player.x) + Math.PI * Player.speed;
  //     }
  //     if(Player.direction === KeyMap.right){
  //       Player.x += Math.cos(Player.x) + Math.PI * Player.speed;
  //     }
  //   }

  //   ctx.restore();
  //   ctx.fillRect(Player.x, Player.y, Player.w,Player.h);

  //   window.requestAnimationFrame(Draw);
  // }

  // window.addEventListener("keydown", (key)=>{
  //   Player.direction = key.key;
  // });

  // window.addEventListener("keyup", (key)=>{
  //   if(Player.direction === key.key){
  //     Player.direction = null;
  //   }
  // })

//   window.requestAnimationFrame(Draw);
// }

// Main();

class Player{
  constructor(){
    this.x = window.innerWidth / 2,
    this.y = window.innerHeight - 100,
    this.w = 50,
    this.h = 50,
    this.speed = 2,
    this.direction = null,
    this.fire = false;
    this.KeyMap = {
      left: "a",
      right: "d"
    }

    this.Draw = this.Draw.bind(this);

    window.addEventListener("keypress", key =>{
      if(key.key === " "){
        let Bull = new Bullet(this.x + this.w / 2, this.y)
        window.requestAnimationFrame(Bull.BulletDraw);
      }
    })

    
  window.addEventListener("keydown", (key)=>{
    if(key.key === "a" || key.key === "d"){
      this.direction = key.key;
    }
  });

  window.addEventListener("keyup", (key)=>{
    if(this.direction === key.key){
      this.direction = null;
    }
  });

  }

  Draw(){
    ctx.fillStyle = "black";
    ctx.save();
    // ctx.fillStyle = "rgba(255,255,255,0.5)";
    // ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    if(this.x < 30){
      this.direction = null;
      this.x = 31;
    }

    if(this.x > ctx.canvas.width - (this.w + 30)){
      this.direction = null;
      this.x = ctx.canvas.width - (this.w + 31);
    }

    if(this.direction != null){
      if(this.direction === this.KeyMap.left){
        this.x -= Math.cos(this.x) + Math.PI * this.speed;
      }
      if(this.direction === this.KeyMap.right){
        this.x += Math.cos(this.x) + Math.PI * this.speed;
      }
    }
    ctx.restore();
    ctx.fillRect(this.x, this.y, this.w,this.h);

    window.requestAnimationFrame(this.Draw);
  }

    
}

class Bullet{
  constructor(x, y){
    this.x = x,
    this.y = y,
    this.w = 4,
    this.h = 8,
    this.speed = 6,
    this.movement = this.movement.bind(this),
    this.BulletDraw = this.BulletDraw.bind(this),
    this.animateFrame = null
  }

  BulletDraw(){
    this.movement();
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.w, this.h);
    this.animateFrame = requestAnimationFrame(this.BulletDraw);
    if(this.y <= 0){
      cancelAnimationFrame(this.animateFrame);
    }
  }

  movement(){
    this.y -= this.speed;
  }

  

}

let Me = new Player();
window.requestAnimationFrame(Me.Draw);