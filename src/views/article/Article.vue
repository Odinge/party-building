<!--
 * @Description: In User Settings Edit
 * @Author: Odinge
 * @Date: 2019-05-16 00:39:59
 * @LastEditTime: 2019-09-26 17:56:33
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="article app-container" :class="{bg:!hasComment}">
    <!-- <Header :showMore="true">{{article.title}}</Header> -->
    <Header>{{article.title}}</Header>
    <div class="app-content">
      <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" success-text="加载成功">

        <!-- 显示文章区域 -->
        <article class="a-content">
          <h3>{{article.title}}</h3>
          <div class="a-author">
            <span>{{article.author}}</span>
            <span class="a-time">{{article.updateTime}}</span>
          </div>
          <div class="a-main" v-html="article.content"></div>
          <div class="a-redactor">
            负责编辑： {{article.author}}
          </div>

          <!-- 完成阅读操作区域 -->
          <div class="center" v-if="requirePunch && !readError">
            <div class=" readTime" v-if="!haveRead">
              <span>已阅读时间(阅读{{baseReadTime/60}}分钟即可打卡)</span>
              <van-progress :percentage="readPercent" :pivot-text="readTimeText" pivot-color="rgb(242, 136, 19)" color="linear-gradient(to right, rgb(252, 255, 153), rgb(242, 136, 19))" />
            </div>
            <button class="btn-finish" @click="finishRead" v-if="!haveRead" :disabled="readDisabled">完成阅读</button>
            <span class="read-tag" v-if="!isOne && haveRead">文章已阅读</span>
          </div>
        </article>

        <!-- 评价区域 -->
        <div class="comment-area">
          <h4 id="comment">观点</h4>
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" v-if="hasComment" :error.sync="commentError" error-text="请求失败，点击重新加载">
            <comment-list :list="comments" @refreshList="refreshComment"></comment-list>
          </van-list>
          <div class="no-comment" v-else>
            <img src="/img/comm/no-comment.png" alt="无观点">
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
      <van-icon :name="article.isCollect?'like':'like-o'" @click="collect(article)" :disabled="article.isCollectLoading === true"></van-icon>
      <div class="zan-box">
        <i class="iconfont" :class="article.isLike?'icon-dianzan':'icon-zan'" @click="zan(article)" :disabled="article.isLikeLoading === true"></i>
        <span class="zan-count">{{article.likeCount}}</span>
      </div>
    </div>
    <comment-input v-model="showComment" :placeholder="placeholder" :target="target" @updateComment="onLoad"></comment-input>
    <module v-model="showPunchResult" v-bind="punchText"></module>
  </div>
</template>

