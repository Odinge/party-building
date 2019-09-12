<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-17 13:02:09
 * @LastEditTime: 2019-09-12 14:59:39
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="change-password">
    <van-cell-group>
      <van-field v-model="password.oldPassword" left-icon="label-o" :type="isShow?'text':'password'" required clearable label="旧密码" right-icon="question-o" placeholder="请输入旧密码
" @click-right-icon="forget" class="old-psd" ref="oldPsd" @input="clearErr" />
      <van-field v-model="password.newPassword" left-icon="bookmark-o" :right-icon="isShow?'eye-o':'closed-eye'" :type="isShow?'text':'password'" @click-right-icon="eye" label="新密码" placeholder="请输入新密码" required clearable @input="clearErr" />
      <van-field v-model="password.repeatPassword" left-icon="edit" :type="isShow?'text':'password'" label="确认密码" placeholder="请确认新密码" required clearable :error-message="errMsg" @input="clearErr" ref="repeatPsd" />
    </van-cell-group>
    <button class="psd-btn" @click="changePassword" :disabled="disabled">修改密码</button>
  </div>
</template>

<script>
import { changePassword } from "../../../api/login";
export default {
  data() {
    return {
      password: {
        oldPassword: "",
        newPassword: "",
        repeatPassword: ""
      },
      isShow: false,
      errMsg: ""
    }
  },
  computed: {
    disabled() {
      const keys = Object.keys(this.password);
      let ok = true;
      ok = keys.every(key => this.password[key]);
      // if (this.password.newPassword !== this.password.repeatPassword && this.password.newPassword && this.password.repeatPassword) {
      //   ok = false;
      // }
      return !ok;
    }
  },
  methods: {
    clearErr() {
      this.errMsg = "";
    },
    check() {
      if (this.password.newPassword !== this.password.repeatPassword && this.password.newPassword && this.password.repeatPassword) {
        this.errMsg = "两次输入密码不一致";
        this.$refs.repeatPsd.focus();
        return true
      } else {
        // this.errMsg = "";
        return false;
      }
    },
    eye() {
      this.isShow = !this.isShow;
    },
    forget() {
      this.$dialog.confirm({
        title: '忘记录',
        message: "忘记密码咯？",
      }).then(() => {
        this.$router.push("/forget");
      }).catch(err => { });
    },
    changePassword() {
      // 检测是否可行
      if (this.check()) {
        return false;
      }

      this.$dialog.confirm({
        title: '提示录',
        message: "确定修改密码？",
      }).then(() => {
        // 加载提示
        const load = this.$toast.loading({
          mask: true,
          duration: 0,
          message: '修改密码中...'
        });
        // 修改密码
        changePassword(this.password).then(data => {
          load.clear();
          // 从新登录
          this.$dialog.alert({
            title: '成功录',
            message: "密码修改成功，请重新登录！！",
          }).then(() => {
            this.$toast.loading({
              mask: true,
              duration: 0,
              message: '登出中...'
            });
            this.$store.dispatch("logout").then(res => {
              this.$router.push({ path: "/login" });
            }).catch(err => {
              this.$toast.fail(err.message);
            });
          })
        }).catch(err => {
          // 错误提示
          load.clear();
          this.errMsg = err.message;
          if (err.code === 400015) {
            this.$refs.oldPsd.focus();
          }
        });
      }).catch(err => { });


    }
  }
}
</script>

<style>
.change-password {
  background-color: #f2f3f5;
  padding-top: 5vw;
}
.change-password .old-psd {
  background-color: #e8e8e8;
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
