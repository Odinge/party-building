<!--
 * @Description: 我的
 * @Author: Odinge
 * @Date: 2019-05-12 16:45:12
 * @LastEditTime: 2019-09-14 20:13:54
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="mine">
    <Header class="mine-head" :showMore="true" :center="true">
      <span slot="left">我的</span>
      <router-link to="/setting" class="mine-head-text" slot="right">
        设置
      </router-link>
    </Header>
    <div class="mine-main">
      <div class="mine-main-head">
        <div class="mine-user-text">
          <h2>{{ userInfo.name? userInfo.name+"同学" : "未设置姓名" }}</h2>
          <h3 :class="{red:pStatus}" v-show="!loading">{{punchInStatus}}</h3>
        </div>
        <div class="mine-user-avatar">
          <!-- <img :src="userInfo.userAvatar"> -->
          <img :src="defaultAvatar">
        </div>
      </div>
      <div class="mine-main-content">
        <ul class="mime-content-grid">
          <!-- <li v-for="item in common" :key="item.name"> -->
          <router-link :to="item.path" v-for="item in common" :key="item.name" tag="li">
            <img :src="item.meta.icon">
            <h3>{{item.meta.title}}</h3>
          </router-link>
          <!-- </li> -->
        </ul>
        <div class="mime-content-mv">
          <!-- <video-controls src="/videos/video-1.mp4"></video-controls> -->
          <!-- <img v-lazy="'/img/mine/mine-ad.png'"> -->
          <img src="/img/mine/mine-ad.png">
        </div>
        <ul class="mime-content-list">
          <!-- <li v-for="item in func" :key="item.name"> -->
          <router-link :to="item.path" v-for="item in func" :key="item.name" tag="li">
            <img :src="item.meta.icon">
            <span>{{item.meta.title}}</span>
          </router-link>
          <!-- </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from "../../store/types";
import { mapState } from "vuex";
import { common, func } from "../../router";
import { getPunchInStatus } from "../../api/article";
export default {
  data() {
    return {
      punchInStatus: "未打卡，本日任务未完成",
      pStatus: 1,
      loading: true,
      common,
      func
    }
  },
  created() {
    this.loadData();
    // 设置头部信息
    // this.$store.commit("setHeaderTitle", "");
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    loadData() {
      getPunchInStatus().then(data => {
        this.pStatus = 0;
        this.punchInStatus = "已打卡，本日任务已完成";
        this.loading = false;
      }).catch(err => {
        if (err.code === 400016) {
          this.punchInStatus = err.message;
          this.pStatus = 1;
        } else {
          this.toast1s(err.message)
        }
        this.loading = false;
      });
    }
  },
  activated() {
    this.$store.commit("setHeaderTitle", "");
    const { punchChange } = this.$store.state.contentChange;

    if (punchChange) {
      this.loadData();
      this.$contentChange("punch", false);
    }
  }
}
</script>

<style>
.mine {
  font-size: 4.5vw;
}
.mine-head {
  background-color: #fff;
  color: #000;
  box-shadow: none;
}
.mine-head-text {
  font-size: 0.9em;
  font-weight: bold;
}
.mine-main-head {
  display: flex;
  align-items: center;
  background-image: url("/img/mine/head-bg.png");
  background-size: cover;
  padding: 0.4em 0.8em 1.6em 0.8em;
}
.mine-user-text {
  flex: 1;
  height: 12vw;
}
.mine-user-text h2 {
  color: #fff;
  font-weight: bold;
  margin-bottom: 0.5em;
  font-size: 1.5em;
}
.mine-user-text h3 {
  display: inline-block;
  font-size: 0.85em;
  padding: 0.3em;
  background-color: #fab7ab;
  border-radius: 0.2em;
  color: #fff;
  text-align: center;
}

.mine-user-text .red {
  color: red;
  font-weight: bold;
  background-color: #fff;
}

.mine-user-avatar {
  overflow: hidden;
  width: 20vw;
  height: 20vw;
  border: 0.3em solid #fff;
  border-radius: 50%;
}
.mine-user-avatar img {
  width: 100%;
  height: 100%;
  /* object-fit: contain; */
}
.mine-main-content {
  width: 92vw;
  margin: 1em auto 0;
}

.mime-content-grid,
.mime-content-list {
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-content: space-around;
  padding: 1.2em 0;
}
/* .mime-content-grid a,
.mime-content-list a {
  display: inline-block;
  width: 19vw;
} */
.mime-content-grid li,
.mime-content-list li {
  display: inline-block;
  width: 19vw;
}
.mime-content-grid img {
  width: 70%;
}
.mime-content-grid h3 {
  font-size: 0.85em;
  margin-top: 0.3em;
}
.mime-content-mv {
  height: 30vw;
  /* height: 40vw; */
  overflow: hidden;
  border-radius: 2em;
}
.mime-content-mv img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.mime-content-list {
  flex-wrap: wrap;
  height: 35vw;
}
.mime-content-list span {
  display: block;
  margin-top: 0.5em;
  color: #333333;
  font-size: 0.85em;
}
.mime-content-list img {
  width: 40%;
}
</style>
