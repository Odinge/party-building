<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-21 08:23:04
 * @LastEditTime: 2019-08-24 23:22:30
 * @LastEditors: Please set LastEditors
 -->
<template>
  <ul class="con-dynamics">
    <li v-for="(item, key) in list" :key="key">
      <router-link :to="{name: 'article', params: {id: item.articleId}}" class="dy-thing">
        <img :src="item.url" v-lazy="item.url">
        <!-- <img :src="'/api/image/1.jpg'" v-lazy="'/api/image/1.jpg'"> -->
        <div class="dy-info">
          <h4 class="figcaption">{{item.title}}</h4>
          <div class="dy-op app-flex">
            <!-- <van-icon :name="item.like?'like':'like-o'" @click.capture="item.like=!item.like" :class="{like:item.like}"></van-icon> -->
            <!-- <van-icon :name="item.like?'like':'like-o'"></van-icon> -->
            <span style="width:30%">
              <van-icon name="fire-o"></van-icon>{{+item.viewCount}}
            </span>
            <span>
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
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {

  }
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
/* .prestrain .dy-thing img {
  background-color: #f8f8f8;
} */

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
/* .prestrain .dy-info h4 {
  background-color: #f8f8f8;
} */

.dy-op {
  color: #868686;
  font-size: 0.9em;
}
.dy-op > span {
  display: flex;
  margin-left: 3vw;
}

/* .prestrain .dy-op > span {
  background-color: #f8f8f8;
} */

.dy-op > span i {
  margin-right: 2vw;
}
</style>