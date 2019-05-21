<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <component :is="compName" :list="list"></component>
    </van-pull-refresh>
  </van-list>
</template>

<script>
import Dynamics from "./Dynamics";
import Notice from "./Notice";
export default {
  components: { Dynamics, Notice },
  data() {
    return {
      list: [],
      isRefresh: false,
      loading: false,
      finished: false,
      funcMap: {
        "Dynamics": this.getDynamics,
        "Notice": this.getNotice
      }
    }
  },
  mounted() {
    this.funcMap[this.compName]();
  },
  computed: {
    compName() {
      return this.$route.params.compName;
    },
  },
  methods: {
    getNotice() {
      this.list = [
        { title: "响应长三角一体化发展布局 共谋儿童健康行动新篇", content: "响应长三角一体化发展布局 共谋儿童健康行动新篇", publisher: "信息工程学院", watchNum: 541, praiseNum: 115 },
        { title: "响应长三角一体化发展布局 共谋儿童健康行动新篇", content: "响应长三角一体化发展布局 共谋儿童健康行动新篇", publisher: "信息工程学院", watchNum: 300, praiseNum: 105 },
        { title: "响应长三角一体化发展布局 共谋儿童健康行动新篇", content: "响应长三角一体化发展布局 共谋儿童健康行动新篇", publisher: "信息工程学院", watchNum: 21, praiseNum: 10 },
        { title: "响应长三角一体化发展布局 共谋儿童健康行动新篇", content: "响应长三角一体化发展布局 共谋儿童健康行动新篇", publisher: "信息工程学院", watchNum: 10, praiseNum: 1 },
      ]
    },
    getDynamics() {
      this.list = [
        { imgUrl: "images/home/ad-item001.png", title: "信息工程学院信信息工程学院开展学习雷锋系列活动息工程学院开展学习雷锋系列活动开展学习雷锋系列活动", date: "2017-21-8", like: false },
        { imgUrl: "images/home/ad-item002.png", title: "信息工程学院开展学习雷锋系列活动", date: "2018-2-10", like: false },
        { imgUrl: "images/home/ad-item003.png", title: "信息工程学院开展学习雷锋系列活动", date: "2018-08-4", like: true },
        { imgUrl: "images/home/ad-item004.png", title: "信息工程学院开展学习雷锋系列活动", date: "2019-5-8", like: false },
        { imgUrl: "images/home/ad-item005.png", title: "信息工程学院开展学习雷锋系列活动", date: "2018-1-8", like: false },
      ]
    },
    loadData() {

    },
    // 下拉页面刷新加载函数
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
      }, 1000);
    },
    // 上拉加载数据函数
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list[i]);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 20) {
          this.finished = true;
        }
      }, 500);
    }
  }
}
</script>

<style>
</style>
