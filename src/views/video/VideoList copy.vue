<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-19 21:45:41
 * @LastEditTime: 2019-08-25 11:00:34
 * @LastEditors: Please set LastEditors
 -->
<template>
  <ul class="app-content video-list">
    <li v-for="(item, index) in list" :key="index" class="list-item">
      <!-- 视屏控制区 -->
      <div class="video-play">
        <video-controls :src="item.url"></video-controls>
        <!-- <span class="tag-top">TOP{{index+1}}</span> -->
        <!-- <span class="tag-comment"></span> -->
        <!-- <span class="tag-msg van-ellipsis">{{item.msg}}</span> -->
      </div>
      <!-- 视屏信息区 -->
      <router-link :to="{name:'article', params:{id:item.articleId}}" class="video-info">
        <!-- 主题 -->
        <div class="app-flex">
          <h4 class="van-ellipsis">{{item.title}}</h4>
          <span class="app-flex flex-1">
            <!-- <em class="collect" :class="{collected:item.isCollect}">收藏</em> -->
            <em class="read-num van-ellipsis">阅读量：{{item.viewCount}}</em>
            <span class="tag-comment"></span>
            <van-icon class="collect" :name="item.isCollect?'like':'like-o'" @click="collect(item)"></van-icon>
          </span>
        </div>
        <!-- 内容 -->
        <p class="van-ellipsis" v-domtext="item.content"></p>
      </router-link>
    </li>
  </ul>
</template>

<script>
import { addCollection, cancelCollection } from "../../api/article";
export default {
  props: {
    list: {
      default() {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {},
  methods: {
    collect(article) {
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
  position: absolute;
  bottom: 4%;
  left: 2%;
  width: 2.5em;
  height: 2.5em;
  background: rgba(0, 0, 0, 0.6) url("/images/video/comment.png") center/60%
    no-repeat;
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
  display: block;
}
.video-info div {
  margin: 5vw 0 2.5vw;
  display: flex;
}
.video-info h4 {
  width: 60%;
  font-weight: bold;
  font-size: 1.2em;
  color: rgb(66, 65, 65);
}
.video-info span {
  font-size: 0.9em;
}
.video-info em {
  padding: 0.2em;
}
.video-info p {
  font-size: 0.9em;
  margin-bottom: 2vw;
}
.collect {
  font-size: 2em;
  color: rgb(59, 58, 58);
}
/* .collect {
  color: #918e8d;
  background: #dfdfdf;
}
.collected {
  color: #f48359;
  background: #fbe2d8;
} */
.read-num {
  margin-left: 0.3em;
  /* width: 6em; */
  width: 70%;
  /* background: #e7f7fd; */
  color: #5d9ce5;
}
</style>
