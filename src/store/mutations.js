import { SET_TOKEN, SET_USERINFO, SET_USERAVATAR } from "./type";
// 同步方法
export default {
  // 设置用户基本信息
  [SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo;
  },
  // 设置登录token
  [SET_TOKEN](state, token) {
    state.token = token;
  },
  // 设置用户头像
  [SET_USERAVATAR](state, userAvatar) {
    state.userInfo.userAvatar = userAvatar;
  }
};
