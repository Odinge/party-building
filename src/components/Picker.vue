<template>
  <div @click.capture="show=true" class="app-picker">
    <!-- <input type="text" :placeholder="placeholder" :value="columns[value]" disabled> -->
    <span>{{ columns[value] ? columns[value] : placeholder }}</span>
    <van-icon name="arrow" />
    <van-popup v-model="show" @open="open" position="bottom">
      <van-picker :columns="columns" :default-index="defaultIndex" :title="title" show-toolbar @cancel="close" @confirm="onConfirm" />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "Picker",
  props: {
    columns: {
      type: Array,
      required: true
    },
    value: {
      required: true
    },
    title: {
      type: String,
      default: "选择"
    },
    placeholder: {
      type: String,
      default: "请选择"
    }
  },
  data() {
    return {
      show: false,
      defaultIndex: 0
    }
  },
  methods: {
    close() {
      this.show = false;
    },
    onConfirm(value, index) {
      this.$emit("input", index + "");
      this.close();
    },
    open() {
      this.defaultIndex = +this.value;
    }
  }
}
</script>

<style>
.app-picker {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
