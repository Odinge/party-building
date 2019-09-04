<!--
 * @Description: 我的打卡
 * @Author: Odinge
 * @Date: 2019-07-10 15:45:34
 * @LastEditTime: 2019-09-04 20:06:54
 * @LastEditors: Please set LastEditors
 -->
<template>
  <list-load v-model="list" :funMap="funMap" ref="load" class="bg-f8">
    <ul>
      <li v-for="item in record" :key="item.recordId" class="punch-item card">
        <h3 class="figcaption">第{{item.index}}次打卡</h3>
        <p><span class="punch-time finish-time">打卡时间</span> {{item.punchInTime}}</p>
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
.punch-item {
  display: flex;
  flex-direction: column;
  padding: 4vw;
  background-color: #fff;
  font-size: 4.5vw;
  margin-bottom: 2vw;
}
.punch-item h3 {
  font-weight: bold;
  line-height: 1.3;
  margin-bottom: 2vw;
}
.punch-item p {
  margin: 1vw;
  font-size: 0.8em;
}
.punch-time {
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
