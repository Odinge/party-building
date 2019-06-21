<template>
  <router-view id="app" />
</template>

<style>
body {
  font-size: 4.5vw;
}
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
  opacity: 0.5;
}
.success {
  background: linear-gradient(90deg, #82efac, #42c26c) !important;
}
.van-picker__toolbar .van-picker__cancel,
.van-picker__toolbar .van-picker__confirm {
  color: #f44;
}

.van-pull-refresh {
  overflow: initial;
}

.van-pull-refresh__track {
  height: 100%;
}
.van-tabs__content {
  height: 100%;
}

/* 公用布局 */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.pub-header {
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
  z-index: 88;
}
.app-content {
  overflow: auto;
  height: 100%;
  flex: 1;
}
.flex-1 {
  flex: 1;
}
.abs-center {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

.figcaption {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  font-weight: normal;
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
  align-items: center;
}
.app-flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.white {
  color: #000 !important;
  background-color: #fff !important;
}
/* .icon-zan::before {
  content: "";
  background: url("/images/home/icon-zan.png") center/cover;
  width: 1.1em;
  height: 0.9em;
  transform: translateY(-0.15em);
} */
.iconfont {
  color: inherit;
  font-size: inherit;
}
.van-icon-like {
  color: coral;
}
</style>
