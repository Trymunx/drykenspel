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
import Client from "./client";

const client = new Client(document.getElementById("game"));
client.gameBus.on("connected", (data) => {
  console.log("Client connected to server: ", data);
});
client.start();
client.newLocalServer();
