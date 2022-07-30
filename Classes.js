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