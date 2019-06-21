<template>
  <list-load v-model="list" :funMap="funMap">
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
  </list-load>
</template>

<script>
import { getDocumentFiles } from "../../../api/file";
export default {
  data() {
    return {
      list: [],
      funMap: [getDocumentFiles]
    }
  },
  mounted() {
    // this.loadData();
  },
  methods: {
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
