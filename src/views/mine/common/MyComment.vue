<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-10 15:37:56
 * @LastEditTime: 2019-08-23 15:24:59
 * @LastEditors: Please set LastEditors
 -->
<template>
  <list-load v-model="comments" :funMap="funMap" ref="load">
    <ul class="comment-content" style="padding: 4vw;">
      <li v-for="(comment, key) in comments" :key="key" v-if="comment.userId === sid">
        <img :src="defaultAvatar" :alt="comment.name" v-lazy="defaultAvatar">
        <div class="comment-box">
          <div class="comment-info">
            <span class="comment-name van-ellipsis">{{comment.userName}}</span>
            <!-- <span class="comment-zan">
            {{comment.zan}}
            <i class="iconfont icon-zan" :class="comment.isLike?'icon-dianzan1':'icon-zan'" @click="comment.isLike=true"></i>
          </span> -->
            <span class="comment-zan">
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
  </list-load>
</template>

<script>
import { getAllComment, deleteComment } from "../../../api/article";
export default {
  data() {
    return {
      funMap: [getAllComment],
      comments: [],
    }
  },
  computed: {
    sid() {
      return this.$store.state.userInfo.sid;
    }
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
        title: '提示',
        message: "确定要删除此评价？",
        confirmButtonColor: "#f44"
      }).then(() => {

        const load = this.$refs.load;


        this.$toast.loading({
          mask: true,
          duration: 0,
          message: '删除评价中...'
        });
        deleteComment(commentId).then(data => {

          load.onRefresh(() => {
            this.toast1s("已删除评价");
          });
        }).catch(err => { this.$toast(err.message) });
      }).catch(err => { });

    }
  }
}
</script>

<style>
/* 评价区 */
.comment-content {
  background-color: #fff;
}
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
