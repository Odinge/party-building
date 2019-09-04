<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-17 13:39:48
 * @LastEditTime: 2019-09-04 18:46:52
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="con-title">
    <h3>
      <slot>{{label}}</slot>
    </h3>
    <router-link :to="to" class="con-more">
      <span>更多</span>
      <van-icon name="arrow"></van-icon>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["moreTo", "label"],
  computed: {
    to() {
      return {
        name: 'more',
        params: { title: encodeURI(this.label), compName: this.moreTo }
      };

    }
  }
}
</script>

<style scoped>
.con-title {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4.5vw 4vw;
  background-color: #f8f8f8;
  font-size: 4.5vw;
}

.con-title::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  height: 43%;
  width: 0.3em;
  margin: auto;
  background-color: #ff8053;
  border-radius: 0.3em;
}
.con-title h3 {
  font-weight: bold;
  font-size: 1em;
}
.con-more {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(145, 142, 142);
  font-size: 0.7em;
}
/* .con-more span {
} */
</style>
