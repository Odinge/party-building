// import Vue from "vue";
// 全局配置
import Vue from "./global";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 获取token
import { getToken } from "./utils/auth";

import "../public/css/reset.css";

Vue.config.productionTip = false;

// 创建白名单
const whiteList = ["/login", "/register"];

router.beforeEach((to, form, next) => {
  document.title = to.meta.title || "党建";
  // 验证token
  const token = getToken();
  const requireAuth = to.matched.some(recode => recode.meta.requireAuth);
  // const requireAuth = whiteList.includes(to.path);

  if (token) {
    if (requireAuth) {
      next({ path: form.path, replace: true });
    } else {
      // 拉去用户基本信息
      if (!store.state.userInfo.sname) {
        store
          .dispatch("getUserInfo")
          .then(res => {
            next();
          })
          .catch(err => {
            next({
              path: "/login",
              query: { redirect: to.fullPath }
            });
          });
      } else {
        //当有用户权限的时候，说明所有可访问路由已生成 如访问没权限的全面会自动进入登录页面
        next();
      }
    }
  } else if (!requireAuth) {
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
