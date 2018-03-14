import NetworkHandler from "../network";
import EventEmitter from "events";

class ClientNetworkHandler extends NetworkHandler {
  constructor(gameBus) {
    super(gameBus);
    this.serverNetHandler;
    this.eventBus.on("connect", this.connectClient);
  }
  connectClient(serverConnection) {
    this.serverNetHandler = serverConnection.networkHandler;
    this.sendToServer("connect", Object.assign({}, serverConnection.thisClient, {networkHandler: this}));
  }
  sendToServer(key, data)
  {
    this.serverNetHandler.handlePacket(this.transformPacket(key, data));
  }
}

export default class Client {
  constructor() {
    this.gameBus = new EventEmitter();
    this.networkHandler = new ClientNetworkHandler(this.gameBus);
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
