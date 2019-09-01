/*
 * @Description: In User Settings Edit
 * @Author: Odinge
 * @Date: 2019-05-14 23:30:00
 * @LastEditTime: 2019-09-01 14:14:22
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

// 图片懒加载
Vue.use(Lazyload, {
  loading: "/images/comm/loading.gif",
  error: "/images/comm/error.png"
  // preLoad: 1.3
  // lazyComponent: true
});

// 注册全局组件
import components from "./components/components";
Vue.use(components);

// 注册全局axios
Vue.prototype.$http = axios;

// 接口域名地址
// Vue.prototype.$baseUrl = process.env.BASE_URL;
Vue.prototype.$webUrl = "http://117.50.73.238:8080";
Vue.prototype.$baseUrl = "/api";
Vue.prototype.$localUrl = "/api";
// Vue.prototype.$baseUrl = "/";
// Vue.prototype.$baseUrl = "";

// 获取网址
Vue.prototype.$getUrl = function(url) {
  if (url.indexOf(this.$webUrl) !== -1) {
    return url.replace(this.$webUrl, this.$baseUrl);
  } else {
    return url ? this.$baseUrl + url : url;
  }
};
// 根据文件id获取下载地址
Vue.prototype.$getDownloadUrlById = function(fileId, type = 1) {
  return (type ? this.$baseUrl : "") + "/file/download?fileId=" + fileId;
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
      url = this.$baseUrl + url;
      this.$downloadByAtag(url, name, type);
      backcall && backcall();
      loading && loading.clear();
    })
    .catch(err => {
      this.$toast.fail(err.message);
    });
};

// 注册全局状态
Vue.prototype.states = ["disabled", "success", "unlogin"];
// 默认头像
Vue.prototype.defaultAvatar = "/images/mine/default-avatar.png";

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
