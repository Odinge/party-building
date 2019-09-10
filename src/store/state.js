/*
 * @Description: 状态配置
 * @Author: Odinge
 * @Date: 2019-05-12 14:49:01
 * @LastEditTime: 2019-09-10 20:22:17
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
  // 页面配置
  pageConfig: {
    prevSamePath: "", // 上一个相似的路径
    prestrain: true, // 页面预加载
    prevPath: {} // 前一个页面的路由
  },
  // 内容改变更新页面
  contentChange: {
    articleChange: false, // 判断文章信息是否改变
    testChange: false, // 判断测试信息是否改变
    commentChange: false, // 判断评价信息是否改变
    punchChange: false // 判断打卡信息是否改变
  }
};
