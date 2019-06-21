<template>
  <van-tabs type="card" animated swipeable v-model="mode" id="news" class="app-container">
    <van-tab :title="type" v-for="type in listType" :key="type">
      <news-view :mode="mode"></news-view>
    </van-tab>
  </van-tabs>
</template>
<script>
import NewsView from "./NewsView";
export default {
  components: { NewsView },
  data() {
    return {
      mode: 0,
      listType: ["必学新闻", "热点新闻"]
    }
  }
}
</script>
<style>
#news {
  font-size: 4.5vw;
  height: 100%;
  padding-top: 12vw;
}
#news .van-tabs__content {
  overflow: auto;
}
#news .van-tabs__wrap {
  background-color: #fff;
  padding: 3vw;
}
#news .van-tabs__nav {
  width: 47%;
  margin: auto;
}
</style>
