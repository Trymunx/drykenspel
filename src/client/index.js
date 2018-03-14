import NetworkHandler from "../network";

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

export function init() {}
