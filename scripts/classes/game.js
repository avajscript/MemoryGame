export class Game {
  currentSQ = 1;
  sq_count;
  squares = [];
  constructor(sq_count) {
    this.sq_count = sq_count;
  }

  generateSquares() {
    // reset squares
    this.squares = [];
    // create a new square each time the level increase and regen all
    for (let i = 0; i < this.sq_count; i++) {
      // set square index to increase every time
      let squareNum = i + 1;
      // set x and y to random positions based on game board size (< 50)
      let squareCoords = {
        x: Math.floor(Math.random() * this.sq_count),
        y: Math.floor(Math.random() * this.sq_count),
      };

      // check that the x and y coords don't match any of the previously created squares
      // keeps looping until this condition is met
      while (
        this.squares.some((square) => {
          return (
            square.coords.x == squareCoords.x &&
            square.coords.x == squareCoords.x
          );
        })
      ) {
        squareCoords = {
          x: Math.floor(Math.random() * this.sq_count),
          y: Math.floor(Math.random() * this.sq_count),
        };
      }
      console.log(squareCoords);
      this.squares.push({
        value: squareNum,
        coords: squareCoords,
        revealed: false,
      });
    }
  }

  printSquares() {
    for (const square of this.squares) {
      console.log(
        `Value: ${square.value}, coords: x(${square.coords.x}), y(${square.coords.y})`
      );
    }
  }

  increaseSquares() {
    this.sq_count++;
  }

  increaseCurrentSquare() {
    this.currentSQ++;
  }

  findSquare(x, y) {
    let square = this.squares.find((sq) => {
      return sq.coords.x == x && sq.coords.y == y;
    });
    return square;
  }

  revealSquare(index) {
    this.squares[index - 1].revealed = true;
  }
}
