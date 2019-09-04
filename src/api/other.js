/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 16:31:52
 * @LastEditTime: 2019-09-03 22:29:06
 * @LastEditors: Please set LastEditors
 */
import request from "./request";

/**
 * 发起反馈
 * type: form-data
 * 【data】
 * name:用户姓名
 * title:反馈标题
 * content:反馈内容
 * contact : 联系方式
 */

export const feedback = ({ name, title, content, contact }) => {
  const data = new FormData();
  data.append("name", name);
  data.append("title", title);
  data.append("content", content);
  data.append("contact", contact);
  return request("post", "/feedback", data);
};
