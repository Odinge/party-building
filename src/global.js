import Vue from "vue";
import axios from "axios";

// 注册全局axios
Vue.prototype.$http = axios;

// 注册全局状态
Vue.prototype.states = ["disabled", "success", "unlogin"];
