<template>
  <section class="container">
    <Header class="pub-head" v-if="meta.showHead">{{ meta.title }}</Header>
    <router-view class="content"></router-view>
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
<style scoped>
.container {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.pub-head {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.4);
}
.content {
  overflow: auto;
  flex: 1;
}
</style>

