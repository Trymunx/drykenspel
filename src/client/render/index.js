const gameCanvas = document.getElementById("game");
const ctx = gameCanvas.getContext("2d");

window.addEventListener("resize", resize);

function resize() {
  gameCanvas.width = window.innerWidth;
  gameCanvas.height = window.innerHeight;
  draw();
}

resize();

function draw() {
  console.log("Drawing the game");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
}

module.exports = {
  init
}

function init(eventBus) {
  eventBus.on("startGame", startDrawing);
}

function startDrawing() {
  function drawLoop(timeStamp) {
    draw();
    window.requestAnimationFrame(drawLoop);
  }
  drawLoop();
}
