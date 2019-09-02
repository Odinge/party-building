<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-12 15:38:10
 * @LastEditTime: 2019-09-01 21:06:23
 * @LastEditors: Please set LastEditors
 -->
<template>
  <nav id="nav">
    <router-link :to="tab.path" v-for="tab in tabNav" :key="tab.path">
      <i class="iconfont tabNav-icon" :class="'icon-'+tab.meta.icon"></i>
      <h3 class="tabNav-text">{{tab.meta.navTitle}}</h3>
    </router-link>
  </nav>
</template>
<script>
import { tabNav } from "../router";
export default {
  data() {
    return {
      tabNav
    }
  }
}
</script>
<style scoped>
#nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.4em 0;
  background: #f9f9f9;
  border-top: 1px solid #eee;
  font-size: 4.8vw;
}
#nav a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
#nav .tabNav-icon {
  font-size: 1.3em;
}
#nav .tabNav-text {
  padding-top: 0.3em;
  font-size: 0.65em;
}
#nav .router-link-active {
  color: #ff8053;
}
</style>
