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
      <dynamics :showNum="4"></dynamics>
      <Title class="home-title" moreTo="Notice" label="党内通知"></Title>
      <notice :showNum="2"></notice>
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
      ]
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
