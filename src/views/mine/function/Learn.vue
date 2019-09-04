<!--
 * @Description: 学习情况
 * @Author: Odinge
 * @Date: 2019-07-10 15:45:34
 * @LastEditTime: 2019-09-04 20:11:47
 * @LastEditors: Please set LastEditors
 -->
<template>
  <list-load v-model="list" :funMap="funMap" ref="load" class="bg-f8">
    <ul>
      <router-link v-for="item in list" :key="item.recordId" :to="{name: 'article', params: {id: item.articleId}}" class="learn-item card" tag="li">
        <h3 class="figcaption">{{item.articleTitle}}</h3>
        <p><span class="learn-time">最近打开时间</span> {{item.openTime}}</p>
        <p><span class="learn-time finish-time">阅读完成时间</span> {{item.accomplishTime}}</p>
      </router-link>
    </ul>
  </list-load>
</template>

<script>
import { getPunchInRecord, getStudyRecord } from "../../../api/mine";
export default {
  data() {
    return {
      list: [],
      funMap: [getStudyRecord],
    }
  },
}
</script>

<style>
.learn-item {
  display: flex;
  flex-direction: column;
  padding: 4vw;
  background-color: #fff;
  font-size: 4.5vw;
  margin-bottom: 2vw;
}
.learn-item h3 {
  font-weight: bold;
  line-height: 1.3;
  margin-bottom: 2vw;
}
.learn-item p {
  margin: 1vw;
  font-size: 0.8em;
}
.learn-time {
  display: inline-block;
  padding: 0.3em 0.4em;
  margin-right: 1em;
  background-color: turquoise;
  border-radius: 2em;
  color: #fff;
}
.finish-time {
  background-color: rgb(243, 198, 138);
}
</style>
