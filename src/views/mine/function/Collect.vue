<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-10 15:39:54
 * @LastEditTime: 2019-08-23 22:51:18
 * @LastEditors: Please set LastEditors
 -->
<!-- 我的收藏 -->
<template>
  <list-load v-model="list" :funMap="funMap" @changeList="changeList">
    <ul class="con-notice">
      <li v-for="(item,key) in list" :key="key" v-if="item.articleId">
        <router-link :to="{name: 'article', params: {id: item.articleId}}" class="notice-box">
          <h4 class="figcaption">{{item.title}}</h4>
          <p class="notice-content van-ellipsis " v-domtext="item.content"></p>
          <div class="notice-footer app-flex">
            <span>收藏时间：{{item.createTime | dateAllFormat }}</span>
            <div class="app-flex notice-op">
              <span class="app-flex">
                <van-icon name="eye"></van-icon>
                {{+item.viewCount}}
              </span>
            </div>
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
.notice-op span {
  width: 13vw;
}
.notice-op i {
  font-size: 1.3em;
}
.notice-op i:first-of-type {
  margin-right: 0.2em;
}
</style>
