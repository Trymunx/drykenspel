import Client from "./client";

const client = new Client(document.getElementById("game"));
client.gameBus.on("connected", (data) => {
  console.log("Client connected to server: ", data);
});
client.start();
client.newLocalServer();
