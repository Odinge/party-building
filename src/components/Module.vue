<!--
 * @Description: 模块
 * @Author: Odinge
 * @Date: 2019-09-14 09:18:03
 * @LastEditTime: 2019-09-14 15:53:54
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div v-show="value" class="module" style="z-index: 2020;">
    <div class="module-box">
      <div class="module-content" :class="{c:mode}">
        <img :src="imgMap[mode]" alt="打卡">
        <h3 v-show="title">{{ title }}</h3>
        <h4 v-show="subtitle">{{ subtitle }}</h4>
        <p v-show="content">{{ content }}</p>
      </div>
      <van-icon name="close" class="btn-close" v-show="showCloseButton" @click="onShow" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    subtitle: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
    mode: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      imgMap: ["/img/comm/punch.png", "/img/comm/punch-c.png"]
    }
  },
  methods: {
    // 显示隐藏模态框
    onShow() {
      this.$emit("input", !this.value);
    }
  }
}
</script>

<style>
.module {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
.module-box {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  width: 60%;
  margin: auto;
  text-align: center;
  transform: translateY(-50%);
}
.module-content {
  padding: 5vw;
  background-color: #fde7de;
  border-radius: 4vw;
}
.module-box .module-content.c {
  background-color: #fcf8dc;
}
.module-content img {
  height: 30vw;
}
.module-content h3 {
  margin: 0.6em 0 0.8em;
  font-size: 1.3em;
  font-weight: bold;
}
.module-content h4 {
  margin: 0.8em 0;
}
.module-content p {
  margin-bottom: 3vw;
  font-size: 0.8em;
  color: rgb(63, 63, 63);
}
.btn-close {
  margin-top: 4vw;
  font-size: 2em;
  color: rgb(192, 189, 189);
}
</style>