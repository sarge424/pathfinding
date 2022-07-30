
let canvas
let ctx

let map

const CHUNKSIZE = 25
const ROWS = 20
const COLS = 50
    
function start(){
    canvas = document.getElementById('canvas')
    canvas.width = COLS * CHUNKSIZE
    canvas.height = ROWS * CHUNKSIZE
    ctx = canvas.getContext('2d')

    //grid takes width, height and chunkSize
    map = new Grid(COLS, ROWS, CHUNKSIZE)
    
    map.draw(ctx)
    map.drawGrid(ctx)

    document.getElementById('container').addEventListener('mouseup', (e) => {
        let mx = e.offsetX
        let my = e.offsetY

        //mx -= mx % CHUNKSIZE
        ///my -= my % CHUNKSIZE

        mx /= CHUNKSIZE
        my /= CHUNKSIZE

        console.log(e.clientX, e.clientY, map.w * CHUNKSIZE, map.h * CHUNKSIZE)
        //map.toggleWall(mx, my)
        
        map.drawGrid(ctx)
        map.draw(ctx)
    })
}