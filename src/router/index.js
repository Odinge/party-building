import Vue from "vue";
import Router from "vue-router";
import Layout from "../views/Layout.vue";

Vue.use(Router);

// 我的常用
const common = [
  {
    path: "download",
    name: "download",
    meta: { title: "常用下载", showHead: true },
    component: () =>
      import(
        /* webpackChunkName: "download" */ "../views/mine/common/Download.vue"
      )
  },
  {
    path: "myComment",
    name: "myComment",
    meta: { title: "我的评价", showHead: true },
    component: () =>
      import(
        /* webpackChunkName: "myComment" */ "../views/mine/common/MyComment.vue"
      )
  }
];
// 用户设置
const setting = [
  {
    path: "setting",
    name: "setting",
    meta: { title: "设置", showHead: true },
    component: () =>
      import(
        /* webpackChunkName: "setting" */ "../views/mine/setting/Setting.vue"
      )
  },
  {
    path: "updateUserInfo",
    name: "updateUserInfo",
    meta: { title: "设置信息", showHead: true },
    component: () =>
      import(
        /* webpackChunkName: "updateUserInfo" */ "../views/mine/setting/UpdateUserInfo.vue"
      )
  },
  {
    path: "updatePassword",
    name: "updatePassword",
    meta: { title: "修改密码", showHead: true },
    component: () =>
      import(
        /* webpackChunkName: "updatePassword" */ "../views/mine/setting/UpdatePassword.vue"
      )
  }
];
// 我的功能
const func = [
  {
    path: "collect",
    name: "collect",
    meta: { title: "我的收藏", showHead: true },
    component: () =>
      import(
        /* webpackChunkName: "collect" */ "../views/mine/function/Collect.vue"
      )
  },
  {
    path: "feedback",
    name: "feedback",
    meta: { title: "意见反馈", showHead: true },
    component: () =>
      import(
        /* webpackChunkName: "feedback" */ "../views/mine/function/Feedback.vue"
      )
  },
  {
    path: "learn",
    name: "learn",
    meta: { title: "学习情况", showHead: true },
    component: () =>
      import(/* webpackChunkName: "learn" */ "../views/mine/function/Learn.vue")
  },
  {
    path: "message",
    name: "message",
    meta: { title: "我的消息", showHead: true },
    component: () =>
      import(
        /* webpackChunkName: "message" */ "../views/mine/function/Message.vue"
      )
  }
];

const routes = [
  // 登录注册
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/login/Register.vue")
  },
  // 主要内容
  {
    path: "/",
    name: "index",
    redirect: "/home",
    component: Layout,
    meta: { requiresAuth: true },
    children: [
      // 导航
      {
        path: "home",
        name: "home",
        meta: { title: "首页", showNav: true, noBack: true },
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/home/Home.vue")
      },
      {
        path: "news",
        name: "news",
        meta: { title: "要闻", showNav: true },
        component: () =>
          import(/* webpackChunkName: "news" */ "../views/news/News.vue")
      },
      {
        path: "video",
        name: "video",
        meta: { title: "学习视频", showHead: true, className: "white" },
        component: () =>
          import(/* webpackChunkName: "video" */ "../views/video/Video.vue")
      },
      {
        path: "test",
        name: "test",
        meta: { title: "学习测评", showHead: true, showMore: true },
        component: () =>
          import(/* webpackChunkName: "test" */ "../views/test/Test.vue")
      },
      {
        path: "mine",
        name: "mine",
        meta: { title: "设置", showNav: true, noBack: true },
        component: () =>
          import(/* webpackChunkName: "mime" */ "../views/mine/Mine.vue"),
        children: []
      },
      ...setting, // 设置
      ...common, // 常用
      ...func, // 用户功能
      {
        path: "more/:compName/:title",
        name: "more",
        meta: { showHead: true },
        component: () =>
          import(/* webpackChunkName: "more" */ "../views/home/More.vue"),
        beforeEnter: (to, from, next) => {
          const { title } = to.params;
          to.meta.title = decodeURI(title);
          next();
        },
        props: true
      },
      // 页面详情
      {
        path: "detail/:id",
        name: "detail",
        component: () =>
          import(/* webpackChunkName: "detail" */ "../views/home/Detail.vue"),
        props: true
      },
      {
        path: "article/:id",
        name: "article",
        // meta: { showHead: false },
        component: () =>
          import(
            /* webpackChunkName: "airticle" */ "../views/article/Article.vue"
          ),
        props: true
      },
      {
        path: "search",
        name: "search",
        meta: { keepAlive: true },
        component: () =>
          import(
            /* webpackChunkName: "airticle" */ "../views/home/SearchList.vue"
          )
      }
    ]
  },
  {
    path: "*",
    redirect: "/"
  }
];

export default new Router({
  mode: "history",
  routes
});
