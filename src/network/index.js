export default class NetworkHandler {
  constructor(eventBus) {
    this.eventBus = eventBus;
  }
  handlePacket(packet) {
    this.eventBus.emit(packet.type, packet.payload)
  }
  transformPacket(key, data) {
    return {type: key, payload: data};
  }
}
