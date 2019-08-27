/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-14 13:31:31
 * @LastEditTime: 2019-08-27 20:08:18
 * @LastEditors: Please set LastEditors
 */
import Cookies from "js-cookie";

// 设置token
// export const setToken = (token = createToken()) => {
//   sessionStorage.setItem("token", token);
//   return token;
// };

// 存储登录的用户账号
export const setAccount = account => {
  localStorage.setItem("account", account);
  return account;
};

// 登录的用户账号
export const getAccount = () => localStorage.getItem("account") || "";
// 删除用户账号
export const delAccount = () => localStorage.removeItem("account");

// 获取token
// export const getToken = () => sessionStorage.getItem("token");
export const getToken = () => Cookies.get("ticket");

// 删除token
// export const delToken = () => sessionStorage.removeItem("token");

export const delToken = () => {
  Cookies.remove("ticket");
  delAccount();
};

// 创建token
// function createToken(len = 32) {
//   const cert = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM123456789";
//   let token = "";
//   for (let i = 0; i < len; i++) {
//     token += cert[~~(Math.random() * cert.length)];
//   }
//   return token;
// }
