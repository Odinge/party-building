<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" class="">
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <ul class="app-content video-list">
        <li v-for="(item, index) in datas" :key="index">
          <router-link to="/video" class="list-item ">
            <div class="video-play">
              <!--  poster="/images/video/seal-001.jpg" -->
              <video ref="video" preload="metadata">
                <source :src="item.videoUrl" type="video/mp4">
                <p>Your browser doesn't support HTML5 video. Here is
                  a <a :href="item.videoUrl">link to the video</a> instead.</p>
              </video>
              <div ref="videoControls" class="controls">
                <span class="tag-top">TOP{{index+1}}</span>
                <!-- <span class="tag-playpause tag-play abs-center" @click="play(index)"></span> -->
                <span class="tag-playpause tag-pause abs-center" @click="play($event,index)"></span>
                <span class="tag-comment"></span>
                <span class="tag-msg van-ellipsis">{{item.msg}}</span>
              </div>
            </div>
            <div class="video-info">
              <div class="app-flex">
                <h4 class="van-ellipsis">{{item.title}}</h4>
                <span class="app-flex">
                  <em class="collect" :class="{collected:item.isCollect}">收藏</em>
                  <em class="read-num">阅读量：{{item.readNum}}</em>
                </span>
              </div>
              <p class="van-ellipsis">{{item.content}}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </van-pull-refresh>
  </van-list>
</template>

<script>
export default {
  props: {
    mode: {
      default: 0
    }
  },
  data() {
    return {
      list: [
        { title: "大运河智慧街区智慧街区慧街区", content: "清河-香山 建筑面积33~45㎡", videoUrl: "/videos/video-1.mp4", msg: "老***昨天收藏了大运河智慧街区", isCollect: true, readNum: 23 },
        { title: "世界区域街区", content: "清河-香山 建筑面积33~45㎡", videoUrl: "/videos/video-2.mp4", msg: "老***昨天收藏了大运河智慧街区", isCollect: true, readNum: 2 },
        { title: "杭州街区", content: "清河-香山 建筑面积33~45㎡", videoUrl: "/videos/video-3.mp4", msg: "老***昨天收藏了大运河智慧街区昨天收藏了大运河智慧街区昨天收藏了大运河智慧街区", isCollect: false, readNum: 101 },
      ],
      isRefresh: false,
      loading: false,
      finished: false,
    }
  },
  computed: {
    datas() {
      const dataMap = [
        this.data1,
        this.data2,
        this.data3,
        this.data4
      ];
      return dataMap[this.mode];
    },
    data1() {
      return this.list;
    },
    data2() {
      return this.list.slice(3);
    },
    data3() {
      return this.list.slice(2);
    },
    data4() {
      return this.list.slice(1);
    }
  },
  methods: {
    loadData() {

    },
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
      }, 1000);
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list[i]);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 20) {
          this.finished = true;
        }
      }, 500);
    },
    play(e, index) {
      const video = this.$refs.video[index];
      if (video.paused || video.ended) video.play();
      else video.pause();
    }
  }
}
</script>

<style>
.video-list {
  /* background-color: #f5f5f5; */
  font-size: 4vw;
}
em {
  font-style: normal;
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
.video-play video {
  width: 100%;
  height: 100%;
  vertical-align: middle;
  outline: none;
  object-fit: fill;
}
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
.tag-playpause {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 2.5em;
  height: 2.5em;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 0.13em solid #fff;
  box-shadow: 0 0 2px #000;
}
.tag-play::before {
  content: "";
  border: 0.5em solid transparent;
  border-left-color: #fff;
  border-right: none;
  border-left-width: 0.8em;
  margin-left: 10%;
}
.tag-pause::before {
  content: "";
  width: 0.4em;
  height: 1em;
  border-left: 0.3em solid #fff;
  border-right: 0.3em solid #fff;
  border-radius: 0.1em;
}
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
.video-info {
  line-height: 1.1em;
}
.video-info div {
  margin: 5vw 0 2vw;
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
.van-tabs__wrap {
  top: 46px !important;
  margin-top: -46px;
}
</style>
