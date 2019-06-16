<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" success-text="加载成功">
      <component :is="compName" :list="list"></component>
    </van-pull-refresh>
  </van-list>
</template>

<script>
import { getDynamics, getNotice } from "../../api/article";
import Dynamics from "./Dynamics";
import Notice from "./Notice";
export default {
  components: { Dynamics, Notice },
  props: ["compName"],
  data() {
    return {
      list: [],
      isRefresh: false, // 下拉刷新
      loading: false, // 页面数据加载
      finished: false, // 全部完成加载
      total: 0, // 数据总条数
      page: 1, // 数据页数
      size: 8, // 数据每页大小

    }
  },
  mounted() {
    // this.loadData();
  },
  computed: {
    pages() {
      return Math.ceil(this.total / this.size);
    },
    loadFun() {
      const funcMap = {
        "Dynamics": getDynamics,
        "Notice": getNotice
      }
      return funcMap[this.compName];
    }
  },
  methods: {
    /* getNotice() {
      // this.list = [
      //   { title: "响应长三角一体化发展布局 共谋儿童健康行动新篇", content: "响应长三角一体化发展布局 共谋儿童健康行动新篇", author: "信息工程学院", viewCount: 541, praiseNum: 115 },
      //   { title: "响应长三角一体化发展布局 共谋儿童健康行动新篇", content: "响应长三角一体化发展布局 共谋儿童健康行动新篇", author: "信息工程学院", viewCount: 300, praiseNum: 105 },
      //   { title: "响应长三角一体化发展布局 共谋儿童健康行动新篇", content: "响应长三角一体化发展布局 共谋儿童健康行动新篇", author: "信息工程学院", viewCount: 21, praiseNum: 10 },
      //   { title: "响应长三角一体化发展布局 共谋儿童健康行动新篇", content: "响应长三角一体化发展布局 共谋儿童健康行动新篇", author: "信息工程学院", viewCount: 10, praiseNum: 1 },
      // ]

      getNotice(this.page, this.size)
        .then(data => {
          // this.list = data.rows;
          this.list.push(...data.rows);
          this.total = data.total;
          this.loading = false;
        }).catch(err => {

        });
    },
    getDynamics() {
      // this.list = [
      //   { url: "images/home/ad-item001.png", title: "信息工程学院信信息工程学院开展学习雷锋系列活动息工程学院开展学习雷锋系列活动开展学习雷锋系列活动", updatetime: "2017-21-8", like: false, articleId: "18165156156" },
      //   { url: "images/home/ad-item002.png", title: "信息工程学院开展学习雷锋系列活动", updatetime: "2018-2-10", like: false, articleId: "1651561" },
      //   { url: "images/home/ad-item003.png", title: "信息工程学院开展学习雷锋系列活动", updatetime: "2018-08-4", like: true, articleId: "54545" },
      //   { url: "images/home/ad-item004.png", title: "信息工程学院开展学习雷锋系列活动", updatetime: "2019-5-8", like: false, articleId: "18522000" },
      //   { url: "images/home/ad-item005.png", title: "信息工程学院开展学习雷锋系列活动", updatetime: "2018-1-8", like: false, articleId: "15816861181681" },
      // ]

      getDynamics(this.page, this.size)
        .then(data => {
          // this.list = data.rows;
          this.list.push(...data.rows);
          this.total = data.total;
          this.loading = false;

          if (this.page >= this.pages) {
            this.finished = true;
          }
          this.page++;
        }).catch(err => {

        });

    }, */

    // 加载函数
    loadData() {
      this.loadFun(this.page, this.size)
        .then(data => {
          // 是否处于刷新状态
          if (this.isRefresh) {
            this.list = data.rows;
            this.isRefresh = false;
            this.finished = false;
          } else {
            this.list.push(...data.rows);
          }
          // 加载状态
          this.loading = false;
          // 计算数据总数
          this.total = data.total;
          // 判断数据是否全部获取完毕
          if (this.page >= this.pages) {
            this.finished = true;
          }
          this.page++;
        }).catch(err => {
          this.$toast(err.message);
          this.loading = false;
        })
    },

    // 下拉页面刷新加载函数
    onRefresh() {
      // 初始化参数
      this.page = 1;
      this.loadData();
    },
    // 上拉加载数据函数
    onLoad() {
      // 异步更新数据
      this.loadData();
    }
  }
}
</script>

<style>
</style>
