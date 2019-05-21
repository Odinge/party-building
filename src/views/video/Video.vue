<template>
  <div id="video">
    <img src="/images/video/05.jpg" alt="">
    <van-tabs animated swipeable sticky v-model="mode">
      <van-tab title="必学">
        <video-list :mode="mode" v-if="mode==0"></video-list>
      </van-tab>
      <van-tab title="国际">
        <video-list :mode="mode" v-if="mode==1"></video-list>
      </van-tab>
      <van-tab title="社会">
        <video-list :mode="mode" v-if="mode==2"></video-list>
      </van-tab>
      <van-tab title="事迹">
        <video-list :mode="mode" v-if="mode==3"></video-list>
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
      mode: 0
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
