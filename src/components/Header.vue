<template>
  <header class="app-header">
    <div class="app-header-left" v-show="!hideRight">
      <template v-if="!noBack">
        <slot name="left">
          <i class="iconfont icon-return" @click="back"></i>
        </slot>
      </template>
    </div>
    <div class="app-header-title" :class="{ center }">
      <slot>
      </slot>
    </div>
    <div class="app-header-right center" v-show="!hideRight" @touchstart="onMore">
      <template v-if="showMore">
        <slot name="right">
          <van-icon name="ellipsis"></van-icon>
        </slot>
      </template>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    noBack: {
      type: Boolean,
      default: false
    },
    showMore: {
      type: Boolean,
      default: false
    },
    center: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    onMore() {
      this.$emit('more');
    }
  },
  computed: {
    hideRight() {
      return !this.showMore && this.noBack;
    }
  }
}
</script>

<style>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 8%;
  background-color: #ff8053;
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
}
.app-header-left {
  font-size: 1rem;
  width: 12%;
}
.app-header-title {
  flex: 1;
}
.app-header-right {
  width: 12%;
}
.app-header-right .van-icon-ellipsis {
  font-size: 1.5rem;
  line-height: 0;
  font-weight: bold !important;
  transform: translateY(1.6vw);
}
.icon-return {
  font-size: 1rem;
  font-weight: normal;
}
.center {
  text-align: center;
}
</style>
