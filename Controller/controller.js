class MinesweeperController {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.flagEnabled = false;
    this.initialize();
  }

  initialize() {
    this.view.createBoard();
    this.model.setMines();
    this.addEventListeners();
    this.view.updateMinesCount();
  }

  addEventListeners() {
    document.getElementById('board').addEventListener('click', (e) => this.onTileClick(e));
    document.getElementById('play-again-btn').addEventListener('click', () => this.resetGame());
    document.getElementById('flag-btn').addEventListener('click', () => this.toggleFlag());
    document.getElementById('undo-btn').addEventListener('click', () => this.undo());
    document.getElementById('quantity').addEventListener('input', () => this.changeMines());
  }

  onTileClick(e) {
    if (this.model.gameOver || e.target.classList.contains('tile-clicked')) {
      return;
    }

    let tile = e.target;
    if (!tile.id) return;
    let coords = tile.id.split('-');
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (this.flagEnabled) {
      this.view.setFlag(tile, tile.innerText === '');
      return;
    }


    if (this.model.checkTile(r, c)) {
      this.model.gameOver = true;
      this.model.undoLocation = coords;
      this.view.revealMines();
      return;
    }

    if (r < 0 || r >= this.model.rows || c < 0 || c >= this.model.columns) {
      return;
    }

    let modelTile = this.model.board[r][c];
    if (modelTile.classList.contains("tile-clicked")) {
      return;
    }

    modelTile.classList.add("tile-clicked");
    this.model.tilesClicked += 1;

    // if (board[r][c].classList.contains("tile-clicked")) {
    //   return;
    // }

    // board[r][c].classList.add("tile-clicked");
    // tilesClicked += 1;

    let minesFound = 0;

    minesFound += this.model.checkTile(r - 1, c - 1); //top left
    minesFound += this.model.checkTile(r - 1, c); //top
    minesFound += this.model.checkTile(r - 1, c + 1); //top right

    //left and right
    minesFound += this.model.checkTile(r, c - 1); //left
    minesFound += this.model.checkTile(r, c + 1); //right

    //bottom
    minesFound += this.model.checkTile(r + 1, c - 1); //bottom left
    minesFound += this.model.checkTile(r + 1, c); //bottom
    minesFound += this.model.checkTile(r + 1, c + 1); //bottom right

    if (minesFound > 0) {
      // board[r][c].innerText = minesFound;
      // board[r][c].classList.add("x" + minesFound.toString());

      tile.innerText = minesFound;
      tile.classList.add("x" + minesFound.toString());
    } else {
      this.model.checkMine(r - 1, c - 1);
      this.model.checkMine(r - 1, c);
      this.model.checkMine(r - 1, c + 1);

      this.model.checkMine(r, c - 1);
      this.model.checkMine(r, c + 1);

      this.model.checkMine(r + 1, c - 1);
      this.model.checkMine(r + 1, c);
      this.model.checkMine(r + 1, c + 1);
    }

    // if (tilesClicked == rows * columns - minesCount) {
    //   document.getElementById("mines-count").innerText = "cleared";
    //   gameOver = true;
    // }
    if (this.model.tilesClicked == this.model.rows * this.model.columns - this.model.minesCount) {
      document.getElementById("mines-count").innerText = "Cleared";
      this.model.gameOver = true;
    }
  }

  resetGame() {
    this.model.resetGame();
    this.view.resetBoard();
  }

  toggleFlag() {
    this.flagEnabled = !this.flagEnabled;
    document.getElementById('flag-btn').style.backgroundColor = this.flagEnabled ? 'white' : 'red';
  }

  undo() {
    gameOver = false;
    let ur = parseInt(undoLocation[0]);
    let uc = parseInt(undoLocation[1]);
    board[ur][uc].innerText = "";
    board[ur][uc].style.backgroundColor = "unset";
  }

  changeMines() {
    let quantity = parseInt(document.getElementById('quantity').value);
    if (quantity > 0) {
      this.model.minesCount = quantity;
      this.resetGame();
    }
  }
}
