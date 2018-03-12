module.exports = {
  init
}

function init(eventBus) {
  eventBus.on("startGame", () => console.log("starting game"));
}