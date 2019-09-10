<!--
 * @Description: 新闻视图页面
 * @Author: Odinge
 * @Date: 2019-06-19 17:47:06
 * @LastEditTime: 2019-09-10 21:14:35
 * @LastEditors: Please set LastEditors
 -->
<template>
  <list-load v-model="list" :mode="mode" :funMap="funMap" class="app-content">
    <news-list :list="list"></news-list>
  </list-load>
</template>

<script>
import { getHotNews, getLearnNews } from "../../api/article";
import NewsList from "./NewsList";
export default {
  components: { NewsList },
  props: {
    mode: {
      default: 0
    }
  },
  data() {
    return {
      list: [],
      funMap: [getLearnNews, getHotNews]
    }
  },
}
</script>
