<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-12 15:30:23
 * @LastEditTime: 2019-08-24 22:12:09
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section class="register">
    <header class="reg-head">
      <a href="javascript:;" @touchstart="back">返回</a>
      <h2>用户注册</h2>
      <router-link to="/login">登录</router-link>
    </header>
    <div class="reg-main">
      <form name="register" action="" method="post" onsubmit="return false">
        <!-- 账号 -->
        <div class="reg-text">
          <label for="account">学号</label>
          <input type="text" placeholder="请输入学号/工号" class="input" name="account" id="account" v-model="regInfo.account" ref="account">
        </div>
        <!-- 密码 -->
        <div class="reg-text">
          <label for="password" required>
            <van-icon name="question-o" class="info" @click="$toast('6~16位字母、数字或者字符')"></van-icon>
            密 码
          </label>
          <input type="password" placeholder="请输入密码" class="input" name="password" id="password" v-model="regInfo.password" ref="password" />
          <van-icon :name="psdStatus?'eye-o':'closed-eye'" @click="showPsd"></van-icon>
        </div>
        <div class="reg-text">
          <label for="password1">确认密码</label>
          <input type="password" placeholder="请输入确认密码" class="input reg-psd" name="password1" ref="password1" v-model="password" />
          <span class="psd-err">{{psdErrMsg}}</span>
        </div>
        <!-- 提示信息 -->
        <div class="reg-tip">
          <input type="checkbox" checked id="plain" v-model="agree"><label for="plain">同意注册条款</label>
        </div>
        <div class="reg-btn">
          <button @click.prevent="register" :class="states[regState]" :disabled="!regState">{{ regState === 1 ? "注册成功": "注 册" }}</button>
        </div>
      </form>
    </div>
  </section>
</template>
<script>
import { register } from "../../api/login";
export default {
  data() {
    return {
      regInfo: {
        account: "", // 账号
        password: "", // 密码
      },
      password: "", // 第二次密码，验证密码
      psdErrMsg: "", // 密码错误信息

      agree: true, // 同意注册协议

      regState: 0, // 注册表单状态
      psdStatus: 0, // 密码显示状态
    }
  },
  computed: {
    allInfo() {
      return { ...this.regInfo, password1: this.password, agree: this.agree };
    }
  },
  watch: {
    allInfo: {
      handler(newVal) {
        const { agree, ...info } = newVal;

        // 判断必须的是否已填写
        const keys = Object.keys(info);
        let disabled = false;
        for (const key of keys) {
          if (!info[key].trim()) {
            disabled = true;
            break;
          }
        }

        // 密码检验
        const { password, password1 } = info;
        // 判断密码是否确认正确
        if (password) {
          const psdReg = /^.{6,16}$/;
          if (password1 && password1 !== password) {
            disabled = true;
            this.psdErrMsg = "密码不一致";
          } else if (!psdReg.test(password)) {
            disabled = true;
            this.psdErrMsg = "密码格式不对";
          } else {
            this.psdErrMsg = "";
          }
        } else {
          this.psdErrMsg = "";
        }

        // 判断是否同意协议
        if (!agree) {
          disabled = true;
        }

        // 改变状态
        this.regState = disabled ? 0 : 2;
      }, deep: true
    }
  },
  methods: {
    // 返回
    back() {
      this.$router.back();
    },
    // 提交注册
    register() {
      // 加载
      const load = this.$toast.loading({
        mask: true,
        duration: 0,
        message: '注册中...'
      });
      // 结合信息
      let regInfo = { ...this.regInfo };
      // 发送请求
      register(regInfo).then(res => {
        // this.regState = 1;
        load.clear();
        // 倒计时
        this.countDown({ content: "  跳到登录", type: "success" }, () => {
          // 注册成功跳到登录页
          this.$router.push({ path: "/login" });
        });
      }).catch(err => {
        load.clear();
        this.$dialog.alert({
          title: '提示',
          message: err.message,
          confirmButtonColor: "#f44"
        }).then(() => {
          if (err.code === 40003) {
            this.regInfo.account = "";
            this.$refs.account.focus();
          }
        });
      });
    },
    // 密码显示
    showPsd() {
      const { password, password1 } = this.$refs;
      this.psdStatus = !this.psdStatus;
      password.type = password1.type = this.psdStatus ? "text" : "password";
    }
  }
};
</script>
<style>
.register {
  display: flex;
  flex-direction: column;
  font-size: 4.5vw;
}
.reg-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5vw 6vw;
  background: #e54e31;
  color: #fff;
}
.reg-head h2 {
  font-size: 1.2em;
}
.reg-main {
  flex: 1;
  height: 100%;
  padding: 3vw 2vw 15vw;
  overflow: auto;
}
/* 注册行 */
.reg-text {
  position: relative;
  display: flex;
  align-items: center;
  vertical-align: middle;
  /* justify-content: center; */
  padding: 1vw 5vw;
  border-bottom: 1px solid #ddd;
}
.reg-text label {
  width: 29%;
  text-align: center;
  line-height: 1.2em;
}
.reg-text .input {
  flex: 1;
  height: 10vw;
  width: 100%;
  border: none;
  margin-left: 1em;
  color: #858585;
  background-color: transparent;
}
/* 注册提示 */
.reg-tip {
  text-align: right;
  padding: 5vw 5vw 10vw;
  font-size: 0.9em;
  color: #de442c;
}
.reg-tip input {
  vertical-align: middle;
  margin-right: 0.2em;
  width: 1em;
  height: 1em;
}
/* 注册按钮 */
.reg-btn {
  text-align: center;
}
.reg-btn button {
  width: 88%;
  padding: 3.5vw 0;
  cursor: pointer;
  background-color: #de442c;
  border-radius: 0.3em;
  font-size: 1em;
  color: #fff;
}
/* 注册错误提示 */
.psd-err {
  color: #de442c;
  font-size: 0.7em;
  width: 6em;
}
.info {
  color: #e54e31;
}
</style>
