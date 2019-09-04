<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-10 15:37:56
 * @LastEditTime: 2019-09-04 17:07:39
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- <list-load v-model="list" :funMap="funMap" ref="load"> -->
  <ul class="comment-content">
    <li v-for="comment in list" :key="comment.commentId">
      <img :src="defaultAvatar" :alt="comment.name" v-lazy="defaultAvatar">
      <div class="comment-box">
        <div class="comment-info">
          <span class="comment-name van-ellipsis">{{comment.userName}}</span>
          <!-- <span class="comment-zan">
            {{comment.zan}}
            <i class="iconfont icon-zan" :class="comment.isLike?'icon-dianzan1':'icon-zan'" @click="comment.isLike=true"></i>
          </span> -->
          <span class="comment-zan" v-if="comment.userId === userId">
            <van-icon name="delete" @click="deleteComment(comment.commentId)"></van-icon>
          </span>
        </div>
        <!-- <p v-html="comment.content" @click="onComment(comment,'回复 '+comment.userName+' 的观点')"></p> -->
        <p v-html="comment.content"></p>
        <div class="comment-date">
          <span class="comment-time">{{comment.createTime | dateAllFormat}}</span>
          <em>•</em><span>回复</span>
        </div>
      </div>
    </li>
  </ul>
  <!-- </list-load> -->
</template>

<script>
import { deleteComment } from "../api/article";
export default {
  props: {
    list: {
      type: Array
    }
  },
  data() {
    return {
      // funMap: [getAllComment],
      // list: [],
    }
  },
  computed: {
    userId() {
      return this.$store.state.userInfo.sid;
    },
  },
  methods: {
    // 评价
    /* onComment(obj, text) {
      this.target = obj;
      this.placeholder = text;
      this.showComment = true;
    }, */
    // 删除评价
    deleteComment(commentId) {
      this.$dialog.confirm({
        title: "提示",
        message: "确定要删除此评价？",
      }).then(() => {
        this.$toast.loading({
          mask: true,
          duration: 0,
          message: "删除评价中..."
        });
        deleteComment(commentId).then(data => {
          this.$emit("refreshList"); // 刷新列表
        }).catch(err => { this.$toast(err.message) });
      }).catch(err => { });
    }
  }
}
</script>

<style>
/* 评价区 */
.comment-content li {
  display: flex;
  padding: 5vw 0;
  border-top: 1px solid rgb(248, 247, 247);
}
.comment-content li:last-child {
  border-bottom: 1px solid rgb(248, 247, 247);
}
.comment-content img {
  width: 8vw;
  height: 8vw;
  border-radius: 50%;
}
.comment-box {
  margin-left: 4vw;
  flex: 1;
}
.comment-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9em;
}
.comment-name {
  color: rgb(189, 147, 42);
  width: 50vw;
}
.comment-zan {
  color: rgb(179, 179, 179);
}
.comment-box p {
  margin: 4vw 0;
  line-height: 1.5em;
}
.comment-date {
  font-size: 0.8em;
}
.comment-date .comment-time {
  color: rgb(180, 180, 180);
}
.comment-date em {
  margin: 0 1vw;
}
</style>
