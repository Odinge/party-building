import * as types from "./types";
// 同步方法
export default {
  // 设置用户基本信息
  [types.SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo;
  },
  // 设置登录token
  [types.SET_TOKEN](state, token) {
    state.token = token;
  },
  // 设置用户头像
  [types.SET_USERAVATAR](state, userAvatar) {
    state.userInfo.userAvatar = userAvatar;
  },
  // 设置头部标题
  setHeaderTitle(state, title) {
    state.headerTitle = title;
  }
};
