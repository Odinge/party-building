<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" class="app-content">
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" success-text="加载成功" class="news-refresh">
      <ul class="con-news">
        <li v-for="(item, key) in list" :key="key">
          <router-link :to="{name:'article', params:{id:item.articleId}}" class="news-thing">
            <div class="news-info">
              <h4 class="figcaption">{{item.title}}</h4>
              <div class="news-op app-flex">
                <span>
                  <van-icon name="fire-o"></van-icon>
                  {{item.viewCount}}
                </span>
                <span>
                  <van-icon name="clock-o"></van-icon>
                  {{item.updatetime | dateFormat}}
                </span>
              </div>
            </div>
            <img :src="item.url" v-lazy="item.url">
          </router-link>
        </li>
      </ul>
    </van-pull-refresh>
  </van-list>
</template>
<script>
import { getHotNews, getLearnNews } from "../../api/article";
export default {
  props: {
    mode: {
      default: 0
    }
  },
  data() {
    return {
      list: [],
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
      const funMap = [getLearnNews, getHotNews]; // 执行函数
      return funMap[this.mode];
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
    }
  }
}
</script>
<style>
.con-news {
  background-color: #fff;
  height: 100%;
  padding-bottom: 4vw;
}
.con-news li {
  padding: 0 4vw;
}
.con-news li:active {
  background-color: rgba(247, 243, 243, 0.705);
}
.con-news .news-thing {
  display: flex;
  padding: 4.5vw 0;
  border-bottom: 0.2vw solid #eee;
  height: 21vw;
}
.news-thing img {
  width: 35%;
  border-radius: 2vw;
}
.news-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 4.5vw;
  margin-right: 5vw;
  margin-top: 1.5vw;
  width: 60%;
}
.news-info h4 {
  line-height: 1.3;
  font-size: 0.88em;
}
.news-op {
  color: #868686;
  font-size: 0.8em;
}
.news-op span {
  display: flex;
}
.news-op span:first-child {
  width: 14vw;
}

.news-op span + span {
  margin-left: 3vw;
}
.news-op span i {
  margin-right: 2vw;
}

.news-refresh {
  overflow: initial;
}
</style>
