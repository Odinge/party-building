<template>
  <ul class="con-notice">
    <li v-for="item in list" :key="item.imgUrl">
      <router-link to="/" class="notice-box">
        <h4 class="figcaption">{{item.title}}</h4>
        <p class="notice-content figcaption-1 ">{{item.content}}</p>
        <div class="notice-footer app-flex">
          <span>{{item.publisher}}</span>
          <div class="app-flex notice-op">
            <span class="app-flex">
              <van-icon name="eye"></van-icon>
              {{item.watchNum}}
            </span>
            <span class="app-flex">
              <i class="van-icon icon-zan"></i>
              {{item.praiseNum}}
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

  }
}
</script>

<style>
.con-notice {
  padding-bottom: 2vw;
}
.con-notice li {
  padding-bottom: 3vw;
  background-color: #f8f8f8;
}
.notice-box {
  display: flex;
  flex-direction: column;
  padding: 4vw;
  background-color: #fff;
  font-size: 4.5vw;
}
.notice-box h4 {
  font-weight: bold;
  line-height: 1.3;
}
.notice-box .notice-content {
  font-size: 0.85em;
  margin: 1em 0 1.5em;
  color: #666666;
}
.notice-box .notice-footer {
  color: #999;
  font-size: 0.8em;
  justify-content: space-between;
}
.notice-op span {
  width: 13vw;
}
.notice-op i {
  font-size: 1.3em;
}
.notice-op i:first-of-type {
  margin-right: 0.2em;
}

.icon-zan::before {
  content: "";
  background: url("/images/home/icon-zan.png") center/cover;
  width: 1.1em;
  height: 0.9em;
  transform: translateY(-0.15em);
}
</style>
