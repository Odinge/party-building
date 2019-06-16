<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" success-text="加载成功">
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
                  {{item.updatetime}}
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
      list: [
        // { title: "全国青联：建议明确禁止未成年人担任网络主播", updatetime: "2018-11-02", viewCount: 1554, url: "/images/news/news-001.png" },
        // { title: "习近平：做实体经济要实实在在、心无旁骛做主业", updatetime: "2019-1-02", viewCount: 800, url: "/images/news/news-002.png" },
        // { title: "【两会财经快评】建设国家公园 生态经和生意经都要“念”好", updatetime: "2018-01-12", viewCount: 54, url: "/images/news/news-003.png" },
        // { title: "团中央部署开展\"青春心向党·建功新时代\"主题宣传教育实践活动", updatetime: "2018-09-05", viewCount: 4, url: "/images/news/news-004.png" },
        // { title: "划重点！“两高”报告中这些内容与青少年息息相关", updatetime: "2019-5-4", viewCount: 30, url: "/images/news/news-001.png" },
        // { title: "【两会大家谈】政协委员共话快递小哥权益保护及快递发展之路", updatetime: "2018-02-18", viewCount: 104, url: "/images/news/news-002.png" },
        // { title: "【两会青年说】从“月光族”到“月欠族” ，年轻人，你的钱袋子被掏空了吗？", updatetime: "2019-11-02", viewCount: 500, url: "/images/news/news-003.png" },
        // { title: "【两会青年说】从“月光族”到“月欠族” ，年轻人，你的钱袋子被掏空了吗？", updatetime: "2018-1-02", viewCount: 240, url: "/images/news/news-004.png" },
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
</style>
