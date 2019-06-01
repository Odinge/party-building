import Vue from "vue";
import Router from "vue-router";
import Layout from "../views/Layout.vue";

Vue.use(Router);

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
    meta: { requireAuth: true },
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
        meta: { title: "要闻" },
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
      {
        path: "download",
        name: "download",
        meta: { title: "常用下载", showHead: true },
        component: () =>
          import(
            /* webpackChunkName: "download" */ "../views/mine//common/Download.vue"
          )
      },
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
      }
    ]
  },
  {
    path: "*",
    redirect: "/"
  }
];

// const 

export default new Router({
  // mode: "history",
  routes
});
