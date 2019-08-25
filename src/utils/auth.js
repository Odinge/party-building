/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-14 13:31:31
 * @LastEditTime: 2019-08-22 21:11:33
 * @LastEditors: Please set LastEditors
 */
import Cookies from "js-cookie";

// 设置token
// export const setToken = (token = createToken()) => {
//   sessionStorage.setItem("token", token);
//   return token;
// };

// 获取token
// export const getToken = () => sessionStorage.getItem("token");
export const getToken = () => Cookies.get("ticket");

// 删除token
// export const delToken = () => sessionStorage.removeItem("token");
export const delToken = () => Cookies.remove("ticket");

// 创建token
// function createToken(len = 32) {
//   const cert = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM123456789";
//   let token = "";
//   for (let i = 0; i < len; i++) {
//     token += cert[~~(Math.random() * cert.length)];
//   }
//   return token;
// }
