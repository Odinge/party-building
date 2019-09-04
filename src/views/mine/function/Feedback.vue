<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-10 15:43:07
 * @LastEditTime: 2019-09-05 00:42:36
 * @LastEditors: Please set LastEditors
 -->
<!-- 意见反馈 -->
<template>
  <div class="feedback">
    <van-cell-group>
      <van-field v-model="info.title" label="标题" left-icon="label-o" placeholder="请输入标题" />
    </van-cell-group>
    <van-cell-group>
      <van-field v-model="info.contact" label="联系方式" left-icon="comment-o" placeholder="请输入联系方式" />
    </van-cell-group>
    <div class="feed-ipt">
      <div class="textarea placeholder" contenteditable @input="onInput" ref="textarea">
      </div>
      <span class="words">(不少于{{baseWord}}个字) 字数：{{words}}</span>
    </div>
    <!-- <van-uploader :after-read="onRead" :before-read="onBeforeRead" accept="image/gif, image/jpeg, image/png" class="feed-img" multiple>
      <img v-for="(img, index) in imgList" :src="img.url" class="user-avatar" :key="index">
      <div class="box"></div>
    </van-uploader> -->
    <!-- <div class="box" v-show="show"></div> -->
    <footer class="submit">
      <button @click="submit" :disabled="disabled">提交</button>
    </footer>
  </div>
</template>

<script>
import { feedback } from "../../../api/other";
export default {
  data() {
    return {
      info: {
        title: "",
        contact: "",
      },
      content: "",
      baseWord: 5,
      // imgList: []
    }
  },
  computed: {
    words() {
      return this.content.length;
    },
    name() {
      return this.$store.state.userInfo.name;
    },
    disabled() {
      const info = Object.keys(this.formData);
      for (const key of info) {
        const val = this.formData[key];
        if (!val.trim()) {
          return true
        }
      }
      if (this.words < this.baseWord) {
        return true;
      }
      return false;
    },
    formData() {
      return { ...this.info, name: this.name, content: this.content };
    }
  },
  methods: {
    submit() {
      this.$dialog.confirm({
        title: "提示",
        message: "确定反馈信息吗？",
      }).then(() => {
        this.$toast.loading({
          mask: true,
          duration: 0,
          message: '反馈中...'
        });

        feedback(this.formData).then(data => {
          this.$toast.success("反馈成功");
          this.clear();
        }).catch(err => { this.$toast.fail(err.message) });
      }).catch(err => { });
    },
    clear() {
      this.info.title = "";
      const target = this.$refs.textarea;
      target.innerText = this.content = "";
      target.classList.add("placeholder");
    },
    onInput(e) {
      const target = e.srcElement || e.target;
      const val = target.innerText;
      this.content = val;
      if (val) {
        target.classList.remove("placeholder");
      } else {
        target.classList.add("placeholder");
      }
    },
  },
}
</script>

<style>
.feedback {
  background: #f0f0f0;
}
.feed-ipt {
  position: relative;
  height: 28vh;
  background: #fff;
  margin-top: 2vw;
  margin-bottom: 2vw;
  outline: none;
  padding: 1em 1em 1.3em 1em;
}
.words {
  position: absolute;
  right: 1em;
  bottom: 0.2em;
  font-size: 0.8em;
  color: #7c7a7a;
}
.textarea {
  height: 100%;
  outline: none;
  overflow: auto;
}
.placeholder::before {
  position: absolute;
  content: "请填写下你的宝贵的意见或者建议";
  color: #7c7a7a;
}

.feed-img {
  position: relative;
  background: #fff;
  width: 100%;
  height: 33vw;
  margin-bottom: 2vw;
}

.box {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10%;
  margin: auto;
  width: 20vw;
  height: 20vw;
  border: #aaa6a6 dotted 2px;
}
.box::before,
.box::after {
  content: "";
  position: absolute;
  display: block;
  background: #aaa6a6;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
.box::before {
  width: 2%;
  height: 50%;
}
.box::after {
  width: 50%;
  height: 2%;
}
.submit {
  background: #fff;
  text-align: center;
  padding: 5vw 0;
}
.submit button {
  padding: 0.8em 0;
  width: 50%;
  background: #ff8053;
  color: #fff;
}
</style>
