<template>
  <div id="video">
    <img src="/images/video/05.jpg" alt="">
    <van-tabs animated swipeable sticky v-model="mode">
      <van-tab :title="type" v-for="type in listType" :key="type">
        <video-list :mode="mode"></video-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import VideoList from "./VideoList";
export default {
  components: { VideoList },
  data() {
    return {
      mode: 0,
      listType: ["必学", "国际", "社会", "事迹"]
    }
  }
}
</script>
<style>
#video {
  background-color: #f5f5f5;
}
#video img {
  width: 100%;
}
</style>
