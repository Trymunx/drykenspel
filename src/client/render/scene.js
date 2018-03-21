export default class Scene {
  constructor(sceneData) {
    this.interpolate = (now) => (now + sceneData.skip - sceneData.timeStamp) / sceneData.skip;
    this.renderObjects = sceneData.toRender;
  }
  renderScene(canvasContext, now) {
    this.draw(canvasContext, this.interpolate(now));
  }
  draw(canvasContext, interpolation) {
    console.log("Rendering: ", this.toRender);
    //TODO:Draw scene
    let x = this.toRender.pos.x + interpolation * this.toRender.move.x;
    let y = this.toRender.pos.y + interpolation * this.toRender.move.y;

    canvasContext.fillStyle = "green";
    canvasContext.fillRect(x, y, 5, 5);
  }
}
