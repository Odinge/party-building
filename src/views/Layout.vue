<template>
  <section class="app-container">
    <Header class="pub-header" v-if="meta.showHead" :noBack="meta.noBack" :showMore="meta.showMore" :class="meta.className">{{ meta.title }}</Header>
    <transition>
      <router-view class="app-content"></router-view>
    </transition>
    <Nav v-if="meta.showNav"></Nav>
  </section>
</template>

<script>

export default {
  name: "home",
  computed: {
    meta() {
      return this.$route.meta;
    }
  },
};
</script>
<style>
</style>

