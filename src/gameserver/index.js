import EventEmitter from "events";

export default class GameServer {
  constructor(interval) {
    this.tps = 30;
    this.interval = interval;
    this.gameBus = new EventEmitter();
    this.running = false;
  }
  update() {
    //TODO: run game updates
  }
  start() {
    this.running = true;
    const skipTicks = 1000 / this.tps;
    let nextTick = performance.now()
    const performLoop = () => {
      while(performance.now() > nextTick) {
        this.update();
        nextTick += skipTicks;
      }
    }
    if(this.interval && this.interval > 0)
    {
      let intervalLoop = setInterval(() => {
        if(!this.running) {
          clearInterval(intervalLoop);
        }
        else {
          performLoop()
        }
      }, this.interval);
    }
    else {
      while(this.running) {
        performLoop();
      }
    }
  }
  stop()
  {
    this.running = false;
  }
  save() {
    //TODO: save
  }
  load() {
    //TODO:save
  }
}
