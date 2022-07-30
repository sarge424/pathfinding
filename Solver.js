class Solver{
    constructor(mode='djikstra'){
        this.mode = mode
    }

    //g is the grid object
    step(g){
        //find all chunks with known distances (initially just the start)
        //get all their unvisited neighbors, and set their distance to be current + 1
        for(let x = 0; x < g.w; x++){
            for(let y = 0; y < g.h; y++){
                //if a chunks distance is known but it was not visited
                if(g.chunks[x][y].d != Infinity && !g.v){
                    //get all the neighbors
                    let neighbors = g.getNeighbours(x, y)
                    //set neighbor distance
                    for(let neighbor of neighbors){
                        neighbor.d = g.chunks[x][y].d + 1
                    }
                    //set current chunk as visited
                    g.chunks[x][y].v = true
                }
            }
        }
    }
}