<template>
  <router-view id="app" />
</template>

<style>
#app {
  height: 100%;
  width: 100%;
}
img {
  content: normal !important;
}

/* 登录控制 */
.disabled {
  pointer-events: none;
  background-color: #ddd8d8 !important;
  cursor: wait;
}
.success {
  background-color: #46dd88 !important;
}
.van-picker__toolbar .van-picker__cancel,
.van-picker__toolbar .van-picker__confirm {
  color: #f44;
}

/* 公用布局 */
.app-container {
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
