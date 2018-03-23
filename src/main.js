//import * as firebase from "firebase/app"; //Import namespace
import "firebase/auth"; //Add Authentication to namespace
import "firebase/firestore"; //Add Firestore to namespace
import Client from "./client";

(function setupCanvas() {
  const gameCanvas = document.getElementById("game");
  const ctx = gameCanvas.getContext("2d");
  window.addEventListener("resize", resize);

  function resize() {
    gameCanvas.width = window.innerWidth;
    gameCanvas.height = window.innerHeight;
    draw();
  }
  resize();

  function draw() {
    console.log("Drawing the game");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  }
})();

firebase.initializeApp({
  apiKey: "AIzaSyCtqc0NPUkzmjpBl2pCo8Jil3zVH_3I75s",
  authDomain: "drykenspel.firebaseapp.com",
  projectId: "drykenspel"
});

document.getElementById("game").addEventListener("click", () => {
  console.log("LOGGING IN:alpvax@netscape.net");
  firebase.auth().signInWithEmailAndPassword("alpvax@netscape.net", "password");
});

let client = null;

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    client = new Client(document.getElementById("game"));
    client.gameBus.on("connected", (data) => {
      console.log("Client connected to server: ", data);
    });
    client.start();
    client.newLocalServer();
  } else {
    client.quit();
    let canvas = document.getElementById("game");
    let ctx = canvas.getContext("2d");
    let size = canvas.height * 0.2;
    ctx.font = size + "px Arial";
    ctx.fillText("Log in to continue!",10, (canvas.height + size) / 2);
    //LOGGED OUT!
  }
});
