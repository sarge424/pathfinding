class Chunk{
    //coordinates are in screenspace
    constructor(s='unvisited', distance=Infinity){
        this.status = s
        this.d = distance
    }
}

class Grid{
    constructor(width, height, chunkSize){
        this.w = width
        this.h = height
        this.chunkSize = chunkSize
        
        //chunks are stored in columns so we can do chunks[x][y]
        this.chunks = []
        for(let x = 0; x < this.w; x++){
            let col = []
            for(let y = 0; y < this.h; y++){
                col.push(new Chunk())
            }
            this.chunks.push(col)
        }

        //set start and end
        this.chunks[1][1].status = 'start'
        this.chunks[10][10].status = 'end'

        this.colors = {
            grid: 'grey',
            border: 'lightgrey',
            bg: 'white',
            wall: 'black',
            start: 'green',
            end: 'red'
        }
    }

    toggleWall(coordX, coordY){
        console.log(this.chunks[coordX][coordY].status);
        if(this.chunks[coordX][coordY].status === 'unvisited'){
            this.chunks[coordX][coordY].status = 'wall'
        }else if(this.chunks[coordX][coordY].status === 'wall'){
            this.chunks[coordX][coordY].status = 'unvisited'
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
        for(let x = 0; x < this.w; x++){
            for(let y = 0; y < this.h; y++){
                    this.drawChunk(ctx, x, y, this.chunks[x][y].status)
            }
        }
    }

    drawChunk(ctx, x, y, status){
        ctx.beginPath()
        switch(status){
            case 'wall': ctx.fillStyle = this.colors.wall; break
            case 'start': ctx.fillStyle = this.colors.start; break
            case 'end': ctx.fillStyle = this.colors.end; break
            default: ctx.fillStyle = this.colors.bg
        }

        ctx.arc((x + 0.5) * this.chunkSize, (y + 0.5) * this.chunkSize, this.chunkSize / 2 - 2.5, 0, 2*Math.PI)
        ctx.fill()
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