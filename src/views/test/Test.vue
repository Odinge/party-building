<!--
 * @Description: 学习测试
 * @Author: Odinge
 * @Date: 2019-05-12 15:32:28
 * @LastEditTime: 2019-09-12 16:27:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <list-load v-model="list" :funMap="funMap" ref="load">
    <ul class="test-list bg-fff">
      <li v-for="item in list" :key="item.qid" class="test-item app-flex">
        <a :href="item.url" class="app-flex test-a">
          <img src="/img/test/dangqi.png" alt="问卷">
          <div class="test-info test-a">
            <h4 class="van-ellipsis">{{item.title}}</h4>
            <p class="van-ellipsis">{{item.updateTime}}</p>
          </div>
        </a>
        <!-- accept="image/gif, image/jpeg, image/png" -->
        <van-uploader :after-read="onRead" :before-read="onBeforeRead" :name="item.qid" class="test-state app-flex-col">
          <i class="test-icon answer-upload"></i>
          <span>上传结果</span>
        </van-uploader>
      </li>
    </ul>
  </list-load>
</template>
<script>
import { getQuestionnaire, addQuestionnaireRecords } from "../../api/questionnaire";
import { getImgUrl } from "../../api/file";
export default {
  data() {
    return {
      list: [],
      funMap: [getQuestionnaire],
      loadIcon: {}
    }
  },
  methods: {
    // 上传记录
    uploadRecode(url, qid) {
      addQuestionnaireRecords(url, qid).then(data => {
        const load = this.$refs.load;
        this.loadIcon.clear();
        this.$contentChange("test");
        // this.$toast.success("结果添加成功");
        this.$dialog.confirm({
          title: "结果添加成功",
          message: "是否前往列表查看结果?",
          confirmButtonText: "查看"
        }).then(() => {
          this.$router.push("/myTest");
        }).catch(err => { });
      }).catch(err => this.$toast.fail(err.message));
    },
    // 阅读上传的文件
    onRead(files, detail) {
      const { content: url, file } = files;
      // 使用blob创建连接
      // const blob = new Blob([file]);
      // const url = window.URL.createObjectURL(blob);

      this.loadIcon = this.$toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中...'
      });

      getImgUrl(file).then(data => {
        this.uploadRecode(data, detail.name);
      }).catch(err => this.$toast(err.message));
    },
    // 上传之前
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
