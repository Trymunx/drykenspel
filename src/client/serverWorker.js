import GameServer from "../gameserver";
import Observer from "../gameserver/observer";

class LocalPlayerObserver extends Observer {
  constructor(radius) {
    super(radius);
  }
  sendMessage(message) {
    self.postMessage(message);
  }
}

self.onmessage = function(e) {
  let {type, data} = e.data;
  if(type == "connect") {
    server.connect(data, new LocalPlayerObserver(10));
  } else {
    console.log(type, data);
  }
};

const server = new GameServer(1000/10);
server.start();
