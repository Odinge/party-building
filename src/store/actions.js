/*
 * @Description: 异步执行状态
 * @Author: Odinge
 * @Date: 2019-05-12 14:49:11
 * @LastEditTime: 2019-09-14 17:38:26
 * @LastEditors: Please set LastEditors
 */
// 异步方法
import { login, register, logout, getUserInfo } from "../api/login";
import * as types from "./types";
import { removeToken } from "../utils/auth";

export default {
  async login({ commit }, user) {
    // 访问后台获取登录
    const res = await login(user);
    return res;
  },
  async logout({ commit }) {
    await logout();
    removeToken();
    commit(types.SET_USERINFO, {});
  },
  // 从数据库获取信息
  async getUserInfo({ commit }) {
    const userInfo = await getUserInfo();

    userInfo.userAvatar = userInfo.userAvatar || "/img/mine/default-avatar.png";

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
