<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-26 13:51:12
 * @LastEditTime: 2019-09-14 20:15:07
 * @LastEditors: Please set LastEditors
 -->
<template>
  <van-popup v-model="show" @opened="opened" @close="close" position="bottom">
    <div class="comment-wrap">
      <div class="comment-header">
        <span @click="close">取消</span>
        <span @click="publish" :disabled="disabled">发布</span>
      </div>
      <!-- <input type="text" v-model="comment" class="comment-ipt" :placeholder="placeholder" ref="comIpt"> -->
      <textarea v-model="comment" class="comment-ipt" :placeholder="placeholder" ref="comIpt"></textarea>
      <div class="comment-words">(不少于{{allowedLen}}个字) 字数：{{commentLen}}</div>
    </div>
  </van-popup>
</template>

<script>
import { addComment } from "../api/article";
export default {
  name: "commentInput",
  props: {
    value: {
      required: true
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    target: {
      type: Object,
    }
  },
  data() {
    return {
      show: false,
      comment: "",
      allowedLen: 5,
      // 不允许文本
      unallowedText: ["垃圾", "sb"]
    }
  },
  computed: {
    articleId() {
      return this.$route.params.id;
    },
    commentLen() {
      return this.comment.length;
    },
    disabled() {
      return this.commentLen < this.allowedLen;
    }
  },
  methods: {
    close() {
      this.$emit("input", false);
      this.$refs.comIpt.blur();
    },
    publish() {
      this.$toast.loading({
        mask: true,
        duration: 0,
        message: '评价中...'
      });

      // 去除不允许评价
      const reg = this.unallowedText.map(txt => `(${txt})`).join("|");
      const regexp = new RegExp(reg, "gi");
      const comment = this.comment.replace(regexp, $0 => "*".repeat($0.length));

      // 评价
      this.close();
      addComment(this.articleId, comment).then(data => {
        this.toast1s("评价成功");
        this.$contentChange("comment");
        this.$emit("updateComment", () => {
          this.comment = ''; // 清除评价
        });
      }).catch(err => {
        this.open();
        this.toast1s(err.message);
      });
    },
    opened() {
      this.$refs.comIpt.focus();
    },
    open() {
      this.$emit("input", true);
      this.$refs.comIpt.focus();
    }
  },
  watch: {
    value() {
      this.show = this.value;
    }
  },
}
</script>

<style>
.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5vw;
  color: #f44;
  font-size: 0.9em;
}
.comment-wrap {
  padding: 5vw;
}
.comment-wrap .comment-ipt {
  box-sizing: border-box;
  width: 100%;
  height: 30vw;
  border-radius: 5vw;
  border-color: #ccc;
  overflow: auto;
  font-size: 1em;
}
.comment-words {
  text-align: right;
  margin-top: 2vw;
  font-size: 0.8em;
  color: rgb(233, 122, 122);
}
</style>
