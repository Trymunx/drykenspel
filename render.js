const gameCanvas = document.getElementById("game");
const ctx = gameCanvas.getContext("2d");
let paused = false;

window.addEventListener("resize", resize);

function resize() {
  gameCanvas.width = window.innerWidth;
  gameCanvas.height = window.innerHeight;
  draw();
}

resize();

function draw() {
  console.log("Drawing the game");
}

module.exports = {
  init
}

function init(eventBus) {
  eventBus.on("startGame", drawGameWindow);
}

function drawGameWindow() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  while (!paused) {
    draw();
  }
}