// 异步方法
import { login, register, logout } from "../api/login";
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
    await logout();
    delToken();
    // 刷新浏览器
    location.reload();
  },
  async getUserInfo({ commit }) {}
};
