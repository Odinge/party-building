import request from "./request";

// 获取文件列表
export const getDowenfileList = () => request("get", "/downfile/showfile");

// 下载文件
// export const dowenfile = id => request("get", `/downfile/downfile/${id}`);
