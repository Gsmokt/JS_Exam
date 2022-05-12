const board = [
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"], // Jesli Y ma odbijać w przeciwnym kierunku, to wystarczy ustawić
  ["X", "1", "0", "X", "X", "X", "X", "X", "X", "X", "X", "X"], // wektory, tak jak przy skosie
  ["X", "0", "0", "0", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "0", "X", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "X", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "0", "X", "X", "X", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "X", "0", "0", "0", "0", "Y", "0", "X"],
  ["X", "0", "0", "X", "X", "X", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "X", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "Y", "0", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
];

const root = document.querySelector(".root");
const btn = document.querySelector(".start");
const btn2 = document.querySelector(".restart");

for (let i = 1; i < 15; i++) {
  for (let j = 1; j < 11; j++) {
    const block = document.createElement("div");
    block.dataset.x = j;
    block.dataset.y = i;
    root.appendChild(block);
  }
}

class Square {
  constructor(positions) {
    this.positions = positions;
    this.positions.map((e) => {
      const square = document.querySelector(
        `[data-x="${e.x}"][data-y="${e.y}"]`
      );
      square.textContent = "X";
    });
  }
  move(x, y, board, ball) {
    const random = () => {
      const x = Math.floor(Math.random() * 10) + 1;
      const y = Math.floor(Math.random() * 14) + 1;
      this.positions.map((e) => {
        if (e.x === x && e.y === y && board[x][y] === "X") random();
      });
      board[y][x] = "Y";
      this.positions.push({ x: x, y: y });
      this.positions.map((e) => {
        const square = document.querySelector(
          `[data-x="${e.x}"][data-y="${e.y}"]`
        );
        square.textContent = "X";
      });
    };
    const index = this.positions.some((e) => e.x === x && e.y === y);
    if (!index) {
      return;
    } else {
      const Y = ball.vector.y;
      const X = ball.vector.x;
      const ballSquareCollision = () => {
        if(ball.vector.y !== Y || ball.vector.x !== X) return; 
        const randY = Math.floor(Math.random() * (2 -1 +1) +1);
        const randX = Math.floor(Math.random() * (2 -1 +1) +1);
        ball.vector.y *= (randY === 2 ? -1 : 1);   
        ball.vector.x *= (randX === 2 ? -1 : 1); 
        return ballSquareCollision();
      }
      ballSquareCollision();
      board[y][x] = "0";
      const square = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      square.textContent = "";
      const filter = this.positions.filter((e) => e.x !== x && e.y !== y);
      this.positions = filter;
      random();
    }
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
    this.ballClass.classList.add("ball");
  }
  move(square, board, ball) {
    this.ballClass.classList.remove("ball");
    square.move(this.x, this.y, board, ball);
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
  constructor(ball, board, square) {
    this.ball = ball;
    this.board = board;
    this.status = 0;
    this.square = square;
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
    console.log(this.ball.vector.x, this.ball.vector.y);
    if(this.board[this.ball.y][this.ball.x] === 'Y'){
        this.square.move(this.ball.x, this.ball.y,this.board, this.ball);
      }
    if (this.willColideOnBothAxis()) {
      this.ball.vector.y *= -1;
      this.ball.vector.x *= -1;
    }
    if (this.willColideOnYAxis()) this.ball.vector.y *= -1;
    if (this.willColideOnXAxis()) this.ball.vector.x *= -1;
    this.ball.move(this.square, this.board, this.ball);
  }
  willColideOnBothAxis() {
    if (
      this.board[this.ball.y + this.ball.vector.y][                          // nie mam pojecia, jak ustawić rogi :(
        this.ball.x + this.ball.vector.x
      ] === "X" &&
      this.board[this.ball.y + this.ball.vector.y][
        this.ball.x - this.ball.vector.x
      ] === "X" &&
      this.board[this.ball.y + this.ball.vector.y][this.ball.x] === "X" &&
      this.board[this.ball.y][this.ball.x + this.ball.vector.x] === "X" &&
      this.board[this.ball.y + this.ball.vector.y][
        this.ball.x + this.ball.vector.x
      ] === "X"
    ) {
      return true;
    } else {
      return false;
    }
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
  vectorY = possitionY > 7 ? -1 : 1;
  vectorX = possitionX > 5 ? -1 : 1;
  const vector = new Vector(vectorX, vectorY);
  const ball = new Ball(possitionX, possitionY, vector);
  return ball;
}
function getSqure(board) {
  let possitionX, possitionY;
  const array = [];
  for (const [key, value] of Object.entries(board)) {
    const index = value.findIndex((e) => e === "Y");
    if (index !== -1) {
      possitionX = index;
      possitionY = parseInt(key);
      array.push({ x: possitionX, y: possitionY });
    }
  }
  const square = new Square(array, board);
  return square;
}
let game = new Game(getBall(board), board, getSqure(board));

btn.addEventListener("click", () => game.start());
btn2.addEventListener("click", () => window.location.reload());
