class MinesweeperView {
  constructor(model) {
    this.model = model;
  }

  createBoard() {
    const board = document.getElementById('board');
    board.innerHTML = '';
    for (let r = 0; r < this.model.rows; r++) {
      for (let c = 0; c < this.model.columns; c++) {
        let tile = document.createElement('div');
        tile.id = r.toString() + '-' + c.toString();
        tile.classList.add('tile');
        board.appendChild(tile);
      }
    }
  }

  updateMinesCount() {
    document.getElementById('mines-count').innerText = this.model.minesCount;
  }

  setFlag(tile, flag) {
    tile.innerText = flag ? '🚩' : '';
  }

  revealMines() {
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

  resetBoard() {
    this.createBoard();
    this.updateMinesCount();
  }
}
