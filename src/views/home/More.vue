<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-12 17:13:15
 * @LastEditTime: 2019-09-10 21:13:23
 * @LastEditors: Please set LastEditors
 -->
<template>
  <list-load v-model="list" :funMap="funMap" ref="load">
    <component :is="compName" :list="list"></component>
  </list-load>
</template>

<script>
import { getDynamics, getNotice } from "../../api/article";
import Dynamics from "./Dynamics";
import Notice from "./Notice";
export default {
  components: { Dynamics, Notice },
  props: ["compName"],
  data() {
    return {
      list: [],
    }
  },
  computed: {
    loadFun() {
      const funcMap = {
        "Dynamics": getDynamics,
        "Notice": getNotice
      }
      return funcMap[this.compName];
    },
    funMap() {
      return [this.loadFun];
    },
    prevSamePath() {
      return this.$store.state.pageConfig.prevSamePath;
    }
  },
  // 加载信息
  activated() {
    const curPath = this.$route.params.compName;
    let isRefresh = false;
    if (this.prevSamePath && this.prevSamePath !== curPath) {
      isRefresh = true;
    }
    this.$store.commit("SET_PREV_SAME_PATH", curPath);

    // 判断重置
    if (isRefresh) {
      this.list = [];
      this.$refs.load.onRefresh();
    }
  },
}
</script>
