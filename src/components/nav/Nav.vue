<template>
  <nav id="nav">
    <router-link to="/home">
      <i class="iconfont icon-shouye tabNav-icon"></i>
      <h3 class="tabNav-text">首页</h3>
    </router-link>
    <router-link to="/news">
      <i class="iconfont icon-xinwen tabNav-icon"></i>
      <h3 class="tabNav-text">要闻</h3>
    </router-link>
    <router-link to="/video">
      <i class="iconfont icon-shipin tabNav-icon"></i>
      <h3 class="tabNav-text">视频</h3>
    </router-link>
    <router-link to="/test">
      <i class="iconfont icon-pingjia tabNav-icon"></i>
      <h3 class="tabNav-text">测评</h3>
    </router-link>
    <router-link to="/mine">
      <i class="iconfont icon-wode1 tabNav-icon"></i>
      <h3 class="tabNav-text">我的</h3>
    </router-link>
  </nav>
</template>
<script>
export default {
}
</script>
<style scoped>
#nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.4rem 0;
  background: #f9f9f9;
  border-top: 1px solid #eee;
}
#nav a {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
#nav .tabNav-icon {
  font-size: 1.3rem;
}
#nav .tabNav-text {
  padding-top: 0.3rem;
  font-size: 0.65rem;
}
#nav .router-link-active {
  color: #ff8053;
}
</style>
