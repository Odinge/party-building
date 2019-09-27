/*
 * @Description: 全局配置
 * @Author: Odinge
 * @Date: 2019-05-14 23:30:00
 * @LastEditTime: 2019-09-27 13:19:07
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import axios from "axios";
import { downloadFileByUrl } from "./api/file";

// ui组件注册
import {
  Picker,
  Actionsheet,
  Icon,
  Search,
  Cell,
  CellGroup,
  Uploader,
  Toast,
  Dialog,
  Popup,
  DatetimePicker,
  Swipe,
  SwipeItem,
  Lazyload,
  Tab,
  Tabs,
  PullRefresh,
  List,
  Field,
  Button,
  Progress
} from "vant";
Vue.use(Icon)
  .use(Picker)
  .use(Actionsheet)
  .use(Search)
  .use(Cell)
  .use(Uploader)
  .use(Toast)
  .use(Dialog)
  .use(Popup)
  .use(DatetimePicker)
  .use(Swipe)
  .use(SwipeItem)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(PullRefresh)
  .use(Field)
  .use(Button)
  .use(Progress)
  .use(CellGroup);

// 设置对话框默认样式
Dialog.setDefaultOptions({ confirmButtonColor: "#f44" });

// 图片懒加载
Vue.use(Lazyload, {
  loading: "/img/comm/loading.gif",
  error: "/img/comm/error.png"
  // preLoad: 1.3
  // lazyComponent: true
});

// 注册全局组件
import components from "./components/components";
Vue.use(components);

// 注册全局axios
Vue.prototype.$http = axios;

// 服务器配置
import webConfig from "../public/js/web.config";
Vue.prototype.$webURL = webConfig.webURL;
Vue.prototype.$baseURL = webConfig.baseURL;
// 接口域名地址
// Vue.prototype.$webURL = "http://113.54.11.44:8080";
// Vue.prototype.$webURL = "http://117.50.73.238:8080";

// Vue.prototype.$webURL = process.env.VUE_APP_WEB_URL;
// Vue.prototype.$baseURL = process.env.VUE_APP_BASE_URL;

// 获取网址
Vue.prototype.$getUrl = function(url) {
  // 服务器地址正则
  const regExpWebURL = /^https?:\/\/[^\/]+(?=\/)/;
  if (regExpWebURL.test(url)) {
    return url.includes(this.$webURL)
      ? url.replace(regExpWebURL, this.$baseURL)
      : url;
  } else {
    const regExpBaseURL = new RegExp("^" + this.$baseURL + "/");
    return regExpBaseURL.test(url) ? url : this.$baseURL + url;
  }
};
// 根据文件id获取下载地址
Vue.prototype.$getDownloadUrlById = function(fileId, type = 1) {
  return (type ? this.$baseURL : "") + "/file/download?fileId=" + fileId;
};
// 下载文件通过url
Vue.prototype.$downloadByAtag = function(url, name, type = "") {
  const a = document.createElement("a");
  a.href = url;
  if (type) {
    type = "." + type;
  }
  a.download = name + type;
  a.click();
};

// 下载文件有提示
Vue.prototype.$download = function(
  { url, name, type, isLoadIcon = true },
  backcall
) {
  let loading = null;
  if (isLoadIcon) {
    loading = this.$toast.loading({
      duration: 0,
      // forbidClick: true, // 禁用背景点击
      loadingType: "spinner",
      message: "下载中..."
    });
  }
  downloadFileByUrl(url)
    .then(data => {
      url = this.$baseURL + url;
      this.$downloadByAtag(url, name, type);
      backcall && backcall();
      loading && loading.clear();
    })
    .catch(err => {
      this.$toast.fail(err.message);
    });
};

// 文章被改变
Vue.prototype.$articleChange = function(changeState = true) {
  this.$store.commit("SET_CONTENT_CHANGE", { type: "article", changeState });
};

// 内容被改变
Vue.prototype.$contentChange = function(type, changeState = true) {
  this.$store.commit("SET_CONTENT_CHANGE", { type, changeState });
};

// 改变刷新
Vue.prototype.$changeRefresh = function(type, isClear = false) {
  const isChange = this.$store.state.contentChange[type + "Change"];
  isClear && this.$contentChange(type, false);
  if (this.list.length && isChange) {
    this.list = [];
    this.$refs.load.onRefresh();
  }
};

// 注册全局状态
Vue.prototype.states = ["disabled", "success", "unlogin"];
// 默认头像
Vue.prototype.defaultAvatar = "/img/mine/default-avatar.png";

Vue.prototype.toast1s = function(message) {
  this.$toast({ duration: 1000, message: message });
};

// 倒计时
Vue.prototype.countDown = function(option = {}, callback) {
  if (typeof option === "function") {
    callback = option;
    option = {};
  }
  let { second = 3, content = "", type = "loading", mask = false } = option;

  const toast = this.$toast({
    type,
    duration: 0, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: "spinner",
    mask,
    message: `倒计时 ${second} 秒\n${content}`
  });

  // 到时清除
  const timer = setInterval(() => {
    second--;
    if (second) {
      toast.message = `倒计时 ${second} 秒\n${content}`;
    } else {
      clearTimer();
      callback && callback();
    }
  }, 1000);

  // 添加body清除器
  function bodyClear(e) {
    clearTimer();
  }

  // 清除定时器
  function clearTimer() {
    clearInterval(timer);
    toast.clear();
    document.body.removeEventListener("click", bodyClear);
  }

  // 添加body清除器
  document.body.addEventListener("click", bodyClear);
};

// 返回dom文本指令
Vue.directive("domtext", (ele, { value }) => {
  const content = document.createElement("div");
  content.innerHTML = value;
  ele.innerHTML = content.innerText;
});

// 统一日期格式
Vue.filter("dateFormat", val => val.split(" ")[0]);
Vue.filter("dateAllFormat", val => {
  const str = val.split("T");
  const date = str[0];
  const time = str[1].split(".")[0];
  return date + " " + time;
});

export default Vue;
