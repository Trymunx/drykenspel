//import * as firebase from "firebase/app"; //Import namespace
import "firebase/auth"; //Add Authentication to namespace
import "firebase/firestore"; //Add Firestore to namespace
import Client, {signUp, signIn} from "./client";

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
  if (firebase.auth().currentUser) {
    console.log("LOGGING OUT");
    firebase.auth().signOut();
  }
});

let client = null;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    client = new Client(document.getElementById("game"));
    client.gameBus.on("connected", (data) => {
      console.log("Client connected to server: ", data);
    });
    client.start();
    client.newLocalServer();
    //TODO: display client
    let canvas = document.getElementById("game");
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let size = canvas.height * 0.05;
    ctx.font = size + "px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Logged in as " + user.email + " (" + user.displayName + ")", 10, (canvas.height + size) / 6);
  } else {
    if (client) {
      client.close();
    }
    let canvas = document.getElementById("game");
    let ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let size = canvas.height * 0.1;
    ctx.font = size + "px Arial";
    ctx.fillStyle = "red";
    ctx.fillText("Log in to continue!", 10, (canvas.height + size) / 6);
    //LOGGED OUT!
  }
});

function getElVal(el) {
  return document.getElementById(el).value;
}

document.getElementById("login-form").addEventListener("submit", (e) => {
  e.preventDefault();

  let email = getElVal("login-email");
  let password = getElVal("login-password");

  signIn(email, password);
});

document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault();

  let email = getElVal("signup-email");
  let displayName = getElVal("display-name");
  let password = getElVal("signup-password");

  signUp(email, displayName, password);
});
