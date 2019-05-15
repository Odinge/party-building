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
              <img src="images/iphone.png" alt="">
            </div>
            <div class="aui-flex-box">
              <input type="text" placeholder="请输入学号/工号" v-model="user.account">
            </div>
          </div>
          <div class="aui-flex">
            <div class="aui-form-item">
              <img src="images/psd.png" alt="">
            </div>
            <div class="aui-flex-box">
              <input type="password" placeholder="请输入您的密码" v-model="user.password">
            </div>
            <div class="aui-psd">
              <router-link to="/register">忘记密码</router-link>
              <!-- <a href="javascript:;">忘记密码</a> -->
            </div>
          </div>
          <div class="aui-form-button">
            <button @touchstart.prevent="login" :class="states[loginState]" :disabled="!loginState">{{ loginState === 1 ? "登录成功": "登录" }}</button>
          </div>
          <div class="register-text">
            <router-link to="/register">立即注册</router-link>
          </div>
          <div class="err">{{ errMsg }}</div>
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
      this.$store
        .dispatch("login", this.user)
        .then(res => {
          this.loginState = 1;
          // 登录成功，登入首页
          this.$router.push({ path: "/" });
        }).catch(err => {
          this.errMsg = err.msg;
          this.clear();
        });
    }
  }
}
</script>
<style>
.err {
  position: absolute;
  width: 100%;
  margin-left: -1rem;
  bottom: 1.5rem;
  font-size: 1.2rem;
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
  font-size: 0.95rem;
}
.aui-jop-head h2 {
  font-size: 20px;
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
  font-size: 0.9rem;
}

.aui-flex {
  position: relative;
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #e2e2e298;
}

.aui-flex-box {
  /* flex: 1; */
  min-width: 0;
  font-size: 14px;
  color: #333;
}

.aui-flexView {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: #e6e6e6;
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
  padding: 4rem 1rem;
  background-color: #fff;
  border-radius: 3px;
}

.aui-form-item {
  width: 25px;
  height: 25px;
}

.aui-form-item img {
  width: 100%;
  height: 100%;
}

.aui-flex-box input {
  width: 100%;
  height: auto;
  padding: 0.3rem;
  color: #e54e31;
}

.aui-psd a {
  color: #646464;
  font-size: 0.85rem;
}

.aui-form-button {
  padding: 2rem 0;
  text-align: center;
}

.aui-form-button button {
  background: #de442c;
  width: 90%;
  padding: 0.5rem 0;
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
  padding: 1rem 0;
  font-size: 0.9rem;
}

.aui-footer-link a em {
  color: #08acee;
  font-style: normal;
}
</style>
