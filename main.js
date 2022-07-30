
let canvas
let ctx

let map
    
function start(){
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')

    //grid takes width, height and chunkSize
    map = new Grid(50, 30, 20)
    map.drawGrid(ctx)
}