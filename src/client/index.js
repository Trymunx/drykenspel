import EventEmitter from "events";

export default class Client {
  constructor() {
    this.gameBus = new EventEmitter();
    this.setScene(/*TODO: main menu scene*/)
  }
  setScene(scene) {
    this.scene = scene;
  }
  start() {
    const loop = (timeStamp) => {
      if(this.scene) {
        this.scene.renderScene(timeStamp);
      }
      requestAnimationFrame(loop);
    }
    loop(performance.now());
  }
  newLocalServer() {
    let serverWorker = Worker("./serverWorker.js");
  }
}
