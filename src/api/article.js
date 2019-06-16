import request from "./request";

export const baseSize = 8;

// 获取首页数据
export const getArticleIndex = () => request("get", "/article/index");

/* =================获取所有文章================= */
// 获取党内通知
export const getNotice = (page, size = baseSize) =>
  request("get", `/article/0/${size}/${page}`);
// 获取党建动态
export const getDynamics = (page, size = baseSize) =>
  request("get", `/article/1/${size}/${page}`);
// 获取必须新闻
export const getLearnNews = (page, size = baseSize) =>
  request("get", `/article/2/${size}/${page}`);
// 获取热点新闻
export const getHotNews = (page, size = baseSize) =>
  request("get", `/article/3/${size}/${page}`);
// 获取视频
export const getVideos = (page, size = baseSize) =>
  request("get", `/article/4/${size}/${page}`);

// 文章详情接口
export const getArticle = articleId => request("get", `/article/${articleId}`);

// 完成阅读
export const studyFinish = articleId => {
  const id = new FormData();
  id.append("articleId", articleId);
  // return request("post", "/studyFinish?articleId=" + articleId, id);
  return request("post", "/studyFinish", id);
};

// 文章搜索
export const searchArticle = (key, page, size = baseSize) =>
  request("post", "/searchArticle", { key, page, size });
