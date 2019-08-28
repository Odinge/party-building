<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-12 15:32:28
 * @LastEditTime: 2019-08-28 10:04:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <list-load v-model="list" :funMap="funMap" ref="load">
    <ul class="test-list">
      <li v-for="(item, key) in list" :key="key" class="test-item app-flex">
        <a :href="item.url" class="app-flex test-a">
          <img src="/images/test/dangqi.png" alt="问卷">
          <div class="test-info test-a">
            <h4 class="van-ellipsis">{{item.title}}</h4>
            <p class="van-ellipsis">{{item.updatetime}}</p>
          </div>
        </a>
        <!-- accept="image/gif, image/jpeg, image/png" -->
        <van-uploader :after-read="onRead" :before-read="onBeforeRead" :name="item.qid" class="test-state app-flex-col">
          <i class="test-icon answer-past"></i>
          <span>上传结果</span>
        </van-uploader>
      </li>
    </ul>
  </list-load>
</template>
<script>
import { getQuestionnaire, addQuestionnaireRecords } from "../../api/questionnaire";
import { getFileUrl } from "../../api/file";
export default {
  data() {
    return {
      list: [],
      funMap: [getQuestionnaire],
    }
  },
  methods: {
    uploadRecode(url, qid) {
      addQuestionnaireRecords(url, qid).then(data => {
        const load = this.$refs.load;
        load.onRefresh(() => {
          this.$toast.success("结果添加成功");
        });
      }).catch(err => { this.$toast.fail(err.message) });
    },
    onRead(files, detail) {
      const { content: url, file } = files;
      // 使用blob创建连接
      // const blob = new Blob([file]);
      // const url = window.URL.createObjectURL(blob);

      this.$toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中...'
      });
      getFileUrl(file).then(data => {
        this.uploadRecode(data, detail.name);
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
  }
}
</script>
<style>
</style>
