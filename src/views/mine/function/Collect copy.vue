<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-10 15:39:54
 * @LastEditTime: 2019-08-23 22:53:01
 * @LastEditors: Please set LastEditors
 -->
<!-- 我的收藏 -->
<template>
  <list-load v-model="list" :funMap="funMap" ref="load" @changeList="changeList">
    <ul class="con-dynamics collection">
      <li v-for="item in list" :key="item.collectionId" v-if="item.articleId" class="dy-thing">
        <img :src="item.url" v-lazy="item.url">
        <div class="dy-info">
          <div class="flex">
            <router-link :to="{name: 'article', params: {id: item.articleId}}" class="flex-1">
              <h4 class="figcaption">{{item.title}}</h4>
            </router-link>
            <van-icon :name="item.isCollect?'like':'like-o'" @click="collect(item)"></van-icon>
          </div>
          <div class="dy-op app-flex">
            <span>
              <van-icon name="clock-o"></van-icon>{{item.createTime | dateAllFormat}}
            </span>
          </div>
        </div>
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
    // 收藏
    collect(article) {
      this.$toast.loading({
        mask: true,
        duration: 0,
        message: '取消中...'
      });
      cancelCollection(article.articleId).then(() => {
        const load = this.$refs.load;
        article.isCollect = !article.isCollect;
        load.onRefresh(() => {
          this.toast1s("已取消收藏");
        });
      }).catch(err => {
        this.toast1s(err.message);
      });
    },
  }
}
</script>

<style>
.collection {
  padding: 0 4vw;
}
.con-dynamics {
  background-color: #fff;
}
.con-dynamics li {
  padding: 0 4vw;
}
.con-dynamics li:active {
  background-color: rgba(247, 243, 243, 0.705);
}
.con-dynamics .dy-thing {
  display: flex;
  padding: 4.5vw 0;
  border-bottom: 0.2vw solid #eee;
  height: 22.5vw;
}
.dy-thing img {
  width: 35%;
  height: 100%;
  border-radius: 2vw;
  margin-right: 5vw;
}

.dy-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 4.5vw;
  width: 60%;
}
.dy-info h4 {
  line-height: 1.3;
  font-size: 0.93em;
}

.dy-op {
  color: #868686;
  font-size: 0.9em;
}
.dy-op > span {
  display: flex;
  margin-left: 3vw;
}

.dy-op > span i {
  margin-right: 2vw;
}
.collection .flex i {
  font-size: 1.2em;
}
</style>
