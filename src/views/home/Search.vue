<template>
  <Header class="pub-header search-header" :noBack="true">
    <div class="app-search">
      <van-icon name="search" />
      <input type="text" placeholder="请输入搜索的内容" v-model="searchVal">
      <a href="" @touchstart="onSearch">搜索</a>
    </div>
  </Header>

</template>

<script>
export default {
  data() {
    return {
      searchVal: "",
    }
  },
  methods: {
    onSearch() {

    }
  }
}
</script>

<style>
.app-search {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(223, 206, 206, 0.5);
  padding: 1.5vw;
  border-radius: 5vw;
}
.app-search input {
  width: 60%;
  margin-left: 1rem;
  margin-right: 1rem;
  background-color: transparent;
  -web-kit-appearance: none;
  -moz-appearance: none;
}
.search-header {
  padding-top: 2.5vw;
  padding-bottom: 2.5vw;
}

input::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: rgb(235, 230, 230);
  font-size: 0.9em;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgb(235, 230, 230);
  font-size: 0.9em;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgb(235, 230, 230);
  font-size: 0.9em;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgb(235, 230, 230);
  font-size: 0.9em;
}
</style>
