
let canvas
let ctx

let map
    
function start(){
    canvas = document.getElementById('canvas')
    ctx = canvas.getContext('2d')
    
    map.drawGrid(ctx)
}