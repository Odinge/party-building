<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-21 08:26:58
 * @LastEditTime: 2019-08-26 15:59:45
 * @LastEditors: Please set LastEditors
 -->
<template>
  <ul class="con-notice">
    <li v-for="(item,key) in list" :key="key">
      <router-link :to="{name: 'article', params: {id: item.articleId}}" class="notice-box">
        <h4 class="figcaption">{{item.title}}</h4>
        <p class="notice-content van-ellipsis " v-domtext="item.content"></p>
        <div class="notice-footer app-flex">
          <span class="van-ellipsis" style="width:45%">{{item.author}}</span>
          <div class="app-flex notice-op">
            <span class="van-ellipsis view-count">
              <van-icon name="eye" class="middle"></van-icon>
              {{+item.viewCount}}
            </span>
            <!-- <span class="app-flex">
              <i class="iconfont icon-dianzan1"></i>
              {{item.praiseNum}}
            </span> -->
            <span class="app-flex con-time">
              <van-icon name="clock-o"></van-icon>{{item.updatetime | dateFormat}}
            </span>
          </div>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    }
  },
}
</script>

<style>
.con-notice {
  padding-bottom: 2vw;
}
.con-notice li {
  padding-bottom: 3vw;
  background-color: #f8f8f8;
}
.notice-box {
  display: flex;
  flex-direction: column;
  padding: 4vw;
  background-color: #fff;
  font-size: 4.5vw;
}
.notice-box h4 {
  font-weight: bold;
  line-height: 1.3;
}
.notice-box .notice-content {
  font-size: 0.85em;
  margin: 1em 0 1.5em;
  color: #666666;
}
.notice-box .notice-footer {
  color: #999;
  font-size: 0.8em;
  justify-content: space-between;
}
.notice-op {
  width: 50%;
}
.notice-op i {
  font-size: 1.3em;
}
.notice-op i:first-of-type {
  margin-right: 0.3em;
}
.con-time {
  margin-left: 0.6em;
}
</style>
