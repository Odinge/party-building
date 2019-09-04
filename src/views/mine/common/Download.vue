<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-20 18:58:18
 * @LastEditTime: 2019-09-04 18:48:55
 * @LastEditors: Please set LastEditors
 -->
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
          <tr v-for="(file, index) in list" :key="file.fileId">
            <td>{{index+1}}</td>
            <td>
              <span class="van-ellipsis file-box">{{file.fileName}}</span>
            </td>
            <td>
              <van-icon name="description" class="btn-download" @click="downloadFile(file)"></van-icon>
              <!-- <a :href="getUrl(file.fileId)" :download="file.fileName">
                <van-icon name="description" class="btn-download"></van-icon>
              </a> -->
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
  methods: {
    downloadFile(file) {
      this.$download({
        url: this.$getDownloadUrlById(file.fileId, 0),
        name: file.fileName
      });
    }
  }
}
</script>

<style>
.download {
  padding: 2vw;
  background-color: #fff;
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
.download .btn-download {
  color: rgb(34, 130, 255);
  font-size: 1.3em;
}
.download .btn-download:visited {
  color: rgb(255, 122, 34);
}
</style>
