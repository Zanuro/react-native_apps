function range(max) {

    const arr = [];

    for (let i=0; i<max;i++){
        arr[i] = i;
    }

    return arr;
}


export function createPuzzle(size) {

    const board = range(size**2);
    
    const puzzle = {
        size,
        board,
        empty: Math.floor(Math.random() * (size**2 -1)),
    };

    return shuffleBoard(puzzle);
};

function shuffleBoard(puzzle) {

    let prev = null;

    for (let i=0; i < 999; i++){
        const moves = movableSquares(puzzle).filter(square => square !== prev);
        const square = moves[Math.floor(Math.random() * (moves.length -1))];

        puzzle = move(puzzle, square);
        prev = square;
    }

    return puzzle;
}

export function movableSquares(puzzle) {
    const { size, board, empty } = puzzle;

    const emptyIx = getIndex(puzzle, empty);

    const adjacent = [ emptyIx - size, emptyIx + size, emptyIx % size !== 0 ? emptyIx - 1 : null, emptyIx % size !== size - 1 ? emptyIx + 1 : null ]
    .filter(ix => ix !== null && ix >= 0 && ix < size**2)
    .map(ix => board[ix]);

    return adjacent;
}

export function availableMove(puzzle, square) {
    const { size, empty } = puzzle;

    const squareIx = getIndex(puzzle, square);
    const emptyIx = getIndex(puzzle, empty);

    const canMove = movableSquares(puzzle).includes(square);

    if (canMove && squareIx - size === emptyIx) return 'up';
    if (canMove && squareIx + size === emptyIx) return 'down';
    if (canMove && squareIx - 1 === emptyIx) return 'left';
    if (canMove && squareIx + 1 === emptyIx) return 'right';

    return 'none';
}


export function getIndex(puzzle, square){
    const { board } = puzzle;
    return board.indexOf(square);
}

export function move(puzzle, square) {

    const { board, empty } = puzzle;

    const squareIx = getIndex(puzzle, square);
    const emptyIx = getIndex(puzzle, empty);

    const copy = board.slice();

    copy[emptyIx] = board[squareIx];
    copy[squareIx] = board[emptyIx];

    return {
        ...puzzle,
        board: copy,
    }
}

export function isSolved(puzzle){
    const { board } = puzzle;

    return board.every((square, ix) => square === ix);
}

export function print(puzzle){

    const { size, board } = puzzle;

    for(let i=0; i< size; i++){
        console.log(board.slice(i*size, (i+1)*size).join(', '));
    }
}


