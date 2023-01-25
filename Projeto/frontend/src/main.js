import Vue from "vue";
import Axios from "axios";
import App from "@/App.vue";

import { Router, vuetify } from "@/plugins";

import "@/views";

Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;

new Vue({
  router: Router.instance,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
