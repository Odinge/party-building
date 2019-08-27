/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-12 14:49:48
 * @LastEditTime: 2019-08-27 20:10:50
 * @LastEditors: Please set LastEditors
 */
import * as types from "./types";
// 同步方法
export default {
  // 设置用户基本信息
  [types.SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo;
  },
  // 设置登录token
  // [types.SET_TOKEN](state, token) {
  //   state.token = token;
  // },
  // 设置用户头像
  [types.SET_USERAVATAR](state, userAvatar) {
    state.userInfo.userAvatar = userAvatar;
  },
  // 设置头部标题
  setHeaderTitle(state, title) {
    state.headerTitle = title;
  },
  // 设置页面预加载状态
  [types.SET_PAGE_LOADING](state, loadState) {
    state.prestrain = loadState;
  },
  // 设置页面配置信息
  [types.SET_PAGE_CONFIG](state, config) {
    state.pageConfig = config;
  },
  // 设置用户账号
  [types.SET_ACCOUNT](state, account) {
    state.account = account;
  }
};
