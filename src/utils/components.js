// 注册全局组件

import Header from "@/components/Header";
import DatePicker from "../components/DatePicker.vue";
import Picker from "../components/Picker.vue";

export default Vue => {
  Vue.component(Header.name, Header);
  Vue.component(DatePicker.name, DatePicker);
  Vue.component(Picker.name, Picker);
};
