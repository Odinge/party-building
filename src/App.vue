<!--
 * @Description: In User Settings Edit
 * @Author: Odinge
 * @Date: 2019-05-12 13:12:27
 * @LastEditTime: 2019-09-10 20:46:57
 * @LastEditors: Please set LastEditors
 -->
<template>
  <router-view v-if="isRouterAlive" id="app"></router-view>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    // 重新加载函数  inject 注册
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true;
      })
    }
  }
};
</script>

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
.unfinished {
  background: url("/img/comm/unfunction.png") center / cover;
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
.flex {
  display: flex;
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
  word-break: break-all;
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
  background: url("/img/comm/icon-zan.png") center/cover;
  width: 1.1em;
  height: 0.9em;
  transform: translateY(-0.15em);
} */
.app-container .iconfont {
  color: inherit;
  font-size: inherit;
}
#app .van-icon-like {
  color: coral;
}
.hide {
  display: none;
}
.bg-fff {
  background-color: #fff;
}

.middle {
  vertical-align: middle;
}
.center {
  text-align: center;
}
.bg-f8 {
  background-color: #f8f8f8;
}

.card {
  margin: 2vw;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 12px #ebedf0;
}

/* =======================测试相关====================== */
.test-item {
  box-sizing: border-box;
  width: 100%;
  justify-content: space-between;
  padding: 4.5vw;
  border-bottom: 0.2vw solid #eee;
  font-size: 4.5vw;
}
.test-item img {
  width: 18%;
  border-radius: 100%;
}
.test-a {
  width: 78%;
}
.test-info {
  margin-left: 1em;
}
.test-info h4 {
  font-weight: bold;
  color: #555;
}
.test-info p {
  font-size: 0.8em;
  margin-top: 1em;
  color: rgb(133, 131, 131);
}
.test-state {
  width: 17%;
}
.test-state span {
  font-size: 0.8em;
  margin-top: 0.4em;
  color: #444;
}
.test-icon {
  background-size: contain;
  background-position: center;
  width: 1.5em;
  height: 1.5em;
}
.answer-no {
  background-image: url("/img/test/icon-follow-001.jpg");
}
.answer-finished {
  background-image: url("/img/test/icon-follow-002.jpg");
}
.answer-upload {
  background-image: url("/img/test/icon-follow-003.jpg");
}
.answer-past {
  background-image: url("/img/test/icon-follow-004.jpg");
}
.upload-icon {
  background-image: url("/img/test/upload.png");
}
.view-count {
  width: 18vw;
}
</style>
