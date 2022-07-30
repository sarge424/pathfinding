class Solver{
    constructor(mode='djikstra'){
        this.mode = mode
    }

    //g is the grid object
    step(g){
        //find all unvisited chunks with known distances (initially just the start)
        //get all their neighbors, and set their distance to be current + 1 if its less
        for(let x = 0; x < g.w; x++){
            for(let y = 0; y < g.h; y++){
                //if a chunks distance is known but it was not visited
                if(g.chunks[x][y].status != 'wall' && g.chunks[x][y].status != 'found' && g.chunks[x][y].d != Infinity && !g.chunks[x][y].v){
                    console.log('getting neighbours of', x, y, g.chunks[x][y].status, g.chunks[x][y].d, g.chunks[x][y].v)
                    //get all the neighbors
                    let neighbors = g.getNeighbours(x, y)
                    //set neighbor distance
                    for(let neighbor of neighbors){
                        //custom status to ensure its not repeated in the same step
                        if(neighbor.d === Infinity)
                            neighbor.status = 'found'
                        neighbor.d = Math.min(g.chunks[x][y].d + 1, neighbor.d)
                    }
                    //set current chunk as visited 
                    g.chunks[x][y].v = true
                    console.log('completed', x, y, g.chunks[x][y].status, g.chunks[x][y].d, g.chunks[x][y].v)
                }
            }
        }

        //remove the found status from the elements
        for(let x = 0; x < g.w; x++){
            for(let y = 0; y < g.h; y++){
                //revert found chunks to default
                if(g.chunks[x][y].status === 'found')
                    g.chunks[x][y].status = 'default'
            }
        }
    }
}