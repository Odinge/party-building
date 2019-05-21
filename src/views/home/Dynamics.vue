<template>
  <ul class="con-dynamics">
    <li v-for="(item, key) in list" :key="key">
      <router-link to="/" class="dy-thing">
        <img :src="item.imgUrl" v-lazy="item.imgUrl">
        <div class="dy-info">
          <h4 class="figcaption">{{item.title}}</h4>
          <div class="dy-op app-flex">
            <van-icon :name="item.like?'like':'like-o'" @click="item.like=true" :class="{like:item.like}"></van-icon>
            <span>
              <van-icon name="clock-o"></van-icon>{{item.date}}
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
      default: []
    }
  },
  data() {
    return {

    }
  },
  computed: {

  },
  mounted() {
    // ajax请求数据
    this.loadData();
  },
  methods: {
    loadData() {

    },
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
  /* height: 35%; */
  border-radius: 2vw;
  margin-right: 5vw;
  /* object-fit: cover; */
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
.like {
  color: coral;
}
</style>
