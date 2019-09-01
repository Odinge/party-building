/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-22 21:04:25
 * @LastEditTime: 2019-09-01 13:37:48
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
// 获取成果文件
export const getAcFiles = (page, size = baseSize) =>
  request("get", `/file/3/${size}/${page}`);

// 下载文件
export const downloadFileById = fileId =>
  request("get", "/file/download", { fileId });

// 下载文件2
export const downloadFileByUrl = url => request("get", url);

// 获取资源
export const getSource = fileName => request("get", `/file/update/${fileName}`);

/**
 *
 * @param {file:文件对象, fileType:文件类型 0-文档，1-图片，2-视频，3-成果} file
 */
export const uploadFile = file => request("post", `/file/upload`, file);

// 上传成果图片
export const uploadAcFile = file => {
  const data = new FormData();
  data.append("file", file);
  data.append("fileType", 3);
  return request("post", `/file/upload`, data);
};

// 上传图片获取地址
export const getImgUrl = file => {
  const data = new FormData();
  data.append("file", file);
  data.append("fileType", 1);
  return request("post", `/file/upload`, data);
};
