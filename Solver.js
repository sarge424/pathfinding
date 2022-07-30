class Solver{
    constructor(mode='djikstra'){
        this.mode = mode
    }

    //g is the grid object
    step(g){
        //find all chunks with known distances (initially just the start)
        //get all their unvisited neighbors, and set their distance to be current + 1
        for(let col of g.chunks){
            for(let currentChunk of col.filter(ch => ch.d < Infinity && !ch.v)){
                currentChunk.d = 42
            }
        }
    }
}