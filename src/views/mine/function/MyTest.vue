<!--
 * @Description: 我的测试
 * @Author: Odinge
 * @Date: 2019-05-12 15:32:28
 * @LastEditTime: 2019-08-24 09:37:36
 * @LastEditors: Please set LastEditors
 -->
<template>
  <list-load v-model="list" :funMap="funMap">
    <ul class="test-list my-test">
      <li v-for="(item, key) in list" :key="item.recordId">
        <a :href="getUrl(item.resultImgUrl)" class="test-item app-flex">
          <img :src="getUrl(item.resultImgUrl)" alt="问卷" v-lazy="getUrl(item.resultImgUrl)">
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
        </a>
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
        { class: "answer-past", text: "已过期" },
      ],
      funMap: [getQuestionnaireRecords]
    }
  },
  methods: {
    getUrl(url) {
      return url ? this.$baseUrl + url : url;
    }
  }
}
</script>
<style>
.my-test .test-item img {
  width: 30%;
  height: 16vw;
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
