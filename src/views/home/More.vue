<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-12 17:13:15
 * @LastEditTime: 2019-08-28 13:21:23
 * @LastEditors: Please set LastEditors
 -->
<template>
  <list-load v-model="list" :funMap="funMap">
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
    }
  },
}
</script>

<style>
</style>
