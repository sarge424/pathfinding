class Chunk{
    //coordinates are in screenspace
    constructor(s='default', distance=Infinity, visited=false){
        this.status = s
        this.d = distance
        this.v = false
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
        this.chunks[1][1] = new Chunk('start', 0, false)
        this.chunks[10][10].status = 'end'

        //color settings
        this.colors = {
            grid: 'grey',
            border: 'lightgrey',
            bg: 'white',
            wall: 'black',
            start: 'green',
            end: 'red'
        }
    }

    //toggle a chunk to be wall or not
    toggleWall(coordX, coordY){
        console.log(this.chunks[coordX][coordY].status);
        if(this.chunks[coordX][coordY].status === 'default'){
            this.chunks[coordX][coordY].status = 'wall'
        }else if(this.chunks[coordX][coordY].status === 'wall'){
            this.chunks[coordX][coordY].status = 'default'
        }
    }

    //get neighbours of a chunk
    getNeighbours(x, y, diagonals=true){
        let ret = []
        for(let i = x - 1; i <= x + 1; i++){
            for(let j = y - 1; j <= y + 1; j++){
                //ignore this element
                if(i == x && j == y)
                    continue

                //no diagonals
                if(i != x && j != y && !diagonals)
                    continue
                
                //if x and y are in bounds
                if(0 <= i && i < this.w && 0 <= j && j < this.h){
                    //if the chunk has never been visited and it is not a wall
                    if(this.chunks[i][j].status != 'wall' && !this.chunks[i][j].v){
                        ret.push(this.chunks[i][j])
                        console.log(i, j, this.chunks[i][j].status, this.chunks[i][j].d, this.chunks[i][j].v);
                    }
                }
            }
        }
        return ret
    }

    //draw everything
    draw(ctx, debug=false){
        this.clear(ctx)
        this.drawGrid(ctx)
        this.drawChunks(ctx)

        if(debug)
            this.debug(ctx)
    }

    clear(ctx){
        ctx.clearRect(0, 0, this.w * this.chunkSize, this.h * this.chunkSize)
    }

    drawChunks(ctx){
        for(let x = 0; x < this.w; x++){
            for(let y = 0; y < this.h; y++){
                ctx.beginPath()
                switch(this.chunks[x][y].status){
                    case 'wall': ctx.fillStyle = this.colors.wall; break
                    case 'start': ctx.fillStyle = this.colors.start; break
                    case 'end': ctx.fillStyle = this.colors.end; break
                    default: ctx.fillStyle = this.colors.bg
                }
        
                ctx.arc((x + 0.5) * this.chunkSize, (y + 0.5) * this.chunkSize, this.chunkSize / 2 - 2.5, 0, 2*Math.PI)
                ctx.fill()
            }
        }
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

    debug(ctx){
        for(let x = 0; x < this.w; x++){
            for(let y = 0; y < this.h; y++){
                let d = this.chunks[x][y].d === Infinity ? -1 : this.chunks[x][y].d
                ctx.beginPath()
                ctx.fillStyle = this.chunks[x][y].v ? 'orange' : (this.chunks[x][y].d === Infinity ? 'magenta' : 'powderblue')
                ctx.font = "20px Arial"
                ctx.fillText(d, x * this.chunkSize, (y + 1) * this.chunkSize)
                ctx.fill()
            }
        }
    }
}