<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-16 00:39:59
 * @LastEditTime: 2019-08-27 17:21:38
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="article app-container" :class="{bg:!hasComment}">
    <Header :showMore="true">{{article.title}}</Header>
    <div class="app-content">
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" success-text="加载成功">

        <!-- 显示文章区域 -->
        <article class="a-content">
          <h3>{{article.title}}</h3>
          <div class="a-author">
            <span>{{article.author}}</span>
            <span class="a-time">{{article.updatetime}}</span>
          </div>
          <div class="a-main" v-html="article.content"></div>
          <div class="a-redactor">
            负责编辑： {{article.author}}
          </div>
          <div class="center">
            <div class=" readTime" v-if="!haveRead">
              <span>已阅读时间(m)</span>
              <!-- <van-progress :percentage="readTime/baseReadTime" :pivot-text="readTime" pivot-color="#7232dd" color="linear-gradient(to right, #be99ff, #7232dd)" /> -->
              <van-progress :percentage="readPercent" :pivot-text="readTimeText" pivot-color="rgb(242, 136, 19)" color="linear-gradient(to right, rgb(252, 255, 153), rgb(242, 136, 19))" />
            </div>
            <button class="btn-finish" @click="finishRead" v-if="!haveRead" :disabled="readDisabled">完成阅读</button>
            <span class="read-tag" v-if="!isOne && haveRead">文章已阅读</span>
          </div>
        </article>

        <!-- 评价区域 -->
        <div class="comment-area">
          <h4 id="comment">观点</h4>
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" v-if="hasComment">
            <ul class="comment-content">
              <li v-for="(comment, key) in comments" :key="key">
                <img :src="defaultAvatar" :alt="comment.name" v-lazy="defaultAvatar">
                <div class="comment-box">
                  <div class="comment-info">
                    <span class="comment-name van-ellipsis">{{comment.userName}}</span>
                    <!-- <span class="comment-zan">
                      {{comment.zan}}
                      <i class="iconfont icon-zan" :class="comment.isLike?'icon-dianzan1':'icon-zan'" @click="comment.isLike=true"></i>
                    </span> -->
                    <span class="comment-zan" v-if="comment.userId === userInfo.sid">
                      <van-icon name="delete" @click="deleteComment(comment.commentId)"></van-icon>
                    </span>
                  </div>
                  <!-- <p v-html="comment.content" @click="onComment(comment,'回复 '+comment.userName+' 的观点')"></p> -->
                  <p v-html="comment.content"></p>
                  <div class="comment-date">
                    <span class="comment-time">{{comment.createTime | dateAllFormat}}</span>
                    <em>•</em><span>回复</span>
                  </div>
                </div>
              </li>
            </ul>
          </van-list>
          <div class="no-comment" v-else>
            <img src="/images/comm/no-comment.png" alt="">
            <p>暂无观点 快来发表观点</p>
          </div>
        </div>
      </van-pull-refresh>
    </div>

    <!-- 评价输入 -->
    <div class="a-comment">
      <a href="#comment">
        <van-icon name="smile-comment-o"></van-icon>
      </a>
      <div class="comment-ipt" @click="onComment(article, '欢迎发表你的观点')">欢迎发表你的观点</div>
      <van-icon :name="article.isCollect?'like':'like-o'" @click="collect(article)"></van-icon>
      <div class="zan-box">
        <i class="iconfont" :class="article.isLike?'icon-dianzan1':'icon-zan'" @click="zan(article)"></i>
        <span class="zan-count">{{article.likeCount}}</span>
      </div>
    </div>
    <comment v-model="showComment" :placeholder="placeholder" :target="target" @updateComment="onLoad"></comment>
  </div>
</template>

