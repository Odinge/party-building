/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-26 10:51:03
 * @LastEditTime: 2019-09-14 18:51:06
 * @LastEditors: Please set LastEditors
 */
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
export const searchArticle = (key, page, size = baseSize) => {
  const data = new FormData();
  data.append("key", key);
  data.append("size", size);
  data.append("page", page);
  return request("post", "/searchArticle", data);
};

// 收藏接口
/**
 * 获取收藏
 */
export const getAllCollectionRecord = (page, size = baseSize) =>
  request("get", `/getAllCollectionRecord/${page}/${size}`);

/**
 * 添加收藏
 */
export const addCollection = articleId => {
  const data = new FormData();
  data.append("articleId", articleId);
  return request("post", "/addCollection", data);
};

/**
 * 取消收藏
 */
export const cancelCollection = articleId =>
  request("delete", "/cancelCollection?articleId=" + articleId);

/**
 * 查看收藏状态
 */
export const getCollectionStatus = articleId =>
  request("get", "/getCollectionStatus", { articleId });

// 点赞接口
/**
 * 进行点赞
 */
export const addLike = articleId => {
  const data = new FormData();
  data.append("articleId", articleId);
  return request("post", "/addLike", data);
};

/**
 * 取消点赞
 */
export const cancelLike = articleId =>
  request("delete", "/cancelLike?articleId=" + articleId);

/**
 * 文章总点赞数查看
 */
export const getLikeCount = articleId =>
  request("get", "/getLikeCount", { articleId });

/**
 * 查看文章点赞状态
 */
export const getLikeStatus = articleId =>
  request("get", "/getLikeStatus", { articleId });

// 评价接口
/**
 * 获取评价
 */
export const getComment = articleId =>
  request("get", "/getComment", { articleId });
/**
 * 获取所有评价
 */
export const getAllComment = (page, size = baseSize) =>
  request("get", `/getAllComment/${size}/${page}`);

/**
 * 获取评价
 */
export const addComment = (articleId, content) => {
  const data = new FormData();
  data.append("articleId", articleId);
  data.append("content", content);
  return request("post", "/addComment", data);
};

/**
 * 删除评价
 */
export const deleteComment = commentId =>
  request("DELETE", "/deleteComment?commentId=" + commentId);

/**
 * 打卡状态获取
 */
export const getPunchInStatus = () => request("get", `/getPunchInStatus`);

// 文章详情接口带状态
export const getArticleInfo = articleId =>
  new Promise((resolve, reject) => {
    request.axios
      .all([
        getArticle(articleId),
        getCollectionStatus(articleId),
        getLikeStatus(articleId),
        getLikeCount(articleId)
      ])
      .then(
        request.axios.spread((article, isCollect, isLike, likeCount) =>
          resolve({
            ...article,
            isCollect,
            isLike,
            likeCount
          })
        )
      )
      .catch(err => {
        reject(err);
      });
  });

// 文章详情接口带状态1
export const getArticleInfo1 = articleId =>
  new Promise((resolve, reject) => {
    request.axios
      .all([getArticle(articleId), getCollectionStatus(articleId)])
      .then(
        request.axios.spread((article, isCollect) =>
          resolve({ ...article, isCollect })
        )
      )
      .catch(err => reject(err));
  });
