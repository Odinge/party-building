/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-12 13:12:27
 * @LastEditTime: 2019-08-25 13:58:29
 * @LastEditors: Please set LastEditors
 */
// import Vue from "vue";
// 全局配置
import Vue from "./global";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// ui组件注册
import { Toast, Dialog } from "vant";
import "../public/css/reset.css";

Vue.config.productionTip = false;
// 路由守卫
router.beforeEach((to, form, next) => {
  Toast.clear();
  document.title = to.meta.title || "党建";
  // 验证token
  const token = store.state.token;
  const noRequireAuth = !to.matched.some(record => record.meta.requiresAuth);
  // 创建白名单
  // const whiteList = ["/login", "/register"];
  // const requireAuth = whiteList.includes(to.path);

  if (token) {
    if (to.path === "/login") {
      next("/");
    } else {
      // 获取用户信息路由列表
      const getUserInfoRoutes = [
        "/mine",
        "/setting",
        "/setUserInfo",
        "/article",
        "/feedback",
        "/myComment"
      ];
      // 是否拉取用户基本信息
      const isGetUserInfo = getUserInfoRoutes.some(
        r => to.fullPath.indexOf(r) !== -1
      );

      // 不加载图标的
      const noLoad = ["/article"];
      const isNoLoad = noLoad.some(r => to.fullPath.indexOf(r) !== -1);

      // 是否存在用户信息
      const hasName = !store.state.userInfo.name;

      // 完善用户信息
      function completeInfo(data) {
        if (!data.name && to.fullPath !== "/setUserInfo?finish=0") {
          Dialog.alert({
            title: "信息录",
            message: "请完善用户信息",
            confirmButtonColor: "#f44"
          }).then(res => {
            next("/setUserInfo?finish=0");
          });
        } else {
          next();
        }
      }

      // 做判断是否获取用户信息
      if (isGetUserInfo && hasName) {
        let load = null;
        if (!isNoLoad) {
          load = Toast.loading({
            mask: true,
            duration: 0,
            message: "加载中..."
          });
        }
        store
          .dispatch("getUserInfo")
          .then(data => {
            // 用户未设置信息
            load && load.clear();
            completeInfo(data);
          })
          .catch(err => {
            load && load.clear();
            Dialog.alert({
              title: "信息录",
              message: err.message,
              confirmButtonColor: "#f44"
            }).then(res => {
              store
                .dispatch("logout")
                .then(res => {
                  next({ path: "/login" });
                })
                .catch(err => {
                  Toast.fail(err.message);
                });
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
