export default class Scene {
  constructor(sceneData) {
    this.interpolate = (now) => (now + sceneData.skip - sceneData.timeStamp) / sceneData.skip;
  }
  renderScene(canvasContext, now) {
    this.draw(canvasContext, this.interpolate(now));
  }
  draw(canvasContext, interpolation) {
    //TODO:Draw scene
  }
}
