<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-12 15:14:18
 * @LastEditTime: 2019-08-27 20:14:20
 * @LastEditors: Please set LastEditors
 -->
<template>
  <section class="aui-flexView">
    <section class="aui-scrollView">
      <div class="aui-jop-head">
        <h2>信息工程学院小先锋</h2>
      </div>
      <div class="aui-jop-top">
        <form onsubmit="return false">
          <div class="aui-flex">
            <div class="aui-form-item">
              <img src="/images/login/iphone.png" alt="账号">
            </div>
            <div class="aui-flex-box">
              <input type="text" placeholder="请输入学号/工号" v-model="user.account" ref="account">
            </div>
          </div>
          <div class="aui-flex">
            <div class="aui-form-item">
              <img src="/images/login/psd.png" alt="密码">
            </div>
            <div class="aui-flex-box">
              <input type="password" placeholder="请输入您的密码" v-model="user.password" ref="password">
            </div>
            <div class="aui-psd">
              <router-link to="/forget">忘记密码</router-link>
            </div>
          </div>
          <div class="aui-form-button">
            <button @click.prevent="login" :class="states[loginState]" :disabled="!loginState">{{ loginState === 1 ? "登录成功": "登录" }}</button>
          </div>
          <div class="register-text">
            <router-link to="/register">立即注册</router-link>
          </div>
          <!-- <div class="err" id="msg">{{ errMsg }}</div> -->
        </form>
      </div>
    </section>
    <footer class="aui-footer-link">
      <a href="javascript:;">登录即代表阅读并同意 <em>用户协议</em></a>
    </footer>
  </section>
</template>
<script>

export default {
  data() {
    return {
      user: {
        account: "",
        password: ""
      },
      loginState: 0,
      errMsg: ""
    }
  },
  computed: {
    redirect() {
      return this.$route.query.redirect;
    }
  },
  watch: {
    user: {
      handler(nuser) {
        let account = nuser.account.trim();
        let password = nuser.password.trim();

        // 清除错误信息
        if (account || password) this.errMsg = "";
        // 判断是否新输入
        let disable = account && password;
        this.loginState = disable ? 2 : 0;

      }, deep: true
    }
  },
  methods: {
    clear() {
      this.user = {
        account: "",
        password: ""
      };
    },
    login() {
      const load = this.$toast.loading({
        mask: true,
        duration: 0,
        message: '加载中...'
      });

      this.$store
        .dispatch("login", this.user)
        .then(res => {
          // this.loginState = 1;
          // 登录成功，登入首页
          this.$store.commit("SET_ACCOUNT", this.user.account);
          if (this.redirect) {
            this.$router.replace(this.redirect);
          } else {
            this.$router.replace("/");
          }
          load.clear();
        }).catch(err => {
          this.errMsg = err.message;
          load.clear();
          this.$dialog.alert({
            title: '提示',
            message: err.message,
            confirmButtonColor: "#f44"
          }).then(() => {
            if (/密码/.test(err.message)) {
              this.user.password = "";
              this.$refs.password.focus();
            } else {
              this.clear();
              this.$refs.account.focus();
            }
          });
        });
    }
  }
}
</script>
<style>
.err {
  position: absolute;
  width: 100%;
  margin-left: -1em;
  bottom: 1.5em;
  font-size: 1.2em;
  color: #2c9dde;
  text-align: center;
}

/* 头部 */
.aui-jop-head {
  width: 100%;
  padding-top: 16.5vw;
  text-align: center;
  background-color: #e54e31;
  height: 56vw;
  color: #fff;
  font-size: 0.95em;
}
.aui-jop-head h2 {
  font-size: 1.4em;
  font-weight: bold;
}

.aui-flex-box {
  margin-left: 0.5em;
}
.register-text {
  text-align: center;
  color: red;
}
.register-text a {
  color: #de442c;
  font-size: 0.9em;
}

.aui-flex {
  position: relative;
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e2e2e298;
}

.aui-flex-box {
  flex: 1;
  font-size: 0.87em;
  color: #333;
}

.aui-flexView {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: #e6e6e6;
  font-size: 4.5vw;
}

.aui-scrollView {
  width: 100%;
  height: 100%;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
}

.aui-jop-top {
  position: relative;
  margin: -38vw 3vw 0;
  padding: 4em 1em;
  background-color: #fff;
  border-radius: 3px;
}

.aui-form-item {
  width: 1.5em;
  height: 1.5em;
}

.aui-form-item img {
  width: 100%;
  height: 100%;
}

.aui-flex-box input {
  /* width: 100%; */
  height: auto;
  padding: 0.3em;
  color: #e54e31;
}

.aui-psd a {
  color: #646464;
  font-size: 0.85em;
}

.aui-form-button {
  padding: 2em 0;
  text-align: center;
}

.aui-form-button button {
  background: #de442c;
  width: 90%;
  padding: 0.5em 0;
  border-radius: 20px;
  color: #fff;
}

/* 页脚 */
.aui-footer-link {
  text-align: center;
}

.aui-footer-link a {
  color: #6a6a6a;
  display: block;
  padding: 1em 0;
  font-size: 0.9em;
}

.aui-footer-link a em {
  color: #08acee;
  font-style: normal;
}
</style>
