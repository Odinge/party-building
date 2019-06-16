<template>
  <van-popup v-model="show" @opened="opened" @open="open" @close="close" position="bottom">
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
  methods: {
    close() {
      this.$emit("input", false);
      this.$refs.comIpt.blur();
    },
    publish() {
      this.$toast({ duration: 1000, message: "评价成功" });
      this.close();
    },
    opened() {
      this.$refs.comIpt.focus();
    },
    open() {
      // this.$refs.comIpt.focus();
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
}
</style>
