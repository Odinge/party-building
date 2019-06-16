<template>
  <div class="article app-container" :class="{bg:!hasComment}">
    <Header :showMore="true">{{article.title}}</Header>
    <van-pull-refresh v-model="isRefresh" @refresh="onRefresh" success-text="加载成功" class="flex-1">
      <div class="app-content">
        <!-- 显示文章区域 -->
        <article class="a-content">
          <h3>{{article.title}}</h3>
          <div class="a-author">
            <span>{{article.author}}</span>
            <span class="a-time">{{article.updatetime}}</span>
          </div>
          <div class="a-main" v-html="article.content"></div>
          <div class="a-redactor">
            负责编辑： {{article.redactor}}
          </div>
          <button class="btn-finish" @click="finishRead" v-if="!haveRead">完成阅读</button>
        </article>
        <!-- 评价区域 -->
        <div class="comment-area">
          <h4 id="comment">观点</h4>
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" v-if="hasComment">
            <ul class="comment-content">
              <li v-for="(comment, key) in comments" :key="key">
                <img :src="comment.avatar" :alt="comment.name" v-lazy="comment.avatar">
                <div class="comment-box">
                  <div class="comment-info">
                    <span class="comment-name van-ellipsis">{{comment.sname}}</span>
                    <span class="comment-zan">
                      {{comment.zan}}
                      <!-- <i class="iconfont icon-zan"></i> -->
                      <i class="iconfont icon-zan" :class="comment.isZan?'icon-dianzan1':'icon-zan'" @click="comment.isZan=true"></i>
                    </span>
                  </div>
                  <p v-html="comment.content" @click="onComment(comment,'回复 '+comment.sname+' 的观点')"></p>
                  <div class="comment-date">
                    <span class="comment-time">{{comment.time}}</span>
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
      </div>
    </van-pull-refresh>
    <!-- <div v-else>
      页面加载失败
    </div> -->
    <!-- 评价输入 -->
    <div class="a-comment">
      <a href="#comment">
        <van-icon name="smile-comment-o"></van-icon>
      </a>
      <div class="comment-ipt" @click="onComment(article, '欢迎发表你的观点')">欢迎发表你的观点</div>
      <!-- <van-icon name="like-o"></van-icon> -->
      <van-icon :name="article.isLike?'like':'like-o'" @click="collect(article)"></van-icon>
      <i class="iconfont icon-zan" :class="article.isZan?'icon-dianzan1':'icon-zan'" @click="article.isZan=true"></i>
    </div>
    <comment v-model="showComment" :placeholder="placeholder" :target="target"></comment>
  </div>
</template>

<script>
import { getArticle, studyFinish } from "../../api/article";
export default {
  props: ["id"],
  data() {
    return {
      article: {}, // 文章
      comments: [], // 评价
      testcomments: [
        { avatar: "/images/comm/user-logo-001.jpg", sname: "哈哈", zan: 20, time: "2018-01-24", id: "158dad5811a", content: "大达瓦大无大王大伟大无多看个埃琳娜打雷呢", isZan: false },
        { avatar: "/images/comm/user-logo-002.jpg", sname: "大大", zan: 0, time: "2018-11-12", id: "8949846dada", content: "百变五年稳定农简爱湾东岸的你看个我都爱玩激动哦爱喝大碗", isZan: false },
        { avatar: "/images/comm/user-logo-003.jpg", sname: "张凳子", zan: 1000, time: "2019-02-01", id: "dad61616adad614", content: "个舞蹈袜ID哦艾薇ID还哦我的好比", isZan: false },
      ],
      isRefresh: false, // 页面刷新
      loading: false, // 加载评价数据
      finished: false, // 加载评价全部加载完
      pageLoading: false, // 加载页面
      haveRead: true, // 是否已经阅读
      isOne: true, // 第一次访问页面

      // 关于评论
      showComment: false, // 是否显示评论
      placeholder: "", // 消息对象的提示字
      target: null, // 当前点击的消息对象
    }
  },
  mounted() {
    this.loadData();
  },
  computed: {
    hasComment() {
      return this.comments.length;
    }
  },
  methods: {
    loadData() {
      this.isOne = true;
      getArticle(this.id)
        .then(data => {
          // console.log(data);
          this.article = data;

          // 预测试信息
          this.$set(this.article, "isZan", false);
          this.$set(this.article, "isLike", false);
          this.$set(this.article, "redactor", "编辑");

          // 设置头部信息
          this.$store.commit("setHeaderTitle", this.article.title);
          this.pageLoading = true;
          this.isRefresh = false;

          // 进入页面时查询文章状态
          this.finishRead();

        }).catch(err => {
          this.$toast(err.message);
        });
    },
    // 页面刷新
    onRefresh() {
      this.loadData();
    },
    // 下划加载数据函数
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.comments.push(this.testcomments[i]);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.comments.length >= 10) {
          this.finished = true;
        }
      }, 500);
    },
    // 完成阅读
    finishRead() {
      studyFinish(this.article.articleId).then(data => {
        this.$toast.success("完成阅读");
        this.haveRead = true;
      }).catch(err => {
        if (this.isOne) { // 初始化阅读状态
          this.haveRead = err.code === 400010; // 文章状态是否阅读
          this.isOne = false;
        } else {
          // 未完成阅读
          this.$toast(err.message);
        }
      })
    },
    // 评价
    onComment(obj, text) {
      this.target = obj;
      this.placeholder = text;
      this.showComment = true;
    },
    // 收藏
    collect(item) {
      item.isLike = !item.isLike;
      if (item.isLike) {
        this.$toast({ duration: 1000, message: "已收藏" });
      } else {
        this.$toast({ duration: 1000, message: "已取消收藏" });
      }
    },
  }
}
</script>

<style>
.article {
  position: relative;
  font-size: 4.5vw;
  font-family: "幼圆";
  /* background-color: #fafbfd; */
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
  font-size: 1rem;
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
  margin: 5vw 0 10vw;
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
.article .icon-dianzan1 {
  color: coral;
}

.btn-finish {
  display: block;
  margin: auto;
  padding: 2vw 5vw;
  border-radius: 4vw;
  background-color: rgb(255, 173, 80);
  color: #fff;
  /* box-shadow: 0 0 2px #ccc; */
}
.btn-finish:active {
  background-color: rgb(247, 178, 100);
}
</style>
