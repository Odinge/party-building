<template>
  <van-pull-refresh v-model="isRefresh" @refresh="loadData">
    <div class="download">
      <table class="download-table">
        <thead>
          <tr>
            <th class="NO">#</th>
            <th class="file-name">文件</th>
            <th class="file-op">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(file, index) in list" :key="index">
            <td>{{index+1}}</td>
            <td><span class="van-ellipsis file-box">{{file.fileName}}</span></td>
            <td>
              <a :href="url(file.fileId)">
                <van-icon name="description"></van-icon>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </van-pull-refresh>
</template>

<script>
import { getDowenfileList } from "../../../api/download";
export default {
  data() {
    return {
      list: [
        // { fileName: "入党自愿书模板", fileId: "/" },
        // { fileName: "入党申请书模板模板", fileId: "/" },
        // { fileName: "党报告模板", fileId: "/" },
        // { fileName: "党报告模板", fileId: "/" },
        // { fileName: "党报告模板", fileId: "/" },
        // { fileName: "党报告模板", fileId: "/" },
      ],
      isRefresh: false,
    }
  },
  mounted() {
    this.loadData();
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
      }, 1000);
    },
    loadData() {
      getDowenfileList().then(res => {
        let data = res.match(/\[.+\]/);
        data = JSON.parse(data);

        this.list = data;
        if (this.isRefresh) {
          this.$toast("加载完成");
          this.isRefresh = false;
        }
      }).catch(err => {
        this.isRefresh = false;
        this.$toast("加载失败");
      });
    },
    url(fileId) {
      return this.$baseUrl + "/downfile/downfile/" + fileId;
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
.download-table .NO {
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
