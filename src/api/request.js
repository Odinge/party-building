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
    console.log("request");

    return Promise.reject(err);
  }
);

service.interceptors.response.use(
  response => {
    console.log(response);
    let status = response.status;
    let data = response.data;
    // switch (data.status) {
    //   // 成功
    //   case 1:
    //     return data;
    //   // 失败 跳转路由等等
    //   default:
    //     break;
    // }
    const { url } = response.config;
    if (status === 200) {
      if (/login/.test(url)) {
        if (data === "failed login") {
          let err = {
            status: 1,
            msg: "登录失败"
          };
          throw err;
        }
        if (data === "sccuess login") {
          return {
            status: 0,
            msg: "登录成功！"
          };
        }
      }
      return data;
    } else {
      const err = new Error(data.msg);
      err.data = data;
      err.response = response;
      throw err;
    }
  },
  err => {
    console.log(err.response.data);

    if (err && err.response) {
      const resMap = {
        201: "已登录,不能重复登录",
        400: "请求参数有误",
        401: "未登录",
        404: "请求地址出错",
        405: "请求方法不允许",
        500: "服务器错误",
        502: "无效响应",
        503: "服务器错误",
        504: "请求数据超时，请刷新页面重试"
      };
      err.message = resMap[err.response.status] || "请求失败";
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
// export const setToken = () => {
//   request("get", "/getToken")
//     .then(res => {
//       sessionStorage.setItem("token", res.data);
//     })
//     .catch(err => {
//       console.error(err);
//       delToken();
//     });
// };

// const getToken = () => sessionStorage.getItem("token");

// const delToken = () => sessionStorage.removeItem("token");

// setToken();

export default request;
