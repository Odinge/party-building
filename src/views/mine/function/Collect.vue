<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-10 15:39:54
 * @LastEditTime: 2019-08-25 15:47:35
 * @LastEditors: Please set LastEditors
 -->
<!-- 我的收藏 -->
<template>
  <list-load v-model="list" :funMap="funMap" @changeList="changeList">
    <ul class="collection">
      <li v-for="(item,key) in list" :key="key" v-if="item.articleId">
        <router-link :to="{name: 'article', params: {id: item.articleId}}" class="collect-box">
          <h4 class="figcaption">{{item.title}}</h4>
          <p class="collect-content van-ellipsis " v-domtext="item.content"></p>
          <div class="collect-footer app-flex">
            <span>收藏时间：{{item.createTime | dateAllFormat }}</span>
            <span class="van-ellipsis view-count">
              <van-icon name="eye" class="middle"></van-icon>
              {{+item.viewCount}}
            </span>
          </div>
        </router-link>
      </li>
      </li>
    </ul>
  </list-load>
</template>

<script>
import { getAllCollectionRecord, getArticle, cancelCollection } from "../../../api/article";
export default {
  data() {
    return {
      list: [],
      collection: [],
      funMap: [getAllCollectionRecord]
    }
  },
  methods: {
    changeList() {
      this.list.forEach(item => this.getArticle(item));
    },
    // 获取文章
    getArticle(collection) {
      if (collection.articleId) {
        getArticle(collection.articleId).then(data => {
          const keys = Object.keys(data);
          keys.forEach(item => {
            this.$set(collection, item, data[item]);
          });
          this.$set(collection, "isCollect", true);
        }).catch(err => {
          this.$toast(err.message);
        });
      }
    },
  }
}
</script>

<style>
.collection {
  padding-bottom: 2vw;
}
.collection li {
  padding-bottom: 3vw;
  background-color: #f8f8f8;
}
.collect-box {
  display: flex;
  flex-direction: column;
  padding: 4vw;
  background-color: #fff;
  font-size: 4.5vw;
}
.collect-box h4 {
  font-weight: bold;
  line-height: 1.3;
}
.collect-box .collect-content {
  font-size: 0.85em;
  margin: 1em 0 1.5em;
  color: #666666;
}
.collect-box .collect-footer {
  color: #999;
  font-size: 0.8em;
  justify-content: space-between;
}
.collect-op i {
  font-size: 1.3em;
}
.collect-op i:first-of-type {
  margin-right: 0.2em;
}
</style>
