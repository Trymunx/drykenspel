export default class Observer {
  constructor(radius) {
    if(this.constructor === Observer) {
      throw new Error("Cannot instantiate " + Observer.name + " directly. Create a subclass that overrides the methods.");
    }
    if(typeof (this.sendMessage) !== "function") {
      console.error(`${this.constructor.name} must implement "sendMessage" as a function`);
    }
    this.radius = radius;
  }
  sendMessage(message) {
    console.warn(`${this.constructor.name} did not implement "sendMessage" function`);
  }
  get pos() {
    return this.entity ? this.entity.getPosition() : {x:0, y:0, rotation:0};
  }
}
