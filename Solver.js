class Solver{
    constructor(mode='djikstra'){
        this.mode = mode
    }

    //g is the grid object
    step(g){
        //remains false if no more chunks are found (the end is unreachable)
        let chunksFound = false

        //set to true if the end is found
        let endFound = false

        //find all unvisited chunks with known distances (initially just the start)
        //get all their neighbors, and set their distance to be current + 1 if its less
        for(let x = 0; x < g.w; x++){
            for(let y = 0; y < g.h; y++){
                //set current chunk
                let currChunk = g.chunks[x][y]

                //if a chunks distance is known but it was not visited
                if(currChunk.status != 'wall' && currChunk.status != 'found' && currChunk.d != Infinity && !currChunk.v){
                    //we did find chunks (the end may be reachabe)
                    chunksFound = true
                    
                    console.log('getting neighbours of', x, y, currChunk.status, currChunk.d, currChunk.v)
                    //get all the neighbors
                    let neighbors = g.getNeighbours(x, y)
                    //set neighbor distance
                    for(let neighbor of neighbors){
                        //custom status to ensure its not repeated in the same step
                        if(neighbor.d === Infinity){
                            if(neighbor.status === 'end')
                                endFound = true
                            else
                                neighbor.status = 'found'
                        }
                        neighbor.d = Math.min(currChunk.d + 1, neighbor.d)
                    }
                    //set current chunk as visited 
                    currChunk.v = true
                    console.log('completed', x, y, currChunk.status, currChunk.d, currChunk.v)
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

        //returns
        if(endFound) //completed
            return 1

        if(!chunksFound) //no more chunks to search: the end is unreachable
            return -1

        return 0 //search incomplete
    }
}