<script>
import { getArticle, getArticleInfo, studyFinish, getComment, getLikeStatus, getCollectionStatus, addLike, addCollection, deleteComment, cancelLike, cancelCollection, getLikeCount } from "../../api/article";
import { getPunchInStatus } from "../../api/mine";
import { mapState } from "vuex";
export default {
  props: ["id"],
  data() {
    return {
      article: {}, // 文章
      comments: [], // 评价

      isRefresh: false, // 页面刷新

      loading: true, // 加载评价数据
      finished: false, // 加载评价全部加载完
      pageLoad: null, // 加载页面

      // 关于阅读
      isOne: true, // 第一次访问页面
      haveRead: true, // 是否已经阅读
      baseReadTime: 180000, // 基础阅读时间（毫秒） --- 3分钟
      readTime: 0, // 阅读时间
      readTimeText: "", // 阅读时间
      beginReadTime: 0, // 开始阅读时间
      readDisabled: true, // 禁止阅读
      readTimer: null, // 阅读定时器

      // 关于评论
      showComment: false, // 是否显示评论
      placeholder: "", // 消息对象的提示字
      target: null, // 当前点击的消息对象
    }
  },
  computed: {
    // 是否存在评价
    hasComment() {
      return this.comments.length;
    },
    // 是否打开评价
    openComment() {
      return this.$route.query.openComment;
    },
    readPercent() {
      const percent = (this.readTime / this.baseReadTime) * 100;
      return percent;
    },
    ...mapState(["userInfo"])
  },
  mounted() {
    // 加载提示
    this.pageLoad = this.$toast.loading({ duration: 0, forbidClick: true, message: "疯狂加载中..." });
    this.loadData();
    // 打开评价
    if (this.openComment) {
      this.onComment(this.article, '欢迎发表你的观点');
    }
  },
  methods: {
    loadData() {
      this.isOne = true; // 第一次访问
      this.readDisabled = true;

      getArticleInfo(this.id).then(data => {
        this.article = data;

        // 设置头部信息
        this.$store.commit("setHeaderTitle", this.article.title);
        this.isRefresh = false;
        // this.pageLoad.clear();

        // 进入页面时查询文章状态
        this.finishRead();
        // 加载评价
        this.onLoad();

      }).catch(err => {
        // 获取错误
        this.pageLoad.clear();
        this.$dialog.alert({
          title: '错误录',
          message: err.message,
          confirmButtonColor: "#f44"
        }).then(() => this.$router.back());
      });
    },
    // 页面刷新
    onRefresh() {
      this.loadData();
    },
    // 下划加载数据函数
    onLoad(backcall) {
      getComment(this.id).then(data => {
        this.comments = data;
        // 加载状态结束
        this.loading = false;
        // 数据全部加载完成
        this.finished = true;
        backcall && backcall(); // 执行回调
      }).catch(err => { this.$toast(err.message) });
    },

    // 开始阅读
    beginRead() {
      this.clearReadTimer();
      this.beginReadTime = new Date();
      this.readTimer = setInterval(() => {
        const dt = this.readTime = new Date() - this.beginReadTime; // 已阅读时间
        const m = ~~(dt / 60000); // 分
        const s = ~~((dt - m * 60000) / 1000); // 秒

        if (m) {
          if (s) {
            this.readTimeText = m + "分" + s + "秒";
          } else {
            this.readTimeText = m + "分";
          }
        } else {
          this.readTimeText = s + "秒";
        }

        if (this.readTime >= this.baseReadTime) {
          this.readTime = this.baseReadTime;
          this.clearReadTimer();
          this.readDisabled = false;
        }
      }, 980);
    },
    // 清除阅读定时器
    clearReadTimer() {
      this.readTimer && clearInterval(this.readTimer);
    },

    // 完成阅读
    finishRead() {
      // 判断是否能够完成阅读
      /* if (!this.isOne && this.readTime < this.baseReadTime) {
        this.readDisabled = true;
        const waitTime = 2000; // 第二次点击完成阅读按钮等待时间
        this.$toast({ duration: waitTime, message: "阅读时间不够" });
        setTimeout(() => {
          this.readDisabled = false;
        }, waitTime);
        return false;
      } */

      // 完成阅读调用
      studyFinish(this.id).then(data => {
        this.haveRead = true;
        this.clearReadTimer();
        // this.$toast.success({ duration: 1000, message: "完成阅读" });
        this.getPunchInStatus();
      }).catch(err => {
        this.haveRead = err.code === 400010; // 文章状态是否阅读
        // 初始化阅读状态
        if (this.isOne) {
          this.isOne = false;
          this.pageLoad.clear();
          !this.haveRead && this.beginRead();
        } else {
          // 未完成阅读
          this.toast1s(err.message);
        }
      })
    },

    // 获取是否完成当日打卡
    getPunchInStatus() {
      getPunchInStatus().then(data => {
        this.$toast.success("已完成当日打卡");
      }).catch(err => {
        if (err.flag) {
          this.$toast.success("     ~ ^_^ ~\n 继续阅读下篇\n  文章打卡哟");
        } else {
          this.$toast(err.message);
        }
      });
    },

    // 进行评价
    onComment(obj, text) {
      this.target = obj;
      this.placeholder = text;
      this.showComment = true;
    },

    // 收藏
    collect(article) {
      const obj = [
        { fun: addCollection, success: "已收藏" },
        { fun: cancelCollection, success: "已取消收藏" },
      ][+article.isCollect];
      // 两大功能交互
      obj.fun(this.id).then(() => {
        article.isCollect = !article.isCollect;
        this.toast1s(obj.success);
      }).catch(err => {
        this.toast1s(err.message);
      });

    },

    // 获取点赞数量
    getLikeCount(backcall) {
      getLikeCount(this.id).then(data => {
        this.article.likeCount = +data;
        backcall && backcall(); // 执行回调
      }).catch(err => this.toast1s(err.message));
    },

    // 点赞
    zan(article) {
      const obj = [
        { fun: addLike, success: "已赞" },
        { fun: cancelLike, success: "已取消赞" },
      ][+article.isLike]
      obj.fun(this.id).then(() => {
        this.getLikeCount(() => {
          article.isLike = !article.isLike;
          this.toast1s(obj.success);
        });
      }).catch(err => {
        this.toast1s(err.message);
      });
    },

    // 删除评价
    deleteComment(commentId) {
      this.$dialog.confirm({
        title: '提示',
        message: "确定要删除此评价？",
        confirmButtonColor: "#f44"
      }).then(() => {
        this.$toast.loading({
          mask: true,
          duration: 0,
          message: '删除评价中...'
        });
        deleteComment(commentId).then(data => {
          this.onLoad(() => this.toast1s("已删除评价"));
        }).catch(err => this.$toast(err.message));
      }).catch(err => { });

    }
  }
}
</script>
<style>
.refresh {
  position: absolute;
  width: 100%;
  height: 1vh;
}
.article .van-pull-refresh__track {
  position: static;
}
.article {
  position: relative;
  font-size: 4.5vw;
  font-family: "幼圆";
}
.article img {
  width: 100%;
  height: 100%;
}
.bg {
  background-color: #fafbfd;
}
.a-comment {
  display: flex;
  align-items: center;
  padding: 2vw;
  background-color: #fff;
  font-size: 1.4em;
  color: rgb(127, 129, 129);
  border-top: 1px solid rgb(248, 245, 245);
}
.a-comment i {
  width: 10vw;
  text-align: center;
}
.comment-ipt {
  flex: 1;
  padding: 2vw 3vw;
  background-color: #fafbfd;
  border-radius: 20vw;
  overflow: hidden;
  font-size: 0.7em;
}
.article .app-content {
  box-sizing: border-box;
  padding: 4vw;
  font-style: normal;
}
.a-content h3 {
  font-size: 1.2em;
  line-height: 1.3;
  font-weight: bold;
  text-align: center;
}
.a-author {
  padding: 4vw 0;
  font-size: 0.8em;
  text-align: center;
}
.a-author .a-time {
  color: rgb(96, 98, 100);
  margin-left: 3vw;
}
.a-main {
  line-height: 1.5em;
}
.a-redactor {
  font-size: 0.8em;
  color: rgb(96, 98, 100);
  margin: 5vw 0 9vw;
}
/* 文章区 end */

