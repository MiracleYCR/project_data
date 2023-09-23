import Vue from "vue";
import dataV from "@jiaminghi/data-view";

import App from "./App.vue";
import "./global.css";

Vue.config.productionTip = false;

Vue.use(dataV);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
