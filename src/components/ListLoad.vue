<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-19 23:04:43
 * @LastEditTime: 2019-08-31 19:57:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <van-list v-model="loading" :finished="finished" :finished-text="finishedText" @load="onLoad">
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" :success-text="successText">
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
    },
    finishedText: {
      default: "没有更多了"
    },
    successText: {
      default: "加载成功"
    }
  },
  data() {
    return {
      isRefresh: false, // 下拉刷新
      loading: false, // 页面数据加载
      finished: false, // 全部完成加载

      total: 0, // 数据总条数
      size: 8, // 数据每页大小
      page: 1, // 数据页数
      pages: 0, // 总页数
    }
  },
  computed: {
    loadFun() {
      return this.funMap[this.mode];
    },
    // pages() {
    //   return Math.ceil(this.total / this.size);
    // },
  },
  methods: {
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
        this.page++;
      }
    },

    // 加载函数
    loadData(backcall) {
      this.loadFun(this.page, this.size)
        .then(data => {
          // 是否处于刷新状态
          if (this.isRefresh || backcall) {
            this.$emit("input", data.rows);
            this.isRefresh = false;
            this.finished = false;
            (typeof backcall === 'function') && backcall();
          } else {
            this.$emit("input", [...this.value, ...data.rows]);
          }

          // 外来接口改变数据
          const isChange = this.$emit("changeList", data.rows);
          // console.log(isChange);


          // 改变加载状态
          this.changeState(data);

        }).catch(err => {
          this.toast1s(err.message);
          this.loading = false;
          this.finished = true;
        })
    },

    // 下拉页面刷新加载函数
    onRefresh(backcall = true) {
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
