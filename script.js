const Gameboard = (() => {
    var gameboard = ["","","",
        "","","",
        "","",""
    ];
    function resetBoard() {
    gameboard = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];
}

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
    return {getBoard, placeMark,resetBoard}
})();
function createPlayer(name, marker){
    return {
        name,
        marker
    }
}
const gameController = (() => {

let player1;
let player2;
let currentPlayer;
let gameStarted = false;
function startGame(name1, name2) {
    player1 = createPlayer(name1, "X");
    player2 = createPlayer(name2, "O");

    currentPlayer = player1;
    gameStarted = true;
}
function restartGame() {
    if (!gameStarted) {
        return;
    }

    Gameboard.resetBoard();
    currentPlayer = player1;
}


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
    console.log(board);
    for(let i =0; i < winCombn.length; i++){
        const [a,b,c] = winCombn[i];
        console.log(a,b,c);
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
function getCurrentPlayer() {
    return currentPlayer;
}
function makeMove(position){
    if (!gameStarted) {
    return null;
}
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


}
return {
    makeMove,
    getCurrentPlayer,
    startGame,
    restartGame
};
})();

const displayController = (() => {
    const startBtn = document.getElementById("startBtn");
    startBtn.addEventListener("click", function() {
    const name1 = document.getElementById("player1").value;
    const name2 = document.getElementById("player2").value;

    gameController.startGame(name1, name2);
});
const cells = document.querySelectorAll(".cell");
function render(){
               const board = Gameboard.getBoard();

    for(let i =0; i < cells.length; i++){
        cells[i].textContent = board[i];
    }
}

function setListener(){
         for(let i =0; i < cells.length; i++){
    cells[i].addEventListener("click",function(){
         
       const index = cells[i].dataset.index;
          const  result = gameController.makeMove(index);
          render();
          console.log("clicked");
           const r = document.getElementById("result");
        if(!result){
             
        }
    else if(result === "tie"){
       r.textContent = "It's a tie!";
    } 
    else {
       
        r.textContent = result.name;
    }       
        })
    }
}
return {
    setListener,
    render
}
    
})();
displayController.render();
displayController.setListener();

const restartBtn = document.getElementById("restartBtn");

restartBtn.addEventListener("click", function() {
gameController.restartGame();
document.getElementById("result").textContent = "";
displayController.render();
});
