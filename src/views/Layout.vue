<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-12 13:12:27
 * @LastEditTime: 2019-09-10 21:13:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section class="app-container">
    <Header class="pub-header" v-if="meta.showHead" :noBack="meta.noBack" :showMore="meta.showMore" :class="meta.className">{{ meta.title }}</Header>
    <keep-alive>
      <router-view v-if="meta.keepAlive" class="app-content"></router-view>
    </keep-alive>
    <router-view v-if="!meta.keepAlive" class="app-content"></router-view>
    <Nav v-if="meta.showNav"></Nav>
  </section>
</template>

<script>
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
  },
  // watch: {
  //   $route(to, from) {
  //     const toDepth = to.path.split('/').length;
  //     const fromDepth = from.path.split('/').length;
  //     this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
  //   }
  // }
};
</script>

