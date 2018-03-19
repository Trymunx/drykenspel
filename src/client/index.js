import NetworkHandler from "../network";
import EventEmitter from "events";
import ServerWorker from "worker-loader!./serverWorker.js";

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
  constructor(canvasElement) {
    this.canvas = canvasElement;
    this.gameBus = new EventEmitter();
    this.networkHandler = new ClientNetworkHandler(this.gameBus);
    this.setScene(/*TODO: main menu scene*/)
  }
  setScene(scene) {
    this.scene = scene;
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
  }
}
