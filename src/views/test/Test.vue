<template>
  <list-load v-model="list" :funMap="funMap">
    <ul class="test-list">
      <li v-for="(item, key) in list" :key="key">
        <a href="#" class="test-item app-flex">
          <img src="/images/test/dangqi.png" alt="问卷">
          <div class="test-info">
            <h4 class="van-ellipsis">{{item.title}}</h4>
            <p class="van-ellipsis">{{item.updatetime}}</p>
          </div>
          <div class="test-state app-flex-col">
            <i class="test-icon" :class="answerMap[item.answerState].class"></i>
            <span>{{answerMap[item.answerState].text}}</span>
          </div>
        </a>
      </li>
    </ul>
  </list-load>
</template>
<script>
import { getQuestionnaire } from "../../api/questionnaire";
export default {
  data() {
    return {
      list: [
        // { url: "/images/test/dangqi.png", title: "第九周学习测评", updatetime: "同学们多看新闻,好好答题", answerState: 1 },
        // { url: "/images/test/dangqi.png", title: "第八周学习测评", updatetime: "同学们多看新闻,好好答题", answerState: 1 },
        // { url: "/images/test/dangqi.png", title: "第七周学习测评", updatetime: "同学们多看新闻,好好答题", answerState: 1 },
        // { url: "/images/test/dangqi.png", title: "第六周学习测评", updatetime: "同学们多看新闻,好好答题", answerState: 1 },
        // { url: "/images/test/dangqi.png", title: "第五周学习测评", updatetime: "同学们多看新闻,好好答题", answerState: 0 },
        // { url: "/images/test/dangqi.png", title: "第四周学习测评", updatetime: "同学们多看新闻,好好答题", answerState: 2 },
        // { url: "/images/test/dangqi.png", title: "第三周学习测评", updatetime: "同学们多看新闻,好好答题", answerState: 0 },
        // { url: "/images/test/dangqi.png", title: "第二周学习测评", updatetime: "同学们多看新闻,好好答题", answerState: 0 },
        // { url: "/images/test/dangqi.png", title: "第一周学习测评", updatetime: "同学们多看新闻,好好答题", answerState: 0 },
      ],
      answerMap: [
        { class: "answer-finished", text: "已答题" },
        { class: "answer-no", text: "未解答" },
        { class: "answer-past", text: "已过期" },
      ],
      funMap: [getQuestionnaire]
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style>
.test-list {
  padding-bottom: 1em;
}
.test-item {
  justify-content: space-between;
  padding: 4.5vw;
  border-bottom: 0.2vw solid #eee;
  font-size: 4.5vw;
}
.test-item img {
  width: 18%;
  border-radius: 100%;
}
.test-info {
  flex: 1;
  margin-left: 1em;
}
.test-info h4 {
  font-weight: bold;
  color: #555;
}
.test-info p {
  font-size: 0.8em;
  margin-top: 1em;
  color: rgb(133, 131, 131);
}
.test-state {
  width: 15%;
}
.test-state span {
  font-size: 0.8em;
  margin-top: 0.4em;
  color: #444;
}
.test-icon {
  background-size: contain;
  background-position: center;
  width: 1.5em;
  height: 1.5em;
}
.answer-finished {
  background-image: url("/images/test/icon-follow-002.jpg");
}
.answer-no {
  background-image: url("/images/test/icon-follow-001.jpg");
}
.answer-past {
  background-image: url("/images/test/icon-follow-003.jpg");
}
</style>
