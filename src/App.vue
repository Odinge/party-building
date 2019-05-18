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
  object-fit: cover;
}

/* 登录控制 */
.disabled,
[disabled="disabled"] {
  pointer-events: none;
  /* background-color: #ddd8d8 !important; */
  cursor: wait;
  opacity: 0.5;
}
.success {
  /* background-color: #4aee99 ; */
  background: linear-gradient(90deg, #82efac, #42c26c) !important;
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
.figcaption {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
}
.figcaption-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  display: -webkit-box;
}
.app-flex {
  display: flex;
  align-items: center;
  /* vertical-align: middle; */
}
.app-flex-col {
  display: flex;
  flex-direction: column;
}
.app-flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
