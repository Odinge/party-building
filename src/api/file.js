/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-22 21:04:25
 * @LastEditTime: 2019-08-23 22:27:33
 * @LastEditors: Please set LastEditors
 */
import request from "./request";
import { baseSize } from "./article";

/* ====================获取文件列表=================== */
// 获取文档
export const getDocumentFiles = (page, size = baseSize) =>
  request("get", `/file/0/${size}/${page}`);
// 获取图片
export const getImageFiles = (page, size = baseSize) =>
  request("get", `/file/1/${size}/${page}`);
// 获取视频
export const getVideoFiles = (page, size = baseSize) =>
  request("get", `/file/2/${size}/${page}`);
// 获取其他
export const getOtherFiles = (page, size = baseSize) =>
  request("get", `/file/3/${size}/${page}`);

// 下载文件
export const downloadFile = fileId =>
  request("get", "/file/download", { fileId });

// 获取资源
export const getSource = fileName => request("get", `/file/update/${fileName}`);

// 文件上传
export const uploadFile = file => request("post", `/file/upload`, file);

// 上传图片获取地址
export const getFileUrl = file => {
  const data = new FormData();
  data.append("file", file);
  data.append("fileType", 1);
  return request("post", `/file/upload`, data);
};
