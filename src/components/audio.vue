<style lang="less" scoped>
.audio-contenr {
  display: flex;
  flex: 1;
  align-items: center;
  height: 107px;
  .audio-contenr-but {
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #fea32e;
    color: #fff;
    text-align: center;
    line-height: 50px;
    font-size: 50px;
    text-shadow: 0px 0px 2px #fea32e, 0px 0px 8px #fea32e, 0px 0px 16px #fea32e,
      0px 0px 22px #fea32e, 0px 0px 30px #fea32e;
    margin: 0 20px;
  }
  .el-slider {
    flex: 1;
  }
  .autio-time {
    margin-left: 20px;
    margin-right: 20px;
    font-size: 18px;
  }
}
/deep/.el-slider__bar {
  background: #fea32e;
}
/deep/.el-slider__button {
  border-color: #fea32e;
  width: 20px;
  height: 20px;
}
.audio-contenr-fixed {
  position: absolute;
  top: 80px;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  padding: 8px 10px;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  z-index: 200;
  color: #fff;
  font-size: 18px;
  display: flex;
  align-items: center;
  cursor: pointer;
  .icon {
    margin-right: 8px;
    font-size: 24px;
  }
}
</style>
<template>
  <div>
    <div class="audio-contenr" v-if="!fixed">
      <audio :src="url" v-if="url" ref="audio" v-audioLoad></audio>
      <div
        :class="['audio-contenr-but', audioPlay.icon]"
        @click="openVideo"
      ></div>
      <el-slider
        v-model="audioPlay.nowTime"
        :format-tooltip="formatTooltip"
        @input="audioSliderChange"
        ref="audioSlider"
        :max="audioPlay.endTime"
        :disabled="url ? false : true"
      ></el-slider>
      <div class="autio-time">
        {{ audioPlay.nowTime | timefomat }} /
        {{ audioPlay.endTime | timefomat }}
      </div>
    </div>
    <div class="audio-contenr-fixed" @click="openVideo" v-if="fixed">
      <audio :src="url" v-if="url" ref="audio" v-audioLoad></audio>
      <i
        class="icon"
        :class="audioPlay.playType ? 'el-icon-phone-outline' : 'el-icon-phone'"
      ></i>
      <span>
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
import util from "@/util/util";
export default {
  props: {
    url: {
      type: String,
      default: ""
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      audioPlay: {
        playOrEnd: true,
        nowTime: 0,
        endTime: 0,
        playType: false,
        icon: "el-icon-video-play"
      }
    };
  },
  filters: {
    timefomat(value) {
      return util.timeToStr(value);
    }
  },
  directives: {
    audioLoad: {
      bind(el, binding, vnode) {
        el.addEventListener("loadedmetadata", () => {
          vnode.context.audioPlay.endTime = parseInt(el.duration);
        });
        el.addEventListener("timeupdate", () => {
          vnode.context.audioPlay.nowTime = parseInt(el.currentTime);
        });
        el.addEventListener("ended", () => {
          vnode.context.audioPlay.nowTime = 0;
          vnode.context.audioPlay.icon = "el-icon-video-play";
        });
      }
    }
  },
  methods: {
    //格式化slider时间
    formatTooltip(val) {
      return util.timeToStr(val);
    },
    //播放 or 暂停音频
    openVideo() {
      let audio = this.$refs.audio;
      try {
        if (audio.paused) {
          audio.play();
          this.audioPlay.icon = "el-icon-video-pause";
          this.audioPlay.playType = true;
        } else {
          audio.pause();
          this.audioPlay.icon = "el-icon-video-play";
          this.audioPlay.playType = false;
        }
      } catch (error) {
        console.log(error, audio);
        this.$message.error("是不是没有音频阿!");
      }
    },
    audioSliderChange(e) {
      if (this.$refs.audioSlider.dragging) {
        this.$refs.audio.currentTime = e;
      }
    }
  }
};
</script>
