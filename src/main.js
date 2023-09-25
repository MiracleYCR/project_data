import Vue from "vue";
import dataV from "@jiaminghi/data-view";
import VScaleScreen from "v-scale-screen";

import App from "./App.vue";
import "./global.css";

Vue.config.productionTip = false;

Vue.use(dataV);
Vue.use(VScaleScreen);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
