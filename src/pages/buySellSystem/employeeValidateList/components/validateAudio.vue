<template>
  <!-- 房源记录音频组件 -->
  <div class="audio-box">
    <audio
      :src="url"
      ref="audio"
      v-audioLoad
    ></audio>
    <div class="audio-fl">
      <img
        class="sound"
        src="@/assets/images/employeeValidate_sound.png"
        alt=""
      />
      <span class="duration">{{duration | timefomat}}</span>
    </div>
    <img
      class="play"
      :src="playType ? require('@/assets/images/employeeValidate_pause.svg') : require('@/assets/images/employeeValidate_play.png')"
      alt=""
      @click="openAudio"
    />
  </div>
</template>
<script>
import util from "@/util/util";
export default {
  props: {
    url: {
      type: String,
      default: ""
      //default: "https://ee-sycdn.kuwo.cn/2be6276aceea681a14d93f9d0044703b/5f598038/resource/n1/97/79/630684192.mp3"
    }
  },
  data() {
    return {
      playType: false,
      duration: 0
    }
  },
  directives: {
    audioLoad: {
      bind(el, binding, vnode) {
        el.addEventListener("loadedmetadata", () => {
          vnode.context.duration = parseInt(el.duration);
        });
        el.addEventListener("timeupdate", () => {
          vnode.context.duration = parseInt(el.currentTime);
        });
        el.addEventListener("ended", () => {
          vnode.context.playType = false;
          //vnode.context.duration = 0;
        });
      }
    }
  },
  filters: {
    timefomat(value) {
      return util.timeToStr(value);
    }
  },
  methods: {
    //播放 or 暂停音频
    openAudio() {
      let audio = this.$refs.audio;
      try {
        if (audio.paused) {
          audio.play();
          this.playType = true;
        } else {
          audio.pause();
          this.playType = false;
        }
      } catch (error) {
        console.log(error, audio);
        this.$message.error("是不是没有音频阿!");
      }
    }
  }
}
</script>
<style lang="less" scoped>
.audio-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // prettier-ignore
  width: 227PX;
  // prettier-ignore
  height: 36PX;
  // prettier-ignore
  margin-top: 22PX;
  // prettier-ignore
  padding: 0 10PX;
  // prettier-ignore
  border-radius: 4PX;
  background: #fff;
  box-sizing: border-box;
  .audio-fl {
    .sound {
      // prettier-ignore
      width: 12PX;
      // prettier-ignore
      margin-right: 6PX;
    }
    .duration {
      font-size: @font12;
      color: #303133;
    }
  }
  .play {
    // prettier-ignore
    width: 16PX;
  }
}
</style>