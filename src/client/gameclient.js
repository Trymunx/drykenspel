import EventEmitter from "events";
import Scene from "./render/scene";
import ServerWorker from "worker-loader!./serverWorker.js";

export default class Client {
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.server = null;
    this.gameBus = new EventEmitter();
    this.gameBus.on("scene", (sceneData) => this.setScene(new Scene(sceneData)));
    this.setScene(/*TODO: main menu scene*/);
  }
  setScene(scene) {
    this.scene = scene;
    console.log("Scene: ", this.scene);
  }
  start() {
    let ctx = this.canvas.getContext("2d");
    const loop = (timeStamp) => {
      if(this.scene) {
        this.scene.renderScene(ctx, timeStamp);
      }
      requestAnimationFrame(loop);
    };
    loop(performance.now());
  }
  newLocalServer() {
    let serverWorker = new ServerWorker();
    serverWorker.onmessage = (e) => {
      let {type, data} = e.data;
      if(type == "connect") {
        this.gameBus.emit("connected", data);
      } else {
        console.log(type, data);
      }
    };
    let connectionData = {
      //TODO: Player name? etc.
    };
    this.gameBus.emit("preConnect", connectionData);//Add data to send to server
    serverWorker.postMessage({type: "connect", data: connectionData});

    //TODO: set server
    this.server = serverWorker;
  }
  connectToServer() {
    //TODO:this.server =
  }
  disconnect() {
    this.server.terminate();
    //TODO: disconnect from server
  }
  close() {
    this.disconnect();
  }
}
