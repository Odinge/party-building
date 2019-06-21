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
<style>
</style>
