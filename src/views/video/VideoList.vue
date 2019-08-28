<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-19 21:45:41
 * @LastEditTime: 2019-08-28 14:55:26
 * @LastEditors: Please set LastEditors
 -->
<template>
  <ul class="app-content video-list">
    <li v-for="item in list" :key="item.articleId" class="list-item">
      <!-- 视屏控制区 -->
      <div class="video-play">
        <video-controls :src="item.url"></video-controls>
        <!-- <span class="tag-top">TOP{{index+1}}</span> -->
        <!-- <span class="tag-comment"></span> -->
        <!-- <span class="tag-msg van-ellipsis">{{item.msg}}</span> -->
      </div>
      <div class="flex">
        <!-- 视屏信息区 -->
        <router-link :to="{name:'article', params:{id:item.articleId}}" class="video-info">
          <!-- 主题 -->
          <div class="app-flex">
            <h4 class="van-ellipsis">{{item.title}}</h4>
            <em class="read-num van-ellipsis">阅读量：{{item.viewCount}}</em>
          </div>
          <!-- 内容 -->
          <p class="figcaption" v-domtext="item.content"></p>
        </router-link>
        <!-- 视频操作区 -->
        <div class="video-op app-flex-col flex-1">
          <van-icon class="collect" :name="item.isCollect?'like':'like-o'" @click="collect(item)"></van-icon>
          <!-- :disabled="item.isCollect === undefined" -->
          <span class="tag-comment" @click="toComment(item)"></span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { addCollection, cancelCollection, getCollectionStatus } from "../../api/article";
export default {
  props: {
    list: {
      default() {
        return []
      }
    }
  },
  /* watch: {
    list() {
    this.changeList();
    }
  }, */
  methods: {
    // 去评价
    toComment(item) {
      this.$router.push(
        {
          name: 'article',
          params: { id: item.articleId },
          query: { openComment: 1 }
        }
      );

    },
    // 收藏
    collect(article) {
      if (article.isCollect === undefined) {
        this.toast1s("当前项收藏数据未获取完，请稍后收藏！");
        return false;
      }
      const obj = [
        { fun: addCollection, success: "已收藏" },
        { fun: cancelCollection, success: "已取消收藏" },
      ][+article.isCollect];
      obj.fun(article.articleId).then(() => {
        article.isCollect = !article.isCollect;
        this.toast1s(obj.success);
      }).catch(err => {
        this.toast1s(err.message);
      });
    },
    // 改变数据获取收藏状态
    /*  changeList() {
       this.list.forEach(article => {
         if (article.articleId) {
           getCollectionStatus(article.articleId).then(data => {
             this.$set(article, "isCollect", data);
           }).catch(err => {
             this.$toast(err.message);
           });
         }
       });
     }, */
  }
}
</script>

<style>
.video-list {
  font-size: 4vw;
}
.list-item {
  display: block;
  margin: 4vw;
  padding: 3.8vw;
  background-color: #fff;
  box-shadow: 0 0 4px rgb(226, 221, 221);
}
.video-play {
  position: relative;
  width: 100%;
  height: 45vw;
}
/* 显示组件 */
.tag-top {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.3em 1em;
  font-size: 0.9em;
  font-weight: bold;
  background-color: #e54a00;
  color: #fff;
}
/* 评论 */
.tag-comment {
  /* position: absolute; */
  /* bottom: 4%; */
  /* left: 2%; */
  width: 2em;
  height: 2em;
  /* background: rgba(247, 74, 6, 0.712) url("/images/video/comment.png") */
  background: #ff8053 url("/images/video/comment.png") center/58% no-repeat;
  border-radius: 50%;
}
/* 弹幕信息 */
.tag-msg {
  position: absolute;
  bottom: 3%;
  right: 2%;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0.3em 0.5em;
  font-size: 0.9em;
  font-weight: 700;
  border-radius: 1em;
  max-width: 75%;
}
/* 视屏简介 */
.video-info {
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.video-info div {
  margin: 5vw 0 2.5vw;
  display: flex;
}
.video-info h4 {
  width: 70%;
  font-weight: bold;
  font-size: 1.3em;
  color: rgb(66, 65, 65);
}
.video-info p {
  font-size: 0.9em;
  margin-bottom: 2vw;
  line-height: 1.4;
}
.video-op * {
  margin-top: 0.5em;
}
.collect {
  font-size: 2em;
  color: rgb(78, 77, 77);
}
.read-num {
  margin-left: 0.5em;
  width: 40%;
  color: #5d9ce5;
}
</style>
