<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-26 13:51:12
 * @LastEditTime: 2019-08-23 14:04:58
 * @LastEditors: Please set LastEditors
 -->
<template>
  <van-popup v-model="show" @opened="opened" @close="close" position="bottom">
    <div class="comment-wrap">
      <div class="comment-header">
        <span @click="close">取消</span>
        <span @click="publish">发布</span>
      </div>
      <!-- <input type="text" v-model="comment" class="comment-ipt" :placeholder="placeholder" ref="comIpt"> -->
      <textarea v-model="comment" class="comment-ipt" :placeholder="placeholder" ref="comIpt"></textarea>
    </div>
  </van-popup>
</template>

<script>
import { addComment } from "../api/article";
export default {
  name: "comment",
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
      comment: ""
    }
  },
  computed: {
    articleId() {
      return this.$route.params.id;
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
      this.close();
      addComment(this.articleId, this.comment).then(data => {
        this.$toast({ duration: 1000, message: "评价成功" });
        this.$emit("updateComment", () => {
          this.comment = ''; // 清除评价
        });
      }).catch(err => {
        this.open();
        this.$toast({ duration: 1000, message: err.message });
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
</style>
