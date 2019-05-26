import request from "./request";

// 请求文章接口
export const getAirticals = num => request("get", "/airtical/airticals/" + num);