/* 评价区 */
.comment-area h4 {
  margin: 4vw 0;
  padding-left: 2vw;
  border-left: 1.5vw solid rgb(233, 81, 81);
  color: rgb(78, 81, 83);
  font-size: 1.1em;
  font-weight: bold;
}
.comment-content li {
  display: flex;
  padding: 5vw 0;
  border-top: 1px solid rgb(248, 247, 247);
}
.comment-content li:last-child {
  border-bottom: 1px solid rgb(248, 247, 247);
}
.comment-content img {
  width: 8vw;
  height: 8vw;
  border-radius: 50%;
}
.comment-box {
  margin-left: 4vw;
  flex: 1;
}
.comment-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9em;
}
.comment-name {
  color: rgb(189, 147, 42);
  width: 50vw;
}
.comment-zan {
  color: rgb(179, 179, 179);
}
.comment-box p {
  margin: 4vw 0;
  line-height: 1.5em;
}
.comment-date {
  font-size: 0.8em;
}
.comment-date .comment-time {
  color: rgb(180, 180, 180);
}
.comment-date em {
  margin: 0 1vw;
}
.no-comment {
  border-top: 1px solid rgb(248, 247, 247);
  text-align: center;
  color: #b3bac5;
  font-size: 0.8em;
  font-family: "楷体";
  font-weight: bold;
}
.no-comment img {
  width: 100%;
}
/* 评论 end */

.article .icon-dianzan1 {
  color: coral;
}

.btn-finish {
  display: block;
  margin: auto;
  padding: 2vw 7vw 3vw;
  border-radius: 5vw;
  background-color: rgb(255, 173, 80);
  color: #fff;
  /* box-shadow: 0 0 2px #ccc; */
}
.btn-finish:active {
  background-color: rgb(247, 178, 100);
}
.read-tag {
  --color: #fea30f;
  position: relative;
  display: inline-block;
  padding: 2vw 5vw;
  margin-top: 2vw;
  border: 1px solid var(--color);
  border-radius: 1vw;
}
.read-tag::before,
.read-tag::after {
  content: "";
  position: absolute;
  top: 0;
  width: 0;
  height: 0;
  bottom: 0;
  margin: auto;
  border: 3vw solid transparent;
}
.read-tag::before {
  left: 0;
  border-left-color: var(--color);
}
.read-tag::after {
  right: 0;
  border-right-color: var(--color);
}

.zan-box {
  position: relative;
}
.zan-count {
  position: absolute;
  top: -0.9em;
  right: 0;
  font-size: 13px;
  font-weight: bold;
  color: tomato;
  /* color: rgb(189, 147, 42); */
}

.a-main strong {
  font-weight: bold;
}
.a-main em {
  font-style: italic;
}
.a-main p {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}

.readTime {
  margin: 2vw;
}
/* .readTime > span {
  display: block;
  margin-bottom: 2vw;
} */
.readTime .van-progress {
  margin: 4vw 0 5vw;
}
</style>
