import EventEmitter from "events";
import ServerWorker from "worker-loader!./serverWorker.js"

export default class Client {
  constructor(canvasElement) {
    this.canvas = canvasElement;
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
    let serverWorker = new ServerWorker();
  }
}
