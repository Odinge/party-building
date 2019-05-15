<template>
  <header class="app-header">
    <div class="app-back" @click="back" v-show="!noBack">
      <i class="iconfont icon-return"></i>
    </div>
    <div class="app-title">
      <slot>
      </slot>
    </div>
    <div class="app-share" v-show="isShare">
      <i class="iconfont"></i>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    noBack: {
      type: Boolean,
      default: false
    },
    isShare: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
}
</script>

<style>
.app-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ff8053;
  color: #fff;
  padding: 15px 0;
  font-size: 0.9rem;
  font-weight: bold;
}
.app-back {
  padding: 0 20px;
}

.app-title {
  flex: 1;
}
.icon-return {
  font-size: 1.3rem;
  font-weight: normal;
}
</style>
