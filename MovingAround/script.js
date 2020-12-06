const canvas = document.getElementById("canvas");

/** @type {CanvasRenderingContext2D} */

const ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

window.addEventListener("resize",()=>{
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
})

class Astroid{
    constructor(x, y){
        this.x = x,
        this.y = y
        this.drawAstro();
        setInterval(()=>{
            this.drawAstro();
        }, 30)
    }

    drawAstro(){
        ctx.fillStyle = "gray";
        ctx.fillRect(this.x, this.y, 5, 5);
    }
}

class Space{
    Astroids = [];
    DrawAstroidRain(){
        for(let i = 0; i < 10; i++){
            this.Astroids[i] = new Astroid(Math.floor(Math.random() * window.innerWidth), Math.floor(Math.random() * window.innerHeight));
        }
    }
}

class Player{
    constructor(x, y, w, h){
        this.x = x,
        this.y = y,
        this.width = w,
        this.height = h
        this.Space = new Space();
        this.Space.DrawAstroidRain();
        this.DrawPlayer();
        this.Movement();

        setInterval(()=>{
            ctx.fillStyle = "rgba(255,255,255,0.7)";
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
            this.DrawPlayer();
        }, 30);
    }

    DrawPlayer(){
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    Movement(){
        window.addEventListener("keypress", (key)=>{
            if(this.x > 0 && this.x < window.innerWidth ){
                if(key.key == "a"){
                    this.x -= 30;
                }else if(key.key == "d"){
                    this.x += 30;
                }
            }
        });

        window.addEventListener("keydown",(key)=>{
            if(key.key == " "){
                let a = new Bullet(this.x, this.y);
            }
        })

    }
}

class Bullet{
    constructor(x, y){
        this.x = x,
        this.y = y
        this.width = 5,
        this.height = 10
        this.drawBullet();
        this.interval = setInterval(()=>{
            this.drawBullet();
            this.Movement();
        }, 30);
    }

    drawBullet(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x + 50 / 2 - 2.5, this.y, this.width, this.height);
    }

    Movement(){
        if(this.y > 0 && this.y < window.innerHeight){
            this.y -= 10;
        }else{
            clearInterval(this.interval);
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
        }
    }
}

let GamePlayer = new Player(window.innerWidth / 2, window.innerHeight - 70, 50, 50);