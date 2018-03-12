const render = require("./render.js");
const game = require("./game.js");
const EventEmitter = require("events");
const eventBus = new EventEmitter();

const loaded = () => {
  render.init(eventBus);
  game.init(eventBus);

  eventBus.emit("startGame");
}