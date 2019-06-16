<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" success-text="加载成功">
      <ul class="test-list">
        <li v-for="(item, key) in list" :key="key">
          <a href="#" class="test-item app-flex">
            <img src="/images/test/dangqi.png" alt="问卷">
            <div class="test-info">
              <h4 class="van-ellipsis">{{item.title}}</h4>
              <p class="van-ellipsis">{{item.updatetime}}</p>
            </div>
            <div class="test-state app-flex-col">
              <i class="test-icon" :class="answerMap[item.answerState].class"></i>
              <span>{{answerMap[item.answerState].text}}</span>
            </div>
          </a>
        </li>
      </ul>
    </van-pull-refresh>
  </van-list>
</template>
<script>
import { getQuestionnaire } from "../../api/questionnaire";
export default {
  data() {
    return {
      list: [
        // { url: "/images/test/dangqi.png", title: "第九周学习测评", updatetime: "同学们多看新闻,好好答题", answerState: 1 },
        // { url: "/images/test/dangqi.png", title: "第八周学习测评", updatetime: "同学们多看新闻,好好答题", answerState: 1 },
        // { url: "/images/test/dangqi.png", title: "第七周学习测评", updatetime: "同学们多看新闻,好好答题", answerState: 1 },
        // { url: "/images/test/dangqi.png", title: "第六周学习测评", updatetime: "同学们多看新闻,好好答题", answerState: 1 },
        // { url: "/images/test/dangqi.png", title: "第五周学习测评", updatetime: "同学们多看新闻,好好答题", answerState: 0 },
        // { url: "/images/test/dangqi.png", title: "第四周学习测评", updatetime: "同学们多看新闻,好好答题", answerState: 2 },
        // { url: "/images/test/dangqi.png", title: "第三周学习测评", updatetime: "同学们多看新闻,好好答题", answerState: 0 },
        // { url: "/images/test/dangqi.png", title: "第二周学习测评", updatetime: "同学们多看新闻,好好答题", answerState: 0 },
        // { url: "/images/test/dangqi.png", title: "第一周学习测评", updatetime: "同学们多看新闻,好好答题", answerState: 0 },
      ],
      answerMap: [
        { class: "answer-finished", text: "已答题" },
        { class: "answer-no", text: "未解答" },
        { class: "answer-past", text: "已过期" },
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
    pages() {
      return Math.ceil(this.total / this.size);
    },
  },
  methods: {
    // 加载函数
    loadData() {
      getQuestionnaire(this.page, this.size)
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

  }
}
</script>
<style>
.test-list {
  padding-bottom: 1em;
}
.test-item {
  justify-content: space-between;
  padding: 4.5vw;
  border-bottom: 0.2vw solid #eee;
  font-size: 4.5vw;
}
.test-item img {
  width: 18%;
  border-radius: 100%;
}
.test-info {
  flex: 1;
  margin-left: 1em;
}
.test-info h4 {
  font-weight: bold;
  color: #555;
}
.test-info p {
  font-size: 0.8em;
  margin-top: 1em;
  color: rgb(133, 131, 131);
}
.test-state {
  width: 15%;
}
.test-state span {
  font-size: 0.8em;
  margin-top: 0.4em;
  color: #444;
}
.test-icon {
  background-size: contain;
  background-position: center;
  width: 1.5em;
  height: 1.5em;
}
.answer-finished {
  background-image: url("/images/test/icon-follow-002.jpg");
}
.answer-no {
  background-image: url("/images/test/icon-follow-001.jpg");
}
.answer-past {
  background-image: url("/images/test/icon-follow-003.jpg");
}
</style>
