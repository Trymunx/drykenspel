import render from "./render";
import game from "./game";
import EventEmitter from "events";

const eventBus = new EventEmitter();

render.init(eventBus);
game.init(eventBus);

eventBus.emit("startGame");
