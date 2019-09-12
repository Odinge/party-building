<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-05-21 11:01:15
 * @LastEditTime: 2019-09-04 21:25:52
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="video-controls">
    <!-- <video ref="video" preload="metadata" @pause="pause" @play="play" @click="playpause"> -->
    <video ref="video" :poster="poster" preload="metadata" x5-playsinline="" playsinline="true" webkit-playsinline="true" x-webkit-airplay="true" x5-video-player-type="h5" x5-video-player-fullscreen="" x5-video-orientation="portraint" @loadeddata="captureImage">
      <!-- <video ref="video" @loadeddata="captureImage" controls> -->
      <source :src="src" :type="'video/'+type" v-for="type in videoTypes" :key="type">
      <p>Your browser doesn't support HTML5 video. Here is
        a <a :href="src">link to the video</a> instead.</p>
    </video>
    <div ref="videoControls" class="controls" v-if="close">
      <span class="tag-playpause tag-play abs-center" ref="playpause" @click="play"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String
    }
  },
  data() {
    return {
      poster: "/img/video/video-cover.png",
      close: true,
      videoTypes: ["mp4", "avi", "mov", "rmvb", "rm", "flv", "webm"]
    }
  },
  methods: {
    // 播放暂停
    playpause(e) {
      // console.log("dada");

      // const target = e.target;
      const video = this.$refs.video;
      // const playpause = this.$refs.playpause;
      // video.controls = true;
      // if (video.paused || video.ended) {
      //   playpause.classList.remove("tag-play");
      //   playpause.classList.add("tag-pause", "hide");
      video.play();
      // } else {
      //   playpause.classList.remove("tag-pause", "hide");
      //   playpause.classList.add("tag-play");
      //   video.pause();
      // }
    },
    pause(e) {
      const video = this.$refs.video;
      const playpause = this.$refs.playpause;
      playpause.classList.remove("tag-pause", "hide");
      playpause.classList.add("tag-play");
      video.controls = false;
    },
    play(e) {
      const { video, playpause } = this.$refs;
      playpause.classList.remove("tag-play");
      // playpause.classList.add("tag-pause", "hide");
      video.play();
      video.controls = true;
      this.close = false;
    },
    captureImage(e) {
      const video = e.target;
      // const scale = 0.3;
      video.controls = false;
      const canvas = document.createElement("canvas"); // 创建一个画布
      // canvas.width = video.videoWidth * scale;
      // canvas.height = video.videoHeight scale;
      canvas.width = video.offsetWidth;
      canvas.height = video.offsetHeight;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height); // getContext:设置画布环境；drawImage:画画 
      const img = document.createElement("img");
      img.width = canvas.width;
      img.height = canvas.height;
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        img.src = url;
        this.$refs.videoControls.appendChild(img);
      }, "image/png");

      // img.src = canvas.toDataURL(); // 获取图片的url
      // this.$refs.videoControls.appendChild(img);


    }
  }
}
</script>

<style>
.video-controls {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 0;
}
.video-controls video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  vertical-align: middle;
  outline: none;
  object-fit: fill;
  /* object-fit: cover; */
  z-index: 0;
}
.video-controls .controls {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}

.tag-playpause {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5em;
  height: 2.5em;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: 0.13em solid #fff;
  box-shadow: 0 0 2px #000;
  z-index: 100;
}
.tag-play::before {
  content: "";
  border: 0.5em solid transparent;
  border-left-color: #fff;
  border-right: none;
  border-left-width: 0.8em;
  margin-left: 10%;
}
.tag-pause::before {
  content: "";
  width: 0.4em;
  height: 1em;
  border-left: 0.3em solid #fff;
  border-right: 0.3em solid #fff;
  border-radius: 0.1em;
}
.hide {
  display: none !important;
}
</style>
