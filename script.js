const Gameboard = (() => {
    var gameboard = ["","","",
        "","","",
        "","",""
    ];

    function getBoard(){
        return gameboard;
    }
    function placeMark(position, mark) {
        if(!gameboard[position]){
        gameboard[position] = mark;
        return true;
        }
        else{
            console.log("already occuppied");
            return false;
        }
    }
    return {getBoard, placeMark}
})();
function createPlayer(name, marker){
    return {
        name,
        marker
    }
}
const gameController = (() => {
const player1 = createPlayer("Arnav", "X");
const player2 = createPlayer("Bob", "O");

let currentPlayer = player1;

function switchTurn() {
    if(currentPlayer === player1) {
        currentPlayer = player2;
    }
    else {
        currentPlayer = player1;
    }
    return currentPlayer;
}
function checkWinner() {
    let winCombn = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    var board = Gameboard.getBoard();
    for(let i =0; i < winCombn.length; i++){
        const [a,b,c] = winCombn[i];
    if(board[a] === board[b] && board[b] === board[c] && board[a] !== ""){
        return currentPlayer;
    }

    }
        return null;

}
function checktie()
{
    if(!Gameboard.getBoard().includes("")){
        return "tie";
    }
    return null;
}
function makeMove(position){
    const moveSuccess = Gameboard.placeMark(
        position,
        currentPlayer.marker
    )
    

if (!moveSuccess) {
    return null;
}
else{
    var winner = checkWinner();
}
if(winner){
    return winner;
}

const tie = checktie();
if(tie){
return tie;
}
else{
    switchTurn();
}
function getCurrentPlayer() {
    return currentPlayer;
}
return {
    makeMove,
    currentPlayer
};