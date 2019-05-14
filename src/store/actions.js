// 异步方法
import { login, register } from "../api/login";
import { SET_TOKEN, SET_USERINFO } from "./type";
import { setToken, delToken } from "../util/token";
export default {
  async login({ commit }, user) {
    const res = await login(user);
    // 登录成功
    // 保存token
    const token = setToken();
    commit(SET_TOKEN, token);

    return res;
  },
  async logout() {
    delToken();
  },
  async getUserInfo({ commit }) {}
};
