/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-12 08:50:07
 * @LastEditTime: 2019-08-24 07:53:26
 * @LastEditors: Please set LastEditors
 */
// 问卷相关接口
import request from "./request";
import { baseSize } from "./article";

/**
 * 获取问卷信息
 */
export const getQuestionnaire = (page, size = baseSize) =>
  request("get", `/questionnaire/${size}/${page}`);

/**
 * 查询问卷回答记录
 * status：0-未审核，1-已审核
 */
export const getQuestionnaireRecords = (page, size = baseSize) =>
  request("get", `/questionnaireRecords/${size}/${page}`);

/**
 * 提交问卷答题结果
 */
export const addQuestionnaireRecords = (resultImgUrl, questionnaireId) => {
  const data = new FormData();
  data.append("resultImgUrl", resultImgUrl);
  data.append("questionnaireId", questionnaireId);
  return request("post", "addQuestionnaireRecords", data);
};
