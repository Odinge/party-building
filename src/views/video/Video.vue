<template>
  <div id="video">
    <img src="/images/video/05.jpg" alt="视频" class="video-tab">
    <!-- <van-tabs animated swipeable sticky v-model="mode">
      <van-tab :title="type" v-for="type in listType" :key="type">
        <video-view :mode="mode"></video-view>
      </van-tab>
    </van-tabs> -->
    <video-view></video-view>
  </div>
</template>
<script>
import VideoView from "./VideoView";
export default {
  components: { VideoView },
  data() {
    return {
      // mode: 0,
      // listType: ["必学", "国际", "社会", "事迹"]
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
.video-tab {
  background: #fff;
  padding-bottom: 3vw;
}
</style>
