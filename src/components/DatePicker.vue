<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-16 02:41:52
 * @LastEditTime: 2019-09-10 21:17:35
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div @click.capture="show=true" class="app-picker">
    <!-- <input type="text" placeholder="请选择日期" :value="value" disabled> -->
    <span>{{ value ? value : placeholder }}</span>
    <van-icon name="arrow" />
    <van-popup v-model="show" @open="open" position="bottom">
      <van-datetime-picker v-model="currentDate" :title="title" :formatter="formatter" type="date" :min-date="minDate" @confirm="onConfirm" @cancel="cloes" />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "DatePicker",
  props: {
    value: {
      required: true
    },
    placeholder: {
      type: String,
      default: "请选择日期"
    },
    title: {
      type: String,
      default: "日期选择"
    },
  },
  data() {
    return {
      show: false, // 是否显示
      currentDate: new Date(),
      minDate: new Date(1970, 1, 1),
    }
  },
  methods: {
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else {
        return `${value}日`;
      }
    },
    cloes() {
      this.show = false;
    },
    onConfirm() {
      let year = this.currentDate.getFullYear();
      let month = this.currentDate.getMonth() + 1;
      let day = this.currentDate.getDate();

      const date = year + "-" + month + "-" + day;

      this.$emit("input", date);
      this.cloes();
    },
    open() {
      this.currentDate = this.value ? new Date(this.value) : new Date();
    }
  }
}
</script>
