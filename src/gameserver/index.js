import NetworkHandler from "../network";
import EventEmitter from "events";

export default class GameServer {
  constructor(interval) {
    this.internal = self instanceof WorkerGlobalScope;
    this.tps = 30;
    this.interval = interval;
    this.gameBus = new EventEmitter();
    this.networkHandler = new ServerNetworkHandler(this.gameBus);
    this.running = false;
    this.worlds = new Map();
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
  connect(playerData, observer) {
    //TODO: get world and implement
    observer.sendMessage({type: "connect", data: "TODO: send connection data"});
  }
  save() {
    //TODO: save
  }
  load() {
    //TODO:save
  }
}

class ServerNetworkHandler extends NetworkHandler {
  constructor(gameBus) {
    super(gameBus);
    this.clients = new Set();
    this.eventBus.on("connect", this.connectClient);
  }
  connectClient(clientData) {
    this.clients.add(clientData);
  }
  sendToClients(key, data, filter)
  {
    this.clients.forEach((clientData) => {
      if(!filter || filter(clientData))
      {
        clientData.networkHandler.handlePacket(this.transformPacket(key, data));
      }
    });
  }
}
