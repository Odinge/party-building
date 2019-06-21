// 异步方法
import { login, register, logout, getUserInfo } from "../api/login";
import * as types from "./types";
import { setToken, delToken } from "../utils/auth";

export default {
  async login({ commit }, user) {
    // 访问后台获取登录
    const res = await login(user);

    // 用于测试
    // let res = {};
    // const users = [{ account: "user", password: "123456" }];
    // const findUser = users.find(u => u.account === user.account);

    // if (findUser) {
    //   if (user.password === findUser.password) {
    //     res = { status: 0, message: "登录成功" };
    //   } else {
    //     res = { status: 1, message: "密码不正确" };
    //     throw res;
    //   }
    // } else {
    //   res = { status: 2, message: "账号不存在" };
    //   throw res;
    // }

    // 登录成功
    // 保存token
    const token = setToken();
    commit(types.SET_TOKEN, token);

    return res;
  },
  async logout() {
    const res = await logout();
    // const res = {};
    delToken();
    // 刷新浏览器
    // location.reload();
    return res;
  },
  // 从数据库获取信息
  async getUserInfo({ commit }) {
    const userInfo = await getUserInfo();

    userInfo.name = "张山山";
    userInfo.userAvatar = "/images/mine/user.png";
    userInfo.clockNum = 10;

    commit(types.SET_USERINFO, userInfo);
    return userInfo;
  },
  // 设置头像
  async setUserAvatar({ commit }, userAvatar) {
    const res = {};
    commit(types.SET_USERAVATAR, userAvatar);
    return res;
  }
};
