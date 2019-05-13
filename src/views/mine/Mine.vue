<template>
  <div class="mine">
    <Header class="mine-head" :isBack="false">
      <span class="mine-head-text">设置</span>
    </Header>
    <div class="mine-main">
      <div class="mine-main-head">
        <div class="mine-user-text">
          <h2>{{ userInfo.username }}</h2>
          <h3>本月打卡{{ userInfo.count }}天</h3>
        </div>
        <div class="mine-user-img">
          <router-link to="/">
            <img src="images/user.png">
          </router-link>
        </div>
      </div>
      <div class="mine-main-content">
        <ul class="mime-content-grid">
          <li>
            <router-link to="/">
              <img src="images/icon-ge-002.png">
              <h3>智慧党建</h3>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="images/icon-ge-003.png">
              <h3>我的评价</h3>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="images/icon-ge-005.png">
              <h3>常用下载</h3>
            </router-link>
          </li>
        </ul>
        <div class="mime-content-mv">
          <img src="images/06.jpg">
        </div>
        <ul class="mime-content-list">
          <li>
            <router-link to="/">
              <img src="images/icon-qe-005.png">
              <span>我的消息</span>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="images/icon-qe-006.png">
              <span>我的竞赛</span>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="images/icon-qe-007.png">
              <span>学习情况</span>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="images/icon-qe-008.png">
              <span>我的组织</span>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="images/icon-qe-009.png">
              <span>我的笔记</span>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="images/icon-qe-010.png">
              <span>我的公益</span>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="images/icon-qe-011.png">
              <span>我的收藏</span>
            </router-link>
          </li>
          <li>
            <router-link to="/">
              <img src="images/icon-qe-012.png">
              <span>意见反馈</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: { Header },
  data() {
    return {
      userInfo: {
        username: "张山山同学",
        count: 13,
        headImg: "images/user.png"
      }
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {

    }
  }
}
</script>

<style scoped>
.mine-head {
  background-color: #fff;
  color: #000;
  box-shadow: none;
}
.mine-head-text {
  padding-left: 2rem;
  font-size: 0.9rem;
  font-weight: bold;
}
.mine-main-head {
  display: flex;
  align-items: center;
  background-image: url("/images/head-bg.png");
  background-size: cover;
  padding: 0.4em 0.8em 1.6em 0.8em;
}
.mine-user-text {
  flex: 1;
}
.mine-user-text h2 {
  color: #fff;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}
.mine-user-text h3 {
  display: inline-block;
  font-size: 0.85rem;
  padding: 0.3rem;
  background-color: #fab7ab;
  border-radius: 0.2rem;
  color: #fff;
  text-align: center;
}
.mine-user-img {
  width: 20vw;
  height: 20vw;
  /* background-image: url("images/user.png"); */
  /* background-size: cover; */
  border: 0.3em solid #fff;
  border-radius: 50%;
}
.mine-user-img img {
  width: 100%;
}
.mine-main-content {
  width: 92vw;
  margin: 1rem auto 0;
}

.mime-content-grid,
.mime-content-list {
  display: flex;
  justify-content: space-around;
  text-align: center;
  align-content: space-around;
  padding: 1.2rem 0;
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
  font-size: 0.85rem;
  margin-top: 0.3rem;
}
.mime-content-mv {
  height: 30vw;
  overflow: hidden;
}
.mime-content-mv img {
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
}
.mime-content-list {
  flex-wrap: wrap;
  height: 35vw;
}
.mime-content-list span {
  display: block;
  margin-top: 0.5rem;
  color: #333333;
  font-size: 0.85rem;
}
.mime-content-list img {
  width: 40%;
}
</style>
