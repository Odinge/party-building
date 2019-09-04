<!--
 * @Description: 我的测试
 * @Author: Odinge
 * @Date: 2019-05-12 15:32:28
 * @LastEditTime: 2019-09-04 18:28:30
 * @LastEditors: Please set LastEditors
 -->
<template>
  <list-load v-model="list" :funMap="funMap" ref="load">
    <ul class="test-list my-test">
      <li v-for="item in list" :key="item.recordId" class="test-item app-flex" @click="downloadFile(item)">
        <img :src="$getUrl(item.resultImgUrl)" alt="问卷" v-lazy="$getUrl(item.resultImgUrl)">
        <div class="test-info">
          <h4 class="figcaption">{{item.questionnaireTitle}}</h4>
          <p class="van-ellipsis">
            <van-icon name="clock-o"></van-icon>{{item.finishTime}}
          </p>
        </div>
        <div class="test-state app-flex-col">
          <i class="test-icon" :class="answerMap[item.status].class"></i>
          <span>
            {{answerMap[item.status].text}}
          </span>
        </div>
      </li>
    </ul>
  </list-load>
</template>
<script>
import { getQuestionnaireRecords } from "../../../api/questionnaire";
export default {
  data() {
    return {
      list: [],
      answerMap: [
        { class: "answer-no", text: "未审核" },
        { class: "answer-finished", text: "已审核" },
        { class: "answer-past", text: "不通过" },
      ],
      funMap: [getQuestionnaireRecords]
    }
  },
  methods: {
    downloadFile(file) {
      this.$download({
        url: file.resultImgUrl,
        name: file.questionnaireTitle,
        type: "png"
      });
    }
  },
  activated() {
    this.$changeRefresh("test", true);
  }
}
</script>
<style>
.my-test {
  background-color: #fff;
}
.my-test .test-item img {
  width: 30%;
  height: 17vw;
  border-radius: 10%;
  object-fit: cover;
}
.my-test .test-item {
  align-items: normal;
}
.my-test .test-info {
  width: 50%;
  margin-left: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.my-test .test-info p {
  display: flex;
  padding-top: 1em;
  margin: 0;
}
.my-test p i {
  margin-right: 0.5em;
  margin-top: -0.05em;
}

.my-test .test-state {
  width: 15%;
  align-self: center;
}
</style>
