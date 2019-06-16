// 问卷相关接口
import request from "./request";
import { baseSize } from "./article";

// 获取问卷信息
export const getQuestionnaire = (page, size = baseSize) =>
  request("get", `/questionnaire/${size}/${page}`);
