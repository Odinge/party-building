<template>
  <div class="video-controls">
    <!--  poster="/images/video/seal-001.jpg" -->
    <video ref="video" preload="metadata">
      <source :src="src" type="video/mp4">
      <p>Your browser doesn't support HTML5 video. Here is
        a <a :href="src">link to the video</a> instead.</p>
    </video>
    <div ref="videoControls" class="controls">
      <span class="tag-playpause tag-play abs-center" @click="play"></span>
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
    play(e) {
      const target = e.target;
      const video = this.$refs.video;
      if (video.paused || video.ended) {
        target.classList.remove("tag-play");
        target.classList.add("tag-pause");
        video.play();
      } else {
        target.classList.remove("tag-pause");
        target.classList.add("tag-play");
        video.pause();
      }
    }
  }
}
</script>

<style>
.video-controls {
  position: relative;
  width: 100%;
  height: 100%;
}
.video-controls video {
  width: 100%;
  height: 100%;
  vertical-align: middle;
  outline: none;
  object-fit: fill;
}
.tag-playpause {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
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
</style>
