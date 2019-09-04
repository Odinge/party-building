<!--
 * @Description: 我的评价
 * @Author: Odinge
 * @Date: 2019-07-10 15:37:56
 * @LastEditTime: 2019-09-04 17:03:38
 * @LastEditors: Please set LastEditors
 -->
<template>
  <list-load v-model="list" :funMap="funMap" ref="load" class="my-comment">
    <comment-list :list="comments" @refreshList="refreshComment"></comment-list>
  </list-load>
</template>

<script>
import { getAllComment } from "../../../api/article";
export default {
  data() {
    return {
      funMap: [getAllComment],
      list: [],
    }
  },
  computed: {
    userId() {
      return this.$store.state.userInfo.sid;
    },
    comments() {
      return this.list.filter(item => item.userId === this.userId)
    }
  },
  methods: {
    refreshComment() {
      this.$refs.load.onRefresh(() => this.toast1s("已删除评价"));
    }
  },
  activated() {
    this.$changeRefresh("comment", true);
  }
}
</script>

<style>
/* 评价区 */
.my-comment .comment-content {
  background-color: #fff;
  padding: 0 4vw;
}
</style>
