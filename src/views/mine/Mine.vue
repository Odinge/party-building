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
          <h2>{{ userInfo.name }}同学</h2>
          <h3>本月打卡{{ userInfo.clockNum }}天</h3>
        </div>
        <div class="mine-user-avatar">
          <img :src="userInfo.userAvatar">
        </div>
      </div>
      <div class="mine-main-content">
        <ul class="mime-content-grid">
          <li>
            <router-link to="/">
              <img src="/images/mine/icon-ge-002.png">
              <h3>智慧党建</h3>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="/images/mine/icon-ge-003.png">
              <h3>我的评价</h3>
            </router-link>
          </li>
          <li>
            <router-link to="/download">
              <img src="/images/mine/icon-ge-005.png">
              <h3>常用下载</h3>
            </router-link>
          </li>
        </ul>
        <div class="mime-content-mv">
          <img src="/images/mine/06.jpg">
        </div>
        <ul class="mime-content-list">
          <li>
            <router-link to="/">
              <img src="/images/mine/icon-qe-005.png">
              <span>我的消息</span>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="/images/mine/icon-qe-006.png">
              <span>我的竞赛</span>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="/images/mine/icon-qe-007.png">
              <span>学习情况</span>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="/images/mine/icon-qe-008.png">
              <span>我的组织</span>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="/images/mine/icon-qe-009.png">
              <span>我的笔记</span>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="/images/mine/icon-qe-010.png">
              <span>我的公益</span>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="/images/mine/icon-qe-011.png">
              <span>我的收藏</span>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="/images/mine/icon-qe-012.png">
              <span>意见反馈</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import * as types from "../../store/types";
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.loadData();
    // 设置头部信息
    this.$store.commit("setHeaderTitle", "");
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    loadData() {

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
  background-image: url("/images/mine/head-bg.png");
  background-size: cover;
  padding: 0.4em 0.8em 1.6em 0.8em;
}
.mine-user-text {
  flex: 1;
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
.mime-content-grid a,
.mime-content-list a {
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
  overflow: hidden;
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
