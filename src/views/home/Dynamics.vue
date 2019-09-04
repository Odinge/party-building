<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-21 08:23:04
 * @LastEditTime: 2019-09-04 16:26:34
 * @LastEditors: Please set LastEditors
 -->
<template>
  <ul class="con-dynamics">
    <li v-for="item in list" :key="item.articleId">
      <router-link :to="{name: 'article', params: {id: item.articleId}}" class="dy-thing">
        <img :src="item.url" v-lazy="item.url">
        <!-- <img :src="'/api/image/1.jpg'" v-lazy="'/api/image/1.jpg'"> -->
        <div class="dy-info">
          <h4 class="figcaption">{{item.title}}</h4>
          <div class="dy-op app-flex">
            <!-- <van-icon :name="item.like?'like':'like-o'" @click.capture="item.like=!item.like" :class="{like:item.like}"></van-icon> -->
            <!-- <van-icon :name="item.like?'like':'like-o'"></van-icon> -->
            <span class="van-ellipsis" style="width:36%">
              <van-icon name="fire-o" class="middle"></van-icon>{{+item.viewCount}}
            </span>
            <span class="app-flex">
              <van-icon name="clock-o" class="middle"></van-icon>{{item.updatetime | dateFormat}}
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
  /* margin: 4vw; */
  border-bottom: 0.2vw solid #eee;
  height: 22.5vw;
}
.dy-thing img {
  width: 35%;
  height: 100%;
  border-radius: 2vw;
  margin-right: 5vw;
  /* object-fit: contain; */
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
  margin-left: 2vw;
}

.dy-op > span i {
  margin-right: 2vw;
}
</style>