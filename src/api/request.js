/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-13 08:53:10
 * @LastEditTime: 2019-09-25 18:54:47
 * @LastEditors: Please set LastEditors
 */
import axios from "axios";
import router from "../router";
import { removeToken } from "../utils/auth";
import { Dialog } from "vant";

// const pubBaseURL = "http://117.50.73.238:8080";
// const pubBaseURL = "http://113.54.11.44:8080";
// 创建axios实例
const service = axios.create({
  baseURL: "/api"
  // baseURL: process.env.NODE_ENV === "production" ? pubBaseURL : "/api"
  // timeout: 5000 // 请求超时时间
});

// 无权限重新登录
function reLogin(res) {
  Dialog.alert({
    title: "权限录",
    message: "用户登录异常，请重新登录！！"
  }).then(() => {
    removeToken();
    router.replace({
      path: "/login",
      query: { redirect: router.currentRoute.fullPath }
    });
  });
}

// 请求拦截器
service.interceptors.request.use(
  config => {
    // console.log(config);
    // config.headers["Content-Type"] = "application/json;charset=UTF-8";
    // config.headers.Accept = "application/json;";
    return config;
  },
  err => {
    // console.log(err);

    // Do something with request error
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  response => {
    // console.log(response);

    let { data: res } = response;
    let { code, data } = res;

    // 对响应的信息做处理
    switch (code) {
      case undefined:
      case 0:
      case 20001:
        return data;
      case 40006:
        reLogin();
        break;
      default:
        break;
    }
    throw res;
  },
  err => {
    // console.log(err.response);

    if (err && err.response) {
      const resMap = {
        201: "已登录,不能重复登录",
        400: "请求参数有误",
        401: "需认证，未登录",
        404: "请求地址出错",
        405: "http请求类型错误",
        500: "服务端错误",
        502: "无效响应",
        503: "服务器错误不可用或暂停",
        504: "请求数据超时，请刷新页面重试"
      };
      const data = err.response.data;
      const { code } = data;

      switch (code) {
        case 40006:
          reLogin();
          break;
        default:
          break;
      }

      // err.message = resMap[err.response.status] || "请求失败";
      err.message = err.response.statusText;
    }
    return Promise.reject(err);
  }
);
// 封装请求
const request = (method, url, params = {}, config = {}) => {
  if (method.toUpperCase() === "GET") {
    return service({
      method,
      url,
      params,
      config
    });
  } else {
    return service({
      method,
      url,
      data: params,
      config
    });
  }
};

request.axios = axios;
export default request;
