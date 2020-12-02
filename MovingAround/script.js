const canvas = document.getElementById("canvas");

/** @type {CanvasRenderingContext2D} */

const ctx = canvas.getContext("2d");

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

window.addEventListener("resize",()=>{
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
})


class Person{
    constructor(x, y){
        this.Position = this.assignPos(x,y);
        this.Destination = this.PlaceToGo();
        setInterval(()=>{
            this.drawShape();
            this.MoveAround();
        }, 10)
    }

    PlaceToGo(){
        return{
            x:Math.floor(Math.random() * window.innerWidth),
            y:Math.floor(Math.random() * window.innerHeight)
        }
    }

    MoveAround(){
        this.Position.x += Math.round(Math.random()) * 10 - 5;
        this.Position.y += Math.round(Math.random()) * 10 - 5;
    }


    assignPos(x, y){
        return{
            x:x,
            y:y
        }
    }

    drawShape(){
        ctx.fillStyle = "blue";
        ctx.fillRect(this.Position.x, this.Position.y, 5, 5);
        
    }
}

let me = new Person(window.innerWidth / 2, window.innerHeight /2);

// create A Object Class;
// assign width and height