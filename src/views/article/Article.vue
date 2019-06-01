<template>
  <div class="article app-container" :class="{bg:!hasComment}">
    <Header :showMore="true">{{article.title}}</Header>
    <div class="app-content">
      <article class="a-content">
        <h3>{{article.title}}</h3>
        <div class="a-author">
          <span>{{article.author}}</span>
          <span class="a-time">{{article.time}}</span>
        </div>
        <div class="a-main">
          {{article.content}}
        </div>
        <div class="a-redactor">
          负责编辑： {{article.redactor}}
        </div>
      </article>
      <!-- 评价区域 -->
      <div class="comment-area">
        <h4 id="comment">观点</h4>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" v-if="hasComment">
          <ul class="comment-content">
            <li v-for="(comment, key) in comments" :key="key">
              <img :src="comment.avatar" :alt="comment.name">
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
export default {
  props: ["info", "id"],
  data() {
    return {
      article: {
        title: "西湖的鸳鸯，还会亲近人吗",
        author: "“党建” 学习平台",
        time: "2019-5-24",
        redactor: "张云",
        content: `
导语：中公时事政治频道更新国内国际时事政治热点，并提供时事政治热点、时政模拟题、时事大事记及时事政治热点汇总等。今天我们关注--时政热点：西湖的鸳鸯，还会亲近人吗。
5月18日下午，西湖白堤靠近平湖秋月一处的水边，几只小鸳鸯怡然自得地享受着西湖的湖水和美景，对人毫无戒心地游到岸边。此时，一名年轻男性游客爬在堤岸边，突然伸手去抓两只游到最靠近岸边的小鸳鸯。尽管也有一位小女孩在拼命劝阻那名男子，但后者毫不理会，把其中一只鸳鸯抓出水面，另外一只明显受到惊吓。

事发后好几日，人们再也没看到这只小鸳鸯。西湖的志愿者担心，小鸳鸯可能受伤，尤其是翅膀被人用力抓弄后很容易夭折。迄今为止西湖边一共出现的7窝小鸳鸯，它们陆陆续续出窝57只，但现存39只。这7窝鸳鸯的每一窝志愿者们都给它们起了名字：水水、山山、处处、明明……用的是孤山上那副有名的对联：水水山山处处明明秀秀，晴晴雨雨时时好好奇奇。尽管西湖十景名声在外，今天的西湖显然要加上“鸳鸯泛湖”这一景色。这个新添的美景足以证明西湖的生态正在慢慢变好。但是，好不容易获得的良好生态萌芽马上就遭到人的破坏。

鸳鸯在西湖出现是天大的喜事，但是人们却用恶劣的行径来对待它们，暴殄天物。志愿者在最近巡查的三天内就看到人们抓捕鸳鸯有10多次，更有甚者还有人用网兜去抓鸳鸯。有的游客还会朝着正在睡觉的鸳鸯身上浇水，投喂鸳鸯食物更是常见现象。如果不遏制这些危害鸳鸯的行为，“鸳鸯泛湖”这一景色就如同小鸳鸯的夭折一样，也会灭绝。

与动物的亲密接触的前提是，首先要爱动物，就像爱自己的孩子，其次要懂得动物习性，知道如何与它们相处。在西湖边抓弄鸳鸯的游客既不懂动物学知识，更不是爱鸳鸯，而是因为好奇去戏弄和伤害鸳鸯，甚至想捕获鸳鸯。因此，西湖的鸳鸯可能再也不会把人当成亲密朋友，而且会产生一个恶劣的铭记：快跑，人来了，我们不是死就是伤!

野生动物不是个人财产，任何人都不能攫为己有，正如公园的花不能采摘一样，西湖中的鸳鸯也是属于所有游客，供所有人观赏，也因此更需要所有人保护。即便换位思考，如果是自家的宠物，能够随意抓弄它吗?

2018年11月，一只色彩艳丽的鸳鸯出现在纽约中心公园的湖中，马上成为“网红鸟”，吸引了成千上万的美国人前来观赏，为它拍照。为了占到好位置，有人还夜宿公园。那只艳丽的鸳鸯很多次都悠哉游哉地随湖中的水鸟一起游到岸边，人们也只是争相观赏拍照，没有一个人去逗弄鸳鸯，甚至不会大声说话以免惊吓到鸳鸯，更不用说去抓捕鸳鸯。事后这只鸳鸯又突然不见了，人们以为是有人抓捕了这只鸳鸯。不过，纽约公园管理部门及时进行了回复，几乎所有的鸭子或野鸟都会进行季节性的迁徙。“很高兴它(鸳鸯)能光临我们的公园，但要记住，它可能会在某个时候离开纽约，到更暖和的地方去。”

那只鸳鸯在纽约公园留下的是美好的记忆，是那里的人多么爱它、呵护它和把它当成宝贝一样来对待，因此未来还会飞到那里，甚至带着它的后代留驻那里。`,
        isZan: false,
        isLike: false
      },
      comments: [
        { avatar: "/images/comm/user-logo-001.jpg", sname: "哈哈", zan: 20, time: "2018-01-24", id: "158dad5811a", content: "大达瓦大无大王大伟大无多看个埃琳娜打雷呢", isZan: false },
        { avatar: "/images/comm/user-logo-002.jpg", sname: "大大", zan: 0, time: "2018-11-12", id: "8949846dada", content: "百变五年稳定农简爱湾东岸的你看个我都爱玩激动哦爱喝大碗", isZan: false },
        { avatar: "/images/comm/user-logo-003.jpg", sname: "张凳子", zan: 1000, time: "2019-02-01", id: "dad61616adad614", content: "个舞蹈袜ID哦艾薇ID还哦我的好比", isZan: false },
      ],
      loading: false,
      finished: false,
      showComment: false,
      placeholder: "",
      target: null
    }
  },
  mounted() {
    this.$store.commit("setHeaderTitle", this.id);
  },
  computed: {
    hasComment() {
      return this.comments.length;
    }
  },
  methods: {
    onComment(obj, text) {
      this.target = obj;
      this.placeholder = text;
      this.showComment = true;
    },
    collect(item) {
      item.isLike = !item.isLike;
      if (item.isLike) {
        this.$toast({ duration: 1000, message: "已收藏" });
      } else {
        this.$toast({ duration: 1000, message: "已取消收藏" });
      }
    },
    // 上拉加载数据函数
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.comments.push(this.comments[i]);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.comments.length >= 10) {
          this.finished = true;
        }
      }, 500);
    }
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
  outline: none;
  font-size: 1rem;
}
.article .app-content {
  padding: 4vw;
  font-style: normal;
}
.a-content h3 {
  font-size: 1.2em;
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
</style>
