const board = [
  ["X", "X", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "1", "X"],
  ["X", "X", "X", "X", "X", "X", "X"],
];

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
    this.canvas = document.querySelector("#bouncyBall");
    this.ctx = this.canvas.getContext("2d");
    this.ballX = this.x *50;
    this.ballY = this.y * 50;
    this.vx = 50;
    this.vy = 50;
    this.r = 50;
  }
  move() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.arc(this.ballX, this.ballY, this.r, 0, 2 * Math.PI);
    this.ballX += this.vx * this.vector.x;
    this.ballY += this.vy * this.vector.y;
    this.ctx.fillStyle = "orange";
    this.ctx.fill();
    this.ctx.stroke();
    this.x += this.vector.x;
    this.y += this.vector.y;

    console.log(this.x, this.y);
  }
}

class Game {
  constructor(ball, board) {
    this.ball = ball;
    this.board = board;
    this.state = 0;
    this.startingX = this.ball.x;
    this.startingY = this.ball.y;
    this.status = 0;
  }
  start() {
    let interval;
    interval = setInterval(() => {
      this.makeMove();
      if (this.status === 1) {
        clearInterval(interval);
        console.log("Jesteś znowu na swoim miejscu!");
      }
      this.isBallOnStartingPosition();
    }, 100);
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
  vectorY = possitionY !== 1 ? -1 : 1;
  vectorX = possitionX !== 1 ? -1 : 1;
  const vector = new Vector(vectorX, vectorY);
  const ball = new Ball(possitionX, possitionY, vector);
  return ball;
}
let game = new Game(getBall(board), board);
game.start();
