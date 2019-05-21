<template>
  <section id="home" class="app-container">
    <search></search>
    <div class="app-content">
      <!-- 轮播 -->
      <van-swipe :autoplay="3000" heigh="100" class="swiper-box" indicator-color="#ea2930">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <router-link :to="{path:images.id}">
            <img :src="image.imgUrl" v-lazy="image.imgUrl" />
          </router-link>
        </van-swipe-item>
      </van-swipe>
      <!-- 列表 -->
      <Title class="home-title" moreTo="Dynamics" label="党建动态"></Title>
      <dynamics :list="dynamicsList"></dynamics>
      <Title class="home-title" moreTo="Notice" label="党内通知"></Title>
      <notice :list="noticeList"></notice>
    </div>
  </section>
</template>
<script>
import Title from "./Title";
import Search from "./Search";
import Dynamics from "./Dynamics";
import Notice from "./Notice";
export default {
  components: { Search, Title, Dynamics, Notice },
  data() {
    return {
      images: [
        { imgUrl: "images/home/01.jpg", id: "1" },
        { imgUrl: "images/home/02.jpg", id: "2" },
        { imgUrl: "images/home/03.jpg", id: "3" },
        { imgUrl: "images/home/04.jpg", id: "4" },
      ],
      dynamicsList: [
        { imgUrl: "images/home/ad-item001.png", title: "信息工程学院信信息工程学院开展学习雷锋系列活动息工程学院开展学习雷锋系列活动开展学习雷锋系列活动", date: "2017-21-8", like: false },
        { imgUrl: "images/home/ad-item002.png", title: "信息工程学院开展学习雷锋系列活动", date: "2018-2-10", like: false },
        { imgUrl: "images/home/ad-item003.png", title: "信息工程学院开展学习雷锋系列活动", date: "2018-08-4", like: true },
        { imgUrl: "images/home/ad-item004.png", title: "信息工程学院开展学习雷锋系列活动", date: "2019-5-8", like: true },
      ],
      noticeList: [
        { title: "响应长三角一体化发展布局 共谋儿童健康行动新篇", content: "响应长三角一体化发展布局 共谋儿童健康行动新篇", publisher: "信息工程学院", watchNum: 541, praiseNum: 115 },
        { title: "响应长三角一体化发展布局 共谋儿童健康行动新篇", content: "响应长三角一体化发展布局 共谋儿童健康行动新篇", publisher: "信息工程学院", watchNum: 300, praiseNum: 105 },
        { title: "响应长三角一体化发展布局 共谋儿童健康行动新篇", content: "响应长三角一体化发展布局 共谋儿童健康行动新篇", publisher: "信息工程学院", watchNum: 21, praiseNum: 10 },
      ],
    }
  },
  methods: {

  }
}
</script>
<style>
.swiper-box {
  height: 50vw;
}
.swiper-box img {
  width: 100%;
}
.home-title {
  margin: 5vw 0;
}
</style>
