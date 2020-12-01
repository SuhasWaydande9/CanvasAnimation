let canvas = document.getElementById("canvas");


/** @type {CanvasRenderingContext2D} */

let ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

window.addEventListener("resize", ()=>{
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
})

let ArrayOfPointer = [];

// Create a Pointer Class
// give it a Position.
// Check if Two Pointers are close in a Loop.
// if they are close, connect Them By Line.
// Keep Theme In Constant Movement.
// Bounce Theme Back on Walls.



const fps = 10;

class Pointer{
    constructor(x, y, direction){
        // positon is Going to be a Object with x and y values;
        this.position = this.assignPose(x, y);
        this.radius = 10;
        this.speed = direction;
        this.areaOf = 150;
        this.connectPointer = this.connectPointer.bind(this);

        setInterval(() => {
            this.position.x += this.speed;
            // this.position.y += this.speed / 2;
            this.collisionDetection();
            // this.drawPointer();
        }, fps);
    }
    // check if in Other Pointer is in range
    checkRange(ThatPosition){
        if((ThatPosition.x < this.position.x + this.areaOf && ThatPosition.x > this.position.x - this.areaOf)
            &&
            (ThatPosition.y < this.position.y + this.areaOf && ThatPosition.y > this.position.y - this.areaOf)
            ){
                return true;
            }else{
                return false;
            }
    }
    // draw the Shape
    drawPointer(){
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 360);
        ctx.fill();
    }
    // if checkRange returns true. Take the Position And Connect it to this Pointer.
    connectPointer(ThatPosition){
        if(this.checkRange(ThatPosition)){
            ctx.beginPath();       // Start a new path
            ctx.moveTo(this.position.x, this.position.y);
            ctx.lineTo(ThatPosition.x, ThatPosition.y);
            ctx.lineWidth = 0.1;
            ctx.strokeStyle = "blue";
            ctx.stroke();
        }else{
            return;
        }
    }
    // Assign Position
    assignPose(x, y){
        return {
            x:x,
            y:y
        };
    }

    collisionDetection(){
        if((this.position.x > window.innerWidth || this.position.x < 0) || (this.position.x > window.innerWidth || this.position.x < 0)){
            this.speed = -this.speed;
        }
    }

};



for(let i = 0; i < window.innerWidth / 10; i++){
    ArrayOfPointer[i] = new Pointer(Math.floor(Math.random() * window.innerWidth),Math.floor(Math.random() * window.innerHeight), Math.round(Math.random())* 5 - 2.5);
}

// for(let b = 0; b < ArrayOfPointer.length; b++){
//     for(let c = 0; c < ArrayOfPointer.length; c++){
//         ArrayOfPointer[b].connectPointer(ArrayOfPointer[c].position);
//     }
// }

setInterval(() => {
    ctx.fillStyle = "rgba(255,255,255,0.3)";
    ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
    for(let b = 0; b < ArrayOfPointer.length; b++){
        for(let c = 0; c < ArrayOfPointer.length; c++){
            ArrayOfPointer[b].connectPointer(ArrayOfPointer[c].position);
        }
    }
}, fps);

// function UpdateEverythin(){
//     for(let b = 0; b < ArrayOfPointer.length; b++){
//         for(let c = 0; c < ArrayOfPointer.length; c++){
//             ArrayOfPointer[b].update();
//             ArrayOfPointer[b].connectPointer(ArrayOfPointer[c].position);  
//         }
//         ctx.clearRect(0,0,window.innerWidth, window.innerHeight);
//     }
// }

// setInterval(()=>{
//     UpdateEverythin();
// },1000)
