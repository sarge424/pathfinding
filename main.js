
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
    map.drawGrid(ctx)
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