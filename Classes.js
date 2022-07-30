class Chunk{
    //coordinates are in screenspace
    constructor(x=0, y=0){
        this.x = x
        this.y = y
    }

    //draw this chunk to the canvas
    draw(ctx, chunkSize, color, border){
        //solid fill
        ctx.fillStyle = color
        ctx.arc(x * chunkSize, y * chunkSize, (chunkSize-2) / 2, 0, 2*Math.PI)
        ctx.fill()

        //outline
        ctx.strokeStyle = border
        ctx.arc(x * chunkSize, y * chunkSize, (chunkSize-2) / 2, 0, 2*Math.PI)
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
        
        this.start = new Chunk()
        this.end = new Chunk(width - 1, height - 1)
        
        this.walls = []
        this.explored = []

        this.colors = {
            grid: 'grey',
            bg: 'white',
            wall: 'black',
        }
    }
}