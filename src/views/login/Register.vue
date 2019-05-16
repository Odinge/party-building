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

          <div @touchstart.prevent.stop="showId=!showId" class="reg-select">
            <input type="text" placeholder="请选择申请人类型" name="identity" id="identity" class="input" :value="identitys[regInfo.identity]" disabled>
            <van-icon name="arrow" />
          </div>
          <van-actionsheet v-model="showId">
            <van-picker :columns="identitys" title="省份选择" show-toolbar @cancel="onCancel" @confirm="onidchange" />
          </van-actionsheet>

        </div>
        <div class="reg-text">
          <label for="sname">姓名</label>
          <input type="text" placeholder="请输入姓名" class="input" name="sname" id="sname" v-model="regInfo.sname">
        </div>
        <div class="reg-text">
          <label for="sid">学号</label>
          <input type="text" placeholder="请输入学号" class="input" name="sid" id="sid" v-model="regInfo.sid">
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
          <label for="password">密 码</label>
          <input type="password" placeholder="请输入密码" class="input" name="password" id="password" v-model="regInfo.password" />
        </div>
        <div class="reg-text">
          <label for="password1">确认密码</label>
          <input type="password" placeholder="请输入确认密码" class="input reg-psd" name="password1" id="password1" v-model="password" />
          <span class="psd-err">{{psdErrMsg}}</span>
        </div>

        <!-- 时间填写 -->
        <div class="reg-text date-picker" v-if="isShowTime('0123')">
          <label for="applicationTime">递交入党申请时间</label>
          <input type="date" class="input" name="applicationTime" id="applicationTime" v-model="time.applicationTime" />
        </div>

        <div class="reg-text date-picker" v-if="isShowTime('123')">
          <label for="activistTime">确定为积极分子时间</label>
          <input type="date" class="input" name="activistTime" id="activistTime" v-model="time.activistTime" />
        </div>

        <template v-if="isShowTime('23')">
          <div class="reg-text date-picker">
            <label for="probationaryTime">确定为发展对象时间</label>
            <input type="date" class="input" name="probationaryTime" id="probationaryTime" v-model="time.probationaryTime" />
          </div>
          <div class="reg-text date-picker">
            <label for="potentialTime">确定为预备党员时间</label>
            <input type="date" class="input" name="potentialTime" id="potentialTime" v-model="time.potentialTime" />
          </div>
        </template>

        <div class="reg-text date-picker" v-if="isShowTime('3')">
          <label for="fullpartyTime">确定为正式党员时间</label>
          <input type="date" class="input" name="fullpartyTime" id="fullpartyTime" v-model="time.fullpartyTime" />
        </div>

        <div class="reg-tip">
          <input type="checkbox" checked id="plain" v-model="agree"><label for="plain">同意注册条款</label>
        </div>
        <div class="reg-btn">
          <button @touchstart.prevent="register" :class="states[regState]" :disabled="!regState">{{ regState === 1 ? "注册成功": "注 册" }}</button>
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
      // identitys: [
      //   { value: "0", label: "入党申请人" },
      //   { value: "1", label: "入党积极分子" },
      //   { value: "2", label: "中共预备党员" },
      //   { value: "3", label: "中共党员" },
      // ], // 身份列表
      showId: false,
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
      regState: 0 // 注册表单状态
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
      return { ...this.regInfo, ...this.regTime, password1: this.password };
    }
  },
  watch: {
    allInfo: {
      handler(newVal) {
        // 判断必须的是否已填写
        const keys = Object.keys(newVal);
        let disabled = false;
        for (const key of keys) {
          if (!newVal[key].trim()) {
            disabled = true;
            break;
          }
        }
        // 判断密码是否确认正确
        if (newVal.password1 && newVal.password && newVal.password1 !== newVal.password) {
          disabled = true;
          this.psdErrMsg = "密码不一致";
        } else {
          this.psdErrMsg = "";
        }
        // 判断是否同意协议
        if (!this.agree) {
          disabled = true;
        }

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
      // 结合信息
      let regInfo = { ...this.regInfo, ...this.regTime };
      register(regInfo).then(res => {
        console.log(res);

      }).catch(err => {
        console.error(err);

      });
    },

    onidchange(value, index) {
      this.regInfo.identity = index + "";
      this.showId = false;
    },
    onCancel() {
      this.showId = false;
    }
  }
};
</script>
<style>
.register {
  display: flex;
  flex-direction: column;
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
  font-size: 1.2rem;
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
  line-height: 1.2rem;
}
.reg-text .input {
  flex: 1;
  height: 10vw;
  width: 100%;
  border: none;
  margin-left: 1rem;
  color: #858585;
  background-color: transparent;
}
.reg-text select.input {
  margin-left: 0.8rem;
}
.reg-tip {
  text-align: right;
  padding: 5vw 5vw 10vw;
  font-size: 0.9rem;
  color: #de442c;
}
.reg-tip input {
  vertical-align: -2px;
  margin-right: 0.2rem;
}
.reg-btn {
  text-align: center;
}
.reg-btn button {
  width: 88%;
  padding: 3.5vw 0;
  cursor: pointer;
  background-color: #de442c;
  border-radius: 5px;
  font-size: 16px;
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
  font-size: 0.7rem;
  width: 5em;
}
.reg-select {
  display: flex;
  align-items: center;
}
.reg-select input {
  background-color: transparent;
}
</style>
