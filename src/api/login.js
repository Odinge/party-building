// 导入请求
import request from "./request";

// 用户登录api
export const login = user => request("post", "/login", user);

// 用户登出api
export const logout = () => request("post", "/logout");

// 用户注册api
export const register = data => request("post", "/regist", data);

// 获取用户信息
export const getUserInfo = () => request("get", "/getDetail");
