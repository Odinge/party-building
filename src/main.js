/*
 * @Description: 入口文件
 * @Author: Odinge
 * @Date: 2019-05-12 13:12:27
 * @LastEditTime: 2019-09-10 20:41:46
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
import "./assets/iconfont/iconfont.css";

// 路由守卫
router.beforeEach((to, form, next) => {
  Toast.clear(); // 跳转路由清除提示

  store.commit("SET_PREV_PATH", form); // 存储前一个路由

  document.title = to.meta.title || "党建"; // 设置标题

  // 验证token
  const token = store.state.token; // token
  const account = store.state.account; // 账号
  const noRequireAuth = !to.matched.some(record => record.meta.requiresAuth); // 是否需要权限

  // 判断是否存在凭证
  if (token && account) {
    if (to.path === "/login") {
      next("/");
    } else {
      // 获取用户信息路由列表
      // const getUserInfoRoutes = [
      //   "/mine",
      //   "/setUserInfo",
      //   "/article",
      //   "/feedback",
      //   "/myComment"
      // ];
      // 是否拉取用户基本信息
      // const requireUserInfo = getUserInfoRoutes.some(
      //   r => to.fullPath.indexOf(r) !== -1
      //   );

      // 是否拉取用户基本信息
      const requireUserInfo = to.meta.requireUserInfo;

      // 是否存在用户信息
      const hasName = !store.state.userInfo.name;

      // 不加载图标的
      // const noLoadIconList = ["/article"];
      // const isLoadIcon = !noLoadIconList.some(
      //   r => to.fullPath.indexOf(r) !== -1
      // );

      // 是否不需要加载用户信息是=时加载图标
      const isLoadIcon = !to.meta.noLoadIcon;

      // 完善用户信息
      function completeInfo(data) {
        if (!data.name && to.fullPath !== "/setUserInfo?finish=0") {
          Dialog.alert({
            title: "信息录",
            message: "请完善用户信息"
          }).then(res => {
            next("/setUserInfo?finish=0");
          });
        } else {
          next();
        }
      }

      // 做判断是否获取用户信息
      if (requireUserInfo && hasName) {
        let load = null;
        if (isLoadIcon) {
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
              message: err.message
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
    // 否则全部重定向到登录页
    Dialog.alert({
      title: "权限录",
      message: "权限验证失败，请重新登录！！"
    }).then(res => {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    });
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
