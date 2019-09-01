<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-17 13:02:09
 * @LastEditTime: 2019-08-29 23:42:46
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section class="app-container">
    <Header class="pub-header" v-if="meta.showHead" :noBack="meta.noBack" :showMore="meta.showMore" :class="meta.className">{{ meta.title }}</Header>
    <div class="change-password app-content">
      <van-cell-group>
        <van-field v-model="account" left-icon="contact" type="text" required clearable label="账号" right-icon="question-o" placeholder="请输入要找回密码的账号
" @click-right-icon="question" ref="oldPsd" />
      </van-cell-group>
      <button class="psd-btn" @click="findPassword" :disabled="disabled">重置密码</button>
    </div>
  </section>
</template>

<script>
import { forget } from "../../api/login";
export default {
  data() {
    return {
      account: "",
    }
  },
  computed: {
    disabled() {
      return !this.account.trim();
    },
    meta() {
      return this.$route.meta;
    },
  },
  methods: {
    // 问题
    question() {
      this.$dialog.alert({
        title: '忘记录',
        message: "重置密码会将重置连接发送到您的邮箱里，如果没有完善邮箱信息\n请联系管理员修改！",
        confirmButtonColor: "#f44"
      }).then(() => {
        this.toast1s('不要再忘记密码哦');
      });
    },
    // 找回密码
    findPassword() {
      const load = this.$toast.loading({
        mask: true,
        duration: 0,
        message: '申请中...'
      });
      forget(this.account).then(data => {
        load.clear();
        this.$dialog.alert({
          title: "完成录",
          message: "申请成功请检查邮箱\n 正在前往登陆...",
          confirmButtonColor: "#f44"
        }).then(() => {
          if (this.$store.state.token) {
            this.$store.dispatch("logout").then(res => {
              this.$router.push({ path: "/login" });
            }).catch(err => {
              this.$toast.fail(err.message);
            });
          } else {
            this.$router.push({ path: "/login" });
          }
        });
      }).catch(err => {
        this.$toast.fail(err.message);
      });

    }
  }
}
</script>

<style>
.change-password {
  background-color: #f2f3f5;
  padding-top: 5vw;
}
.change-password .psd-btn {
  display: block;
  margin: 5vw auto;
  padding: 3vw 15vw;
  border-radius: 5vw;
  color: #fff;
  background-color: tomato;
}
</style>
