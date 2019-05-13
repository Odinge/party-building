import Vue from "vue";
import Router from "vue-router";
import Layout from "../views/Layout.vue";

Vue.use(Router);

export default new Router({
  routes: [
    // 登录注册
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/login/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/login/Register.vue")
    },
    /* 
      主要内容
    */
    {
      path: "/",
      name: "index",
      redirect: "/home",
      component: Layout,
      children: [
        // 导航
        {
          path: "home",
          name: "home",
          meta: { showNav: true, showHead: true, title: "首页" },
          component: () =>
            import(/* webpackChunkName: "home" */ "../views/home/Home.vue")
        },
        {
          path: "news",
          name: "news",
          component: () =>
            import(/* webpackChunkName: "news" */ "../views/news/News.vue")
        },
        {
          path: "video",
          name: "video",
          meta: { showHead: true, title: "学习视频" },
          component: () =>
            import(/* webpackChunkName: "video" */ "../views/video/Video.vue")
        },
        {
          path: "test",
          name: "test",
          meta: { showHead: true, title: "学习测评" },
          component: () =>
            import(/* webpackChunkName: "test" */ "../views/test/Test.vue")
        },
        {
          path: "mine",
          name: "mine",
          meta: { showNav: true, title: "设置" },
          component: () =>
            import(/* webpackChunkName: "mime" */ "../views/mine/Mine.vue")
        },
        {
          path: "more",
          name: "more",
          component: () =>
            import(/* webpackChunkName: "more" */ "../views/home/More.vue")
        },
        {
          path: "detail",
          name: "detail",
          component: () =>
            import(/* webpackChunkName: "more" */ "../views/home/Detail.vue")
        }
      ]
    },
    {
      path: "*",
      redirect: "/login"
    }
  ]
});
