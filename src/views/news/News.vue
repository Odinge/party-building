<template>
  <van-tabs type="card" animated swipeable v-model="mode" id="news" class="app-container">
    <van-tab title="必学新闻">
      <new-list :mode="mode" v-if="mode==0"></new-list>
    </van-tab>
    <van-tab title="热点新闻">
      <new-list :mode="mode" v-if="mode==1"></new-list>
    </van-tab>
  </van-tabs>
</template>
<script>
import NewList from "./NewList";
export default {
  components: { NewList },
  data() {
    return {
      mode: 0
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
