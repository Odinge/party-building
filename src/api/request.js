import axios from "axios";
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  baseURL: "/api"
  // baseURL: "http://39.108.184.192:8888/" // api的base_url
  // timeout: 5000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    config.headers.Accept = "application/json;";
    // let token = getToken();

    // if (token) {
    //   config.headers.token = token;
    // }
    return config;
  },
  err => {
    // Do something with request error
    console.log(err); // for debug
    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  response => {
    let data = response.data;
    switch (data.status) {
      // 成功
      case 1:
        return data;
      // 失败 跳转路由等等
      default:
        break;
    }
    const err = new Error(data.msg);
    err.data = data;
    err.response = response;

    throw err;
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 201:
          err.message = "已登录";
        case 401:
          err.message = "请登录";
          break;
        case 404:
          err.message = "请求地址出错";
          break;
        case 500:
        case 503:
          err.message = "服务器错误";
          break;
        case 404:
          err.message = "请求数据超时，请刷新页面重试";
          break;
        default:
          break;
      }
    }
    return Promise.reject(err);
  }
);

// 封装请求
const request = (method, url, params) => {
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

// 获取token
export const setToken = () => {
  request("get", "/getToken")
    .then(res => {
      sessionStorage.setItem("token", res.data);
    })
    .catch(err => {
      console.error(err);
      delToken();
    });
};

const getToken = () => sessionStorage.getItem("token");

const delToken = () => sessionStorage.removeItem("token");

// setToken();

export default request;
