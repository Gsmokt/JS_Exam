  // class Vector{
  //   constructor(x,y){
  //     this.x =x; // -1 / 1
  //     this.y =y; // -1 / 1
  //   }
  // }
  // class Ball{
  //   constructor(boardX,boardY, vector){
  //     this.boardX  =boardX;
  //     this.boardY = boardY;
  //     this.vector = vector;
  //   }
  //   move(){
  //     this.boardX += this.vector.x;
  //     this.boardY += this.vector.y;
  //     console.log(this.x,this.y)
  //   }
  // }
  // // State: 0-stop, 1 - active, 2 - ended
  // class Game {
  //   constructor(ball, board){
  //     this.ball = ball;
  //     this.board = board;
  //     this.state = 0;
  //     this.startingX = ball.x;
  //     this.startingY = ball.y;
  //   }
  //   start(){
  //     this.state =1;
  //     do{
  //       setInterval(() => {
  //         this.makeMove();
  //       },250); 
  //     } while(!this.isBallOnStartingPosition())
  //     this.state =2;
  //   }
  //   isBallOnStartingPosition(){
  //     if(this.ball.x = this.startingX && this.ball.y === this.startingY) return true;
  //     return false;
  //     // check if ball is back on starting possition; if so return true;
  //   }
  //   makeMove(){
  //     if (this.willColideOnYAxis) this.ball.vector.y *= -1;
  //     if (this.willColideOnXAxis) this.ball.vector.x *= -1;
  //     this.ball.move();
  //   }
  //   willColideOnYAxis(board = this.board){
  //     if(board[this.ball.y += this.vector.y] === 'X') return true;
  //     return false;
  //     // return true if collision in next move on Y axis
  //     // return false otherwise
  //   }
  //   willColideOnXAxis(board = this.board){
  //     if(board[this.ball.y += this.vector.y][this.ball.x += this.vector.x] === 'X') return true;
  //     return false;
  //     // return true if collision in next move on X axis
  //     // return false otherwise
  //   }
  // }
  // function getBall(board){
  //   const ball = new Ball(1,1,new Vector(1,1));
  //   // creates ball object based on passed board
  //   // return null;
  //   return ball;
  // }
  // let game = new Game(getBall(board), board);
  // game.start();