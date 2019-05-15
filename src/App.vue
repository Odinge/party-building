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
</style>
