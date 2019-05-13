<template>
  <header class="header">
    <div class="back" @click="back" v-if="isBack">
      <i class="iconfont icon-return"></i>
    </div>
    <slot>
    </slot>
    <div class="share" v-if="isShare">
      <i class="iconfont"></i>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    isBack: {
      type: Boolean,
      default: true
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

<style scoped>
.header {
  position: relative;
  display: flex;
  align-items: center;
  background: #ff8053;
  color: #fff;
  padding: 15px 0;
  font-size: 0.9rem;
  font-weight: bold;
}
.back {
  padding: 0 20px;
}
.icon-return {
  font-size: 1.3rem;
  font-weight: normal;
}
</style>
