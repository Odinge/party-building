<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-10 15:42:03
 * @LastEditTime: 2019-08-31 19:26:32
 * @LastEditors: Please set LastEditors
 -->
<!-- 我的消息 -->
<template>
  <!-- <div class="unfinish"></div> -->
  <div class="p-test">
    <span>
      生长周期
    </span>
    <van-picker :columns="columns1" @change="onChange1" />
    <div class="rice" v-if="show">
      富文本编辑
      .........指南..........
    </div>
  </div>
</template>

<script>

// 生命周期
const lifecycle = {
  "幼年期": ["无"],
  "成年期": ["无", "结果初期", "结果盛期", "结果后期"],
  "衰老期": ["无"]
};
// 年生长周期
const yearcycle = {
  "无": ["无"],
  "萌芽展叶期": ["萌芽始期", "萌芽末期"],
  "出蕾期": ["无"],
  "开花期": ["开花始期", "开花盛期", "开花末期"],
  "结果期": ["结果始期", "果实成熟期", "结果末期"],
  "落叶期": ["落叶始期", "落叶末期"],
  "休眠期": ["休眠始期", "休眠末期"],
};
const hasYearcycleList = ["成年期", "衰老期"];

Object.keys(lifecycle).forEach((key, index) => {
  if (hasYearcycleList.includes(key)) {
    const obj = {};
    lifecycle[key].forEach(item => {
      obj[item] = yearcycle;
    });
    lifecycle[key] = obj;
  } else {
    lifecycle[key] = { "无": { "无": ["无"] } };
  }
});

export default {
  data() {
    return {
      show: false,
      columns1: [
        {
          values: Object.keys(lifecycle),
          className: 'column1',
        },
        {
          values: Object.keys(lifecycle['幼年期']),
          className: 'column2',
        },
        {
          values: Object.keys(lifecycle['幼年期']['无']),
          className: 'column3',
        },
        {
          values: lifecycle['幼年期']['无']['无'],
          className: 'column4',
        }
      ],
      prevVal: ["幼年期", "无", "无", "无"]
    };
  },
  methods: {
    onChange1(picker, values) {
      console.log(values);

      const key1 = Object.keys(lifecycle[values[0]])
      picker.setColumnValues(1, key1);
      const key2 = Object.keys(lifecycle[values[0]][values[1]]);
      picker.setColumnValues(2, key2);
      const key3 = lifecycle[values[0]][values[1]][values[2]];
      picker.setColumnValues(3, key3);

    },
    onChange2(picker, values) {
      picker.setColumnValues(1, lifecycle[values[0]]);
    }
  }
}
</script>

<style>
.p-test {
  padding: 4vw 2vw;
}
.p-test > span {
  margin-left: 10vw;
  color: rgb(255, 195, 127);
}
.rice {
  width: 80vw;
  height: 50vw;
  margin: 4vw auto;
  text-align: center;
  border: 1px solid #ccc;
  background: rgb(142, 226, 215);
}
</style>
