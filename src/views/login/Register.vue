<template>
  <div class="register">
    <div class="head">
      <a href="index.html"><span class="head-back">返回</span></a>
      <h2>用户注册</h2>
      <a href="login.html"><span class="head_login">登录</span></a>
    </div>

    <form name="register" action="" method="post">
      <div class="zhuce" id="zhuce">
        <div class="text">
          <label>注册身份</label>
          <select name="cars" class="input" id="test_select" v-model="identity">
            <option value="" selected disabled>请选择申请人类型</option>
            <option v-for="item in identitys" :value="item.value">{{item.label}}</option>
          </select>
        </div>
        <div class="text">
          <label>姓名</label>
          <input type="text" placeholder="请输入姓名" class="input" name="sname" id="sname">
        </div>
        <div class="text">
          <label>学号</label>
          <input type="text" placeholder="请输入学号" class="input" name="sid" id="sid">
        </div>
        <div class="text">
          <label>班级</label>
          <select name="cars" class="input" v-model="className">
            <option value="" selected="true" disabled="true">请选择班级</option>
            <option v-for="item in classList" :value="item.value">{{item.label}}</option>
          </select>
          </select>
        </div>
        <div class="text">
          <label>手机号</label>
          <input type="text" placeholder="请输入手机号" class="input" name="phone" id="phone">
        </div>
        <div class="text">
          <label>邮箱</label>
          <input type="text" placeholder="请输入邮箱" class="input" name="email" id="email">
        </div>
        <div class="text">
          <label>密 码</label>
          <input type="text" placeholder="请输入密码" class="input" name="password" id="password">
        </div>
        <div class="text">
          <label>确认密码</label>
          <input type="text" placeholder="请输入确认密码" class="input" name="password1" id="password1">
        </div>

        <!-- 时间填写 -->
        <div class="text">
          <label>递交入党申请时间</label>
          <input type="date" value="2015-09-24" class="input" name="application_time" id="application_time" />
        </div>

        <div class="text" v-if="identity == 1">
          <label>确定为积极分子时间</label>
          <input type="date" value="2015-09-24" class="input" />
        </div>

        <template v-else-if="identity == 2">
          <div class="text">
            <label>确定为发展对象时间</label>
            <input type="date" value="2015-09-24" class="input" name="activist_time" id="activist_time" />
          </div>
          <div class="text">
            <label>确定为预备党员时间</label>
            <input type="date" value="2015-09-24" class="input" name="probationary_time" id="probationary_time" />
          </div>
        </template>

        <div class="text" v-else-if="identity == 2">
          <label>确定为正式党员时间</label>
          <input type="date" value="2015-09-24" class="input" name="fullparty_time" id="fullparty_time" />
        </div>

        <div class="tip">
          <a href="#"><input type="checkbox" checked="checked">同意注册条款</a>
        </div>
        <div class="btndl"><input type="submit" value="注 册"></div>
      </div>
      <div style="height: 50px;"></div>
    </form>
  </div>
</template>
<script>
// import "./register.css";
export default {
  data() {
    return {
      identity: "", // 身份
      identitys: [
        { value: "1", label: "入党申请人" },
        { value: "2", label: "入党积极分子" },
        { value: "3", label: "中共预备党员" },
        { value: "4", label: "中共党员" },
      ], // 身份列表
      className: "", // 班级
      classList: [
        { value: "1", label: "计算机201601" },
        { value: "2", label: "计算机201602" },
        { value: "3", label: "计算机201603" },
        { value: "4", label: "计算机201604" },
        { value: "4", label: "计算机201605" },
        { value: "4", label: "计算机201606" },
      ] // 班级列表
    }
  },
  methods: {
    register() {

    }
  }
}
</script>
<style scoped>
.head {
  display: flex;
  justify-content: space-between;
  background: #e54e31;
  color: #fff;
  padding: 5vw 6vw;
}
.head h2 {
}
</style>
