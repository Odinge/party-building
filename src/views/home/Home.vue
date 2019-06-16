<template>
  <section id="home" class="app-container">
    <search></search>
    <div class="app-content">
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" success-text="加载成功">
        <!-- 轮播 -->
        <van-swipe :autoplay="3000" class="swiper-box" indicator-color="#ea2930">
          <van-swipe-item v-for="(img, index) in bannerImageUrl" :key="index">
            <router-link :to="{name:'article', params:{id:img.articleId}}">
              <img :src="img.url" v-lazy="img.url" />
            </router-link>
          </van-swipe-item>
        </van-swipe>
        <!-- 列表 -->
        <Title class="home-title" moreTo="Dynamics" label="党建动态"></Title>
        <dynamics :list="dynamicsList"></dynamics>
        <Title class="home-title" moreTo="Notice" label="党内通知"></Title>
        <notice :list="noticeList"></notice>
      </van-pull-refresh>
    </div>
  </section>
</template>
<script>
import { getArticleIndex } from "../../api/article";
import Title from "./Title";
import Search from "./Search";
import Dynamics from "./Dynamics";
import Notice from "./Notice";
export default {
  components: { Search, Title, Dynamics, Notice },
  data() {
    return {
      bannerImageUrl: [
        // { imgUrl: "images/home/01.jpg", id: "1" },
        // { imgUrl: "images/home/02.jpg", id: "2" },
        // { imgUrl: "images/home/03.jpg", id: "3" },
        // { imgUrl: "images/home/04.jpg", id: "4" },
      ],
      dynamicsList: [
        // { url: "images/home/ad-item001.png", title: "信息工程学院信信息工程学院开展学习雷锋系列活动息工程学院开展学习雷锋系列活动开展学习雷锋系列活动", date: "2017-21-8", like: false },
        // { url: "images/home/ad-item002.png", title: "信息工程学院开展学习雷锋系列活动", updatetime: "2018-2-10", like: false },
        // { url: "images/home/ad-item003.png", title: "信息工程学院开展学习雷锋系列活动", updatetime: "2018-08-4", like: true },
        // { url: "images/home/ad-item004.png", title: "信息工程学院开展学习雷锋系列活动", updatetime: "2019-5-8", like: true },
      ],
      noticeList: [
        // { title: "响应长三角一体化发展布局 共谋儿童健康行动新篇", content: "响应长三角一体化发展布局 共谋儿童健康行动新篇", author: "信息工程学院", viewCount: 541, praiseNum: 115 },
        // { title: "响应长三角一体化发展布局 共谋儿童健康行动新篇", content: "响应长三角一体化发展布局 共谋儿童健康行动新篇", author: "信息工程学院", viewCount: 300, praiseNum: 105 },
        // { title: "响应长三角一体化发展布局 共谋儿童健康行动新篇", content: "响应长三角一体化发展布局 共谋儿童健康行动新篇", author: "信息工程学院", viewCount: 21, praiseNum: 10 },
      ],
      isRefresh: false,
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      getArticleIndex()
        .then(data => {
          // this.bannerImageUrl = data.bannerImageUrl;
          this.bannerImageUrl = data.dynamics;
          this.dynamicsList = data.dynamics;
          this.noticeList = data.notice;
          this.isRefresh = false;
        }).catch(err => {
          this.$toast(err.message);
        })
    },
    onRefresh() {
      this.loadData();
    },
  }
}
</script>
<style>
.swiper-box {
  height: 50vw;
}
.swiper-box img {
  width: 100%;
  height: 100%;
  /* object-fit: contain; */
}
.home-title {
  margin: 4vw 0;
}
</style>
