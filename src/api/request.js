import axios from "axios";

// 获取token
import { getToken, delToken } from "../utils/auth";
// 路由
import router from "../router";
import { Dialog } from "vant";

// 创建axios实例
const service = axios.create({
  // baseURL: "http://117.50.73.238:8080"
  baseURL: "/api"
  //   process.env.NODE_ENV === "production" ? "http://117.50.73.238:8080" : "/"
  // timeout: 5000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    console.log(config);

    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    config.headers.Accept = "application/json;";
    let token = getToken();

    if (token) {
      config.headers.token = token;
    }
    return config;
  },
  err => {
    console.log(err);

    // Do something with request error
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  response => {
    console.log(response);
    // let status = response.status;
    let { data: res } = response;
    let { code, data } = res;
    // 对响应的信息做处理
    // const { url } = response.config;
    // if (status === 200) {
    //   if (/login/.test(url)) {
    //     if (data === "failed login") {
    //       let err = {
    //         status: 1,
    //         msg: "登录失败"
    //       };
    //       throw err;
    //     }
    //     if (data === "sccuess login") {
    //       return {
    //         status: 0,
    //         msg: "登录成功！"
    //       };
    //     }
    //   }
    //   return data;
    // } else {
    //   const err = new Error(data.msg);
    //   err.data = data;
    //   err.response = response;
    //   throw err;
    // }
    switch (code) {
      case 20001:
        return data;
      case 40006:
        Dialog.alert({
          title: "提示",
          message: "无权限操作，请登录",
          confirmButtonColor: "#f44"
        }).then(() => {
          delToken();
          router.replace({
            path: "/login",
            query: { redirect: router.currentRoute.fullPath }
          });
        });
        break;
      default:
        break;
    }

    throw res;
  },
  err => {
    console.log(err.response);

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
      // err.message = resMap[err.response.status] || "请求失败";
      err.message = err.response.statusText;
    }
    return Promise.reject(err);
  }
);

// 封装请求
const request = (method, url, params = {}, config = {}) => {
  if (method == "get") {
    return service({
      method,
      url,
      params
    });
  } else {
    return service({
      method,
      url,
      data: params
    });
  }
};

export default request;
