import { SET_TOKEN, SET_USERINFO } from "./type";
// 同步方法
export default {
  [SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo;
  },
  [SET_TOKEN](state, token) {
    state.token = token;
  }
};
