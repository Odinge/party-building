<template>
  <div class="video-controls">
    <!--  poster="/images/video/seal-001.jpg" -->
    <!-- <video ref="video" preload="metadata" @pause="pause" @play="play" @click="playpause"> -->
    <video ref="video" preload="metadata" controls x5-playsinline="" playsinline="true" webkit-playsinline="true" x-webkit-airplay="true" x5-video-player-type="h5" x5-video-player-fullscreen="" x5-video-orientation="portraint">
      <source :src="src" type="video/mp4">
      <p>Your browser doesn't support HTML5 video. Here is
        a <a :href="src">link to the video</a> instead.</p>
    </video>
    <div ref="videoControls" class="controls">
      <!-- <span class="tag-playpause tag-play abs-center" ref="playpause"></span> -->
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
      const video = this.$refs.video;
      const playpause = this.$refs.playpause;
      playpause.classList.remove("tag-play");
      playpause.classList.add("tag-pause", "hide");
      video.controls = true;
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
/* .video-controls .controls {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
} */
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
