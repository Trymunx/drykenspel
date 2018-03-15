export default class Entity {
  constructor(position, motion) {
    this.position = Object.assign({}, position);
    this.motion = Object.assign({}, motion);
  }
  getPosition(interpolation) {
    let pos = Object.assign({}, this.position);
    if(interpolation) {
      for(let [key, val] of Object.entries(this.motion)) {
        if(key in pos) {
          pos[key] += val * interpolation;
        }
      }
    }
    return pos;
  }
  setPosition(x, y, rotation) {
    this.position.x = x;
    this.position.y = y;
    this.position.rotation = rotation;
  }
  setMotion(x, y, rotation) {
    this.motion.x = x;
    this.motion.y = y;
    this.motion.rotation = rotation;
  }
  update() {
    this.setPosition(this.getPosition(1));
  }
}
