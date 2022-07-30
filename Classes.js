class Chunk{
    //coordinates are in screenspace
    constructor(status='unvisited', distance=Infinity){
        this.s = status
        this.d = distance
    }
}

class Grid{
    constructor(width, height, chunkSize){
        this.w = width
        this.h = height
        this.chunkSize = chunkSize
        
        this.chunks = []
        for(let y = 0; y < this.h; y++){
            let row = []
            for(let x = 0; x < this.w; x++){
                row.push(new Chunk())
            }
            this.chunks.push(row)
        }

        this.colors = {
            grid: 'grey',
            border: 'lightgrey',
            bg: 'white',
            wall: 'black',
        }
    }

    toggleWall(coordX, coordY){
        if(this.chunks[coordY][coordX].status === 'unvisited'){
            this.chunks[coordY][coordX].status = 'wall'
        }else if(this.chunks[coordY][coordX].status === 'wall'){
            this.chunks[coordY][coordX].status = 'unvisited'
        }
    }

    draw(ctx){
        this.clear(ctx)
        this.drawGrid(ctx)
        this.drawChunks(ctx)
    }

    clear(ctx){
        ctx.clearRect(0, 0, this.w * this.chunkSize, this.h * this.chunkSize)
    }

    drawChunks(ctx){
        //start
        this.start.draw(ctx, this.chunkSize, 'green', this.colors.border)
        
        //end
        this.end.draw(ctx, this.chunkSize, 'red', this.colors.border)
    
        //walls
        for(const wall of this.walls)
        wall.draw(ctx, this.chunkSize, this.colors.wall, this.colors.wall)
    }
    
    drawGrid(ctx){
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