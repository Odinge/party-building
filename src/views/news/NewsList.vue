<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-19 09:58:18
 * @LastEditTime: 2019-08-25 15:43:15
 * @LastEditors: Please set LastEditors
 -->
<template>
  <ul class="con-news">
    <li v-for="(item, key) in list" :key="key">
      <router-link :to="{name:'article', params:{id:item.articleId}}" class="news-thing">
        <div class="news-info">
          <h4 class="figcaption">{{item.title}}</h4>
          <div class="news-op app-flex">
            <span class="van-ellipsis view-count">
              <van-icon name="fire-o" class="middle"></van-icon>
              {{+item.viewCount}}
            </span>
            <span>
              <van-icon name="clock-o"></van-icon>
              {{item.updatetime | dateFormat}}
            </span>
          </div>
        </div>
        <img :src="item.url" v-lazy="item.url">
      </router-link>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    list: {
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  computed: {

  },
  methods: {

  }
}
</script>
<style>
.con-news {
  height: 100%;
  padding-bottom: 4vw;
}
.con-news li {
  padding: 0 4vw;
  background: #fff;
}
.con-news li:active {
  background-color: rgba(247, 243, 243, 0.705);
}
.con-news .news-thing {
  display: flex;
  padding: 4.5vw 0;
  border-bottom: 0.2vw solid #eee;
  height: 21vw;
}
.news-thing img {
  width: 35%;
  border-radius: 2vw;
}
.news-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 4.5vw;
  margin-right: 5vw;
  margin-top: 1.5vw;
  width: 60%;
}
.news-info h4 {
  line-height: 1.3;
  font-size: 0.88em;
}
.news-op {
  color: #868686;
  font-size: 0.8em;
}
/* .news-op span {
  display: flex;
} */
/* .news-op span:first-child {
  width: 16vw;
} */

.news-op span + span {
  margin-left: 3vw;
}
.news-op span i {
  margin-right: 2vw;
}
</style>
