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
      // .replace(/\//g, "-")
      const date = this.currentDate.toLocaleDateString();
      this.$emit("input", date);
      this.cloes();
    },
    open() {
      this.currentDate = this.value ? new Date(this.value) : new Date();
    }
  }
}
</script>

<style>
/* .date-picker input {
  background-color: transparent;
} */
</style>
