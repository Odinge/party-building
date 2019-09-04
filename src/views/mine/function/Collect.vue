<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-10 15:39:54
 * @LastEditTime: 2019-09-04 20:20:24
 * @LastEditors: Please set LastEditors
 -->
<!-- 我的收藏 -->
<template>
  <list-load v-model="list" :funMap="funMap" @changeList="changeList" class="collect-load bg-f8" ref="load">
    <ul class="collection">
      <li v-for="item in collections" :key="item.articleId" class="card">
        <router-link :to="{name: 'article', params: {id: item.articleId}}" class="collect-box" :disabled="item.isDelete === true">
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
    </ul>
  </list-load>
</template>

<script>
import { getAllCollectionRecord, getArticle } from "../../../api/article";
// import VideoList from "../../video/VideoList";
export default {
  // components: { VideoList },
  data() {
    return {
      list: [],
      funMap: [getAllCollectionRecord]
    }
  },
  computed: {
    collections() {
      return this.list.filter(item => item.articleId && !item.isDelete);
    },
  },
  methods: {
    // 获取文章
    changeList(list, that) {
      that.finishedText = "正在加载...";
      list.forEach((collection, index) => {
        this.$set(collection, "isDelete", true);
        if (collection.articleId) {
          getArticle(collection.articleId).then(data => {
            that.finishedText = "没有更多了";
            const keys = Object.keys(data);
            keys.forEach(item => {
              this.$set(collection, item, data[item]);
            });
            this.$set(collection, "isDelete", false);

          }).catch(err => {
            this.$set(collection, "title", "该文章已被删除");
            if (list.length < 2) {
              that.finishedText = "没有更多了";
            }
          });
        } else {
          if (list.length < 2) {
            that.finishedText = "没有更多了";
          }
        }
      });
      if (list.length === 0) {
        that.finishedText = "没有更多了";
      }
    },
  },
  activated() {
    this.$changeRefresh("article");
  }
}
</script>

<style>
.collect-load .van-pull-refresh__head {
  /* background-color: #fff; */
  background-color: #f8f8f8;
}
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
  line-height: 1.2em;
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
