import Vue from "vue";
import dataV from "@jiaminghi/data-view";
import scroll from "vue-seamless-scroll";
import VScaleScreen from "v-scale-screen";

import "./global.css";

import App from "./App.vue";

Vue.config.productionTip = false;

Vue.use(dataV);
Vue.use(scroll);
Vue.use(VScaleScreen);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
