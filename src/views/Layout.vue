<template>
  <section class="app-container">
    <Header class="pub-header" v-if="meta.showHead" :noBack="meta.noBack">{{ meta.title }}</Header>
    <router-view class="app-content"></router-view>
    <Nav v-if="meta.showNav"></Nav>
  </section>
</template>

<script>
// @ is an alias to /src
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
.app-container {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.pub-header {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
}
.app-content {
  overflow: auto;
  flex: 1;
}
</style>

