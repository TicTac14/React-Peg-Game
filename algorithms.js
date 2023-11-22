const board = [
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 1],
];

const test_board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0, 1],
];

function getOnes(board){
    var result = 0;
    board.forEach(row => {
        row.forEach(col => {
            if (col === 1) result++;
        })
    })
    return result;
};

function removePeg(num){
    let count = 0;
    for (let r = 0; r < board.length; r++){
        for (let c = 0; c < board[0].length; c++){
            if (board[r][c] === 1) count++;
            if (num === count) board[r][c] = 0;
            return;
        }
    }
}

function getPossibleMoves(board){
     // [{from:{row:1, col:2}, to:{row:5, col:5}}]
    const possibleMoves = [];
    for (let row = 0; row < board.length; row++){
        for (let col = 0; col < board[0].length; col++){
            // check if possible move exists
            if (board[row][col] === 1){
                if (row <= 2){ //check down-right left diagonals
                    if (board[row+2][col+2]===0 &&
                        board[row+1][col+1]===1){
                            possibleMoves.push({from:{r:row, c:col}, to:{r:row+2, c:col+2}, remove:{r:row+1, c:col+1}});
                    }
                    if (board[row+2][col-2]===0 &&
                        board[row+1][col-1]===1){
                            possibleMoves.push({from:{r:row, c:col}, to:{r:row+2, c:col-2}, remove:{r:row+1, c:col-1}});
                    }
                }if (row >= 2 && col <= 4 && !(row===2&&col===4)){ //check right up diag
                    if (board[row-2][col+2]===0&&
                        board[row-1][col+1]===1){
                            possibleMoves.push({from:{r:row, c:col}, to:{r:row-2, c:col+2}, remove:{r:row-1, c:col+1}});
                        }
                }if (row >= 2 && col >= 4 && !(row===2&&col===4)){ //check left up diag
                    if (board[row-2][col-2]===0&&
                        board[row-1][col-1]===1){
                            possibleMoves.push({from:{r:row, c:col}, to:{r:row-2, c:col-2}, remove:{r:row-1, c:col-1}});
                        }
                }if (row >= 2 && col <= 4 && !(row===2&&col===4)){ // check right straight
                    if (board[row][col+4]===0&&
                        board[row][col+2]===1){
                            possibleMoves.push({from:{r:row, c:col}, to:{r:row, c:col+4}, remove:{r:row, c:col+2}});
                        }
                }if (row >= 2 && col >= 4 && !(row===2&&col===4)){ // check left straight
                    if (board[row][col-4]===0&&
                        board[row][col-2]===1){
                            possibleMoves.push({from:{r:row, c:col}, to:{r:row, c:col-4}, remove:{r:row, c:col-2}});
                        }
                }
            }
            
        }
    }
    return possibleMoves.length>0? possibleMoves:null;
}

async function solvePuzzle(board, moveList=[]){
    const possible_moves = getPossibleMoves(board);

    if (possible_moves === null){
        const remaining_pieces = getOnes(board);
        return {remaining:remaining_pieces, moves:moveList};
    }
    var res = null;
    for (let move of possible_moves){
        // play the move on the board
        board[move.remove.r][move.remove.c] = 0;
        board[move.from.r][move.from.c] = 0;
        board[move.to.r][move.to.c] = 1;

        //recursive step
        const copy_moveList =  [...moveList, move];

        const result = await solvePuzzle(board, copy_moveList);
        if (res !== null){
            if (result.remaining < res.remaining) res = result;
        }else{
            res = result;
        }
        //remove move played move
        board[move.remove.r][move.remove.c] = 1;
        board[move.from.r][move.from.c] = 1;
        board[move.to.r][move.to.c] = 0;
    }

    return res;
}

function test(board){

    for (let row = 0; row < board.length; row++){
        for (let col = 0; col < board[0].length; col++){
            if (board[row][col] === 1){
                const copy_board = board.slice();
                copy_board[row][col] = 0;
                const solvedPuzzleResult = solvePuzzle(copy_board);
                console.log(`r:${row} c:${col} -> ${solvedPuzzleResult.remaining}`);
            }

        }
    }
}

document.onclick = async () => {
    let res = await solvePuzzle(board);
    console.log(res);
};





