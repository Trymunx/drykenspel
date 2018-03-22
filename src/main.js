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

firebase.initializeApp({
  apiKey: "AIzaSyCtqc0NPUkzmjpBl2pCo8Jil3zVH_3I75s",
  authDomain: "drykenspel.firebaseapp.com",
  projectId: "drykenspel"
});

const db = firebase.firestore();

const client = new Client(document.getElementById("game"));
client.gameBus.on("connected", (data) => {
  console.log("Client connected to server: ", data);
});
client.start();
client.newLocalServer();
