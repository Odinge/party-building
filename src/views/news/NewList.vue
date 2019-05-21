<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
      <ul class="con-news">
        <li v-for="(item, key) in datas" :key="key">
          <router-link to="/" class="news-thing">
            <div class="news-info">
              <h4 class="figcaption">{{item.title}}</h4>
              <div class="news-op app-flex">
                <span>
                  <van-icon name="fire-o"></van-icon>
                  {{item.readNum}}
                </span>
                <span>
                  <van-icon name="clock-o"></van-icon>
                  {{item.date}}
                </span>
              </div>
            </div>
            <img :src="item.imgUrl" v-lazy="item.imgUrl">
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
        { title: "全国青联：建议明确禁止未成年人担任网络主播", date: "2018-11-02", readNum: 1554, imgUrl: "/images/news/news-001.png" },
        { title: "习近平：做实体经济要实实在在、心无旁骛做主业", date: "2019-1-02", readNum: 800, imgUrl: "/images/news/news-002.png" },
        { title: "【两会财经快评】建设国家公园 生态经和生意经都要“念”好", date: "2018-01-12", readNum: 54, imgUrl: "/images/news/news-003.png" },
        { title: "团中央部署开展\"青春心向党·建功新时代\"主题宣传教育实践活动", date: "2018-09-05", readNum: 4, imgUrl: "/images/news/news-004.png" },
        { title: "划重点！“两高”报告中这些内容与青少年息息相关", date: "2019-5-4", readNum: 30, imgUrl: "/images/news/news-001.png" },
        { title: "【两会大家谈】政协委员共话快递小哥权益保护及快递发展之路", date: "2018-02-18", readNum: 104, imgUrl: "/images/news/news-002.png" },
        { title: "【两会青年说】从“月光族”到“月欠族” ，年轻人，你的钱袋子被掏空了吗？", date: "2019-11-02", readNum: 500, imgUrl: "/images/news/news-003.png" },
        { title: "【两会青年说】从“月光族”到“月欠族” ，年轻人，你的钱袋子被掏空了吗？", date: "2018-1-02", readNum: 240, imgUrl: "/images/news/news-004.png" },
      ],
      isRefresh: false,
      loading: false,
      finished: false,
    }
  },
  computed: {
    datas() {
      return this.mode == 0 ? this.data1 : this.data2;
    },
    data1() {
      return this.list;
    },
    data2() {
      return this.list.slice(3);
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
