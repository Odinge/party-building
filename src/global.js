import Vue from "vue";
import axios from "axios";

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
  List
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
  .use(CellGroup);

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

// Vue.prototype.$baseUrl = process.env.BASE_URL;
Vue.prototype.$baseUrl = "http://117.50.73.238:8080";

// 注册全局状态
Vue.prototype.states = ["disabled", "success", "unlogin"];

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

export default Vue;
