<!--
 * @Description: 我的打卡
 * @Author: Odinge
 * @Date: 2019-07-10 15:45:34
 * @LastEditTime: 2019-08-30 01:09:26
 * @LastEditors: Please set LastEditors
 -->
<template>
  <list-load v-model="list" :funMap="funMap" ref="load">
    <ul class="learn">
      <li v-for="item in record" :key="item.recordId" class="learn-item">
        <!-- <router-link :to="{name: 'article', params: {id: item.articleId}}" > -->
        <h3 class="figcaption">第{{item.index}}次打卡</h3>
        <p><span class="learn-time finish-time">打卡时间</span> {{item.punchInTime}}</p>
        <!-- </router-link> -->
      </li>
    </ul>
  </list-load>
</template>

<script>
import { getPunchInRecord } from "../../../api/mine";
export default {
  data() {
    return {
      list: [],
      funMap: [getPunchInRecord],
    }
  },
  computed: {
    record() {
      return this.list.map((item, index, self) => {
        item.index = self.length - index;
        return item;
      });
    }
  }
}
</script>

<style>
.learn {
  background: #f8f8f8;
}
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
