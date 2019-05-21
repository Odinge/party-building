<template>
  <!-- <ul>
    <li>
      <span class="no">#</span>
      <span></span>
    </li>
    <li>

    </li>
  </ul> -->
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
        <tr v-for="(file, index) in list">
          <td>{{index+1}}</td>
          <td><span class="van-ellipsis file-box">{{file.name}}</span></td>
          <td>
            <a :href="'#'">
              <van-icon name="description"></van-icon>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { name: "入党自愿书模板", url: "/" },
        { name: "入党申请书模板模板", url: "/" },
        { name: "党报告模板", url: "/" },
        { name: "党报告模板", url: "/" },
        { name: "党报告模板", url: "/" },
        { name: "党报告模板", url: "/" },
      ]
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
}
</style>
