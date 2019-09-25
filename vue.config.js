/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-12 13:22:12
 * @LastEditTime: 2019-09-25 19:06:22
 * @LastEditors: Please set LastEditors
 */
// 作为配置文件，直接导出配置对象即可
module.exports = {
  // publicPath:
  // process.env.NODE_ENV === "production" ? "http://117.50.73.238:8080" : "/",
  // 开发环境配置
  devServer: {
    // 设置主机地址
    host: "localhost",
    // 设置默认端口
    port: 8080,
    // 设置代理
    proxy: {
      "/api": {
        // 目标 API 地址
        target: "http://117.50.73.238:8080",
        // target: "http://113.54.11.44:8080",
        // 如果要代理 websockets
        // ws: true, // 防止控制台报错
        // 将主机标头的原点更改为目标URL
        changeOrigin: false,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  // ui主题定制
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          red: "#03a9f4",
          blue: "#f44",
          orange: "#f08d49",
          "text-color": "#111"
        }
      }
    }
  }
};
