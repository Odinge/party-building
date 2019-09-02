/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-12 14:49:48
 * @LastEditTime: 2019-09-02 09:48:33
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
    state.prestrain = loadState;
  },
  // 设置上个相同的路由地址
  [types.SET_PREV_SAME_PATH](state, prevSamePath) {
    state.prevSamePath = prevSamePath;
  },
  // 判断文章信息是否改变
  [types.SET_ARTICLE_CHANGE](state, articleChange) {
    state.articleChange = articleChange;
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
