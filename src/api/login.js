// 导入请求
import request from "./request";

// 用户登录api
export const login = user => request("post", "/user/login", user);

// 用户登出api
export const logout = () => request("get", "/user/logout");

// 用户注册api
export const register = data => request("post", "/user/register", data);
