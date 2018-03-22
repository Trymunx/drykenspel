//import * as firebase from "firebase/app"; //Import namespace
import "firebase/auth"; //Add Authentication to namespace
import "firebase/firestore"; //Add Firestore to namespace
import Client from "./client";

firebase.initializeApp({
  apiKey: "AIzaSyCtqc0NPUkzmjpBl2pCo8Jil3zVH_3I75s",
  authDomain: "drykenspel.firebaseapp.com",
  projectId: "drykenspel"
});

document.getElementById("game").addEventListener("click", () => {
  console.log("LOGGING IN:alpvax@netscape.net");
  firebase.auth().signInWithEmailAndPassword("alpvax@netscape.net", "password");
});

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    const client = new Client(document.getElementById("game"));
    client.gameBus.on("connected", (data) => {
      console.log("Client connected to server: ", data);
    });
    client.start();
    client.newLocalServer();
  } else {
    //LOGGED OUT!
  }
});
