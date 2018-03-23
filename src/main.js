// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

//TODO:
//Initialise firebase
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

const db = firebase.firestore();

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
client.start();
client.newLocalServer();
