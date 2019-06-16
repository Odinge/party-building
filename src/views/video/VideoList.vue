<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" success-text="加载成功">
      <ul class="app-content video-list">
        <li v-for="(item, index) in list" :key="index" class="list-item">
          <!-- 视屏控制区 -->
          <div class="video-play">
            <video-controls :src="item.url"></video-controls>
            <span class="tag-top">TOP{{index+1}}</span>
            <span class="tag-comment"></span>
            <!-- <span class="tag-msg van-ellipsis">{{item.msg}}</span> -->
          </div>
          <!-- 视屏信息区 -->
          <router-link :to="{name:'article', params:{id:item.articleId}}" class="video-info">
            <!-- 主题 -->
            <div class="app-flex">
              <h4 class="van-ellipsis">{{item.title}}</h4>
              <span class="app-flex">
                <em class="collect" :class="{collected:item.isCollect}">收藏</em>
                <em class="read-num">阅读量：{{item.viewCount}}</em>
              </span>
            </div>
            <!-- 内容 -->
            <p class="van-ellipsis" v-domtext="item.content"></p>
          </router-link>
        </li>
      </ul>
    </van-pull-refresh>
  </van-list>
</template>

<script>
import { getVideos } from "../../api/article";
export default {
  props: {
    mode: {
      default: 0
    }
  },
  data() {
    return {
      list: [
        // { title: "大运河智慧街区智慧街区慧街区", content: "清河-香山 建筑面积33~45㎡", url: "/videos/video-1.mp4", msg: "老***昨天收藏了大运河智慧街区", isCollect: true, viewCount: 23 },
        // { title: "世界区域街区", content: "清河-香山 建筑面积33~45㎡", url: "/videos/video-2.mp4", msg: "老***昨天收藏了大运河智慧街区", isCollect: true, viewCount: 2 },
        // { title: "杭州街区", content: "清河-香山 建筑面积33~45㎡", url: "/videos/video-3.mp4", msg: "老***昨天收藏了大运河智慧街区昨天收藏了大运河智慧街区昨天收藏了大运河智慧街区", isCollect: false, viewCount: 101 },
      ],
      isRefresh: false, // 下拉刷新
      loading: false, // 页面数据加载
      finished: false, // 全部完成加载
      total: 0, // 数据总条数
      page: 1, // 数据页数
      size: 8, // 数据每页大小
    }
  },
  computed: {
    loadFun() {
      // const funMap = [getLearnNews, getHotNews]; // 执行函数
      // return funMap[this.mode];
      return getVideos;
    },
    pages() {
      return Math.ceil(this.total / this.size);
    },
  },
  methods: {
    // 加载函数
    loadData() {
      this.loadFun(this.page, this.size)
        .then(data => {
          // 是否处于刷新状态
          if (this.isRefresh) {
            this.list = data.rows;
            this.isRefresh = false;
            this.finished = false;
          } else {
            this.list.push(...data.rows);
          }
          // 加载状态
          this.loading = false;
          // 计算数据总数
          this.total = data.total;
          // 判断数据是否全部获取完毕
          if (this.page >= this.pages) {
            this.finished = true;
          }
          this.page++;
        }).catch(err => {
          this.$toast(err.message);
          this.loading = false;
        })
    },
    // 下拉页面刷新加载函数
    onRefresh() {
      // 初始化参数
      this.page = 1;
      this.loadData();
    },
    // 上拉加载数据函数
    onLoad() {
      // 异步更新数据
      this.loadData();
    },

    // 播放
    play(e, index) {
      const target = e.target;
      const video = this.$refs.video[index];
      if (video.paused || video.ended) {
        target.classList.remove("tag-play");
        target.classList.add("tag-pause");
        video.play();
      } else {
        target.classList.remove("tag-pause");
        target.classList.add("tag-play");
        video.pause();
      }
    }
  }
}
</script>

<style>
.video-list {
  font-size: 4vw;
}
.list-item {
  display: block;
  margin: 4vw;
  padding: 3.8vw;
  background-color: #fff;
  box-shadow: 0 0 4px rgb(226, 221, 221);
}
.video-play {
  position: relative;
  width: 100%;
  height: 45vw;
}
/* 显示组件 */
.tag-top {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.3em 1em;
  font-size: 0.9em;
  font-weight: bold;
  background-color: #e54a00;
  color: #fff;
}
/* 评论 */
.tag-comment {
  position: absolute;
  bottom: 4%;
  left: 2%;
  width: 2.5em;
  height: 2.5em;
  background: rgba(0, 0, 0, 0.6) url("/images/video/comment.png") center/60%
    no-repeat;
  border-radius: 50%;
}
/* 弹幕信息 */
.tag-msg {
  position: absolute;
  bottom: 3%;
  right: 2%;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0.3em 0.5em;
  font-size: 0.9em;
  font-weight: 700;
  border-radius: 1em;
  max-width: 75%;
}
/* 视屏简介 */
.video-info {
  display: block;
}
.video-info div {
  margin: 5vw 0 2.5vw;
  display: flex;
}
.video-info h4 {
  width: 60%;
  font-weight: bold;
  font-size: 1.2em;
  color: rgb(66, 65, 65);
}
.video-info span {
  font-size: 0.9em;
}
.video-info em {
  padding: 0.2em;
}
.video-info p {
  font-size: 0.9em;
  margin-bottom: 2vw;
}
.collect {
  color: #918e8d;
  background: #dfdfdf;
}
.collected {
  color: #f48359;
  background: #fbe2d8;
}
.read-num {
  margin-left: 0.3em;
  /* width: 6em; */
  background: #e7f7fd;
  color: #5d9ce5;
}
/* .van-tabs__wrap {
  top: 46px !important;
  margin-top: -46px;
} */
</style>
