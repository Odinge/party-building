<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" success-text="加载成功">
      <div class="download">
        <table class="download-table">
          <thead>
            <tr>
              <th class="No">#</th>
              <th class="file-name">文件</th>
              <th class="file-op">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(file, index) in list" :key="index">
              <td>{{index+1}}</td>
              <td>
                <span class="van-ellipsis file-box">{{file.fileName}}</span>
              </td>
              <td>
                <a :href="getDowenloadUrl(file.fileId)">
                  <van-icon name="description"></van-icon>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </van-pull-refresh>
  </van-list>
</template>

<script>
import { getDocumentFiles } from "../../../api/file";
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      isRefresh: false,
      total: 0,
      page: 1,
      size: 8
    }
  },
  mounted() {
    // this.loadData();
  },
  computed: {
    pages() {
      return Math.ceil(this.total / this.size);
    }
  },
  methods: {
    // 下拉刷新
    onRefresh() {
      // 初始化参数
      this.page = 1;
      this.loadData();
    },
    onLoad() {
      this.loadData();
    },
    // 加载下载文件数据
    loadData() {
      getDocumentFiles(this.page, this.size)
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
    // 下载链接
    getDowenloadUrl(fileId) {
      return this.$baseUrl + "/file/download?fileId=" + fileId;
    }
  }
}
</script>

<style>
.download {
  padding: 2vw;
}
.download-table {
  width: 100%;
  text-align: center;
}
.download-table tr {
  border-bottom: 0.2vw solid #eee;
  height: 12vw;
}
.download-table td {
  vertical-align: middle;
}
.download-table th {
  vertical-align: middle;
  font-weight: bold;
}
.download-table .No {
  width: 14vw;
}
.download-table .file-op {
  width: 20vw;
}
.file-box {
  display: block;
  width: 66vw;
}
.download a {
  color: rgb(34, 130, 255);
  font-size: 1.3em;
}
.download a:visited {
  color: rgb(255, 122, 34);
}
</style>
