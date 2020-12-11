import Enemy from "./Enemy.js";

/** @type {CanvasRenderingContext2D} */
const ctx = document.getElementById("canvas").getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

window.addEventListener("resize", ()=>{
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
})

//-----------------------------------------------------------------------//

class Player{
  constructor(){
    this.x = window.innerWidth / 2,
    this.y = window.innerHeight - 100,
    this.w = 50,
    this.h = 50,
    this.speed = 2,
    this.direction = null,
    this.fire = false,
    this.KeyMap = {
      left: "a",
      right: "d"
    },

    //undefined Variables
    this.enemies,
    this.bullets,

    // Bind Functions
    this.Draw = this.Draw.bind(this),
    this.Fire = this.Fire.bind(this),
    this.keyBoardListeners = this.keyBoardListeners.bind(this),
    

    //Constructor Function Calls
    this.Fire(),
    this.keyBoardListeners(),
    this.AssignEnemies();

    this.num = 0,
    this.EnemySpawnTimer = setInterval(()=>{
      if(this.enemies.length > 0){
        this.enemies[this.num].update();
        this.num = this.enemies.length - (this.enemies.length - 1);
      }else{
        clearTimeout(this.EnemySpawnTimer);
      }
    }, 200);

  }

  AssignEnemies(){
    this.enemies = [];
    for(let i = 0; i < 10; i++){
      this.enemies[i] = new Enemy(ctx);
    }
  }

  removeEnemiesFromArray(){
    for(let enm = 0; enm < this.enemies.length; enm++){
      if(this.enemies[enm] != null){
        if(this.enemies[enm].dead){
        this.enemies.splice(enm, 1);
      }
      }
    }
  }

  keyBoardListeners(){
        window.addEventListener("keydown", (key)=>{
      if(key.key === "a" || key.key === "d"){
        this.direction = key.key;
      }
      if(key.key === " "){
        this.fire = true;
      }
    });

    window.addEventListener("keyup", (key)=>{
      if(this.direction === key.key){
        this.direction = null;
      }
      if(key.key === " "){
        this.fire = false;
    }
    });
  }

  Fire(){
    this.bullets = [];
    setInterval(() => {
      if(this.fire){
        let Bull = new Bullet(this.x + this.w / 2, this.y);
        window.requestAnimationFrame(Bull.BulletDraw);
      }
    }, 100);
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
    this.removeEnemiesFromArray();
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