<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-12 13:12:27
 * @LastEditTime: 2019-08-24 13:52:15
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section class="app-container">
    <Header class="pub-header" v-if="meta.showHead" :noBack="meta.noBack" :showMore="meta.showMore" :class="meta.className">{{ meta.title }}</Header>
    <!-- <transition :name="transitionName"> -->
    <keep-alive>
      <router-view v-if="meta.keepAlive" class="app-content" :class="{prestrain}"></router-view>
    </keep-alive>
    <router-view v-if="!meta.keepAlive" class="app-content" :class="{prestrain}"></router-view>
    <!-- </transition> -->
    <Nav v-if="meta.showNav"></Nav>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "home",
  data() {
    return {
      transitionName: ""
    }
  },
  computed: {
    meta() {
      return this.$route.meta;
    },
    ...mapState(["prestrain"])
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  }
};
</script>
<style>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-right-enter-active {
  transition: all 0.3s ease;
}
.slide-right-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
/* .slide-fade-leave-active for below version 2.1.8 */
.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>

