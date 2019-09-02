<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-19 15:38:42
 * @LastEditTime: 2019-09-02 10:02:04
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="search-list app-container">
    <!-- 查询头部 -->
    <search v-model="searchVal" @changeSearch="changeSearch"></search>
    <!-- 选项卡 start -->
    <!-- <div class="search-tips" v-if="!searchKey">请搜索...</div>
    <list-load v-else v-model="list" :funMap="funMap" @changeList="changeList" class="app-content" ref="load">
      <van-tabs animated swipeable v-model="mode">
        <van-tab :title="type.title" v-for="(type, key) in listType" :key="key">
          <component :is="type.compName" :list="result[type.compName]"></component>
        </van-tab>
      </van-tabs>
    </list-load> -->
    <van-tabs animated v-model="mode">
      <van-tab :title="type" v-for="(type, key) in listType" :key="key">
      </van-tab>
    </van-tabs>
    <div class="search-tips" v-if="!searchKey">请搜索...</div>
    <list-load v-else v-model="list" :funMap="funMap" @changeList="changeList" :successText="successText" class="app-content" ref="load">
      <component :is="searchCompName" :list="result[searchCompName]"></component>
    </list-load>
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
      successText: "加载成功",
      mode: 0,
      list: [], // 获取得到的数据
      config: [ // 配置信息
        { title: "通知", compName: "Notice", type: [0] },
        { title: "动态", compName: "Dynamics", type: [1] },
        { title: "新闻", compName: "NewsList", type: [2, 3] },
        { title: "视频", compName: "VideoList", type: [4] },
      ]
    }
  },
  computed: {
    // 加载函数映射表
    funMap() {
      const loadFun = searchArticle.bind(this, this.searchKey);
      return [loadFun];
    },
    searchKey() {
      return this.searchVal.trim();
    },
    result() {
      const result = {};
      this.config.forEach(config => {
        result[config.compName] = this.list.filter(item => config.type.includes(item.type));
      });
      return result;
    },
    // 使用的是组件
    searchCompName() {
      return this.config[this.mode].compName;
    },
    // 计算数据标题以及条数
    listType() {
      const list = this.config.map((item, index) => {
        let len = this.result[item.compName].length;
        if (len > 99) len = "99+";
        return item.title + "(" + len + ")";
      });
      return list;
    },
    articleChange() {
      return this.$store.state.articleChange;
    }
  },
  methods: {
    // 初始化数据
    init() {
      this.list = [];
    },
    // 改变搜索
    changeSearch(vlaue) {
      this.init();
      if (vlaue.trim()) {
        const load = this.$refs.load || [];
        if (load.length > 0) {
          // 刷新列表数据
          load[0].onRefresh();
        }
      }
    },
    // 改变列表
    changeList(list) {
      this.successText = "";
      list.forEach(article => {
        getCollectionStatus(article.articleId).then(data => {
          this.$set(article, "isCollect", data);
          this.successText = "加载成功";
        }).catch(err => {
          this.successText = "加载成功";
          this.$toast(err.message);
        });
      });
    },
  },
  activated() {
    if (this.articleChange) {
      this.list = [];
      this.$refs.load.onRefresh();
      this.$store.commit("SET_ARTICLE_CHANGE", false); // 文章改变
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
