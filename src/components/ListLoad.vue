<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-19 23:04:43
 * @LastEditTime: 2019-08-23 19:34:37
 * @LastEditors: Please set LastEditors
 -->
<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" success-text="加载成功">
      <slot></slot>
    </van-pull-refresh>
  </van-list>
</template>
<script>

export default {
  props: {
    mode: {
      default: 0
    },
    funMap: {
      default() {
        return []
      }
    },
    value: {
      default() {
        return []
      }
    }
  },
  data() {
    return {
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
      return this.funMap[this.mode];
    },
    pages() {
      return Math.ceil(this.total / this.size);
    },
  },
  methods: {
    // 加载函数
    loadData(backcall) {
      this.loadFun(this.page, this.size)
        .then(data => {
          // 是否处于刷新状态
          if (this.isRefresh || backcall) {
            this.$emit("input", data.rows);
            this.isRefresh = false;
            this.finished = false;
            backcall && backcall();
          } else {
            this.$emit("input", [...this.value, ...data.rows]);
          }

          this.$emit("changeList");

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
    onRefresh(backcall) {
      // 初始化参数
      this.page = 1;
      this.loadData(backcall);
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
</style>
