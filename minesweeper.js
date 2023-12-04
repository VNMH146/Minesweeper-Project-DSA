var board = [];
var rows = 8;
var columns = 8;

var minesCount = 5;
var minesLocation = [];

var tilesClicked = 0;
var flagEnabled = false;

var gameOver = false;

var undoLocation = [];
var explosionSound = new Audio('621000__samsterbirdies__cannon-explosion-sound.wav');

window.onload = function () {
  startGame();
  document
    .getElementById("play-again-btn")
    .addEventListener("click", resetGame);
};

function setMines() {
  // minesLocation.push("2-2");
  // minesLocation.push("2-3");
  // minesLocation.push("5-6");
  // minesLocation.push("3-4");
  // minesLocation.push("1-1");

  let minesLeft = minesCount;
  while (minesLeft > 0) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    let id = r.toString() + "-" + c.toString();

    if (!minesLocation.includes(id)) {
      minesLocation.push(id);
      minesLeft -= 1;
    }
  }
}

function startGame() {
  document.getElementById("mines-count").innerText = minesCount;
  document.getElementById("flag-btn").addEventListener("click", setFlag);
  document.getElementById("undo-btn").onclick = undo;
  setMines();
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
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

function resetGame() {
  // Clear the board
  document.getElementById("board").innerHTML = "";

  // Reset game variables
  board = [];
  minesLocation = [];
  tilesClicked = 0;
  flagEnabled = false;
  gameOver = false;

  // Start a new game
  startGame();
}

// Add event listener to the "Play Again" button

function setFlag() {
  if (flagEnabled) {
    flagEnabled = false;
    document.getElementById("flag-btn").style.backgroundColor = "white";
  } else {
    flagEnabled = true;
    document.getElementById("flag-btn").style.backgroundColor = "lightgray";
  }
}

function clickTile() {
  if (gameOver || this.classList.contains("tile-clicked")) {
    return;
  }

  let tile = this;
  if (flagEnabled) {
    if (tile.innerText == "") {
      tile.innerText = "🚩";
    } else if (tile.innerText == "🚩") {
      tile.innerText = "";
    }
    return;
  }

  let coords = tile.id.split("-");
  if (minesLocation.includes(tile.id)) {
    //alert("GAME OVER!!!");
    gameOver = true;
    undoLocation = coords;
    revealMines();
    return;
  }

  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);
  checkMine(r, c);
}
function undo() {
  gameOver = false;
  let ur = parseInt(undoLocation[0]);
  let uc = parseInt(undoLocation[1]);
  board[ur][uc].innerText = "";
  board[ur][uc].style.backgroundColor = "unset";
}

var explosionSound = new Audio('621000__samsterbirdies__cannon-explosion-sound.wav');

function playExplosionSound() {
    explosionSound.play();
}

function revealMines() {
  let ur = parseInt(undoLocation[0]);
  let uc = parseInt(undoLocation[1]);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (r == ur && c == uc) {
        console.log("a");
        let tile = board[r][c];
        // if (minesLocation.includes(tile.id)) {
        tile.innerText = "💥";
        tile.style.backgroundColor = "#f1a10e";
        explosionSound.play();
      }
    }
  }
}



function checkMine(r, c) {
  if (r < 0 || r >= rows || c < 0 || c >= columns) {
    return;
  }
  if (board[r][c].classList.contains("tile-clicked")) {
    return;
  }

  board[r][c].classList.add("tile-clicked");
  tilesClicked += 1;

  let minesFound = 0;

  minesFound += checkTile(r - 1, c - 1); //top left
  minesFound += checkTile(r - 1, c); //top
  minesFound += checkTile(r - 1, c + 1); //top right

  //left and right
  minesFound += checkTile(r, c - 1); //left
  minesFound += checkTile(r, c + 1); //right

  //bottom
  minesFound += checkTile(r + 1, c - 1); //bottom left
  minesFound += checkTile(r + 1, c); //bottom
  minesFound += checkTile(r + 1, c + 1); //bottom right

  if (minesFound > 0) {
    board[r][c].innerText = minesFound;
    board[r][c].classList.add("x" + minesFound.toString());
  } else {
    checkMine(r - 1, c - 1);
    checkMine(r - 1, c);
    checkMine(r - 1, c + 1);

    checkMine(r, c - 1);
    checkMine(r, c + 1);

    checkMine(r + 1, c - 1);
    checkMine(r + 1, c);
    checkMine(r + 1, c + 1);
  }

  if (tilesClicked == rows * columns - minesCount) {
    document.getElementById("mines-count").innerText = "cleared";
    gameOver = true;
  }
}

function checkTile(r, c) {
  if (r < 0 || r > rows || c < 0 || c >= columns) {
    return 0;
  }
  if (minesLocation.includes(r.toString() + "-" + c.toString())) {
    return 1;
  }
  return 0;
}

//--------------------
