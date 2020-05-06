<style lang="less" scoped>
.video-content {
  height: 100%;
  .img-video {
    width: 100%;
    height: 100%;
    object-fit: scale-down;
  }
}
</style>
<template>
  <div class="video-content">
    <video :src="src" class="img-video" controls="controls">
      您的浏览器不支持 video 标签。
    </video>
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
      videoType: false
    };
  }
};
</script>
