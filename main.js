
let canvas
let ctx

let map
    
function start(){
    canvas = document.getElementById('canvas')
    canvas.width = 1000
    canvas.height = 600
    ctx = canvas.getContext('2d')

    //grid takes width, height and chunkSize
    map = new Grid(50, 30, 20)
    map.drawGrid(ctx)
}