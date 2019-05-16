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
  Dialog
} from "vant";
Vue.use(Icon)
  .use(Picker)
  .use(Actionsheet)
  .use(Search)
  .use(Cell)
  .use(Uploader)
  .use(Toast)
  .use(Dialog)
  .use(CellGroup);

// 注册全局组件
import components from "./utils/components";
Vue.use(components);

// 注册全局axios
Vue.prototype.$http = axios;

// 注册全局状态
Vue.prototype.states = ["disabled", "success", "unlogin"];
