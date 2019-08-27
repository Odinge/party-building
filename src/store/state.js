/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-12 14:49:01
 * @LastEditTime: 2019-08-27 20:12:43
 * @LastEditors: Please set LastEditors
 */
// 状态
import { getToken, getAccount, setAccount } from "../utils/auth";
export default {
  get token() {
    return getToken();
  }, // 验证token
  get account() {
    return getAccount();
  }, // 验证token
  set account(account) {
    setAccount(account);
  }, // 验证token
  userInfo: {}, // 用户信息
  headerTitle: "", // 头部标题
  headerConfig: {}, // 头部组件配置信息
  pageConfig: {
    // 页面配置
    openRefresh: false, // 页面是否需要刷新
    openLoad: false, // 页面是否需要加载数据
    onLoad() {}, // 加载数据函数
    onRefresh() {} // 页面刷新获取数据函数
  },
  prestrain: true // 页面预加载
};
