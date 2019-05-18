<template>
  <ul class="con-dynamics">
    <li v-for="item in datas" :key="item.imgUrl">
      <router-link to="/" class="dy-thing">
        <img :src="item.imgUrl" v-lazy="item.imgUrl">
        <div class="dy-info">
          <h4 class="figcaption">{{item.title}}</h4>
          <div class="dy-op">
            <van-icon :name="item.like?'like':'like-o'" @click="item.like=true" :class="{like:item.like}"></van-icon>
            <span>
              <van-icon name="clock-o"></van-icon><span>{{item.date}}</span>
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
    showNum: {
      default: -1
    }
  },
  data() {
    return {
      list: [
        { imgUrl: "images/home/ad-item001.png", title: "信息工程学院信信息工程学院开展学习雷锋系列活动息工程学院开展学习雷锋系列活动开展学习雷锋系列活动", date: "2017-21-8", like: false },
        { imgUrl: "images/home/ad-item002.png", title: "信息工程学院开展学习雷锋系列活动", date: "2018-2-10", like: false },
        { imgUrl: "images/home/ad-item003.png", title: "信息工程学院开展学习雷锋系列活动", date: "2018-08-4", like: true },
        { imgUrl: "images/home/ad-item004.png", title: "信息工程学院开展学习雷锋系列活动", date: "2019-5-8", like: false },
        { imgUrl: "images/home/ad-item005.png", title: "信息工程学院开展学习雷锋系列活动", date: "2018-1-8", like: false },
      ]
    }
  },
  computed: {
    datas() {
      return this.showNum == -1 ? this.list : this.list.slice(0, this.showNum);
    }
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
}
.dy-info h4 {
  line-height: 1.3;
  font-size: 0.9em;
}
.dy-op {
  display: flex;
  color: #868686;
  font-size: 0.9em;
}
.dy-op > span {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 3vw;
}
.dy-op > span i {
  margin-right: 2vw;
}
.dy-op > span > span {
  line-height: 1.1em;
  transform: translateY(0.12em);
}
.like {
  color: coral;
}
</style>
