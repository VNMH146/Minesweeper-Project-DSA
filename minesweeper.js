var board = [];
var rows = 8;
var columns = 8;

var minesCount = 5;
var minesLocation = [];

var tilesClicked  = 0;
var flagEnabled = false;

var gameOver = false;

window.onload = function() {
    startGame();
}

function startGame() {
    document.getElementById("mines-count").innerText = minesCount;

    for(let r = 0; r < rows; r++) {
        let rows = [];
        for(let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
}