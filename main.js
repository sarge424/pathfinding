
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
    
    map.draw(ctx, true)

    canvas.addEventListener('mouseup', e => {
        const target = e.target;
        const rect = target. getBoundingClientRect();
        let mx = e.clientX - rect.left;
        let my = e.clientY - rect.top;
        
        mx -= mx % CHUNKSIZE
        my -= my % CHUNKSIZE

        mx /= CHUNKSIZE
        my /= CHUNKSIZE

        map.toggleWall(mx, my)
    
        map.draw(ctx, true)
    })

    window.addEventListener('keydown', e => {
        if(e.key === 'a'){
            let djikstra = new Solver()
            djikstra.step(map)
            map.draw(ctx, true)
        }
    })
}