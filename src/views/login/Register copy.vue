<template>
  <section class="register">
    <header class="reg-head">
      <a href="javascript:;" @touchstart="back">返回</a>
      <h2>用户注册</h2>
      <router-link to="/login">登录</router-link>
    </header>
    <div class="reg-main">
      <form name="register" action="" method="post" onsubmit="return false">
        <div class="reg-text">
          <label for="identity">注册身份</label>
          <picker v-model="regInfo.identity" :columns="identitys" placeholder="请选择申请人类型" title="身份选择" class="input"></picker>
        </div>
        <div class="reg-text">
          <label for="sname">姓名</label>
          <input type="text" placeholder="请输入姓名" class="input" name="sname" id="sname" v-model="regInfo.sname">
        </div>
        <div class="reg-text">
          <label for="account">学号</label>
          <input type="text" placeholder="请输入学号" class="input" name="account" id="account" v-model="regInfo.account">
        </div>
        <div class="reg-text">
          <label for="sclass">班级</label>
          <input type="text" placeholder="请输入班级" class="input" name="sclass" id="sclass" v-model="regInfo.sclass">
        </div>
        <div class="reg-text">
          <label for="phone">手机号</label>
          <input type="text" placeholder="请输入手机号" class="input" name="phone" id="phone" v-model="regInfo.phone" />
        </div>
        <div class="reg-text">
          <label for="email">邮箱</label>
          <input type="text" placeholder="请输入邮箱" class="input" name="email" id="email" v-model="regInfo.email" />
        </div>
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

        <!-- 时间填写 -->
        <div class="reg-text date-picker" v-if="isShowTime('0123')">
          <label for="applicationTime">递交入党申请时间</label>
          <date-picker v-model="time.applicationTime" class="input" title="递交入党申请时间"></date-picker>
        </div>

        <div class="reg-text date-picker" v-if="isShowTime('123')">
          <label for="activistTime">确定为积极分子时间</label>
          <date-picker v-model="time.activistTime" class="input" title="确定为积极分子时间"></date-picker>
        </div>

        <template v-if="isShowTime('23')">
          <div class="reg-text date-picker">
            <label for="probationaryTime">确定为发展对象时间</label>
            <date-picker v-model="time.probationaryTime" class="input" title="确定为发展对象时间"></date-picker>
          </div>
          <div class="reg-text date-picker">
            <label for="potentialTime">确定为预备党员时间</label>
            <date-picker v-model="time.potentialTime" class="input" title="确定为预备党员时间"></date-picker>
          </div>
        </template>

        <div class="reg-text date-picker" v-if="isShowTime('3')">
          <label for="fullpartyTime">确定为正式党员时间</label>
          <date-picker v-model="time.fullpartyTime" class="input" title="确定为正式党员时间"></date-picker>
        </div>

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
      identitys: [
        "入党申请人",
        "入党积极分子",
        "中共预备党员",
        "中共党员",
      ], // 身份列表
      regInfo: {
        account: "", // 账号
        password: "", // 密码
        sname: "", // 姓名
        sclass: "", // 班级
        phone: "", // 电话
        email: "", // 邮箱
        identity: "", // 当前身份
      },
      password: "", // 第二次密码，验证密码
      psdErrMsg: "", // 密码错误信息
      agree: true, // 同意注册协议
      time: {
        applicationTime: "", // 入党申请书递交时间
        activistTime: "", // 确定为积极分子时间
        probationaryTime: "", // 确定为考察对象时间
        potentialTime: "", // 确定为预备党员时间
        fullpartyTime: "", // 确定为正式党员时间
      }, // 时间
      timeMap: [
        ["0123", "applicationTime"],
        ["123", "activistTime"],
        ["23", "probationaryTime"],
        ["23", "potentialTime"],
        ["3", "fullpartyTime"],
      ], // 时间权限映射

      regState: 0, // 注册表单状态
      psdStatus: 0, // 密码显示状态
    }
  },
  computed: {
    // 注册时间
    regTime() {
      // 根据身份选择时间
      const timeArr = [];
      this.timeMap.forEach(item => {
        const [key, value] = item;
        if (this.isShowTime(key)) {
          timeArr.push(value);
        }
      });
      // 筛选时间属性
      const time = {};
      timeArr.forEach(item => {
        time[item] = this.time[item]
      });
      return time;
    },
    allInfo() {
      return { ...this.regInfo, ...this.regTime, password1: this.password, agree: this.agree };
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
    // 显示注册时间
    isShowTime(option) {
      if (typeof option === "string") {
        option = option.split("");
      }
      return option.includes(this.regInfo.identity);
    },
    // 提交注册
    register() {
      // 加载
      const load = this.$toast.loading({
        mask: true,
        duration: 0,
        message: '加载中...'
      });
      // 结合信息
      let regInfo = { ...this.regInfo, ...this.regTime };
      regInfo.identity = this.identitys[regInfo.identity];
      // 发送请求
      register(regInfo).then(res => {
        console.log(res);
        // this.regState = 1;
        load.clear();
        // 倒计时
        this.countDown({ content: "  跳到登录", type: "success" }, () => {
          // 注册成功跳到登录页
          this.$router.push({ path: "/login" });
        });
      }).catch(err => {
        console.error(err);
        load.clear();
        this.$dialog.alert({
          title: '提示',
          message: err.msg,
          confirmButtonColor: "#f44"
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
.reg-text select.input {
  margin-left: 0.8em;
}
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
.date-picker {
  padding: 2.2vw 5vw;
}
.date-picker label {
  width: 30%;
}
.date-picker .input {
  margin-left: 18vw;
}
.psd-err {
  color: #de442c;
  font-size: 0.7em;
  width: 6em;
}
.reg-select {
  display: flex;
  align-items: center;
}
.reg-select input {
  background-color: transparent;
}
.info {
  color: #e54e31;
}
</style>
