
let canvas
let ctx

let map

const CHUNKSIZE = 25
    
function start(){
    const dimensions = get_wh()

    canvas = document.getElementById('canvas')
    canvas.width = dimensions[0] * CHUNKSIZE
    canvas.height = dimensions[1] * CHUNKSIZE
    ctx = canvas.getContext('2d')

    //grid takes width, height and chunkSize
    map = new Grid(dimensions[0], dimensions[1], CHUNKSIZE)
    
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

function get_wh(){
    //gets 100% width and 80% height to get grid size
    let container = document.getElementById('container')
    let w = container.clientWidth
    let h = container.clientHeight * 0.8

    w = w - w % CHUNKSIZE
    h = h - h % CHUNKSIZE

    return[w/CHUNKSIZE, h/CHUNKSIZE]
}