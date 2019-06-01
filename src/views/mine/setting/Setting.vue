<template>
  <section class="setting">
    <van-cell-group class="setting-content">
      <van-uploader :after-read="onRead" :before-read="onBeforeRead" name="avatar" accept="image/gif, image/jpeg" class="avatar-box">
        <van-cell value="内容" icon="manager-o" is-link title="头像" class="setting-cell">
          <!-- <div > -->
          <img :src="userInfo.userAvatar" class="user-avatar">
          <!-- </div> -->
        </van-cell>
      </van-uploader>
      <van-cell title="修改密码" icon="bookmark-o" is-link />
    </van-cell-group>
    <div class="logout">
      <!-- <a href=""> -->
      <button @touchstart="logout">退出登录</button>
      <!-- </a> -->
    </div>
  </section>
</template>

<script>

import { mapState, mapActions } from "vuex";
export default {
  methods: {
    logout() {
      const load = this.$toast.loading({
        mask: true,
        duration: 0,
        message: '加载中...'
      });
      this.$store.dispatch("logout").then(res => {
        load.clear();
        this.$router.push({ path: "/login" });
      }).catch(err => {
        this.$toast.fail(err.message);
      });
    },
    onRead(file, detail) {
      const { content: url } = file;
      // 使用blob创建连接
      // const blob = new Blob([file]);
      // const url = window.URL.createObjectURL(blob);
      this.$toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中...'
      });
      this.setUserAvatar(url).then(res => {
        this.$toast.success('修改头像成功');
      }).catch(err => {
        this.$toast.fail('修改头像失败');
      })
    },
    onBeforeRead(file) {
      const { type } = file;
      if (/image/.test(type)) {
        return true;
      } else {
        this.$toast.fail('     失败\n请上传图片');
        return false;
      }
    },
    ...mapActions(['setUserAvatar'])
  },
  computed: {
    ...mapState(["userInfo"])
  }
}
</script>

<style>
.setting {
  background-color: #f2f3f5;
  font-size: 4.3vw;
}
.setting-content {
  margin: 3vw 0;
}
.logout {
  text-align: center;
  margin-top: 5vw;
}
.logout button {
  padding: 3vw;
  width: 80%;
  color: #fff;
  background-color: rgb(252, 62, 62);
  border-radius: 5vw;
}
.avatar-box {
  width: 100%;
}
.van-cell {
  align-items: center;
  min-height: 15vw;
  width: 100%;
  font-size: 4.3vw;
}
.user-avatar {
  display: inline-block;
  width: 11vw;
  height: 11vw;
  vertical-align: middle;
  border-radius: 50%;
}
.van-cell__left-icon,
.van-cell__right-icon {
  font-size: inherit;
}
</style>
