export default class Enemy{
    constructor(ctx){
        this.ctx = ctx,
        this.x = Math.floor(Math.random() * window.innerWidth),
        this.y = 0,
        this.width = 20,
        this.height = 20,
        this.Health = 100,
        this.dead = false,
        this.speed = 5,
        this.EnemyFrame,
        this.draw = this.draw.bind(this),
        this.wallCollision = this.wallCollision.bind(this),
        this.update = this.update.bind(this)
    }

    draw(){
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.x, this.y, this.width,this.height);
    }

    update(){
        this.x += this.speed;
        this.y += 2;
        this.draw()
        this.wallCollision();
        this.EnemyFrame = window.requestAnimationFrame(this.update);
        if(this.y >= window.innerHeight){
            cancelAnimationFrame(this.EnemyFrame);
            this.dead = true;
        }
    }

    wallCollision(){
        if(this.x < 0){
            this.speed += 5;
        }
        if(this.x >= window.innerWidth){
            this.speed = -5;
        }
    }

    bulletCollision(bulletX, bulletY, AnimationFrame){
        if((bulletX >= x && bulletX <= this.x + this.width) && (bulletY >= this.y && bulletY <= this.y + this.height)){
            cancelAnimationFrame(AnimationFrame);
        }
    }
}