<script>
import { getArticle, getArticleInfo, studyFinish, getComment, getLikeStatus, getCollectionStatus, addLike, addCollection, cancelLike, cancelCollection, getLikeCount, getPunchInStatus } from "../../api/article";
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
      readError: false, // 获取是否错误

      // 关于阅读
      isOne: true, // 第一次访问页面
      haveRead: true, // 是否已经阅读
      baseReadTime: 300, // 基础阅读时间（毫秒） --- 5分钟
      beginReadTime: 0, // 开始阅读时间
      readTime: 0, // 阅读时间
      readTimeText: "", // 阅读时间
      readDisabled: true, // 禁止阅读
      readTimer: null, // 阅读定时器
      readNum: 1, // 阅读时间倍数

      // 关于模式
      readMode: 0, // 阅读模式   0 --- 表示可后台阅读， 1 --- 表示必须前台阅读
      timerMode: 0, // 计时模式   0 --- 表示阅读时间到了不计时，  1 --- 阅读时间到了还计时

      // 关于评论
      showComment: false, // 是否显示评论
      placeholder: "", // 消息对象的提示字
      target: null, // 当前点击的消息对象
      commentError: false, // 评价加载出错

      // 打卡
      havePunch: false, // 是否已打卡
      showPunchResult: false, // 是否显示打卡结果
      punchText: {
        title: "", // 标题
        subtitle: "", // 小标题
        content: "" // 内容
      }, // 打卡文字
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    },
    // 是否存在评价
    hasComment() {
      return this.comments.length;
    },
    // 是否打开评价
    openComment() {
      return this.$route.query.openComment;
    },
    // 阅读进度条
    readPercent() {
      // const percent = (this.readTime / this.baseReadTime) * 100;
      const percent = (this.readTime / this.readTotal) * 100;
      return percent;
    },
    // 计算进度条总的阅读时间
    readTotal() {
      return this.baseReadTime * this.readNum;
    },
    requirePunch() {
      return this.article.type !== 0;
    }
  },
  mounted() {
    this.loadData();
    // 重置文章修改
    this.$articleChange(false);
    // 加载提示
    this.pageLoad = this.$toast.loading({ duration: 0, forbidClick: true, message: "疯狂加载中..." });
    // 打开评价
    if (this.openComment) {
      this.onComment(this.article, '欢迎发表你的观点');
    }
    // 阅读模式
    if (this.readMode) {
      window.onblur = this.clearReadTimer;
      window.onfocus = () => {
        if (!this.haveRead && this.requirePunch) {
          this.beginRead();
        }
      };
    }
  },
  watch: {
    showComment(show) {
      if (this.requirePunch) {
        if (show && !this.haveRead) {
          this.clearReadTimer();
        } else if (!this.haveRead) {
          this.beginRead();
        }
      }
    }
  },
  methods: {
    // 打开模态框
    openModule(punchText) {
      this.showPunchResult = true;
      this.punchText = punchText;
    },
    // 加载函数
    loadData() {
      this.isOne = true; // 第一次访问
      this.readDisabled = true;

      // 查询打卡状态
      this.queryPunchInStatus();
      // 加载评价
      this.onLoad();

      // 获取文章信息
      getArticleInfo(this.id).then(data => {
        this.article = data;

        // 设置头部信息
        this.$store.commit("setHeaderTitle", this.article.title);
        this.isRefresh = false;

        // 进入页面时查询文章状态
        this.finishRead();

        this.pageLoad.clear();

      }).catch(err => {
        // 获取错误
        this.pageLoad.clear();
        this.$dialog.alert({
          title: '错误录',
          message: err.message,
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
      }).catch(err => {
        this.loading = false;
        this.finished = true;
        this.commentError = true;
      });
    },

    // 开始阅读
    beginRead() {
      this.clearReadTimer();
      this.readTimer = setInterval(() => {
        // let dt = new Date() - this.beginReadTime; // 已阅读时间
        let dt = this.readTime++;

        // 时间判断
        if (dt >= this.readTotal) {
          this.readTime = dt = this.readTotal;
          if (this.timerMode) {
            this.readNum += 2;
          } else {
            this.clearReadTimer();
          }
          if (this.readDisabled) {
            this.readDisabled = false;
          }
        }

        const m = ~~(dt / 60); // 分
        const s = dt - m * 60; // 秒

        if (m) {
          if (s) {
            this.readTimeText = m + "分" + s + "秒";
          } else {
            this.readTimeText = m + "分";
          }
        } else {
          this.readTimeText = s + "秒";
        }

      }, 1000);
    },
    // 清除阅读定时器
    clearReadTimer() {
      if (this.readTimer) {
        clearInterval(this.readTimer);
        this.readTimer = null;
      }
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

      if (this.isOne) {
        this.pageLoad = this.$toast.loading({ duration: 0, forbidClick: true });
      }

      // 完成阅读调用
      studyFinish(this.id).then(data => {
        this.haveRead = true;
        this.clearReadTimer();
        if (this.havePunch) {
          this.$toast.success("完成阅读");
        } else {
          this.getPunchInStatus();
        }
      }).catch(err => {
        if ([400010, 400011].includes(err.code) && this.isOne) {
          this.haveRead = err.code === 400010; // 文章状态是否阅读
          // 初始化阅读状态
          this.isOne = false;
          // this.pageLoad.clear();

          if (!this.haveRead && this.requirePunch) {
            // this.beginReadTime = new Date();
            this.readTime = 0;
            !this.openComment && this.beginRead();
          }
        } else {
          this.toast1s(err.message);
        }

      })
    },

    // 获取是否完成当日打卡
    getPunchInStatus() {
      getPunchInStatus().then(data => {
        // this.$toast.success("已完成当日\n     打卡");
        this.openModule({
          title: "恭喜你!",
          subtitle: "完成了今天的学习任务",
          content: "已阅读3篇文章",
          mode: 1
        });
        this.$contentChange("punch");
      }).catch(err => {
        if (err.code === 400016) {
          // this.$toast.success("     真   棒\n    ~ ^_^ ~\n继续阅读下篇\n  文章打卡哟");
          this.openModule({
            title: "再接再厉",
            subtitle: "已阅读该篇文章",
            content: "阅读完3篇文章可打卡哟"
          });
        } else {
          this.$toast1s(err.message);
        }
      }).finally(() => {
        this.pageLoad.clear();
      });
    },
    // 查询
    queryPunchInStatus() {
      getPunchInStatus().then(data => {
        this.havePunch = true;
      }).catch(err => {
        if (err.code === 400016) {
          this.havePunch = false;
        } else {
          this.$toast1s(err.message);
        }
      });
    },

    // 进行评价
    onComment(obj, text) {
      this.target = obj;
      this.placeholder = text;
      this.showComment = true;
    },

    // 刷新评价
    refreshComment() {
      this.onLoad(() => this.toast1s("已删除评价"));
    },

    // 收藏
    collect(article) {
      this.$set(article, "isCollectLoading", true);
      const obj = [
        { fun: addCollection, success: "已收藏" },
        { fun: cancelCollection, success: "已取消收藏" },
      ][+article.isCollect];
      // 两大功能交互
      obj.fun(article.articleId).then(() => {
        article.isCollect = !article.isCollect;
        this.toast1s(obj.success);
      }).catch(err => {
        this.toast1s(err.message);
      }).finally(() => {
        article.isCollectLoading = false;
        this.$articleChange();
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
      this.$set(article, "isLikeLoading", true);
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
      }).finally(() => {
        article.isLikeLoading = false;
      });
    },
  },
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

.article .icon-dianzan {
  color: coral;
}

.btn-finish {
  display: block;
  margin: auto;
  padding: 2vw 7vw 2vw;
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
.readTime .van-progress {
  margin: 4vw 0 5vw;
}
</style>
