/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-12 13:12:27
 * @LastEditTime: 2019-08-27 18:34:53
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import Router from "vue-router";
import Layout from "../views/Layout.vue";

Vue.use(Router);
// 用户设置
export const setting = [
  {
    path: "setUserInfo",
    name: "setUserInfo",
    meta: { title: "用户信息", icon: "contact", showHead: true },
    component: () =>
      import(
        /* webpackChunkName: "setUserInfo" */ "../views/mine/setting/SetUserInfo.vue"
      )
  },
  {
    path: "setPassword",
    name: "setPassword",
    meta: { title: "修改密码", icon: "bookmark-o", showHead: true },
    component: () =>
      import(
        /* webpackChunkName: "setPassword" */ "../views/mine/setting/SetPassword.vue"
      )
  }
];
// 我的常用
export const common = [
  {
    path: "dproject",
    name: "dproject",
    meta: {
      title: "智慧党建",
      icon: "/images/mine/icon-ge-002.png",
      showHead: true
    },
    component: () =>
      import(
        /* webpackChunkName: "dproject" */ "../views/mine/common/Dproject.vue"
      )
  },
  // {
  //   path: "myComment",
  //   name: "myComment",
  //   meta: {
  //     title: "我的评价",
  //     icon: "/images/mine/icon-ge-003.png",
  //     showHead: true
  //   },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "myComment" */ "../views/mine/common/MyComment.vue"
  //     )
  // },
  {
    path: "achievementUpload",
    name: "achievementUpload",
    meta: {
      title: "学习成果",
      icon: "/images/mine/icon-ge-003.png",
      showHead: true
    },
    component: () =>
      import(
        /* webpackChunkName: "achievementUpload" */ "../views/mine/common/AchievementUpload.vue"
      )
  },
  {
    path: "download",
    name: "download",
    meta: {
      title: "常用下载",
      icon: "/images/mine/icon-ge-005.png",
      showHead: true
    },
    component: () =>
      import(
        /* webpackChunkName: "download" */ "../views/mine/common/Download.vue"
      )
  }
];

// 我的功能
export const func = [
  {
    path: "message",
    name: "message",
    meta: {
      title: "我的消息",
      icon: "/images/mine/icon-qe-005.png",
      showHead: true
    },
    component: () =>
      import(
        /* webpackChunkName: "message" */ "../views/mine/function/Message.vue"
      )
  },
  {
    path: "myCompetition",
    name: "myCompetition",
    meta: {
      title: "我的竞赛",
      icon: "/images/mine/icon-qe-006.png",
      showHead: true
    },
    component: () =>
      import(
        /* webpackChunkName: "myCompetition" */ "../views/mine/function/MyCompetition.vue"
      )
  },
  {
    path: "learn",
    name: "learn",
    meta: {
      title: "学习记录",
      icon: "/images/mine/icon-qe-007.png",
      showHead: true
    },
    component: () =>
      import(/* webpackChunkName: "learn" */ "../views/mine/function/Learn.vue")
  },
  // {
  //   path: "myOrganization",
  //   name: "myOrganization",
  //   meta: {
  //     title: "我的组织",
  //     icon: "/images/mine/icon-qe-008.png",
  //     showHead: true
  //   },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "myOrganization" */ "../views/mine/function/MyOrganization.vue"
  //     )
  // },
  {
    path: "myComment",
    name: "myComment",
    meta: {
      title: "我的评价",
      icon: "/images/mine/icon-qe-008.png",
      showHead: true
    },
    component: () =>
      import(
        /* webpackChunkName: "myComment" */ "../views/mine/function/MyComment.vue"
      )
  },
  {
    path: "myTest",
    name: "myTest",
    meta: {
      title: "我的测试",
      icon: "/images/mine/icon-qe-009.png",
      showHead: true
    },
    component: () =>
      import(
        /* webpackChunkName: "myTest" */ "../views/mine/function/MyTest.vue"
      )
  },
  {
    path: "punchInRecord",
    name: "punchInRecord",
    meta: {
      title: "我的打卡",
      icon: "/images/mine/icon-qe-010.png",
      showHead: true
    },
    component: () =>
      import(
        /* webpackChunkName: "punchInRecord" */ "../views/mine/function/PunchInRecord.vue"
      )
  },

  {
    path: "collect",
    name: "collect",
    meta: {
      title: "我的收藏",
      icon: "/images/mine/icon-qe-011.png",
      showHead: true
      // keepAlive: true
    },
    component: () =>
      import(
        /* webpackChunkName: "collect" */ "../views/mine/function/Collect.vue"
      )
  },
  {
    path: "feedback",
    name: "feedback",
    meta: {
      title: "意见反馈",
      icon: "/images/mine/icon-qe-012.png",
      showHead: true
    },
    component: () =>
      import(
        /* webpackChunkName: "feedback" */ "../views/mine/function/Feedback.vue"
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
  {
    path: "/forget",
    name: "forget",
    meta: { title: "忘记密码", showHead: true },
    component: () =>
      import(/* webpackChunkName: "forget" */ "../views/login/Forget.vue")
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
        meta: { title: "首页", showNav: true, noBack: true, keepAlive: true },
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/home/Home.vue")
      },
      {
        path: "news",
        name: "news",
        meta: { title: "要闻", showNav: true, keepAlive: true },
        component: () =>
          import(/* webpackChunkName: "news" */ "../views/news/News.vue")
      },
      {
        path: "video",
        name: "video",
        meta: {
          title: "学习视频",
          showHead: true,
          className: "white",
          keepAlive: true
        },
        component: () =>
          import(/* webpackChunkName: "video" */ "../views/video/Video.vue")
      },
      {
        path: "test",
        name: "test",
        meta: { title: "学习测评", showHead: true, keepAlive: true },
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
        path: "setting",
        name: "setting",
        meta: { title: "设置", showHead: true },
        component: () =>
          import(
            /* webpackChunkName: "setting" */ "../views/mine/setting/Setting.vue"
          )
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
      {
        path: "article/:id",
        name: "article",
        // meta: { keepAlive: true },
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
            /* webpackChunkName: "SearchList" */ "../views/home/SearchList.vue"
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
