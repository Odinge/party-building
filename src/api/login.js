/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-13 08:52:58
 * @LastEditTime: 2019-08-24 16:04:11
 * @LastEditors: Please set LastEditors
 */
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

// 修改用户信息
export const updateDetail = data => request("post", "/updateDetail", data);

// 密码api
/**
 * 忘记密码
 */
export const forget = account => {
  const data = new FormData();
  data.append("account", account);
  return request("post", "/forget", data);
};

/**
 * 修改密码
 */
export const changePassword = ({
  oldPassword,
  newPassword,
  repeatPassword
}) => {
  const data = new FormData();
  data.append("oldPassword", oldPassword);
  data.append("newPassword", newPassword);
  data.append("repeatPassword", repeatPassword);
  return request("post", "/changePassword", data);
};

/**
 * 重置密码
 */
export const findPassword = token => request("get", "/findPassword" + token);

/**
 * 发送邮件
 */
export const sendEmail = (ToAddress, Subject, HtmlBody) =>
  request("get", "https://dm.aliyuncs.com", {
    Action: "SingleSendMail",
    AccountName: "13684029769@163.com",
    ReplyToAddress: true,
    AddressType: 1,
    ToAddress,
    Subject,
    HtmlBody
  });
