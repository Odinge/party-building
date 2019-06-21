<template>
  <list-load v-model="list" :funMap="funMap">
    <video-list :list="list"></video-list>
  </list-load>
</template>

<script>
import { getVideos } from "../../api/article";
import VideoList from "./VideoList";
export default {
  components: { VideoList },
  props: {
    mode: {
      default: 0
    }
  },
  data() {
    return {
      list: [],
      funMap: [getVideos] // 执行函数
    }
  },
}
</script>

<style>
</style>
