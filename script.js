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
        }
        else{
            console.log("already occuppied");
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

})();