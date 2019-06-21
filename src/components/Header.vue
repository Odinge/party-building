<template>
  <header class="app-header">
    <div class="app-header-left" v-show="!hideRight">
      <template v-if="!noBack">
        <slot name="left">
          <!-- <i class="iconfont icon-return" @click="back"></i> -->
          <van-icon name="arrow-left" @click="back"></van-icon>
        </slot>
      </template>
    </div>
    <div class="app-header-title figcaption-1" :class="{ center }">
      <slot>
        {{headerTitle}}
      </slot>
    </div>
    <div class="app-header-right right" v-show="!hideRight && onHideRight" @touchstart="onMore">
      <template v-if="showMore">
        <slot name="right">
          <van-icon name="ellipsis"></van-icon>
        </slot>
      </template>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
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
    onHideRight: {
      type: Boolean,
      default: true
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
    },
    ...mapState(["headerTitle"])
  }
}
</script>

<style>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9em 8%;
  background-color: #ff8053;
  color: #fff;
  font-size: 1em;
  font-weight: bold;
  font-size: 4.5vw;
}
.app-header-left {
  font-size: 1em;
  width: 12%;
}
.app-header-title {
  flex: 1;
}
.app-header-right {
  width: 12%;
}
.app-header-right .van-icon-ellipsis {
  font-size: 1.5em;
  line-height: 0;
  font-weight: bold !important;
  transform: translateY(1.6vw);
}
.icon-return {
  font-size: 1em;
  font-weight: normal;
}
.center {
  text-align: center;
}
.right {
  text-align: right;
}
</style>
