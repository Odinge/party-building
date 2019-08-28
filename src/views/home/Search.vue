<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-17 13:12:07
 * @LastEditTime: 2019-08-28 11:13:35
 * @LastEditors: Please set LastEditors
 -->
<template>
  <Header class="pub-header search-header" :onHideRight="!mode" :noBack="!mode">
    <div class="app-search">
      <van-icon name="search" />
      <input v-if="mode" class="ipt" type="text" placeholder="请输入搜索的内容" v-model="searchVal" ref="ipt">
      <template v-else>
        <div @click="toSearch" class="ipt ipt-rep">请输入搜索的内容</div>
        <button @click="toSearch" class="btn-search">搜索</button>
      </template>
      <van-icon name="close" v-show="showClear" class="btn-clear" @click="clear"></van-icon>
    </div>
  </Header>
</template>

<script>
export default {
  props: {
    mode: {
      default: 1
    },
    value: {
      default: ""
    }
  },
  data() {
    return {
      searchVal: "" // 查询值做中间值
    }
  },
  // 进入页面获取焦点
  activated() {
    this.mode && this.getFocus();
  },
  computed: {
    // 是否显示清除文字
    showClear() {
      return this.searchVal.trim();
    }
  },
  watch: {
    searchVal(value) {
      this.changeVal(value);
    }
  },
  methods: {
    // 清除搜索文字
    clear() {
      this.searchVal = "";
      this.getFocus();
    },
    // 获取焦点
    getFocus() {
      this.$refs.ipt.focus();
    },
    // 进入查询页面
    toSearch() {
      this.$emit('toSearch');
    },
    changeVal(value) {
      this.$emit("input", value);
      this.$emit("changeSearch", value);
    }
  }
}
</script>

<style>
.app-search {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(223, 206, 206, 0.5);
  padding: 1.5vw;
  border-radius: 5vw;
}
.search-box {
  display: flex;
}
.app-search .ipt {
  width: 60%;
  margin-left: 1rem;
  margin-right: 1rem;
  background-color: transparent;
  -web-kit-appearance: none;
  -moz-appearance: none;
}
.btn-clear {
  position: absolute;
  right: 1rem;
}
.app-search .ipt-rep {
  color: rgb(235, 230, 230);
  font-size: 0.9em;
  text-align: left;
}
.search-header {
  padding-top: 2.5vw;
  padding-bottom: 2.5vw;
}
.btn-search {
  background: none;
}
.app-search input::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: rgb(235, 230, 230);
  font-size: 0.9em;
}
.app-search input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: rgb(235, 230, 230);
  font-size: 0.9em;
}
.app-search input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgb(235, 230, 230);
  font-size: 0.9em;
}
.app-search input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: rgb(235, 230, 230);
  font-size: 0.9em;
}
</style>
