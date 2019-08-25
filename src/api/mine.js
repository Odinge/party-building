/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-20 20:02:19
 * @LastEditTime: 2019-08-23 23:52:31
 * @LastEditors: Please set LastEditors
 */
// 我的相关接口
import request from "./request";
import { baseSize } from "./article";

/**
 * 获取用户学习记录
 */
export const getStudyRecord = (page, size = baseSize) =>
  request("get", `/studyRecord/${size}/${page}`);

/**
 * 打卡状态获取
 */
export const getPunchInStatus = () => request("get", `/getPunchInStatus`);

/**
 * 获取打卡记录
 */
export const getPunchInRecord = (page, size = baseSize) =>
  request("get", `/getPunchInRecord/${size}/${page}`);
