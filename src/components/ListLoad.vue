<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-19 23:04:43
 * @LastEditTime: 2019-09-04 09:42:00
 * @LastEditors: Please set LastEditors
 -->
<template>
  <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad" :error.sync="error" :error-text="errorText">
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" :success-text="successText">
      <slot></slot>
    </van-pull-refresh>
  </van-list>
</template>
<script>

export default {
  props: {
    // 加载函数索引
    mode: {
      default: 0
    },
    // 加载还是列表
    funMap: {
      default() {
        return []
      }
    },
    value: {
      default() {
        return []
      }
    },
    successText: {
      default: "加载成功"
    },
  },
  data() {
    return {
      finishedText: "没有更多了", //加载完毕信息
      errorText: "请求失败，点击重新加载",

      isRefresh: false, // 下拉刷新
      loading: false, // 页面数据加载
      finished: false, // 全部完成加载
      error: false, // 加载错误

      total: 0, // 数据总条数
      size: 8, // 数据每页大小
      page: 1, // 数据页数
      pages: 0, // 总页数
    }
  },
  computed: {
    // 加载函数
    loadFun() {
      return this.funMap[this.mode];
    },
  },
  methods: {
    // 初始化
    init() {
      this.finishedText = "没有更多了";
      this.isRefresh = false;
    },

    // 改变加载状态
    changeState(data) {
      // 加载状态
      this.loading = false;
      // 计算数据总数
      this.total = data.total;
      // 总页数
      this.pages = Math.ceil(this.total / this.size);

      // 判断数据是否全部获取完毕
      if (this.page >= this.pages) {
        this.finished = true;
      } else {
        this.finished = false;
        this.page++;
      }
    },

    // 加载函数
    loadData(backcall) {
      this.loadFun(this.page, this.size)
        .then(data => {
          // 获取的数据
          const { rows } = data;

          // 是否处于刷新状态
          if (this.isRefresh || backcall) {
            this.$emit("input", rows);
            this.init();
            (typeof backcall === 'function') && backcall();
          } else {
            this.$emit("input", [...this.value, ...rows]);
          }

          // 外来接口改变数据
          this.$emit("changeList", rows, this);

          // 改变加载状态
          this.changeState(data);

        }).catch(err => {
          this.error = true;
          this.loading = false;
          this.finished = true;
        })
    },

    // 下拉页面刷新加载函数
    onRefresh(backcall = true) {
      // 初始化参数
      this.page = 1;
      this.finishedText = "正在更新...";
      this.loadData(backcall);
    },

    // 上拉加载数据函数
    onLoad() {
      this.loadData(); // 异步更新数据
    }
  }
}
</script>
<style>
</style>
