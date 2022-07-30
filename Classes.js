class Chunk{
    //coordinates are in screenspace
    constructor(x=0, y=0){
        this.x = x
        this.y = y
    }

    //draw this chunk to the canvas
    draw(ctx, chunkSize, color, border){
        //solid fill
        ctx.beginPath()
        ctx.fillStyle = color
        ctx.arc((this.x + 0.5) * chunkSize, (this.y + 0.5) * chunkSize, (chunkSize-2) / 2, 0, 2*Math.PI)
        ctx.fill()

        //outline
        ctx.beginPath()
        ctx.strokeStyle = border
        ctx.arc((this.x + 0.5) * chunkSize, (this.y + 0.5) * chunkSize, (chunkSize-2) / 2, 0, 2*Math.PI)
        ctx.stroke()
    }
}

class Path{
    constructor(first){
        this.chunks = [first]
        this.cost = 0
    }

    addChunk(chunk, cost=1){
        this.chunks.push(chunk)
        this.cost += cost
    }
}

class Grid{
    constructor(width, height, chunkSize){
        this.w = width
        this.h = height
        this.chunkSize = chunkSize
        
        this.start = new Chunk()
        this.end = new Chunk(width - 1, height - 1)
        
        this.walls = []
        this.explored = []

        this.colors = {
            grid: 'grey',
            border: 'lightgrey',
            bg: 'white',
            wall: 'black',
        }
    }

    toggleWall(coordX, coordY){
        if(this.walls.filter(w => w.x == coordX && w.y == coordY).length > 0){
            //the clicked chunk is already a wall
            this.walls = this.walls.filter(w => w.x != coordX || w.y != coordY)
        }else{
            //add the clicked chunk as a wall
            console.log('is not a wall!');
            let clickedChunk = new Chunk(coordX, coordY)
            this.walls.push(clickedChunk)
        }
    }

    draw(ctx){
        //start
        this.start.draw(ctx, this.chunkSize, 'green', this.colors.border)
        
        //end
        this.end.draw(ctx, this.chunkSize, 'red', this.colors.border)
    
        //walls
        for(const wall of this.walls)
        wall.draw(ctx, this.chunkSize, this.colors.wall, this.colors.wall)
    }
    
    drawGrid(ctx){
        ctx.clearRect(0, 0, this.w * this.chunkSize, this.h * this.chunkSize)
        ctx.strokeStyle = this.colors.grid
        
        //vertical lines
        for(let i = 0; i < this.w; i++){
            ctx.beginPath()
            ctx.moveTo(i * this.chunkSize + 0.5, 0)
            ctx.lineTo(i * this.chunkSize + 0.5, this.h * this.chunkSize)
            ctx.stroke()
        }
        //right border
        ctx.beginPath()
        ctx.moveTo(this.w * this.chunkSize - 0.5, 0)
        ctx.lineTo(this.w * this.chunkSize - 0.5, this.h * this.chunkSize)
        ctx.stroke()

        //horizontal lines
        for(let i = 0; i < this.h; i++){
            ctx.beginPath()
            ctx.moveTo(0, i * this.chunkSize + 0.5)
            ctx.lineTo(this.w * this.chunkSize, i * this.chunkSize + 0.5)
            ctx.stroke()
        }
        //bottom border
        ctx.beginPath()
        ctx.moveTo(0, this.h * this.chunkSize - 0.5)
        ctx.lineTo(this.w * this.chunkSize, this.h * this.chunkSize - 0.5)
        ctx.stroke()
    }
}