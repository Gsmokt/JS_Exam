const board = [
  ["X", "X", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "1", "0", "0", "0", "0", "X"],
  ["X", "X", "X", "X", "X", "X", "X"],
];

const root = document.querySelector(".root");
const btn = document.querySelector(".start");
const btn2 = document.querySelector(".restart");

for (let i = 1; i < 9; i++) {
  for (let j = 1; j < 6; j++) {
    const block = document.createElement("div");
    block.dataset.x = j;
    block.dataset.y = i;
    root.appendChild(block);
  }
}

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class Ball {
  constructor(x, y, vector) {
    this.x = x;
    this.y = y;
    this.vector = vector;
    this.ballClass = document.querySelector(
      `[data-x="${this.x}"][data-y="${this.y}"]`
    );
    console.log(this.x, this.y);
    this.ballClass.classList.add("ball");
  }

  move() {
    this.ballClass.classList.remove("ball");
    this.x += this.vector.x;
    this.y += this.vector.y;
    this.classChange();
  }

  classChange() {
    this.ballClass = document.querySelector(
      `[data-x="${this.x}"][data-y="${this.y}"]`
    );
    this.ballClass.classList.add("ball");
  }
}

class Game {
  constructor(ball, board) {
    this.ball = ball;
    this.board = board;
    this.status = 0;
  }

  start() {
    let interval;
    interval = setInterval(() => {
      console.log(this.ball.y, this.ball.x);
      if (!this.status) {
        this.makeMove();
      }
      if (this.status === 1) {
        clearInterval(interval);
        console.log("Jesteś znowu na swoim miejscu!");
        this.status = 0;
        return;
      }
      this.isBallOnStartingPosition();
    }, 50);
  }

  isBallOnStartingPosition() {
    if (board[this.ball.y][this.ball.x] === "1") {
      this.status = 1;
      return false;
    }
    return true;
  }

  makeMove() {
    if (this.willColideOnYAxis()) this.ball.vector.y *= -1;
    if (this.willColideOnXAxis()) this.ball.vector.x *= -1;
    this.ball.move();
  }

  willColideOnYAxis(board = this.board) {
    if (board[this.ball.y + this.ball.vector.y].every((e) => e === "X"))
      return true;
    return false;
  }

  willColideOnXAxis(board = this.board) {
    if (
      board[this.ball.y + this.ball.vector.y][
        this.ball.x + this.ball.vector.x
      ] === "X"
    )
      return true;
    return false;
  }
}

function getBall(board) {
  let possitionX, possitionY, vectorX, vectorY;
  for (const [key, value] of Object.entries(board)) {
    const index = value.findIndex((e) => e === "1");
    if (index !== -1) {
      possitionX = index;
      possitionY = parseInt(key);
    }
  }
  vectorY = possitionY === 8 ? -1 : 1;
  vectorX = possitionX === 5 ? -1 : 1;
  const vector = new Vector(vectorX, vectorY);
  const ball = new Ball(possitionX, possitionY, vector);
  return ball;
}

const game = new Game(getBall(board), board);

btn.addEventListener("click", () => game.start());
btn2.addEventListener("click", () => window.location.reload());
