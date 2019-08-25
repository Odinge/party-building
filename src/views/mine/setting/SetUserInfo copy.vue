<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-10 08:53:18
 * @LastEditTime: 2019-08-24 22:49:08
 * @LastEditors: Please set LastEditors
 -->
<template>

  <div class="reg-main register">
    <form name="register" action="" method="post" onsubmit="return false">
      <div class="reg-text">

        <label for="identity">当前身份</label>
        <picker v-model="regInfo.identity" :columns="identitys" placeholder="请选择申请人类型" title="身份选择" class="input"></picker>
      </div>

      <div class="reg-text">
        <label for="sname">姓名</label>
        <input type="text" placeholder="请输入姓名" class="input" name="sname" id="sname" v-model="regInfo.name">
      </div>
      <div class="reg-text">
        <label for="sclass">班级</label>
        <input type="text" placeholder="如：2017计科01" class="input" name="sclass" id="sclass" v-model="regInfo.sclass">
      </div>
      <div class="reg-text">
        <label for="phone">手机号</label>
        <input type="text" placeholder="请输入手机号" class="input" name="phone" id="phone" v-model="regInfo.phone" />
      </div>
      <div class="reg-text">
        <label for="email">
          <van-icon ref="emailTip" name="question-o" class="info hide" @click="$toast('格式不正确')"></van-icon>
          邮箱
        </label>
        <input type="text" placeholder="请输入邮箱" class="input" name="email" id="email" ref="email" v-model="regInfo.email" @change="changeEmail" />
      </div>

      <div class="reg-text">
        <label for="email">
          邮箱验证码
        </label>
        <input type="text" placeholder="请输入验证码" class="input" v-model="ecode" @blur="checkCode" :disabled="!ecodesrc" />
        <button class="check-btn" :disabled="emailCheck" @click="sendEmail">发送验证码{{codeTime?`(${codeTime})`:""}}</button>
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

      <div class="reg-btn">
        <button @click.prevent="register" :class="states[regState]" :disabled="!regState">{{ regState === 1 ? "修改成功": "修&nbsp;&nbsp;改" }}</button>
      </div>
    </form>
  </div>

</template>
<script>
import { updateDetail, sendEmail } from "../../../api/login";
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
        name: "", // 姓名
        sclass: "", // 班级
        phone: "", // 电话
        email: "", // 邮箱
        identity: "", // 当前身份
      },
      originInfo: {}, // 原始数据

      psdErrMsg: "", // 密码错误信息

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

      ecode: "",// 邮箱验证
      ecodesrc: 0,
      codeTime: 0,
      timeId: null
    }
  },
  computed: {
    emailCheck() {
      const expEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      // 是否修改邮箱
      const isAlterEmail = this.originInfo.email !== this.allInfo.email;
      return (!expEmail.test(this.allInfo.email) || !!this.codeTime) || !isAlterEmail;
    },
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
      timeArr.forEach(item => time[item] = this.time[item]);
      return time;
    },
    allInfo() {
      return { ...this.regInfo, ...this.regTime, ecode: this.ecode };
    },
    userInfo() {
      const userInfo = this.$store.state.userInfo;
      return userInfo;
    },
  },
  mounted() {
    this.init();
  },
  watch: {
    allInfo: {
      handler(info) {

        // 判断必须的是否已填写
        let keys = Object.keys(info);
        let disabled = false;
        for (const key of keys) {
          if (!info[key].trim()) {
            disabled = true;
            break;
          }
        }

        const { ecode, ...nowInfo } = info;
        keys = Object.keys(nowInfo);

        // 修改验证
        let isAlter = false;
        for (const key of keys) {
          if (this.originInfo[key] !== info[key]) {
            isAlter = true;
            break;
          }
        }

        // 正则验证
        const exp = {
          email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        };

        const expKeys = Object.keys(exp);
        for (const key of expKeys) {
          const bool = exp[key].test(info[key]);
          if (!bool && this.originInfo[key] !== info[key]) {
            disabled = true;
          }
        }

        // 改变状态
        this.regState = disabled || !isAlter ? 0 : 2;

      }, deep: true
    }
  },
  methods: {
    changeEmail() {
      this.timeId && clearInterval(this.timeId);
      this.ecode = "";
      this.ecodesrc = 0;
      this.codeTime = 0;
    },
    // 检查验证码是否正确
    checkCode(e) {
      const target = e.target;
      if (this.ecode.trim() !== this.ecodesrc && this.ecode.trim() && this.ecodesrc) {
        this.$dialog.alert({
          title: "验证录",
          message: "验证码错误",
          confirmButtonColor: "#f44"
        }).then(() => {
          this.ecode = "";
          target.focus();
        })
      }
    },
    // 发送邮件
    sendEmail() {
      const code = Math.random().toString().slice(-6);
      this.ecodesrc = code;
      const body = `验证码：${code},   请及时验证！！！`;
      const subject = `党建邮箱验证码`;
      const to = this.regInfo.email;
      const load = this.$toast.loading({
        mask: true,
        duration: 0,
        message: '发送中...'
      });

      // 发送邮件
      // sendEmail(to, subject, body).then(data => {
      console.log(code);
      this.$dialog.alert({
        title: "邮件录",
        message: `发送成功，验证码请到 \n${this.regInfo.email} \n查看`,
        confirmButtonColor: "#f44"
      }).then(() => {
        load.clear();
        this.codeTime = 30;
        this.timeId = setInterval(() => {
          if (this.codeTime) {
            this.codeTime--;
          } else {
            clearInterval(this.timeId);
            this.timeId = null;
          }
        }, 1000);
      });
      // }).catch(err => {
      //   this.$toast.fail(err.message);
      //   this.changeEmail();
      //   this.$refs.email.focus();
      // });

    },
    // 返回
    back() {
      this.$router.back();
    },
    init() {
      // 初始化用户信息
      const infoKey = Object.keys(this.regInfo);
      infoKey.forEach(key => this.regInfo[key] = this.userInfo[key] || "");
      this.regInfo.identity = this.identitys.indexOf(this.regInfo.identity) + "" || "";
      // 初始化用户时间
      const timeKey = Object.keys(this.time);
      timeKey.forEach(key => this.time[key] = this.userInfo[key] || "");
      // 设置原始信息
      this.originInfo = { ...this.regInfo, ...this.time };
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
        message: '修改中...'
      });
      // 结合信息
      let regInfo = { ...this.regInfo, ...this.regTime };
      regInfo.identity = this.identitys[regInfo.identity];
      // 发送请求
      updateDetail(regInfo).then(res => {
        // this.regState = 1;
        this.$store
          .dispatch("getUserInfo")
          .then(data => {
            load.clear();
            this.$dialog.alert({
              title: '提示',
              message: "信息修改成功",
              confirmButtonColor: "#f44"
            }).then(() => {
              this.$router.back();
            });
          })
      }).catch(err => {
        load.clear();
        this.$dialog.alert({
          title: '提示',
          message: err.message,
          confirmButtonColor: "#f44"
        });
      });
    },

  }
};
</script>
<style>
/* .register {
} */
.reg-main {
  flex: 1;
  height: 100%;
  padding: 3vw 2vw 15vw;
  overflow: auto;
  font-size: 4.5vw;
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
  margin-top: 2em;
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
.hide {
  display: none;
}
.user-err {
  box-shadow: 0 0 2px #de442c !important;
}
.check-btn {
  padding: 0.5em;
  border-radius: 2em;
  background-color: #fc7863;
  font-size: 0.8em;
  color: #fff;
}
</style>
