/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-12 14:49:48
 * @LastEditTime: 2019-09-10 20:20:47
 * @LastEditors: Please set LastEditors
 */
import * as types from "./types";
// 同步方法
export default {
  // 设置用户基本信息
  [types.SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo;
  },
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
    state.pageConfig.prestrain = loadState;
  },
  // 设置上个相同的路由地址
  [types.SET_PREV_SAME_PATH](state, prevSamePath) {
    state.pageConfig.prevSamePath = prevSamePath;
  },
  // 设置上个路由地址
  [types.SET_PREV_PATH](state, prevPath) {
    state.pageConfig.prevPath = prevPath;
  },
  // 判断l内容信息是否改变
  [types.SET_CONTENT_CHANGE](state, { type, changeState }) {
    state.contentChange[type + "Change"] = changeState;
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
