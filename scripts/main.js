import { O, S, C } from "./OSC.js";
import { Game } from "./classes/game.js";
import { Notification } from "./classes/Notification.js";
import colors from "./colors.js";

const YELLOW = "rgba(226, 255, 46, 1)",
  green = "rgba(11, 133, 0, 1)";

let OPACITY_INTERVAL,
  count = 0,
  opacity = 1;
const SQ_WIDTH = 50,
  SQ_HEIGHT = 50,
  WIDTH = 500,
  HEIGHT = 500,
  SQ_COUNT = HEIGHT / SQ_WIDTH,
  fade_count = 10,
  FADE_INVERVAL = 300;

// Create new canvas
/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Create new game instance
const game = new Game(1);
game.generateSquares();
const notification = new Notification();

// Game canvas is the shell for the game
const gameCanvas = {
  output: O("output"),
  startGame: function () {},
  draw: function () {
    ctx.strokeStyle = "black";

    for (let i = 0; i < SQ_COUNT; i++) {
      for (let j = 0; j < SQ_COUNT; j++) {
        ctx.strokeRect(j * SQ_WIDTH, i * SQ_HEIGHT, SQ_WIDTH, SQ_HEIGHT);
      }
    }
  },
  startRound: function () {
    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mousePos = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      // get square
      const squareCoords = {
        x: Math.floor(mousePos.x / SQ_WIDTH),
        y: Math.floor(mousePos.y / SQ_HEIGHT),
      };

      const square = game.findSquare(squareCoords.x, squareCoords.y);
      // if square isn't a valid square then notify and return
      if (square == undefined) {
        notification.notify("Click an actual square");
        return;
      }
      // check if square is in correct order
      if (square.value == game.currentSQ) {
        game.revealSquare(square.value);
        game.increaseCurrentSquare();
        this.renderSquaresTwo();
        // if last square was clicked then increase level and return
        if (square.value == game.sq_count - 1) {
          this.increaseLevel();
          return;
          // wrong square clicked
        } else {
        }
      }
    });
  },

  increaseLevel: function () {
    this.turn();
  },

  renderSquares: function () {
    // draw every square inside game squares
    game.squares.forEach((square) => {
      // set color to yellow for backgroung
      ctx.fillStyle = colors.yellow;
      // draw square
      ctx.strokeRect(
        square.coords.x * SQ_WIDTH,
        square.coords.y * SQ_HEIGHT,
        SQ_WIDTH,
        SQ_HEIGHT
      );
      ctx.fillRect(
        square.coords.x * SQ_WIDTH,
        square.coords.y * SQ_HEIGHT,
        SQ_WIDTH,
        SQ_HEIGHT
      );
      // set color to green for text
      ctx.fillStyle = colors.green;
      ctx.fillText(
        square.value,
        square.coords.x * SQ_WIDTH + SQ_WIDTH / 2,
        square.coords.y * SQ_HEIGHT + SQ_HEIGHT / 2,
        SQ_WIDTH
      );
    });
  },
  renderSquaresTwo: function () {
    // draw every square inside game squares
    game.squares.forEach((square) => {
      // set color to yellow for backgroung
      ctx.fillStyle = colors.yellow;
      // draw square
      ctx.strokeRect(
        square.coords.x * SQ_WIDTH,
        square.coords.y * SQ_HEIGHT,
        SQ_WIDTH,
        SQ_HEIGHT
      );
      ctx.fillRect(
        square.coords.x * SQ_WIDTH,
        square.coords.y * SQ_HEIGHT,
        SQ_WIDTH,
        SQ_HEIGHT
      );

      // only run if square has been clicked by player
      if (square.revealed) {
        // set color to green for text
        ctx.fillStyle = colors.green;
        ctx.fillText(
          square.value,
          square.coords.x * SQ_WIDTH + SQ_WIDTH / 2,
          square.coords.y * SQ_HEIGHT + SQ_HEIGHT / 2,
          SQ_WIDTH
        );
      }
    });
  },

  turn() {
    this.draw();
    this.renderSquares();

    // create button that has event listener to start round
    const startBtn = document.createElement("button");
    startBtn.classList.add("button");
    startBtn.innerHTML = `<h3>Start level ${game.sq_count}</h3>`;
    startBtn.classList.add("button");
    startBtn.classList.add("mar-bottom-16");

    // on click fade in animation, increase square count for next round and
    // set the current square to 1
    startBtn.addEventListener("click", () => {
      this.hideSquares();
      setTimeout(FADE_INVERVAL * 10, this.startRound);

      game.generateSquares();
      game.increaseSquares();
      game.currentSQ = 1;
      this.startRound();
      this.output.removeChild(startBtn);
    });
    this.output.appendChild(startBtn);
  },

  // draws all the squares 10 times to do a fade animation
  hideSquaresFunction: function () {
    count++;
    opacity -= 0.1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";

    for (let i = 0; i < SQ_COUNT; i++) {
      for (let j = 0; j < SQ_COUNT; j++) {
        ctx.strokeRect(j * SQ_WIDTH, i * SQ_HEIGHT, SQ_WIDTH, SQ_HEIGHT);
      }
    }

    game.squares.forEach((square) => {
      // set color to yellow for backgroung
      ctx.fillStyle = `rgba(226, 255, 46, 1)`;
      // draw square
      ctx.strokeRect(
        square.coords.x * SQ_WIDTH,
        square.coords.y * SQ_HEIGHT,
        SQ_WIDTH,
        SQ_HEIGHT
      );
      ctx.fillRect(
        square.coords.x * SQ_WIDTH,
        square.coords.y * SQ_HEIGHT,
        SQ_WIDTH,
        SQ_HEIGHT
      );
      // set color to green for text
      ctx.fillStyle = `rgba(11, 133, 0, ${opacity})`;
      ctx.fillText(
        square.value,
        square.coords.x * SQ_WIDTH + SQ_WIDTH / 2,
        square.coords.y * SQ_HEIGHT + SQ_HEIGHT / 2,
        SQ_WIDTH
      );
    });

    // cancel this function after 10 counts
    if (count == 10) {
      clearInterval(OPACITY_INTERVAL);
      count = 0;
      opacity = 1;
    }
  },

  hideSquares: function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.draw();
    OPACITY_INTERVAL = setInterval(this.hideSquaresFunction, FADE_INVERVAL);
  },

  gameLoop: function () {
    this.draw();
    requestAnimationFrame(this.gameLoop);
  },
  setCanvas: function () {
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
  },
};

const gameLoop = () => {
  gameCanvas.setCanvas();
  gameCanvas.draw();
  gameCanvas.turn();
};

gameLoop();
