<template>
  <section class="app-container">
    <Header class="pub-header" v-if="meta.showHead" :noBack="meta.noBack" :showMore="meta.showMore">{{ meta.title }}</Header>
    <router-view class="app-content"></router-view>
    <Nav v-if="meta.showNav"></Nav>
  </section>
</template>

<script>

import Nav from "../components/nav/Nav";
import Header from "../components/Header";

export default {
  name: "home",
  components: { Nav, Header },
  computed: {
    meta() {
      return this.$route.meta;
    }
  },
};
</script>
<style>
</style>

