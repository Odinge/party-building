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

// 创建白名单
const whiteList = ["/login", "/register"];

router.beforeEach((to, form, next) => {
  // 从本地存储中取得数据，本地存储中存的数据是字符串类型的，需要转换成json
  // 当本地存储中没有数据时返回null ，保证数据使用默认值
  let token = sessionStorage.getItem("token");

  if (token && !store.getters.token) {
    store.dispatch("setToken", token);
  }
  if (store.state.token) {
    if (to.path === "/login") {
      next({
        path: "/"
      });
    } else {
      if (!store.state.userInfo.username) {
      } else {
        //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入404页面
        next();
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next("/login"); // 否则全部重定向到登录页
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
