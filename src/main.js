import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "../public/css/reset.css";
import "swiper/dist/css/swiper.css";

// 轮播插件
Vue.use(VueAwesomeSwiper);
// 注册全局axios
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
