class MinesweeperModel {
  constructor(rows, columns, minesCount) {
    this.rows = rows;
    this.columns = columns;
    this.minesCount = minesCount;
    this.minesLocation = [];
    this.tilesClicked = 0;
    this.gameOver = false;
    this.undoLocation = [];
  }

  setMines() {
    this.minesLocation = [];
    let minesLeft = this.minesCount;
    while (minesLeft > 0) {
      let r = Math.floor(Math.random() * this.rows);
      let c = Math.floor(Math.random() * this.columns);
      let id = r.toString() + "-" + c.toString();
      if (!this.minesLocation.includes(id)) {
        this.minesLocation.push(id);
        minesLeft--;
      }
    }
  }

  checkTile(r, c) {
    if (r < 0 || r >= this.rows || c < 0 || c >= this.columns) return 0;
    return this.minesLocation.includes(r.toString() + "-" + c.toString()) ? 1 : 0;
  }

  resetGame() {
    this.tilesClicked = 0;
    this.gameOver = false;
    this.undoLocation = [];
    this.setMines();
  }
}
