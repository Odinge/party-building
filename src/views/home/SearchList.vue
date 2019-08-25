<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-19 15:38:42
 * @LastEditTime: 2019-08-25 12:52:42
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="search-list app-container">
    <!-- 查询头部 -->
    <search v-model="searchVal"></search>
    <!-- 选项卡 -->
    <van-tabs animated swipeable v-model="mode" class="app-content">
      <van-tab :title="type" v-for="type in listType" :key="type">
        <!-- 加载 -->
        <div class="search-tips" v-if="!searchKey">请搜索...</div>
        <van-list v-else v-model="loading" :finished="finished" :finished-text="tips" @load="onLoad" class="app-content">
          <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" success-text="加载成功">
            <!-- 主体信息 -->
            <notice v-if="mode===0" :list="notice"></notice>
            <dynamics v-else-if="mode===1" :list="dynamics"></dynamics>
            <news-list v-else-if="mode===2" :list="news"></news-list>
            <video-list v-else-if="mode===3" :list="video"></video-list>
            <!-- 主体信息 end -->
          </van-pull-refresh>
        </van-list>
        <!-- 加载 end -->
      </van-tab>
    </van-tabs>
    <!-- 选项 end -->
  </div>
</template>

<script>
import Dynamics from "./Dynamics";
import Notice from "./Notice";
import NewsList from "../news/NewsList";
import VideoList from "../video/VideoList";
import Search from "./Search";

import { searchArticle, getCollectionStatus } from "../../api/article";
export default {
  components: { Dynamics, Notice, NewsList, VideoList, Search },
  data() {
    return {
      searchVal: "", // 搜索关键字
      showTips: true, // 显示搜索提示
      tips: "没有更多了", // 提示信息

      mode: 0,
      list: [], // 获取得到的数据

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
    searchKey() {
      return this.searchVal.trim();
    },
    notice() {
      return this.list.filter(item => item.type === 0);
    },
    dynamics() {
      return this.list.filter(item => item.type === 1);
    },
    news() {
      return this.list.filter(item => [2, 3].includes(item.type));
    },
    video() {
      return this.list.filter(item => item.type === 4);
    },
    // 计算数据标题以及条数
    listType() {
      const listType = [
        { title: "通知", len: this.notice.length },
        { title: "动态", len: this.dynamics.length },
        { title: "新闻", len: this.news.length },
        { title: "视频", len: this.video.length },
      ];

      // let flag = true, mode = this.mode;
      const list = listType.map((item, index) => {
        const len = item.len;
        if (len > 99) len = "99+";

        // if (len > 0 && flag) {
        //   mode = index;
        //   flag = false;
        // }

        return item.title + "(" + len + ")";
      });

      // if (mode === 3 && !lens[3]) mode = this.mode;
      // if (!lens[this.mode]) this.mode = mode;

      return list;
    },
  },
  watch: {
    searchVal(val) {
      this.init();
      if (val.trim()) {
        this.loadData();
      }
    }
  },
  methods: {
    changeList() {
      this.list.forEach(article => {
        if (article.articleId) {
          getCollectionStatus(article.articleId).then(data => {
            this.$set(article, "isCollect", data);
          }).catch(err => {
            this.$toast(err.message);
          });
        }
      });
    },
    init() {
      this.list = []; // 初始化数据
      this.total = 0; // 数据总条数
      this.page = 1; // 数据页数
      // this.isRefresh = false; // 下拉刷新
      // this.loading = false; // 页面数据加载
      this.finished = false; // 全部完成加载
      this.tips = "没有更多了";
    },
    loadFun(page, size) {
      return searchArticle(this.searchKey, page, size);
    },
    // 加载函数
    loadData() {
      this.loadFun(this.page, this.size)
        .then(data => {

          // 重置
          if (!this.searchKey) {
            this.init();
          } else {
            // 是否处于刷新状态
            if (this.isRefresh) {
              this.list = data.rows;
              this.isRefresh = false;
              this.finished = false;
            } else {
              this.list.push(...data.rows);
            }

            this.changeList();

            // 加载状态
            this.loading = false;
            // 计算数据总数
            this.total = data.total;
            // 判断数据是否全部获取完毕
            if (this.page >= this.pages) {
              this.finished = true;
            }
            this.page++;
          }

        }).catch(err => {
          // 错误提示
          this.init();
          this.tips = err.message;
          this.loading = false;
          this.finished = true;
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
      this.searchKey && this.loadData();
    }
  }
}
</script>

<style>
.search-list {
  background: #f8f8f8;
}
.search-tips {
  text-align: center;
  margin: 4vw 0;
  font-size: 0.8em;
  color: #888;
}
</style>
