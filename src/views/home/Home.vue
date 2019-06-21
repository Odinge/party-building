<template>
  <section id="home" class="app-container">
    <search :mode="0" @toSearch="toSearch"></search>
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
import { mapMutations } from "vuex";
import * as types from "../../store/types";


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
        // { imgUrl: "", articleId: "1" },
        // { imgUrl: "", articleId: "2" },
        // { imgUrl: "", articleId: "3" },
        // { imgUrl: "", articleId: "4" },
      ],
      dynamicsList: [
        // { url: "", title: "", updatetime: "", like: false, articleId: "1" },
        // { url: "", title: "", updatetime: "", like: false, articleId: "1" },
        // { url: "", title: "", updatetime: "", like: false, articleId: "1" },
        // { url: "", title: "", updatetime: "", like: false, articleId: "1" },
      ],
      noticeList: [
        // { title: "", content: "", author: "", viewCount: 541, praiseNum: 115, articleId: "1" },
        // { title: "", content: "", author: "", viewCount: 300, praiseNum: 105, articleId: "1" },
        // { title: "", content: "", author: "", viewCount: 21, praiseNum: 10, articleId: "1" },
      ],
      isRefresh: false, // 页面刷新
      pageLoad: null, // 页面加载
    }
  },

  mounted() {
    // 加载提示
    this.pageLoad = this.$toast.loading({ duration: 0, forbidClick: true, message: "疯狂加载中..." });
    // 加载数据
    this.loadData();
  },
  methods: {
    toSearch() {
      this.$router.push({ name: "search" });
    },
    loadData() {
      getArticleIndex()
        .then(data => {
          // this.bannerImageUrl = data.bannerImageUrl;
          this.dynamicsList = this.bannerImageUrl = data.dynamics;
          this.noticeList = data.notice;

          this.isRefresh = false;
          this.pageLoad.clear();

          // 设置页面预加载
          this.SET_PAGE_LOADING(false);
        }).catch(err => {
          this.$toast(err.message);
        })
    },
    onRefresh() {
      this.loadData();
    },
    ...mapMutations([types.SET_PAGE_CONFIG, types.SET_PAGE_LOADING]),
  }
}
</script>
<style>
.swiper-box {
  height: 50vw;
  background-color: #f8f8f8;
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
