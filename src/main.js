// import Vue from "vue";
// 全局配置
import Vue from "./global";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// ui组件注册
import { Toast, Dialog } from "vant";

// 获取token
// import { getToken } from "./utils/auth";

import "../public/css/reset.css";

Vue.config.productionTip = false;

// 创建白名单
// const whiteList = ["/login", "/register"];

router.beforeEach((to, form, next) => {
  Toast.clear();
  document.title = to.meta.title || "党建";
  // 验证token
  // const token = getToken();
  const token = store.state.token;
  const noRequireAuth = !to.matched.some(record => record.meta.requiresAuth);
  // const requireAuth = whiteList.includes(to.path);

  if (token) {
    if (to.path === "/login") {
      next("/");
    } else {
      // 拉取用户基本信息
      if (
        ["/mine", "/setting", "/updateUserInfo"].includes(to.fullPath) &&
        !store.state.userInfo.name
      ) {
        store
          .dispatch("getUserInfo")
          .then(res => {
            next();
          })
          .catch(err => {
            // 用户未设置信息
            Dialog.alert({
              title: "提示",
              message: "请完善用户信息",
              confirmButtonColor: "#f44"
            }).then(res => {
              next("/updateUserInfo?finish=0");
            });
          });
      } else {
        //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入登录页面
        next();
      }
    }
  } else if (noRequireAuth) {
    next(); // 在免登录白名单，直接进入
  } else {
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    }); // 否则全部重定向到登录页
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
