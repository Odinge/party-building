<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-19 17:34:12
 * @LastEditTime: 2019-09-14 20:04:38
 * @LastEditors: Please set LastEditors
 -->
<template>
  <list-load v-model="list" :funMap="funMap" @changeList="changeList" ref="load">
    <video-list :list="list"></video-list>
  </list-load>
</template>

<script>
import { getVideos, getCollectionStatus } from "../../api/article";
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
  methods: {
    changeList(list) {
      list.forEach((article, index) => {
        if (article.articleId) {
          getCollectionStatus(article.articleId).then(data => {
            this.$set(article, "isCollect", data);
          }).catch(err => {
            this.toast1s(err.message);
          });
        }
      });
    },
  },
  activated() {
    this.$changeRefresh("article");
  }
}
</script>
