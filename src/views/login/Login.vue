<template>
  <section class="aui-flexView">
    <section class="aui-scrollView">
      <div class="aui-jop-chang">
        <h2>信息工程学院小先锋</h2>
      </div>
      <div class="aui-jop-top">
        <div class="aui-jop-top-box">
          <form onsubmit="return false">
            <div class="aui-flex b-line">
              <div class="aui-form-item">
                <img src="images/iphone.png" alt="">
              </div>
              <div class="aui-flex-box">
                <input type="text" placeholder="请输入学号/工号" v-model="user.account">
              </div>
            </div>
            <div class="aui-flex b-line">
              <div class="aui-form-item">
                <img src="images/psd.png" alt="">
              </div>
              <div class="aui-flex-box">
                <input type="password" placeholder="请输入您的密码" v-model="user.password">
              </div>
              <div class="aui-psd">
                <a href="javascript:;">忘记密码</a>
              </div>
            </div>
            <div class="aui-form-button">
              <button @touchstart="login()">登录</button>
            </div>
            <div class="register-text">
              <router-link to="/register">立即注册</router-link>
            </div>
          </form>
        </div>
      </div>
    </section>
    <footer class="aui-footer-link">
      <a href="javascript:;" class="aui-tabBar-item aui-tabBar-item-active">登录即代表阅读并同意 <em>用户协议</em></a>
    </footer>
  </section>
</template>
<script>
import "./login.css";
export default {
  data() {
    return {
      user: {
        account: "",
        password: ""
      }
    }
  },
  methods: {
    login() {
      this.$store.dispatch("login", user).then(res => {

      });
    }
  }
}
</script>
<style>
.aui-flexView {
  background-color: #e6e6e6;
}
/* 头部 */
.aui-jop-chang {
  width: 100%;
  padding-top: 16.5vw;
  text-align: center;
  background-color: #e54e31;
  height: 56vw;
  color: #fff;
  font-size: 0.95rem;
}
.aui-jop-chang h2 {
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
</style>
