
let canvas
let ctx

let map
    
function start(){
    const dimensions = get_wh()

    canvas = document.getElementById('canvas')
    canvas.width = dimensions[0] * 25
    canvas.height = dimensions[1] * 25
    ctx = canvas.getContext('2d')

    //grid takes width, height and chunkSize
    map = new Grid(dimensions[0], dimensions[1], 25)
    
    map.draw(ctx)
    map.drawGrid(ctx)

    canvas.addEventListener('mouseup', (e) => {
        let mx = e.offsetX
        let my = e.offsetY

        mx -= mx % 25
        my -= my % 25

        mx /= 25
        my /= 25
    })
}

function get_wh(){
    //gets 100% width and 80% height to get grid size
    let container = document.getElementById('container')
    let w = container.clientWidth
    let h = container.clientHeight * 0.8

    w = w - w % 25
    h = h - h % 25

    return[w/25, h/25]
}