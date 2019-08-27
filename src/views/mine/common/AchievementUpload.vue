<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 13:26:54
 * @LastEditTime: 2019-08-27 20:36:35
 * @LastEditors: Please set LastEditors
 -->
<!-- 成果上传 -->
<template>
  <div id="ac">
    <van-uploader :after-read="onRead" :before-read="onBeforeRead" class="ac-upload app-flex-col">
      <i class="test-icon upload-icon"></i>
      <span>上传成果</span>
    </van-uploader>
    <h3>成果列表</h3>
    <list-load v-model="list" :funMap="funMap" ref="load" class="ac-load">
      <ul class="ac-list">
        <li v-for="item in aclist" :key="item.fileId" class="test-item app-flex" @click="downloadFile(item.fileId)">
          <!-- <a :href="getUrl(item.fileId)" > -->
          <img :src="getUrl(item.fileId)" alt="问卷" v-lazy="getUrl(item.fileId)">
          <div class="test-info">
            <h4 class="figcaption">{{item.fileName}}</h4>
            <p class="van-ellipsis">
              <van-icon name="clock-o"></van-icon>{{item.createDate}}
            </p>
          </div>
          <!-- </a> -->
        </li>
      </ul>
    </list-load>
  </div>
</template>

<script>
import { getAcFiles, uploadAcFile, downloadFile } from "../../../api/file";
export default {
  data() {
    return {
      list: [],
      funMap: [getAcFiles],
    }
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
    aclist() {
      return this.list.filter(item => item.fileOwner === this.account);
    }
  },
  methods: {

    onRead(files, detail) {
      const { content: url, file } = files;
      this.$toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中...'
      });

      uploadAcFile(file).then(data => {
        const load = this.$refs.load;
        load.onRefresh(() => {
          this.$toast.success("成果上传成功");
        });
      }).catch(err => { this.$toast(err.message) });

    },
    onBeforeRead(file) {
      const { type } = file;
      if (/image/.test(type)) {
        return true;
      } else {
        this.$toast.fail('     失败\n请上传图片');
        return false;
      }
    },
    getUrl(fileId) {
      return this.$baseUrl + "/file/download?fileId=" + fileId;
    },
    downloadFile(fileId) {
      downloadFile(fileId).then(data => {
        window.location.href = this.getUrl(fileId);
      }).catch(err => {
        this.$toast.fail(err.message);
      });
    },
  }
}
</script>

<style>
#ac h3 {
  margin: 4vw 0;
  padding-left: 2vw;
  border-left: 1.5vw solid rgb(233, 81, 81);
  color: rgb(78, 81, 83);
  font-size: 1.1em;
  font-weight: bold;
}
#ac .ac-list {
  background-color: #fff;
}
#ac .test-item {
  align-items: normal;
}
.ac-load {
  border-top: 0.2vw solid #eee;
  margin: 0 2vw;
}
#ac .test-item img {
  width: 35%;
  height: 21vw;
  border-radius: 10%;
  object-fit: cover;
}
#ac .test-info {
  width: 55%;
  margin-left: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
#ac .test-info p {
  display: flex;
  padding-top: 1em;
  margin: 0;
}
#ac p i {
  margin-right: 0.5em;
  margin-top: -0.05em;
}

#ac .ac-upload {
  font-size: 3em;
  align-self: center;
  margin: 5vw 25vw;
}
#ac .ac-upload span {
  margin-top: 2vw;
  font-size: 0.5em;
}
</style>
