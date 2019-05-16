import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 获取token
import { getToken } from "./utils/token";

import "../public/css/reset.css";

// 全局配置
import "./global";

Vue.config.productionTip = false;

// 创建白名单
const whiteList = ["/login", "/register"];

router.beforeEach((to, form, next) => {
  // 验证token
  const token = getToken();
  // if (token && !store.state.token) {
  //   store.commit("SET_TOKEN", token);
  // }
  if (token) {
    if (whiteList.includes(to.path)) {
      next("/");
    } else {
      // 拉去用户基本信息
      if (!store.state.userInfo.sname) {
        store
          .dispatch("getUserInfo")
          .then(res => {
            next();
          })
          .catch(err => {
            next("/login");
          });
      } else {
        //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入登录页面
        next();
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next(); // 在免登录白名单，直接进入
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
